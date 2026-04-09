import { DatabaseSync } from "node:sqlite";
import readline from "node:readline";

// open database in current directory
const db = new DatabaseSync("./portal.db");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: "portal-sqlite> "
});

console.log("Connected to portal.db");
console.log("Enter SQL queries");
console.log("Commands: .tables  .exit");

rl.prompt();

rl.on("line", (line) => {
  const input = line.trim();

  if (input === ".exit") {
    rl.close();
    return;
  }

  try {
    if (input === ".tables") {
      const tables = db
        .prepare("SELECT name FROM sqlite_master WHERE type='table'")
        .all();

      console.table(tables);
    } else {
      const stmt = db.prepare(input);

      if (input.toLowerCase().startsWith("select")) {
        const rows = stmt.all();
        console.table(rows);
      } else {
        const result = stmt.run();
        console.log(result);
      }
    }
  } catch (err) {
    console.error("SQL error:", err.message);
  }

  rl.prompt();
});

rl.on("close", () => {
  db.close();
  console.log("portal.db closed");
  process.exit(0);
});