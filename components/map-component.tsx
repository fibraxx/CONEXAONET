"use client"

import { companyInfo } from "@/config/company"

export default function MapComponent() {
  const lat = -17.07363265697584
  const lng = -41.48472715371496
  const mapUrl = `https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=${lat},${lng}&zoom=18`

  return (
    <div className="h-[500px] w-full rounded-2xl overflow-hidden">
      <iframe
        src={mapUrl}
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title={`Mapa de localização da ConexãoNet - ${companyInfo.address.full}`}
      />
    </div>
  )
}
