import fs from "node:fs";

const id = process.argv[2];

if (!id) {
  console.error("Usage: pnpm place:remove <place-id>");
  process.exit(1);
}

const dbPath = new URL("../data/places.json", import.meta.url);
const rawDb = fs.readFileSync(dbPath, "utf8");
const places = JSON.parse(rawDb);

if (!Array.isArray(places)) {
  console.error("data/places.json must be an array");
  process.exit(1);
}

const next = places.filter((x) => !(x && typeof x === "object" && x.id === id));

if (next.length === places.length) {
  console.error(`place with id "${id}" not found`);
  process.exit(1);
}

fs.writeFileSync(dbPath, JSON.stringify(next, null, 2) + "\n");
console.log(`Removed place: ${id}`);
