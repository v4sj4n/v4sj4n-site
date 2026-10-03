"""Regenerate per-locale OG images (1200x630) in the Google Glue light palette.

Usage: python3 scripts/gen-og.py
Reads dictionaries/metadata-by-locale.json, writes public/output/<locale>/opengraph-image.png
plus public/apple-touch-icon.png (180x180).
"""

import json
import math
import os
import textwrap
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parent.parent
META = json.loads((ROOT / "dictionaries" / "metadata-by-locale.json").read_text())
OUT_DIR = ROOT / "public" / "output"

SUP = "/System/Library/Fonts/Supplemental"
SYS = "/System/Library/Fonts"


# ---------- OKLCH -> sRGB ----------

def oklch_to_srgb(L, C, Hdeg):
    H = math.radians(Hdeg)
    a = C * math.cos(H)
    b = C * math.sin(H)
    # Oklab -> linear sRGB
    l_ = L + 0.3963377774 * a + 0.2158037573 * b
    m_ = L - 0.1055613458 * a - 0.0638541728 * b
    s_ = L - 0.0894841775 * a - 1.2914855480 * b
    l = l_ ** 3
    m = m_ ** 3
    s = s_ ** 3
    r = +4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s
    g = -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s
    bl = -0.0041960863 * l - 0.7034186147 * m + 1.7076147010 * s

    def gamma(u):
        u = max(0.0, min(1.0, u))
        return 1.055 * (u ** (1 / 2.4)) - 0.055 if u > 0.0031308 else 12.92 * u

    return tuple(round(gamma(v) * 255) for v in (r, g, bl))


# Google Glue light tokens (match app/globals.css :root)
BG = (255, 255, 255)
CREAM = (32, 33, 36)  # --g-ink #202124
PINE_LIGHT = (26, 115, 232)  # --g-primary #1a73e8
DESC = (60, 64, 67)  # --g-body #3c4043
ACCENT = (26, 115, 232)  # --g-primary #1a73e8
ICON_BG = (20, 26, 40)
ICON_V = (189, 199, 248)

print("theme: white-first Glue, primary #1a73e8")

W, H = 1200, 630


# ---------- fonts ----------

def F(path, size, index=0):
    return ImageFont.truetype(path, size, index=index)


GEO_B = f"{SUP}/Georgia Bold.ttf"
GEO = f"{SUP}/Georgia.ttf"
HELV = f"{SYS}/Helvetica.ttc"
ARIAL = f"{SUP}/Arial.ttf"
ARIAL_U = f"{SUP}/Arial Unicode.ttf"
RETHINK = ROOT / "scripts" / "fonts" / "rethink-sans-500.ttf"
RETHINK_B = ROOT / "scripts" / "fonts" / "rethink-sans-700.ttf"

FONTS = {
    "default": {"name": (str(RETHINK), 0), "body": (str(RETHINK), 0)},
    "ar": {"name": (f"{SYS}/GeezaPro.ttc", 1), "body": (f"{SYS}/GeezaPro.ttc", 0), "rtl": True, "arabic": True},
    "arc": {"name": (f"{SYS}/GeezaPro.ttc", 1), "body": (f"{SYS}/GeezaPro.ttc", 0), "rtl": True, "arabic": True},
    "he": {"name": (f"{SYS}/ArialHB.ttc", 1), "body": (f"{SYS}/ArialHB.ttc", 0), "rtl": True},
    "ur": {"name": (ARIAL, 0), "body": (ARIAL, 0), "rtl": True, "arabic": True},
    "th": {"name": (f"{SUP}/Thonburi.ttc", 1), "body": (f"{SUP}/Thonburi.ttc", 0)},
    "bn": {"name": (f"{SUP}/Bangla MN.ttc", 1), "body": (f"{SUP}/Bangla MN.ttc", 0)},
    "hi": {"name": (f"{SUP}/DevanagariMT.ttc", 1), "body": (f"{SUP}/DevanagariMT.ttc", 0)},
    "ja": {"name": (f"{SYS}/ヒラギノ角ゴシック W6.ttc", 0), "body": (f"{SYS}/ヒラギノ角ゴシック W6.ttc", 0)},
    "ko": {"name": (f"{SYS}/AppleSDGothicNeo.ttc", 4), "body": (f"{SYS}/AppleSDGothicNeo.ttc", 0)},
    "zh": {"name": (f"{SYS}/Hiragino Sans GB.ttc", 2), "body": (f"{SYS}/Hiragino Sans GB.ttc", 0)},
    "ka": {"name": (ARIAL_U, 0), "body": (ARIAL_U, 0)},
}

RTL_LOCALES = {"ar", "arc", "he", "ur"}


def shape(text, locale):
    cfg = FONTS.get(locale, FONTS["default"])
    if cfg.get("arabic"):
        import arabic_reshaper
        from bidi.algorithm import get_display

        return get_display(arabic_reshaper.reshape(text))
    if cfg.get("rtl"):
        from bidi.algorithm import get_display

        return get_display(text)
    return text


def wrap(draw, text, font, max_w):
    words = text.split()
    lines, cur = [], ""
    for w in words:
        trial = f"{cur} {w}".strip()
        if draw.textlength(trial, font=font) <= max_w or not cur:
            cur = trial
        else:
            lines.append(cur)
            cur = w
    if cur:
        lines.append(cur)
    return lines


def render_one(locale, title, description):
    cfg = FONTS.get(locale, FONTS["default"])
    rtl = locale in RTL_LOCALES
    name_f = F(cfg["name"][0], 68, cfg["name"][1])
    role_f = F(cfg["body"][0], 36, cfg["body"][1])
    desc_f = F(cfg["body"][0], 27, cfg["body"][1])

    for sep in (" — ", ", "):
        if sep in title:
            name, role = title.split(sep, 1)
            break
    else:
        name, role = title, ""

    img = Image.new("RGB", (W, H), BG)

    d = ImageDraw.Draw(img)
    x0 = W - 120 if rtl else 120
    anchor = "ra" if rtl else "la"

    # accent bar
    bar_w = 72
    bx0 = x0 - bar_w if rtl else x0
    d.rounded_rectangle([bx0, 148, bx0 + bar_w, 158], radius=5, fill=ACCENT)

    y = 190
    if locale in ("ko", "zh") and "Ç" in name:
        # CJK fonts lack U+00C7: draw the name in runs, borrowing Ç from Georgia
        geo = F(str(RETHINK), 74, 0)
        pre, post = name.strip().split("Ç", 1)
        parts = [(pre, name_f), ("Ç", geo), (post, name_f)]
        widths = [d.textlength(t, font=f) for t, f in parts]
        xx = x0
        for (t, f), w in zip(parts, widths):
            d.text((xx, y), t, font=f, fill=CREAM, anchor="la")
            xx += w
    else:
        d.text(
            (x0, y),
            shape(name.strip(), locale),
            font=name_f,
            fill=CREAM,
            anchor="ra" if rtl else "la",
        )
    y += 108
    if role:
        if locale == "ar":
            # Geeza Pro has no Latin: Arabic run right, "(Full-stack)" in Helvetica to its left
            arabic_part, latin_part = role.strip().rsplit(" ", 1)
            arabic_shaped = shape(arabic_part, locale)
            helv = F(HELV, 38, 0)
            arab_w = d.textlength(arabic_shaped, font=role_f)
            gap = 14
            d.text((x0, y), arabic_shaped, font=role_f, fill=PINE_LIGHT, anchor="ra")
            d.text((x0 - arab_w - gap, y), latin_part, font=helv, fill=PINE_LIGHT, anchor="ra")
        else:
            d.text((x0, y), shape(role.strip(), locale), font=role_f, fill=PINE_LIGHT, anchor="ra" if rtl else "la")
        y += 62
    else:
        y += 10

    for line in wrap(d, shape(description.strip(), locale), desc_f, 950):
        d.text((x0, y), line, font=desc_f, fill=DESC, anchor="ra" if rtl else "la")
        y += 44
        if y > H - 60:
            break

    return img


def main():
    missing = []
    for locale, meta in sorted(META.items()):
        out = OUT_DIR / locale / "opengraph-image.png"
        if not out.parent.exists():
            missing.append(locale)
            continue
        img = render_one(locale, meta["title"], meta["description"])
        img.save(out)
        print(f"wrote {out}")
    if missing:
        print("no output dir for:", ", ".join(missing))

    # apple touch icon 180x180 — matches app/icon1.png
    icon = Image.new("RGB", (180, 180), ICON_BG)
    md = ImageDraw.Draw(icon)
    f = F(str(RETHINK), 104, 0)
    md.text((90, 88), "V", font=f, fill=ICON_V, anchor="mm")
    icon.save(ROOT / "public" / "apple-touch-icon.png")
    print("wrote public/apple-touch-icon.png")


if __name__ == "__main__":
    main()
