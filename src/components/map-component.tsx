"use client"

import { useEffect } from "react"
import L from "leaflet"
import "leaflet/dist/leaflet.css"

export default function MapComponent() {
  useEffect(() => {
    // Coordenadas aproximadas de Padre Paraíso, MG
    const map = L.map("map").setView([-17.0742, -41.4764], 14)

    L.tileLayer("https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png", {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      maxZoom: 19,
    }).addTo(map)

    const customIcon = L.divIcon({
      className: "custom-marker",
      html: '<div style="background-color: #FF6A00; width: 30px; height: 30px; border-radius: 50%; border: 3px solid white;"></div>',
      iconSize: [30, 30],
      iconAnchor: [15, 15],
    })

    L.marker([-17.0742, -41.4764], { icon: customIcon })
      .addTo(map)
      .bindPopup("<b>ConexãoNet</b><br>Rua Araçuaí, 128 - Centro")

    return () => {
      map.remove()
    }
  }, [])

  return <div id="map" className="h-[500px] w-full rounded-2xl" />
}
