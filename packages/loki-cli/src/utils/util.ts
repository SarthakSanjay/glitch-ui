import chalk from "chalk";
import fs from "fs-extra";

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
