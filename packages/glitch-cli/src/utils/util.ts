import chalk from "chalk";
import fs from "fs-extra";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const LIB_DIR = path.join(__dirname, "..", "src", "lib");

export async function checkFramework() {
  const isNext =
    (await fs.pathExists("next.config.ts")) ||
    (await fs.pathExists("next.config.js"));

  const isVite =
    (await fs.pathExists("vite.config.ts")) ||
    (await fs.pathExists("vite.config.js"));

  if (isNext) {
    console.log(chalk.gray("✅ Framework found"), chalk.greenBright("Nextjs"));
  } else if (isVite) {
    console.log(
      chalk.gray("✅ Framework found"),
      chalk.greenBright("Vite + React"),
    );
  } else {
    return;
  }
}

export async function checkTailwind() {
  const packageJson = await fs.readJson("package.json");
  const version =
    packageJson.dependencies?.["tailwindcss"] ||
    packageJson.devDependencies?.["tailwindcss"];
  if (version) {
    console.log(
      chalk.white("✅ Check Completed found"),
      chalk.greenBright(`Tailwindcss v${version}`),
    );
  } else {
    console.log(chalk.redBright("Tailwindcss not found"));
    return;
  }
}

export async function createLibFile() {
  try {
    const srcPath = path.join(LIB_DIR, "utils.ts");
    const destDir = path.join(process.cwd(), "src", "lib");
    const destPath = path.join(destDir, "utils.ts");

    if (!(await fs.pathExists(srcPath))) {
      throw new Error(`utils.ts file not found in lib`);
    }

    await fs.ensureDir(destDir);
    await fs.copyFile(srcPath, destPath);
    console.log(chalk.greenBright("✅ added lib/utils.ts"));
  } catch (error) {}
}
