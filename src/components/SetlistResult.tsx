import { Setlist } from "@/lib/types/setlist";

type Props = {
  setlist: Setlist;
};

export function SetlistResult({ setlist }: Props) {
  return (
    <div className="mt-6 p-4 bg-gray-800 border border-gray-700 rounded-lg">
      <div className="flex gap-2">
        <h2 className="text-xl font-semibold mb-2">{setlist.artist}</h2>
        <h3 className="text-lg font-semibold mb-2">({setlist.eventDate})</h3>
      </div>
      {setlist.songs.map((song, index) => {
        return <div key={index}>{song}</div>;
      })}
    </div>
  );
}
