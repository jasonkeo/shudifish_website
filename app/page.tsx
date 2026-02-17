'use client'
import { useState, useEffect } from "react";
import MyPieChart from "./pie_chart";
export default function Home() {
  const [data, setData] = useState(null);

  function pie(num:GLfloat) {

    const other = 100 - num
    return [
      { name: 'Group A', value: num, fill: '#225c8e' },
      { name: 'Group A', value: other, fill: '#FFFFFF' },];

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
    moon_phase
    } = data;




  return (
     <main className="w-full">
     
  <div className="text-center max-w-sm mx-auto">
   
      
      
      <h1 className="mt-4 text-2xl font-bold text-center"> ShouldIFish</h1>


        <div className="relative mx-auto">
     <MyPieChart data={pie(fish_percent)} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 text-white font-bold">
      <img src="https://static.vecteezy.com/system/resources/thumbnails/007/126/419/small/fish-seafood-icon-free-vector.jpg" className="w-25"></img>
      </div>
    </div>
     
    <h2 className="mt-1 text-xl font-bold">Fishing Score: {fish_percent}%</h2>
    <div className="mt-2 space-y-1 text-sm">
    <p className="text-red-600">
      0% - 24%: Bad fishing conditions
    </p>

    <p className="text-orange-500">
      25% - 49%: Fair fishing conditions
    </p>

    <p className="text-yellow-500">
      50% - 74%: Good fishing conditions
    </p>

    <p className="text-green-600">
      75% - 100%: Excellent fishing conditions
    </p>
  </div>
  </div>
   {/* Environmental Data */}
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
</main>

  );
}
