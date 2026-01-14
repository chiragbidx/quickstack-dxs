import { spawn } from "child_process";
import path from "path";

const REPO_DIR = "/app/repo";

function run(cmd, args, cwd = REPO_DIR) {
  return spawn(cmd, args, {
    stdio: "inherit",
    shell: true,
    env: process.env,
    cwd,
  });
}

console.log("[supervisor] bootstrapping repo");

run("node", ["/app/bootstrap/runtime-bootstrap.js"], "/app")
  .on("exit", (code) => {
    if (code !== 0) process.exit(1);

    console.log("[supervisor] starting dev runtime");

    run("pnpm", ["dev"]);
    run("node", ["scripts/git-poll.js"]);
  });
