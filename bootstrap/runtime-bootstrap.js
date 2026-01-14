import { execSync } from "child_process";
import fs from "fs";

const REPO_URL = process.env.REPO_URL;
const BRANCH = process.env.PREVIEW_BRANCH || "main";
const REPO_DIR = "/app/repo";

if (!REPO_URL) {
  console.error("[bootstrap] REPO_URL missing");
  process.exit(1);
}

if (!fs.existsSync(REPO_DIR)) {
  console.log("[bootstrap] cloning repo...");
  execSync(`git clone -b ${BRANCH} ${REPO_URL} ${REPO_DIR}`, {
    stdio: "inherit",
  });

  console.log("[bootstrap] installing dependencies...");
  execSync("pnpm install", {
    cwd: REPO_DIR,
    stdio: "inherit",
  });
} else {
  console.log("[bootstrap] repo already present");
}
