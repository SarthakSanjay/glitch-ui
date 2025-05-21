import { program } from "commander";
import chalk from "chalk";
import fs from "fs-extra";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const COMPONENT_DIR = path.join(__dirname, "..", "src", "components");

export async function addCommand() {
  program
    .command("add <componentName>")
    .description("Cli command to add component to your project")
    .action(async (componentName) => {
      try {
        const srcPath = path.join(
          COMPONENT_DIR,
          `${componentName.toLowerCase()}.tsx`,
        );
        const destDir = path.join(process.cwd(), "src", "components", "ui");
        const destPath = path.join(
          destDir,
          `${componentName.toLowerCase()}.tsx`,
        );

        if (!(await fs.pathExists(srcPath))) {
          throw new Error(`Component ${componentName} not found in components`);
        }

        await fs.ensureDir(destDir);
        await fs.copyFile(srcPath, destPath);
        console.log(
          chalk.greenBright("✅ " + componentName),
          chalk.gray(" added to the project"),
        );
      } catch (error: any) {
        console.log(chalk.redBright("Error adding component", error.message));
      }
    });
}
