"use client";

import { useState } from "react";
import { fetchSetlist } from "@/actions/setlist.actions";
import { Setlist } from "@/lib/types/setlist";

export default function Home() {
  const [setlistId, setSetlistId] = useState("");
  const [result, setResult] = useState<Setlist | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.SubmitEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const data = await fetchSetlist(setlistId);
      setResult(data);
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
              htmlFor="setlistId"
              className="block text-sm font-medium mb-2"
            >
              Setlist ID
            </label>
            <input
              id="setlistId"
              type="text"
              value={setlistId}
              onChange={(e) => setSetlistId(e.target.value)}
              placeholder="e.g. 63dc4db5"
              className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-green-500"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full px-6 py-3 bg-green-600 hover:bg-green-700 disabled:bg-gray-600 rounded-lg font-semibold transition"
          >
            {loading ? "Loading..." : "Fetch Setlist"}
          </button>
        </form>

        {error && (
          <div className="mt-6 p-4 bg-red-900/50 border border-red-700 rounded-lg">
            <p className="text-red-200">{error}</p>
          </div>
        )}

        {result && (
          <div className="mt-6 p-4 bg-gray-800 border border-gray-700 rounded-lg">
            <div className="flex gap-2">
            <h2 className="text-xl font-semibold mb-2">{result.artist}</h2>
            <h3 className="text-lg font-semibold mb-2">({result.eventDate})</h3>
            </div>
            {result.songs.map((song) => {
              return <div>{song}</div>;
            })}
          </div>
        )}
      </div>
    </div>
  );
}
