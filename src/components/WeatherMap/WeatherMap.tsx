import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import styles from './WeatherMap.module.css';

// Fix for default marker icons in React
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface WeatherMapProps {
  lat: number;
  lon: number;
  cityName: string;
}

function MapView({ lat, lon }: { lat: number; lon: number }) {
  const map = useMap();

  useEffect(() => {
    map.setView([lat, lon], 10);
  }, [lat, lon, map]);

  return null;
}

export function WeatherMap({ lat, lon, cityName }: WeatherMapProps) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return <div className={styles.loading}>Loading map...</div>;
  }

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>Weather Map</h3>
      <MapContainer
        center={[lat, lon]}
        zoom={10}
        className={styles.map}
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MapView lat={lat} lon={lon} />
        <Marker position={[lat, lon]}>
          <Popup>{cityName}</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}
