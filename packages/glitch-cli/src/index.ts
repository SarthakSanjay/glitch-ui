#!/usr/bin/env node

import { program } from "commander";
import { initCommand } from "./commands/init.js";
import { addCommand } from "./commands/add.js";

program
  .version("1.0.0")
  .description("This Cli is for installing loki-ui component to your project");

initCommand();
addCommand();

program.parse(process.argv);
