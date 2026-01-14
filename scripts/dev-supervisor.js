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

// 🔴 THIS IS THE KEY FIX
if (!fs.existsSync(".git")) {
  if (!process.env.REPO_URL) {
    console.error("[supervisor] REPO_URL missing, cannot clone");
    process.exit(1);
  }

  console.log("[supervisor] cloning git repo...");
  execSync(`git clone ${process.env.REPO_URL} .`, {
    stdio: "inherit",
  });
}

console.log("[supervisor] starting dev runtime");

run("next-dev", "pnpm", ["dev"]);
run("git-poll", "node", ["scripts/git-poll.js"]);
