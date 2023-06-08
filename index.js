import axios from "axios";
import { load } from "cheerio";
import prompt from "prompt-sync";

const input = prompt({ sigint: true });

// get target site
const URL = "https://www.animefillerlist.com";
const options = {
  headers: {
    "User-Agent":
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36",
  },
};

const showsPage = await axios.get(`${URL}/shows`, options);

const $ = load(showsPage.data);

const animeList = [];

$("#ShowList")
  .find(".Group")
  .each((_, el) => {
    $(el)
      .find("ul li")
      .each((_, el) => {
        const title = $(el).find("a").text().toLowerCase();
        const path = $(el).find("a").attr("href");

        animeList.push({ title, path });
      });
  });

// get user input
let query = input("Enter anime title to get its fillers: ");

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
const fillerPage = await axios.get(`${URL}${anime.path}`);
const fillers = [];

const $$ = load(fillerPage.data);

$$(".EpisodeList")
  .find("tbody tr")
  .each((_, el) => {
    const episodeType = $$(el).find(".Type span").text().toLowerCase();
    if (episodeType !== "filler") return;

    const episode = $$(el).find(".Number").text();
    const title = $$(el).find(".Title a").text();

    fillers.push({ title, episode });
  });

console.log(`The fillers for ${query} are the ff:`);
console.log(fillers);
