import fs from "node:fs";

const inputPath = process.argv[2];

if (!inputPath) {
  console.error("Usage: pnpm place:add ./place.json");
  process.exit(1);
}

const dbPath = new URL("../data/places.json", import.meta.url);
const rawDb = fs.readFileSync(dbPath, "utf8");
const places = JSON.parse(rawDb);

if (!Array.isArray(places)) {
  console.error("data/places.json must be an array");
  process.exit(1);
}

const rawInput = fs.readFileSync(inputPath, "utf8");
const place = JSON.parse(rawInput);

if (!place || typeof place !== "object" || Array.isArray(place)) {
  console.error("place file must contain a single object");
  process.exit(1);
}

if (typeof place.id !== "string" || !place.id.trim()) {
  console.error("place.id is required");
  process.exit(1);
}

if (places.some((x) => x && typeof x === "object" && x.id === place.id)) {
  console.error(`place with id "${place.id}" already exists`);
  process.exit(1);
}

places.push(place);
fs.writeFileSync(dbPath, JSON.stringify(places, null, 2) + "\n");
console.log(`Added place: ${place.name || place.id}`);
