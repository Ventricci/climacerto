'use client';
import { ComposableMap, Geographies, Geography } from "react-simple-map";

export default function Map() {
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
                            fill="#d6d6da"
                            stroke="#ffffff"
                            strokeWidth={0.2}
                            style={{
                                default: {
                                    fill: "#d6d6da",
                                    outline: "none",
                                },
                                hover: {
                                    fill: "#F53",
                                    outline: "none",
                                },
                                pressed: {
                                    fill: "#E42",
                                    outline: "none",
                                },
                            }}
                        />
                    ))
                }
            </Geographies>
        </ComposableMap>

    )
}