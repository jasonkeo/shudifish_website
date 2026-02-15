'use client'
import { useState, useEffect } from "react";
import MyPieChart from "./pie_chart";
export default function Home() {
  const [data, setData] = useState(null);
  const [envData, setEnvData] = useState<EnvData | null>(null);

  function pie(num:GLfloat) {

    const other = 100 - num
    return [
      { name: 'Group A', value: num, fill: '#225c8e' },
      { name: 'Group A', value: other, fill: '#FFFFFF' },];

  }

  type EnvData = {
  temperate: number;
  wind_direction: number;
  wind_speed: number;
  cloud_cover: number;
  kind: string;
  pressure: number;
  sunrise: string;
  sunset: string;
  moon_phase: string;
};

  useEffect(() => {
    async function fetchData(url: string, type: number) {
      try {
        const res = await fetch(url);
        const json = await res.json();

        if (type === 0) {
          setData(json);
        } else {
          setEnvData(json);
        }
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    }

    fetchData("https://good-fishing-kci6f5oclq-uc.a.run.app/", 0);
    fetchData("https://get-fishing-data-kci6f5oclq-uc.a.run.app/", 1);
  }, []);
  if (!data || !envData) return <div className="text-center mt-8">Loading...</div>;

  const { fish_percent } = data;


  return (
     <main className="w-full">
     
  <div className="text-center p-4 max-w-sm mx-auto">
     <h1 className="mt-4 text-xl font-bold"> ShouldIFish</h1>
    <MyPieChart  data={pie(fish_percent)} />
    <h2 className="mt-4 text-xl font-bold">Fishing Score: {fish_percent}%</h2>
  </div>
   {/* Environmental Data */}
       <div className="mt-6 text-left bg-gray-100 p-4 rounded border border-black max-w-md mx-auto">
          <h3 className="text-lg font-bold mb-2">Environmental Data</h3>
          <ul className="space-y-1">
            <li>Temperature: {envData.temperate}°C</li>
            <li>Wind: {envData.wind_speed} km/h @ {envData.wind_direction}°</li>
            <li>Cloud Cover: {envData.cloud_cover}%</li>
            <li>Condition: {envData.kind}</li>
            <li>Pressure: {envData.pressure} hPa</li>
            <li>Sunrise: {envData.sunrise}</li>
            <li>Sunset: {envData.sunset}</li>
            <li>Moon Phase: {envData.moon_phase}</li>
          </ul>
    </div>
</main>

  );
}
