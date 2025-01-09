"use client"

import { TrendingUp } from "lucide-react"
import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from "recharts"

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"


const chartConfig = {
  desktop: {
    label: "calorie",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig

interface DataPoint {
    time: string;
    calorie: number;
  }
  
  interface CaloriesProps {
    data: DataPoint[];
  }

export default function Component({ data }: CaloriesProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Calorie&apos;s Burnt </CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={data}
            margin={{
              top: 20,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="time"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="calorie" fill="var(--color-desktop)" radius={8}>
              <LabelList
                position="top"
                offset={12}
                className="fill-foreground"
                fontSize={12}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Calorie count per second <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
           Showing calorie count for the last 6 seconds
        </div>
      </CardFooter>
    </Card>
  )
}
