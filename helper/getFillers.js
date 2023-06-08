import axios from "axios";
import { load } from "cheerio";

import { URL, AXIOS_OPTIONS } from "../constants/constants.js";

export default async function getFillers(path) {
  const fillerPage = await axios.get(`${URL}${path}`, AXIOS_OPTIONS);
  const fillers = [];

  const $ = load(fillerPage.data);

  $(".EpisodeList")
    .find("tbody tr")
    .each((_, el) => {
      const episodeType = $(el).find(".Type span").text().toLowerCase();
      if (episodeType !== "filler") return;

      const episode = $(el).find(".Number").text();
      const title = $(el).find(".Title a").text();

      fillers.push({ title, episode });
    });

  return fillers;
}
