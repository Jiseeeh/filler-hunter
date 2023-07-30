import axios from "axios";
import { load } from "cheerio";

import { URL, AXIOS_OPTIONS } from "../constants/constants.js";

/**
 * The function `getFillers` retrieves a list of filler episodes from a given path using Axios and
 * parses the HTML response to extract the episode number and title.
 * @param path - The `path` parameter is a string that represents the path to the filler page. It is
 * used to construct the URL for the axios GET request.
 * @returns an array of objects containing the title and episode number of filler episodes.
 */
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
