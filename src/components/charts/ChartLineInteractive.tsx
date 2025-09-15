"use client"

import * as React from "react"
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

export const description = "An interactive line chart showing supply chain performance"

const chartData = [
  { date: "2024-04-01", farmers: 1247, labs: 23 },
  { date: "2024-04-02", farmers: 1253, labs: 23 },
  { date: "2024-04-03", farmers: 1261, labs: 24 },
  { date: "2024-04-04", farmers: 1272, labs: 24 },
  { date: "2024-04-05", farmers: 1285, labs: 25 },
  { date: "2024-04-06", farmers: 1298, labs: 25 },
  { date: "2024-04-07", farmers: 1305, labs: 25 },
  { date: "2024-04-08", farmers: 1318, labs: 26 },
  { date: "2024-04-09", farmers: 1325, labs: 26 },
  { date: "2024-04-10", farmers: 1334, labs: 27 },
  { date: "2024-04-11", farmers: 1347, labs: 27 },
  { date: "2024-04-12", farmers: 1356, labs: 28 },
  { date: "2024-04-13", farmers: 1369, labs: 28 },
  { date: "2024-04-14", farmers: 1375, labs: 28 },
  { date: "2024-04-15", farmers: 1384, labs: 29 },
  { date: "2024-04-16", farmers: 1397, labs: 29 },
  { date: "2024-04-17", farmers: 1412, labs: 30 },
  { date: "2024-04-18", farmers: 1425, labs: 30 },
  { date: "2024-04-19", farmers: 1438, labs: 31 },
  { date: "2024-04-20", farmers: 1445, labs: 31 },
  { date: "2024-04-21", farmers: 1458, labs: 31 },
  { date: "2024-04-22", farmers: 1472, labs: 32 },
  { date: "2024-04-23", farmers: 1485, labs: 32 },
  { date: "2024-04-24", farmers: 1498, labs: 33 },
  { date: "2024-04-25", farmers: 1512, labs: 33 },
  { date: "2024-04-26", farmers: 1525, labs: 33 },
  { date: "2024-04-27", farmers: 1542, labs: 34 },
  { date: "2024-04-28", farmers: 1558, labs: 34 },
  { date: "2024-04-29", farmers: 1572, labs: 35 },
  { date: "2024-04-30", farmers: 1589, labs: 35 },
  { date: "2024-05-01", farmers: 1605, labs: 35 },
  { date: "2024-05-02", farmers: 1622, labs: 36 },
  { date: "2024-05-03", farmers: 1638, labs: 36 },
  { date: "2024-05-04", farmers: 1655, labs: 37 },
  { date: "2024-05-05", farmers: 1672, labs: 37 },
  { date: "2024-05-06", farmers: 1689, labs: 38 },
  { date: "2024-05-07", farmers: 1705, labs: 38 },
  { date: "2024-05-08", farmers: 1722, labs: 38 },
  { date: "2024-05-09", farmers: 1738, labs: 39 },
  { date: "2024-05-10", farmers: 1755, labs: 39 },
  { date: "2024-05-11", farmers: 1772, labs: 40 },
  { date: "2024-05-12", farmers: 1789, labs: 40 },
  { date: "2024-05-13", farmers: 1805, labs: 40 },
  { date: "2024-05-14", farmers: 1822, labs: 41 },
  { date: "2024-05-15", farmers: 1838, labs: 41 },
  { date: "2024-05-16", farmers: 1855, labs: 42 },
  { date: "2024-05-17", farmers: 1872, labs: 42 },
  { date: "2024-05-18", farmers: 1889, labs: 42 },
  { date: "2024-05-19", farmers: 1905, labs: 43 },
  { date: "2024-05-20", farmers: 1922, labs: 43 },
  { date: "2024-05-21", farmers: 1938, labs: 44 },
  { date: "2024-05-22", farmers: 1955, labs: 44 },
  { date: "2024-05-23", farmers: 1972, labs: 44 },
  { date: "2024-05-24", farmers: 1989, labs: 45 },
  { date: "2024-05-25", farmers: 2005, labs: 45 },
  { date: "2024-05-26", farmers: 2022, labs: 46 },
  { date: "2024-05-27", farmers: 2038, labs: 46 },
  { date: "2024-05-28", farmers: 2055, labs: 46 },
  { date: "2024-05-29", farmers: 2072, labs: 47 },
  { date: "2024-05-30", farmers: 2089, labs: 47 },
  { date: "2024-05-31", farmers: 2105, labs: 48 },
  { date: "2024-06-01", farmers: 2122, labs: 48 },
  { date: "2024-06-02", farmers: 2138, labs: 48 },
  { date: "2024-06-03", farmers: 2155, labs: 49 },
  { date: "2024-06-04", farmers: 2172, labs: 49 },
  { date: "2024-06-05", farmers: 2189, labs: 50 },
  { date: "2024-06-06", farmers: 2205, labs: 50 },
  { date: "2024-06-07", farmers: 2222, labs: 50 },
  { date: "2024-06-08", farmers: 2238, labs: 51 },
  { date: "2024-06-09", farmers: 2255, labs: 51 },
  { date: "2024-06-10", farmers: 2272, labs: 52 },
  { date: "2024-06-11", farmers: 2289, labs: 52 },
  { date: "2024-06-12", farmers: 2305, labs: 52 },
  { date: "2024-06-13", farmers: 2322, labs: 53 },
  { date: "2024-06-14", farmers: 2338, labs: 53 },
  { date: "2024-06-15", farmers: 2355, labs: 54 },
  { date: "2024-06-16", farmers: 2372, labs: 54 },
  { date: "2024-06-17", farmers: 2389, labs: 54 },
  { date: "2024-06-18", farmers: 2405, labs: 55 },
  { date: "2024-06-19", farmers: 2422, labs: 55 },
  { date: "2024-06-20", farmers: 2438, labs: 56 },
  { date: "2024-06-21", farmers: 2455, labs: 56 },
  { date: "2024-06-22", farmers: 2472, labs: 56 },
  { date: "2024-06-23", farmers: 2489, labs: 57 },
  { date: "2024-06-24", farmers: 2505, labs: 57 },
  { date: "2024-06-25", farmers: 2522, labs: 58 },
  { date: "2024-06-26", farmers: 2538, labs: 58 },
  { date: "2024-06-27", farmers: 2555, labs: 58 },
  { date: "2024-06-28", farmers: 2572, labs: 59 },
  { date: "2024-06-29", farmers: 2589, labs: 59 },
  { date: "2024-06-30", farmers: 2605, labs: 60 },
]

const chartConfig = {
  views: {
    label: "Network Activity",
  },
  farmers: {
    label: "Farmers",
    color: "#10b981",
  },
  labs: {
    label: "Quality Labs",
    color: "#3b82f6",
  },
} satisfies ChartConfig

export function ChartLineInteractive() {
  const [activeChart, setActiveChart] =
    React.useState<keyof typeof chartConfig>("farmers")

  const total = React.useMemo(
    () => ({
      farmers: chartData.reduce((acc, curr) => acc + curr.farmers, 0),
      labs: chartData.reduce((acc, curr) => acc + curr.labs, 0),
    }),
    []
  )

  return (
    <Card className="py-4 sm:py-0">
      <CardHeader className="flex flex-col items-stretch border-b !p-0 sm:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 pb-3 sm:pb-0">
          <CardTitle>Supply Chain Network Activity</CardTitle>
          <CardDescription>
            Showing network participation for the last 3 months
          </CardDescription>
        </div>
        <div className="flex">
          {["farmers", "labs"].map((key) => {
            const chart = key as keyof typeof chartConfig
            return (
              <button
                key={chart}
                data-active={activeChart === chart}
                className="data-[active=true]:bg-emerald-50 data-[active=true]:text-emerald-700 flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l sm:border-t-0 sm:border-l sm:px-8 sm:py-6 transition-colors hover:bg-gray-50"
                onClick={() => setActiveChart(chart)}
              >
                <span className="text-muted-foreground text-xs">
                  {chartConfig[chart].label}
                </span>
                <span className="text-lg leading-none font-bold sm:text-3xl">
                  {total[key as keyof typeof total].toLocaleString()}
                </span>
              </button>
            )
          })}
        </div>
      </CardHeader>
      <CardContent className="px-2 sm:p-6">
        <ChartContainer
          config={chartConfig}
          className="h-[250px] w-full"
        >
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
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value)
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })
              }}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  className="w-[150px]"
                  nameKey="views"
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })
                  }}
                />
              }
            />
            <Line
              dataKey={activeChart}
              type="monotone"
              stroke={`var(--color-${activeChart})`}
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
