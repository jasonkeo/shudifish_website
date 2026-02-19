'use client'
import { useState, useEffect } from "react";
import MyPieChart from "./pie_chart";

export default function Home() {
  const [data, setData] = useState<any>(null);
  const [view, setView] = useState(1); // 1 = Environmental, 2 = Summary

  function pie(num: number) {
    const other = 100 - num;
    let colour = '#FFFFFF';
    if (num < 25) colour = '#FF0000';
    else if (num < 50) colour = '#c8932f';
    else if (num < 75) colour = '#008000';
    else colour = '#e330ff';

    return [
      { name: 'Fish', value: num, fill: colour },
      { name: 'Other', value: other, fill: '#FFFFFF' },
    ];
  }

  useEffect(() => {
    async function fetchData(url: string) {
      try {
        const res = await fetch(url);
        const json = await res.json();
        setData(json);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    }

    fetchData("https://get-fishing-data-kci6f5oclq-uc.a.run.app/");
  }, []);

  if (!data) return <div className="text-center mt-8">Loading...</div>;

  const {
    fish_percent,
    temperature,
    wind_direction,
    wind_speed,
    cloud_cover,
    kind,
    pressure,
    sunrise,
    sunset,
    moon_phase,
    chatgpt_summary,
  } = data;

  // Determine colour for score text
  let scoreColour = '#FFFFFF';
  if (fish_percent < 25) scoreColour = '#FF0000';
  else if (fish_percent < 50) scoreColour = '#c8932f';
  else if (fish_percent < 75) scoreColour = '#008000';
  else scoreColour = '#e330ff';

  return (
    <main className="w-full">
      <div className="text-center max-w-sm mx-auto">
        <h1 className="mt-4 text-2xl font-bold">ShouldIFish</h1>

        <div className="relative mx-auto my-4">
          <MyPieChart data={pie(fish_percent)} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 text-white font-bold">
            <img
              src="https://static.vecteezy.com/system/resources/thumbnails/007/126/419/small/fish-seafood-icon-free-vector.jpg"
              className="w-16"
              alt="Fish"
            />
          </div>
        </div>

        <h2 className={`mt-1 text-xl font-bold`} style={{ color: scoreColour }}>
          Fishing Score: {fish_percent}%
        </h2>

        <div className="mt-2 space-y-1 text-sm">
          <p className="text-[#FF0000]">0% - 24%: Bad fishing conditions</p>
          <p className="text-[#c8932f]">25% - 49%: Fair fishing conditions</p>
          <p className="text-[#008000]">50% - 74%: Good fishing conditions</p>
          <p className="text-[#e330ff]">75% - 100%: Excellent fishing conditions</p>
        </div>

        {/* Toggle buttons */}
        <div className="flex justify-center gap-4 mt-4">
          <button
            className="px-4 py-2 bg-gray-200 rounded border"
            onClick={() => setView(1)}
          >
            Environmental Data
          </button>
          <button
            className="px-4 py-2 bg-gray-200 rounded border"
            onClick={() => setView(2)}
          >
            Summary
          </button>
        </div>

        {/* Conditional rendering */}
        {view === 1 && (
          <div className="mt-6 text-left bg-gray-100 p-4 rounded border border-black max-w-md mx-auto">
            <h3 className="text-lg font-bold mb-2">Environmental Data</h3>
            <ul className="space-y-1">
              <li>Temperature: {temperature}°C</li>
              <li>Wind: {wind_speed} km/h @ {wind_direction}°</li>
              <li>Cloud Cover: {cloud_cover}%</li>
              <li>Condition: {kind}</li>
              <li>Pressure: {pressure} hPa</li>
              <li>Sunrise: {sunrise}</li>
              <li>Sunset: {sunset}</li>
              <li>Moon Phase: {moon_phase}</li>
            </ul>
          </div>
        )}

        {view === 2 && (
          <div className="mt-6 text-left bg-gray-100 p-4 rounded border border-black max-w-md mx-auto">
            <h3 className="text-lg font-bold mb-2">AI Summary</h3>
            <p>{chatgpt_summary}</p>
          </div>
        )}
      </div>
    </main>
  );
}
