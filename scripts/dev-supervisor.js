import { spawn } from "child_process";

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

console.log("[supervisor] starting dev runtime");

run(
  "next-dev",
  "next",
  ["dev", "--turbopack", "-H", "0.0.0.0", "-p", process.env.PORT || "3000"]
);

run(
  "git-poll",
  "node",
  ["scripts/git-poll.js"]
);
