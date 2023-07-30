import prompt from "prompt-sync";
import chalk from "chalk";

const input = prompt({ sigint: true });

export default function getUserInput(message) {
  return input(chalk.greenBright(`>> ${message}`)).toLowerCase();
}
