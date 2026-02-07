"use server";

import { getSetlistIdFromUrl } from "@/lib/utils/getSetlistIdFromUrl";
import { toSetlist } from "@/lib/utils/toSetlist";

export const fetchSetlist = async (url: string) => {
  const apiKey = process.env.SETLISTFM_API_KEY;

  if (!apiKey) {
    throw new Error("SETLISTFM_API_KEY not configured");
  }

  const setlistId = getSetlistIdFromUrl(url);

  if (!setlistId) {
    throw new Error("Invalid setlistId");
  }

  const response = await fetch(
    `https://api.setlist.fm/rest/1.0/setlist/${setlistId}`,
    {
      headers: {
        "x-api-key": apiKey,
        Accept: "application/json",
      },
    }
  );

  if (!response.ok) {
    throw new Error(`Setlist.fm API error: ${response.status}`);
  }

  const data = await response.json();

  return toSetlist(data);
};



