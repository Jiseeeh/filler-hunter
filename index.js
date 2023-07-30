import chalk from "chalk";

import getFillers from "./helper/getFillers.js";
import getUserInput from "./helper/getUserInput.js";
import getAnimeList from "./helper/getAnimeList.js";

const animeList = await getAnimeList();
const log = console.log;

// get user input
let query = getUserInput("Enter anime title to hunt its fillers: ");
let matches = animeList.filter(checkMatch);

while (matches.length === 0) {
  log(chalk.redBright("\nNo anime found, please try again.\n"));

  query = getUserInput("Enter anime title to hunt its fillers: ");
  matches = animeList.filter(checkMatch);
}

if (matches.length === 1) {
  const anime = matches[0];
  const fillers = await getFillers(anime.path);

  logFillers(fillers, anime.title);

  process.exit();
}

log(chalk.cyanBright("\nHere are the matches found: \n"));

matches.forEach((match, index) => log(`${index + 1}: ${match.title}`));

log(); // new line
let input = Number(getUserInput("Input the number of your desired anime: "));

const anime = matches[input - 1];
const fillers = await getFillers(anime.path);

logFillers(fillers, anime.title);

function checkMatch(anime) {
  return anime.title.includes(query);
}

function logFillers(fillers, title) {
  if (fillers.length >= 1) {
    log(`\nThe fillers for ${chalk.redBright(anime.title)} are:\n`);

    fillers.forEach((filler) => {
      log(chalk.redBright(`${filler.title} (Episode: ${filler.episode})\n`));
    });
  } else log(`\nThere are no fillers for ${chalk.redBright(title)}`);
}
