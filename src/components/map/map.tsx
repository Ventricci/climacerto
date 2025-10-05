'use client';
import { ComposableMap, Geographies, Geography } from "react-simple-map";

export default function Map() {
    return (
        <ComposableMap>
            <Geographies geography={"./belohorizonte.geojson"}>
                {({ geographies }) =>
                    geographies.map((geo) => (
                        <Geography key={geo.rsmKey} geography={geo} />
                    ))
                }
            </Geographies>
        </ComposableMap>
    )
}