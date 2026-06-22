import { readdir, readFile, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const dictionariesDir = join(root, "dictionaries");
const outputPath = join(dictionariesDir, "metadata-by-locale.json");

const files = (await readdir(dictionariesDir))
	.filter(
		(file) =>
			file.endsWith(".json") &&
			file !== "metadata-by-locale.json" &&
			file !== "metadata-by-region.json",
	)
	.sort();

const metadataByLocale = {};

for (const file of files) {
	const locale = file.replace(/\.json$/, "");
	const dictionary = JSON.parse(
		await readFile(join(dictionariesDir, file), "utf8"),
	);

	if (!dictionary.metadata) {
		console.warn(`Skipping ${locale}: no metadata field`);
		continue;
	}

	metadataByLocale[locale] = dictionary.metadata;
}

await writeFile(
	outputPath,
	`${JSON.stringify(metadataByLocale, null, "\t")}\n`,
	"utf8",
);

console.log(
	`Wrote metadata for ${Object.keys(metadataByLocale).length} locales to ${outputPath}`,
);
