import chalk from "chalk";
import { input } from "@inquirer/prompts";

import getFillers from "./helper/getFillers.js";
import getUserInput from "./helper/getUserInput.js";
import getAnimeList from "./helper/getAnimeList.js";
import checkMatch from "./helper/checkMatch.js";
import logFillers from "./helper/logFillers.js";

const log = console.log;

// get user input
let query = await input({ message: "Enter anime title to hunt its fillers: " });

// get anime list
const animeList = await getAnimeList();

let matches = animeList.filter((anime) => checkMatch(anime.title, query));

while (matches.length === 0) {
  log(chalk.redBright("\nNo anime found, please try again.\n"));

  query = await input({ message: "Enter anime title to hunt its fillers: " });
  matches = animeList.filter((anime) => checkMatch(anime.title, query));
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
let animeNumberInput = Number(
  await input({ message: "Input the NUMBER of your desired anime: " })
);

while (isNaN(animeNumberInput)) {
  animeNumberInput = Number(
    await input({ message: "Input the NUMBER of your desired anime: " })
  );
}

const anime = matches[animeNumberInput - 1];
const fillers = await getFillers(anime.path);

logFillers(fillers, anime.title);
