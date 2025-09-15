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

export const description = "A multiple line chart showing regional production comparison"

const chartData = [
  { month: "January", northIndia: 2847, southIndia: 1856 },
  { month: "February", northIndia: 3156, southIndia: 2145 },
  { month: "March", northIndia: 3892, southIndia: 2678 },
  { month: "April", northIndia: 4521, southIndia: 3124 },
  { month: "May", northIndia: 5234, southIndia: 3789 },
  { month: "June", northIndia: 4876, southIndia: 3456 },
]

const chartConfig = {
  northIndia: {
    label: "North India",
    color: "#10b981",
  },
  southIndia: {
    label: "South India",
    color: "#f59e0b",
  },
} satisfies ChartConfig

export function ChartLineMultiple() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Regional Production Comparison</CardTitle>
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
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <Line
              dataKey="northIndia"
              type="monotone"
              stroke="var(--color-northIndia)"
              strokeWidth={2}
              dot={false}
            />
            <Line
              dataKey="southIndia"
              type="monotone"
              stroke="var(--color-southIndia)"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 leading-none font-medium text-emerald-600">
              Regional production up by 15.3% this month <TrendingUp className="h-4 w-4" />
            </div>
            <div className="text-muted-foreground flex items-center gap-2 leading-none">
              Comparing herb production across major regions
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  )
}
