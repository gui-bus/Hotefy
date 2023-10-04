'use client'
import React, { useEffect, useState } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

interface MapProps {
  location: string;
}

const TripMap: React.FC<MapProps> = ({ location }) => {
  const mapContainerStyle = {
    width: '100%',
    height: '25rem',
  };

  const defaultCenter = { lat: 0, lng: 0 }; // Centro de mapa padrão
  const [mapCenter, setMapCenter] = useState(defaultCenter);

  useEffect(() => {
    const getLocation = async () => {
      try {
        const response = await fetch(
          `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
            location
          )}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`
        );

        const data = await response.json();

        if (data.results && data.results.length > 0) {
          const { lat, lng } = data.results[0].geometry.location;
          setMapCenter({ lat, lng });
        }
      } catch (error) {
        console.error('Erro ao obter coordenadas:', error);
      }
    };

    getLocation();
  }, [location]);

  const googleMapsApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "";

  return (
    <LoadScript googleMapsApiKey={googleMapsApiKey}>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={mapCenter}
        zoom={12}
      >
        <Marker position={mapCenter} />
      </GoogleMap>
    </LoadScript>
  );
};

export default TripMap;
