"use client"

import { TrendingUp } from "lucide-react"
import { CartesianGrid, Line, LineChart, XAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
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

export const description = "A step line chart showing certification milestones"

const chartData = [
  { month: "January", certifications: 156 },
  { month: "February", certifications: 156 },
  { month: "March", certifications: 168 },
  { month: "April", certifications: 168 },
  { month: "May", certifications: 182 },
  { month: "June", certifications: 182 },
]

const chartConfig = {
  certifications: {
    label: "Certified Entities",
    color: "#8b5cf6",
  },
} satisfies ChartConfig

export function ChartLineStep() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Certification Milestones</CardTitle>
        <CardDescription>January - June 2024</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[200px] w-full">
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Line
              dataKey="certifications"
              type="step"
              stroke="var(--color-certifications)"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 leading-none font-medium text-emerald-600">
          Certifications up by 12 new entities <TrendingUp className="h-4 w-4" />
        </div>
        <div className="text-muted-foreground leading-none">
          Total certified farmers, labs, and manufacturers
        </div>
      </CardFooter>
    </Card>
  )
}
