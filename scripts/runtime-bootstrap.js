import { execSync } from "child_process";
import fs from "fs";

const REPO_URL = process.env.REPO_URL;
const BRANCH = process.env.PREVIEW_BRANCH || "main";

if (!REPO_URL) {
  console.error("[bootstrap] REPO_URL is required");
  process.exit(1);
}

if (!fs.existsSync(".git")) {
  console.log("[bootstrap] cloning repo...");
  execSync(`git clone -b ${BRANCH} ${REPO_URL} .`, {
    stdio: "inherit",
  });

  console.log("[bootstrap] installing dependencies...");
  execSync("pnpm install", { stdio: "inherit" });
} else {
  console.log("[bootstrap] repo already present");
}
