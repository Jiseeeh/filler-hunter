import getFillers from "./helper/getFillers.js";
import getUserInput from "./helper/getUserInput.js";
import getAnimeList from "./helper/getAnimeList.js";

const animeList = getAnimeList();

// get user input
let query = getUserInput();

const anime = animeList.find((anime) => {
  if (anime.title.includes(query)) {
    // set to query correct/complete title
    query = anime.title;
    return true;
  }
});

if (!anime) {
  console.log("No anime found!");
  process.exit();
}

// get fillers
console.log(`The fillers for ${query} are the ff:`);
console.log(await getFillers(anime.path));
