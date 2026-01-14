import { spawn } from "child_process";

function run(cmd, args) {
  return spawn(cmd, args, {
    stdio: "inherit",
    shell: true,
    env: process.env,
  });
}

console.log("[supervisor] bootstrapping repo");

run("node", ["scripts/runtime-bootstrap.js"]).on("exit", (code) => {
  if (code !== 0) process.exit(1);

  console.log("[supervisor] starting dev runtime");

  run("next", [
    "dev",
    "--turbopack",
    "-H",
    "0.0.0.0",
    "-p",
    process.env.PORT || "8080",
  ]);

  run("node", ["scripts/git-poll.js"]);
});
