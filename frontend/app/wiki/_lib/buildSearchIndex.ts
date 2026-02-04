import fs from "fs";
import path from "path";
import { getWikiPages } from "./wikiSearch";

// Get all wiki pages
const pages = getWikiPages();

// Output path in public folder (served at /search-index.json)
const outputPath = path.join(process.cwd(), "public", "search-index.json");

// Ensure public folder exists
if (!fs.existsSync(path.dirname(outputPath))) {
  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
}

// Write JSON
fs.writeFileSync(outputPath, JSON.stringify(pages, null, 2));

console.log(`Search index built with ${pages.length} pages at ${outputPath}`);
