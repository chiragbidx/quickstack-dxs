import { spawn, execSync } from "child_process";
import fs from "fs";

function run(name, cmd, args) {
  const p = spawn(cmd, args, {
    stdio: "inherit",
    shell: true,
    env: process.env,
  });

  p.on("exit", (code) => {
    console.error(`[supervisor] ${name} exited with code ${code}`);
    process.exit(code ?? 1);
  });

  return p;
}

console.log("[supervisor] ensuring git repo");

// ✅ CORRECT FIX
if (!fs.existsSync(".git")) {
  if (!process.env.REPO_URL) {
    console.error("[supervisor] REPO_URL missing");
    process.exit(1);
  }

  console.log("[supervisor] initializing git repo");

  execSync("git init", { stdio: "inherit" });
  execSync(`git remote add origin ${process.env.REPO_URL}`, {
    stdio: "inherit",
  });
  execSync("git fetch origin", { stdio: "inherit" });
  execSync(
    `git checkout -B ${process.env.PREVIEW_BRANCH || "main"} origin/${
      process.env.PREVIEW_BRANCH || "main"
    }`,
    { stdio: "inherit" }
  );
}

console.log("[supervisor] starting dev runtime");

run("next-dev", "pnpm", ["dev"]);
run("git-poll", "node", ["scripts/git-poll.js"]);
