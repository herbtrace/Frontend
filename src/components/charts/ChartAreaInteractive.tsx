"use client"

import * as React from "react"
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"

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
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const chartData = [
  { date: "2024-04-01", farmers: 222, labs: 150, manufacturers: 98 },
  { date: "2024-04-02", farmers: 97, labs: 180, manufacturers: 120 },
  { date: "2024-04-03", farmers: 167, labs: 120, manufacturers: 140 },
  { date: "2024-04-04", farmers: 242, labs: 260, manufacturers: 180 },
  { date: "2024-04-05", farmers: 373, labs: 290, manufacturers: 220 },
  { date: "2024-04-06", farmers: 301, labs: 340, manufacturers: 260 },
  { date: "2024-04-07", farmers: 245, labs: 180, manufacturers: 150 },
  { date: "2024-04-08", farmers: 409, labs: 320, manufacturers: 280 },
  { date: "2024-04-09", farmers: 59, labs: 110, manufacturers: 90 },
  { date: "2024-04-10", farmers: 261, labs: 190, manufacturers: 160 },
  { date: "2024-04-11", farmers: 327, labs: 350, manufacturers: 290 },
  { date: "2024-04-12", farmers: 292, labs: 210, manufacturers: 180 },
  { date: "2024-04-13", farmers: 342, labs: 380, manufacturers: 320 },
  { date: "2024-04-14", farmers: 137, labs: 220, manufacturers: 190 },
  { date: "2024-04-15", farmers: 120, labs: 170, manufacturers: 140 },
  { date: "2024-04-16", farmers: 138, labs: 190, manufacturers: 160 },
  { date: "2024-04-17", farmers: 446, labs: 360, manufacturers: 300 },
  { date: "2024-04-18", farmers: 364, labs: 410, manufacturers: 350 },
  { date: "2024-04-19", farmers: 243, labs: 180, manufacturers: 150 },
  { date: "2024-04-20", farmers: 89, labs: 150, manufacturers: 120 },
  { date: "2024-04-21", farmers: 137, labs: 200, manufacturers: 170 },
  { date: "2024-04-22", farmers: 224, labs: 170, manufacturers: 140 },
  { date: "2024-04-23", farmers: 138, labs: 230, manufacturers: 200 },
  { date: "2024-04-24", farmers: 387, labs: 290, manufacturers: 250 },
  { date: "2024-04-25", farmers: 215, labs: 250, manufacturers: 220 },
  { date: "2024-04-26", farmers: 75, labs: 130, manufacturers: 110 },
  { date: "2024-04-27", farmers: 383, labs: 420, manufacturers: 360 },
  { date: "2024-04-28", farmers: 122, labs: 180, manufacturers: 150 },
  { date: "2024-04-29", farmers: 315, labs: 240, manufacturers: 200 },
  { date: "2024-04-30", farmers: 454, labs: 380, manufacturers: 320 },
  { date: "2024-05-01", farmers: 165, labs: 220, manufacturers: 190 },
  { date: "2024-05-02", farmers: 293, labs: 310, manufacturers: 260 },
  { date: "2024-05-03", farmers: 247, labs: 190, manufacturers: 160 },
  { date: "2024-05-04", farmers: 385, labs: 420, manufacturers: 350 },
  { date: "2024-05-05", farmers: 481, labs: 390, manufacturers: 330 },
  { date: "2024-05-06", farmers: 498, labs: 520, manufacturers: 440 },
  { date: "2024-05-07", farmers: 388, labs: 300, manufacturers: 250 },
  { date: "2024-05-08", farmers: 149, labs: 210, manufacturers: 180 },
  { date: "2024-05-09", farmers: 227, labs: 180, manufacturers: 150 },
  { date: "2024-05-10", farmers: 293, labs: 330, manufacturers: 280 },
  { date: "2024-05-11", farmers: 335, labs: 270, manufacturers: 230 },
  { date: "2024-05-12", farmers: 197, labs: 240, manufacturers: 200 },
  { date: "2024-05-13", farmers: 197, labs: 160, manufacturers: 130 },
  { date: "2024-05-14", farmers: 448, labs: 490, manufacturers: 420 },
  { date: "2024-05-15", farmers: 473, labs: 380, manufacturers: 320 },
  { date: "2024-05-16", farmers: 338, labs: 400, manufacturers: 340 },
  { date: "2024-05-17", farmers: 499, labs: 420, manufacturers: 360 },
  { date: "2024-05-18", farmers: 315, labs: 350, manufacturers: 290 },
  { date: "2024-05-19", farmers: 235, labs: 180, manufacturers: 150 },
  { date: "2024-05-20", farmers: 177, labs: 230, manufacturers: 190 },
  { date: "2024-05-21", farmers: 82, labs: 140, manufacturers: 120 },
  { date: "2024-05-22", farmers: 81, labs: 120, manufacturers: 100 },
  { date: "2024-05-23", farmers: 252, labs: 290, manufacturers: 240 },
  { date: "2024-05-24", farmers: 294, labs: 220, manufacturers: 180 },
  { date: "2024-05-25", farmers: 201, labs: 250, manufacturers: 210 },
  { date: "2024-05-26", farmers: 213, labs: 170, manufacturers: 140 },
  { date: "2024-05-27", farmers: 420, labs: 460, manufacturers: 380 },
  { date: "2024-05-28", farmers: 233, labs: 190, manufacturers: 160 },
  { date: "2024-05-29", farmers: 78, labs: 130, manufacturers: 110 },
  { date: "2024-05-30", farmers: 340, labs: 280, manufacturers: 240 },
  { date: "2024-05-31", farmers: 178, labs: 230, manufacturers: 190 },
  { date: "2024-06-01", farmers: 178, labs: 200, manufacturers: 170 },
  { date: "2024-06-02", farmers: 470, labs: 410, manufacturers: 350 },
  { date: "2024-06-03", farmers: 103, labs: 160, manufacturers: 130 },
  { date: "2024-06-04", farmers: 439, labs: 380, manufacturers: 320 },
  { date: "2024-06-05", farmers: 88, labs: 140, manufacturers: 120 },
  { date: "2024-06-06", farmers: 294, labs: 250, manufacturers: 210 },
  { date: "2024-06-07", farmers: 323, labs: 370, manufacturers: 310 },
  { date: "2024-06-08", farmers: 385, labs: 320, manufacturers: 270 },
  { date: "2024-06-09", farmers: 438, labs: 480, manufacturers: 400 },
  { date: "2024-06-10", farmers: 155, labs: 200, manufacturers: 170 },
  { date: "2024-06-11", farmers: 92, labs: 150, manufacturers: 120 },
  { date: "2024-06-12", farmers: 492, labs: 420, manufacturers: 350 },
  { date: "2024-06-13", farmers: 81, labs: 130, manufacturers: 110 },
  { date: "2024-06-14", farmers: 426, labs: 380, manufacturers: 320 },
  { date: "2024-06-15", farmers: 307, labs: 350, manufacturers: 290 },
  { date: "2024-06-16", farmers: 371, labs: 310, manufacturers: 260 },
  { date: "2024-06-17", farmers: 475, labs: 520, manufacturers: 440 },
  { date: "2024-06-18", farmers: 107, labs: 170, manufacturers: 140 },
  { date: "2024-06-19", farmers: 341, labs: 290, manufacturers: 240 },
  { date: "2024-06-20", farmers: 408, labs: 450, manufacturers: 380 },
  { date: "2024-06-21", farmers: 169, labs: 210, manufacturers: 180 },
  { date: "2024-06-22", farmers: 317, labs: 270, manufacturers: 230 },
  { date: "2024-06-23", farmers: 480, labs: 530, manufacturers: 450 },
  { date: "2024-06-24", farmers: 132, labs: 180, manufacturers: 150 },
  { date: "2024-06-25", farmers: 141, labs: 190, manufacturers: 160 },
  { date: "2024-06-26", farmers: 434, labs: 380, manufacturers: 320 },
  { date: "2024-06-27", farmers: 448, labs: 490, manufacturers: 410 },
  { date: "2024-06-28", farmers: 149, labs: 200, manufacturers: 170 },
  { date: "2024-06-29", farmers: 103, labs: 160, manufacturers: 130 },
  { date: "2024-06-30", farmers: 446, labs: 400, manufacturers: 340 },
]

const chartConfig = {
  visitors: {
    label: "Supply Chain Activities",
  },
  farmers: {
    label: "Farmers",
    color: "#10b981", // emerald-500
  },
  labs: {
    label: "Labs",
    color: "#059669", // emerald-600
  },
  manufacturers: {
    label: "Manufacturers",
    color: "#047857", // emerald-700
  },
} satisfies ChartConfig

export function ChartAreaInteractive() {
  const [timeRange, setTimeRange] = React.useState("90d")

  const filteredData = chartData.filter((item) => {
    const date = new Date(item.date)
    const referenceDate = new Date("2024-06-30")
    let daysToSubtract = 90
    if (timeRange === "30d") {
      daysToSubtract = 30
    } else if (timeRange === "7d") {
      daysToSubtract = 7
    }
    const startDate = new Date(referenceDate)
    startDate.setDate(startDate.getDate() - daysToSubtract)
    return date >= startDate
  })

  return (
    <Card className="border-slate-200 bg-white shadow-sm hover:shadow-md transition-all duration-200">
      <CardHeader className="flex items-center gap-2 space-y-0 border-b border-slate-100 py-5 sm:flex-row">
        <div className="grid flex-1 gap-1">
          <CardTitle className="text-lg font-semibold text-slate-900">Supply Chain Analytics</CardTitle>
          <CardDescription className="text-sm text-slate-600">
            Showing activity trends for the herbal supply chain participants
          </CardDescription>
        </div>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger
            className="w-[160px] rounded-lg border-slate-300 text-slate-700 hover:bg-slate-50"
            aria-label="Select a value"
          >
            <SelectValue placeholder="Last 3 months" />
          </SelectTrigger>
          <SelectContent className="rounded-xl border-slate-200">
            <SelectItem value="90d" className="rounded-lg hover:bg-slate-50">
              Last 3 months
            </SelectItem>
            <SelectItem value="30d" className="rounded-lg hover:bg-slate-50">
              Last 30 days
            </SelectItem>
            <SelectItem value="7d" className="rounded-lg hover:bg-slate-50">
              Last 7 days
            </SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[280px] w-full"
        >
          <AreaChart data={filteredData}>
            <defs>
              <linearGradient id="fillFarmers" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-farmers)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-farmers)"
                  stopOpacity={0.1}
                />
              </linearGradient>
              <linearGradient id="fillLabs" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-labs)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-labs)"
                  stopOpacity={0.1}
                />
              </linearGradient>
              <linearGradient id="fillManufacturers" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-manufacturers)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-manufacturers)"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} stroke="hsl(var(--border))" strokeOpacity={0.5} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }}
              tickFormatter={(value) => {
                const date = new Date(value)
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })
              }}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })
                  }}
                  indicator="dot"
                />
              }
            />
            <Area
              dataKey="manufacturers"
              type="natural"
              fill="url(#fillManufacturers)"
              stroke="var(--color-manufacturers)"
              stackId="a"
              strokeWidth={2}
            />
            <Area
              dataKey="labs"
              type="natural"
              fill="url(#fillLabs)"
              stroke="var(--color-labs)"
              stackId="a"
              strokeWidth={2}
            />
            <Area
              dataKey="farmers"
              type="natural"
              fill="url(#fillFarmers)"
              stroke="var(--color-farmers)"
              stackId="a"
              strokeWidth={2}
            />
            <ChartLegend content={<ChartLegendContent />} />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}