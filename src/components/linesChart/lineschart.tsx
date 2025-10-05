'use client';
import { ChartContainer } from "./style";
import { LineChart } from "@mui/x-charts/LineChart";

interface LinesChartProps {
    xaxis: string[];
    series: {
        data: number[];
        label: string;
        color?: string;
    }[];
}

export default function LinesChart({ xaxis, series }: LinesChartProps) {
    return (
        <ChartContainer>
            <LineChart
                xAxis={[{ data: xaxis, scaleType: 'point' }]}
                series={series}
            />
        </ChartContainer>
    );
}