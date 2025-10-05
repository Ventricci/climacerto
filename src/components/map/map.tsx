'use client';
import { ComposableMap, Geographies, Geography } from "react-simple-map";

interface IProps {
    selectedNeighborhood: string;
    onNeighborhoodSelect?: (neighborhood: string) => void;
}

export default function Map({ selectedNeighborhood, onNeighborhoodSelect }: IProps) {

    const handleNeighborhoodClick = async (geo: any) => {
        const neighborhoodName = geo.properties.nome || 'Bairro não identificado';

        if (onNeighborhoodSelect) {
            onNeighborhoodSelect(neighborhoodName);
        }
    };
    
    return (
        <ComposableMap
            projection='geoMercator'
            projectionConfig={{
                scale: 50000,
                center: [-49.28, -25.49]
            }}
            width={600}
            height={310}
        >
            <Geographies geography={"/curitiba.json"}>
                {({ geographies }) =>
                    geographies.map((geo) => (
                        <Geography
                            key={geo.rsmKey}
                            geography={geo}
                            fill={geo.properties.nome == selectedNeighborhood ? "#F53" : "#d6d6da"}
                            stroke="#ffffff"
                            strokeWidth={0.2}
                            onClick={() => handleNeighborhoodClick(geo)}
                            style={{
                                default: {
                                    fill: geo.properties.nome == selectedNeighborhood ? "#F53" : "#d6d6da",
                                    outline: "none",
                                    cursor: "pointer",
                                },
                                hover: {
                                    fill: "#F53",
                                    outline: "none",
                                    cursor: "pointer",
                                },
                                pressed: {
                                    fill: "#E42",
                                    outline: "none",
                                    cursor: "pointer",
                                },
                            }}
                        />
                    ))
                }
            </Geographies>
        </ComposableMap>
    )
}