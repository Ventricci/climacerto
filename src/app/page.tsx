'use client';
import { useEffect, useState } from "react";
import { Map, Card, Sidebar, BarsChart, LinesChart } from "@/components";
import styles from "./page.module.css";

const temperatureMock = {
  years: ["2018", "2019", "2020", "2021", "2022"],
  values: [22, 23, 21, 24, 23],
};

// Dados preparados para o gráfico de linhas com múltiplas séries
const nvdiChart = {
  xaxis: ["2018", "2019", "2020", "2021", "2022"],
  series: [
    {
      data: [0.6, 0.65, 0.63, 0.66, 0.64], // NDVI multiplicado por 100 para melhor visualização
      label: "NDVI",
      color: "#4caf50"
    }
  ]
};

// Dados preparados para o gráfico de linhas com múltiplas séries
const nvdiXparticlesChart = {
  xaxis: ["2018", "2019", "2020", "2021", "2022"],
  series: [
    {
      data: [0.6, 0.65, 0.63, 0.66, 0.64], // NDVI multiplicado por 100 para melhor visualização
      label: "NDVI",
      color: "#4caf50"
    },
    {
      data: [0.3, 0.21, 0.83, 0.8, 0.75], // NDVI multiplicado por 100 para melhor visualização
      label: "AOD",
      color: "#3F51B5"
    }
  ]
};
export default function Home() {

  const [neighborhood, setNeighborhood] = useState("");

  const handleNeighborhoodSelect = (neighborhoodName: string) => {
    setNeighborhood(neighborhoodName);
  };

  useEffect(() => {
    console.log(neighborhood);
  }, [neighborhood])

  return (
    <div className={styles.page}>
      <Sidebar title={neighborhood}>
        <BarsChart xaxis={temperatureMock.years} yaxis={temperatureMock.values} label="Temperatura (°C)" />
        <LinesChart xaxis={nvdiChart.xaxis} series={nvdiChart.series} />
        <LinesChart xaxis={nvdiXparticlesChart.xaxis} series={nvdiXparticlesChart.series} />
      </Sidebar>
      <div className={styles.cardsContainer}>
        <Card icon="temperature" value="23°C" description="Última Temperatura" />
        <Card icon="ndvi" value="0,65" description="Índice NDVI" />
        <Card icon="aod" value="0,21" description="Índice AOD" />
      </div>
      <Map
        onNeighborhoodSelect={handleNeighborhoodSelect}
        selectedNeighborhood={neighborhood}
      />
    </div>
  );
}
