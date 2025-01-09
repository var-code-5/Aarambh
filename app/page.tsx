'use client'
import React, { useEffect, useState } from 'react';
import Calories from '@/components/calorie';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { HeartPulse, PawPrint } from 'lucide-react';

function Home() {
  const [sensorData, setSensorData] = useState({ bpm: 0, steps: 0 });
  const chartData = [
    { time: "January", calorie: 186 },
    { time: "February", calorie: 305 },
    { time: "March", calorie: 237 },
    { time: "April", calorie: 73 },
    { time: "May", calorie: 209 },
    { time: "June", calorie: 214 },
  ]

  useEffect(() => {
    const fetchData = async () => {
      try {
        // const response = await fetch('http://localhost:3000/sensor_data');
        // if (!response.ok) {
        //   throw new Error('Network response was not ok');
        // }
        // const data = await response.json();
        const data = {
          bpm:10,
          steps:100
        }
        console.log(data);
        setSensorData(data);
      } catch (error) {
        console.error('Error fetching sensor data:', error);
      }
    };

    const interval = setInterval(fetchData, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <div className='w-auto sm:w-[30vw] flex m-2'>
        <Card className='w-1/2 mr-2 '>
          <CardHeader>
            <CardTitle className='flex items-center gap-2'>
              BPM <HeartPulse className='size-5 text-[hsl(var(--chart-1))]' />
            </CardTitle>
            <CardDescription>Beats per minute</CardDescription>
          </CardHeader>
          <CardContent>
            {sensorData.bpm}
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
            {sensorData.steps}
          </CardContent>
        </Card>
      </div>
      <div className='sm:w-[30vw] m-2'>
        <Calories data={chartData}/>
      </div>
    </div>
  );
}

export default Home;
