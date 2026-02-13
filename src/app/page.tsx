"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { fetchSetlist } from "@/actions/setlist.actions";
import { signInWithSpotify } from "@/actions/spotify.actions";
import { Setlist } from "@/lib/types/setlist";
import { ErrorMessage } from "@/components/ErrorMessage";
import { SetlistResult } from "@/components/SetlistResult";

export default function Home() {
  const { data: session } = useSession();
  const [setlistUrl, setSetlistUrl] = useState("");
  const [result, setResult] = useState<Setlist | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [inputDirty, setInputDirty] = useState(false);

  async function handleSubmit(e: React.SubmitEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const data = await fetchSetlist(setlistUrl);
      setResult(data);
      setInputDirty(false);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Setlist.fm to Spotify</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="setlistUrl"
              className="block text-sm font-medium mb-2"
            >
              Setlist ID
            </label>
            <input
              id="setlistUrl"
              type="text"
              value={setlistUrl}
              onChange={(e) => {
                setSetlistUrl(e.target.value);
                setInputDirty(true);
              }}
              placeholder="e.g. 63dc4db5"
              className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-green-500"
              required
            />
          </div>
          <button
            type="submit"
            disabled={loading || (!!result && !inputDirty)}
            className="w-full px-6 py-3 bg-green-600 hover:bg-green-700 disabled:bg-gray-600 rounded-lg font-semibold transition"
          >
            {loading ? "Loading..." : "Fetch Setlist"}
          </button>
        </form>
        {error && <ErrorMessage message={error} />}
        {result && <SetlistResult setlist={result} />}
        <button
          disabled={!result}
          onClick={() => {
            if (!session) {
              signInWithSpotify();
            }
          }}
          className="w-full mt-6 px-6 py-3 bg-green-600 hover:bg-green-700 disabled:bg-gray-600 disabled:cursor-not-allowed rounded-lg font-semibold transition"
        >
          Create Playlist
        </button>
      </div>
    </div>
  );
}
