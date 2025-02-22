import { Link } from "@heroui/link";
import { button as buttonStyles } from "@heroui/theme";
import { GithubLogo } from "@phosphor-icons/react/dist/ssr";

import { siteConfig } from "@/config/site";
import { title, subtitle } from "@/components/primitives";

export default function Home() {
  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-36">
      <div className="inline-block max-w-xl text-center justify-center">
        <span className={title({ color: "cyan" })}>Vasjan Çupri</span>
        <div className={subtitle({ class: "mt-4" })}>
          I create intelligent, user-friendly web solutions that help small
          businesses automate, scale, and focus on what matters most.
        </div>
      </div>

      <div className="flex gap-3">
        <Link
          isExternal
          className={buttonStyles({
            color: "primary",
            radius: "full",
            variant: "shadow",
          })}
          href={siteConfig.navItems[0].href}
        >
          View my projects
        </Link>
        <Link
          isExternal
          className={buttonStyles({ variant: "bordered", radius: "full" })}
          href={siteConfig.links.github}
        >
          <GithubLogo size={20} />
          GitHub
        </Link>
      </div>
    </section>
  );
}
