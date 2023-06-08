import axios from "axios";
import { load } from "cheerio";

import { URL, AXIOS_OPTIONS } from "../constants/constants.js";

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

  return animeL;
}
