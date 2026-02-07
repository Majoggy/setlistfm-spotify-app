import { Setlist, SetlistFmResponse } from "../types/setlist";

export const toSetlist = (data: SetlistFmResponse): Setlist => {
  const { artist, eventDate, sets } = data;

  return {
    artist: artist.name,
    eventDate,
    songs: sets.set.flatMap((set) =>
      set.song.filter((song) => !song.tape).map((song) => song.name),
    ),
  };
};
