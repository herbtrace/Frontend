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

export const description = "A linear line chart showing quality test results"

const chartData = [
  { month: "January", qualityScore: 87.2 },
  { month: "February", qualityScore: 89.1 },
  { month: "March", qualityScore: 91.5 },
  { month: "April", qualityScore: 93.8 },
  { month: "May", qualityScore: 95.2 },
  { month: "June", qualityScore: 94.7 },
]

const chartConfig = {
  qualityScore: {
    label: "Quality Score (%)",
    color: "#3b82f6",
  },
} satisfies ChartConfig

export function ChartLineLinear() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Quality Test Results</CardTitle>
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
              dataKey="qualityScore"
              type="linear"
              stroke="var(--color-qualityScore)"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 leading-none font-medium text-emerald-600">
          Quality improved by 3.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="text-muted-foreground leading-none">
          Average quality score across all tested herbs
        </div>
      </CardFooter>
    </Card>
  )
}
