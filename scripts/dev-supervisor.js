import { spawn, execSync } from "child_process";
import fs from "fs";

const BRANCH = process.env.PREVIEW_BRANCH || "main";
const REPO_URL = process.env.REPO_URL;

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

if (!fs.existsSync(".git")) {
  if (!REPO_URL) {
    console.error("[supervisor] REPO_URL missing");
    process.exit(1);
  }

  console.log("[supervisor] initializing git in-place");

  // Initialize git and attach origin
  execSync("git init", { stdio: "inherit" });
  execSync(`git remote add origin ${REPO_URL}`, { stdio: "inherit" });

  // Fetch and force working tree to match origin
  execSync("git fetch origin --depth=1", { stdio: "inherit" });
  execSync(`git reset --hard origin/${BRANCH}`, { stdio: "inherit" });

  // Remove untracked files (.DS_Store, etc.)
  execSync("git clean -fd", { stdio: "inherit" });
}

console.log("[supervisor] starting dev runtime");

// Always use pnpm so binaries resolve correctly
run("next-dev", "pnpm", ["dev"]);
run("git-poll", "node", ["scripts/git-poll.js"]);
