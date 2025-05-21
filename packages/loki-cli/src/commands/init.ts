import { program } from "commander";
import { checkFramework, checkTailwind, createLibFile } from "../utils/util.js";
import chalk from "chalk";
import { execa } from "execa";

export async function initCommand() {
  program
    .command("init")
    .description("This command is to integrate loki-ui to your project")
    .action(async () => {
      try {
        checkFramework();
        checkTailwind();
        installDependencies();
        createLibFile();

        console.log(chalk.greenBright("Project Initialization completed"));
      } catch (error) {
        console.log(chalk.redBright("Error Found"));
      }
    });
}

async function installDependencies() {
  try {
    console.log(
      chalk.white(
        "Installing clsx, tailwind-merge, and class-variance-authority...",
      ),
    );
    await execa(
      "npm",
      ["install", "clsx", "tailwind-merge", "class-variance-authority"],
      {
        stdio: "inherit",
        cwd: process.cwd(),
      },
    );
    console.log(chalk.green("Dependencies installed successfully!"));
  } catch (error: any) {
    console.error(chalk.red("Failed to install dependencies:"), error.message);
    process.exit(1);
  }
}
