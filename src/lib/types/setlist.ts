// Setlist.fm types

export type SetlistFmSong = {
  name: string;
  tape?: boolean;
  info?: string;
  cover?: SetlistFmArtist;
  with?: SetlistFmArtist;
};

export type SetlistFmArtist = {
  name: string;
  mbid?: string;
  sortName?: string;
  tmid?: number;
  url?: string;
};

export type SetlistFmSet = {
  name?: string;
  encore?: number;
  song: SetlistFmSong[];
};

export type SetlistFmVenue = {
  id: string;
  name: string;
  url?: string;
  city: {
    name: string;
    state?: string;
    stateCode?: string;
    country: {
      code: string;
      name: string;
    };
  };
};

export type SetlistFmResponse = {
  id: string;
  eventDate: string;
  info?: string;
  url: string;
  artist: SetlistFmArtist;
  venue: SetlistFmVenue;
  tour?: { name: string };
  sets: { set: SetlistFmSet[] };
};

// Transformed type

export type Setlist = {
    artist: string;
    eventDate: string;
    songs: string[];
}
