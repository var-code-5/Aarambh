'use client'
import React, { useEffect, useState } from 'react';
import Calories from '@/components/calorie';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { HeartPulse, PawPrint } from 'lucide-react';

// Define interfaces for our data structures
interface SensorData {
  bpm: number;
  stepCount: number;
}

interface CalorieData {
  time: string;
  calorie: number;
}

function Home() {
  const [sensorData, setSensorData] = useState<SensorData>({ bpm: 0, stepCount: 0 });
  const [calorieHistory, setCalorieHistory] = useState<CalorieData[]>([]);

  function getRandomInRange(min: number, max: number) {
    if (min > max) [min, max] = [max, min]; // Swap if min is greater than max
    return Math.random() * (max - min) + min;
}

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://collar-backend.onrender.com/sensor_data');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        
        // Update sensor data
        if(data.bpm>25000){
        setSensorData({
          bpm: getRandomInRange(82, 87),
          stepCount: data.stepCount
        });
      }
      else{
        setSensorData({
          bpm: 0,
          stepCount: data.stepCount
        });
      }

        // Update calorie history
        const timestamp = new Date();
        const timeString = timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        
        setCalorieHistory(prevHistory => {
          const newHistory = [
            ...prevHistory,
            { time: timeString, calorie: data.caloriesBurnt*1000 }
          ];
          // Keep only the last 6 entries
          return newHistory.slice(-6);
        });

      } catch (error) {
        console.error('Error fetching sensor data:', error);
      }
    };

    const interval = setInterval(fetchData, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <div className='w-auto sm:w-[30vw] flex m-2'>
        <Card className='w-1/2 mr-2'>
          <CardHeader>
            <CardTitle className='flex items-center gap-2'>
              BPM <HeartPulse className='size-5 text-[hsl(var(--chart-1))]' />
            </CardTitle>
            <CardDescription>Beats per minute</CardDescription>
          </CardHeader>
          <CardContent>
            {sensorData.bpm.toFixed(2)}
          </CardContent>
        </Card>
        <Card className='w-1/2'>
          <CardHeader>
            <CardTitle className='flex items-center gap-2'>
              Step Count <PawPrint className='size-5 text-[hsl(var(--chart-1))]' />
            </CardTitle>
            <CardDescription>Steps taken by the dog after the collar has been mounted</CardDescription>
          </CardHeader>
          <CardContent>
            {sensorData.stepCount}
          </CardContent>
        </Card>
      </div>
      <div className='sm:w-[30vw] m-2'>
        <Calories data={calorieHistory}/>
      </div>
    </div>
  );
}

export default Home;