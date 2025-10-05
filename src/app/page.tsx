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

  const [neighborhood, setNeighborhood] = useState({ id: "", nome: "Série Histórica" });
  const [climate, setClimate] = useState<{
    temperature: number | null;
    ndvi: number | null;
    aod: number | null;
  }>({ temperature: null, ndvi: null, aod: null });
  const [neighborhoodList, setNeighborhoodList] = useState<any[]>([]);

  const handleNeighborhoodSelect = (neighborhoodName: string) => {
    const neighborhood_id = neighborhoodList.find((item: any) =>
      item.nome === neighborhood.nome
    )?.id;
    setNeighborhood({ id: neighborhood_id, nome: neighborhoodName });
  };

  const getNeighborhoodList = async () => {
    try {
      const response = await fetch(`/api/neighborhood_list`, {
        method: 'GET',
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setNeighborhoodList(data.neighborhood_list);
    } catch (error) {
      return null;
    }
  }

  const getNeighborhoodDetails = async () => {
    try {
      const response = await fetch(`/api/neighborhood_details?id_neighborhood=${neighborhood.id}&anoInicio=2017&anoFim=2022`, {
        method: 'GET',
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log(data);
    } catch (error) {
      return null;
    }
  }

  useEffect(() => {
    if (neighborhood && neighborhoodList.length > 0) {
      const selectedNeighborhoodData = neighborhoodList.find((item: any) =>
        item.nome === neighborhood.nome
      );

      if (selectedNeighborhoodData) {
        setClimate({
          temperature: selectedNeighborhoodData.climate[0].temperature || selectedNeighborhoodData.temperatura || null,
          ndvi: selectedNeighborhoodData.climate[0].ndvi || null,
          aod: selectedNeighborhoodData.climate[0].particles || null
        });
        getNeighborhoodDetails();
      } else {
        setClimate({ temperature: null, ndvi: null, aod: null });
      }
    }
  }, [neighborhood, neighborhoodList]);

  useEffect(() => {
    getNeighborhoodList();
  }, []);

  return (
    <div className={styles.page}>
      <Sidebar title={neighborhood.nome}>
        <BarsChart xaxis={temperatureMock.years} yaxis={temperatureMock.values} label="Temperatura (°C)" />
        <LinesChart xaxis={nvdiChart.xaxis} series={nvdiChart.series} />
        <LinesChart xaxis={nvdiXparticlesChart.xaxis} series={nvdiXparticlesChart.series} />
      </Sidebar>
      <div className={styles.cardsContainer}>
        <Card
          icon="temperature"
          value={climate.temperature !== null ? `${climate.temperature.toFixed(1)}°C` : "N/A"}
          description="Última Temperatura"
        />
        <Card
          icon="ndvi"
          value={climate.ndvi !== null ? climate.ndvi.toFixed(2) : "N/A"}
          description="Índice NDVI"
        />
        <Card
          icon="aod"
          value={climate.aod !== null ? climate.aod.toFixed(2) : "N/A"}
          description="Índice AOD"
        />
      </div>
      <Map
        onNeighborhoodSelect={handleNeighborhoodSelect}
        selectedNeighborhood={neighborhood.nome}
      />
    </div>
  );
}
