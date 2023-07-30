import chalk from "chalk";

const log = console.log;

export default function logFillers(fillers, title) {
  if (fillers.length >= 1) {
    log(`\nThe fillers for ${chalk.redBright(title)} are:\n`);

    fillers.forEach((filler) => {
      log(chalk.redBright(`${filler.title} (Episode: ${filler.episode})\n`));
    });
  } else log(`\nThere are no fillers for ${chalk.redBright(title)}`);
}
