import React from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import { HeartPulse } from 'lucide-react'
  

export default function BPM() {
  return (
    <Card>
    <CardHeader>
        <CardTitle className='flex items-center gap-2'>
        BPM <HeartPulse className='size-5' />
        </CardTitle>
        <CardDescription>Beats per minute</CardDescription>
    </CardHeader>
    <CardContent>
        10
    </CardContent>
    </Card>
  )
}
