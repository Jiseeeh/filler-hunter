import axios from "axios";
import { load } from "cheerio";

import { URL, AXIOS_OPTIONS } from "../constants/constants.js";

/**
 * The function `getAnimeList` retrieves a list of anime titles and their corresponding paths from a
 * webpage.
 * @returns The function `getAnimeList` returns an array of objects, where each object represents an
 * anime show. Each object has two properties: `title`, which is a string representing the title of the
 * show, and `path`, which is a string representing the URL path of the show.
 */
export default async function getAnimeList() {
  const showsPage = await axios.get(`${URL}/shows`, AXIOS_OPTIONS);
  const animeList = [];

  const $ = load(showsPage.data);

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

  return animeList;
}
