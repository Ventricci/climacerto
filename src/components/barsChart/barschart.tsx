'use client';
import { ChartContainer } from "./style";
import { BarChart } from "@mui/x-charts/BarChart";

interface IProps {
    xaxis?: string[];
    yaxis?: number[];
    label?: string;
};

export default function BarsChart({ xaxis, yaxis, label }: IProps) {
    return (
        <ChartContainer>
            <BarChart xAxis={[{ data: xaxis, }]} series={[{ data: yaxis, label: label, color: "#ff6b35" }]} />
        </ChartContainer>
    );
}