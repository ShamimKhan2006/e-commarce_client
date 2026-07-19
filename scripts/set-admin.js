// Manually promote a registered user to admin.
// Usage:  node scripts/set-admin.js admin@example.com
// Requires the MONGODB_URL env var (loaded from .env automatically).

import { MongoClient } from "mongodb";
import fs from "fs";
import path from "path";

function loadEnv() {
  const envPath = path.resolve(process.cwd(), ".env");
  if (!fs.existsSync(envPath)) return;
  const text = fs.readFileSync(envPath, "utf8");
  for (const line of text.split("\n")) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
    if (m && !process.env[m[1]]) {
      process.env[m[1]] = m[2].replace(/^["']|["']$/g, "");
    }
  }
}

loadEnv();

const email = process.argv[2];
if (!email) {
  console.error("Usage: node scripts/set-admin.js <email>");
  process.exit(1);
}

const client = new MongoClient(process.env.MONGODB_URL);
const dbName = "e-commerce";

async function main() {
  await client.connect();
  const db = client.db(dbName);
  const result = await db
    .collection("user")
    .updateOne(
      { email: email.toLowerCase() },
      { $set: { role: "admin" } }
    );

  if (result.matchedCount === 0) {
    console.error(`No user found with email: ${email}`);
    process.exit(1);
  }

  console.log(
    result.modifiedCount === 0
      ? `User ${email} is already an admin.`
      : `User ${email} has been set as admin.`
  );
  await client.close();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
