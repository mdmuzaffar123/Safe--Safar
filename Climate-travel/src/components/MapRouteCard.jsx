import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const MapRouteCard = ({ data }) => {
  const mapContainer = useRef(null);
  const mapInstance = useRef(null);

  const getRouteRecommendation = () => {
    const temp = data.temp;
    const humidity = data.humidity;
    const wind = data.wind;
    const rain = data.rain;

    if (temp < 0 || rain > 10 || wind > 50) {
      return {
        title: "⚠️ High Risk Route",
        recommendation: "Avoid outdoor routes. Consider indoor activities or rescheduling.",
        color: "#ff6b6b",
        icon: "🚫",
      };
    } else if (temp < 10 || humidity > 80 || wind > 30 || rain > 5) {
      return {
        title: "⚡ Moderate Route",
        recommendation: "Choose covered routes. Bring protective gear and plan shorter trips.",
        color: "#ffa500",
        icon: "⚠️",
      };
    } else {
      return {
        title: "✅ Map Route",
        recommendation: "Perfect conditions for outdoor travel. All routes are suitable.",
        color: "#51cf66",
        icon: "🗺️",
      };
    }
  };

  useEffect(() => {
    if (!mapContainer.current) return;

    // Initialize map only once
    if (!mapInstance.current) {
      mapInstance.current = L.map(mapContainer.current).setView([20, 0], 2);

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 19,
      }).addTo(mapInstance.current);
    }

    // Update map view when data changes
    if (data && mapInstance.current) {
      mapInstance.current.setView([data.latitude || 20, data.longitude || 0], 6);

      // Clear previous markers
      mapInstance.current.eachLayer((layer) => {
        if (layer instanceof L.Marker) {
          mapInstance.current.removeLayer(layer);
        }
      });

      // Add marker for the location
      L.marker([data.latitude || 20, data.longitude || 0])
        .addTo(mapInstance.current)
        .bindPopup(`<strong>${data.city}</strong><br>${data.condition}<br>${data.temp}°C`);
    }

    return () => {
      // Don't destroy the map on unmount
    };
  }, [data]);

  const route = getRouteRecommendation();

  return (
    <div className="map-route-card">
      <div className="route-header">
        <div className="route-title-section">
          <h3 className="route-title">{route.title}</h3>
          <p className="route-subtitle">Route & Travel Recommendations</p>
        </div>
        <div className="route-icon-large">{route.icon}</div>
      </div>

      <div className="route-recommendation">
        <p>{route.recommendation}</p>
      </div>

      <div className="route-map-container">
        <div ref={mapContainer} className="route-map"></div>
      </div>

      <div className="route-suggestions">
        <h4>📍 Travel Suggestions</h4>
        <ul>
          {data.temp < 0 && <li>✓ Wear warm clothing and layers</li>}
          {data.temp > 35 && <li>✓ Stay hydrated and use sunscreen</li>}
          {data.rain > 5 && <li>✓ Carry an umbrella or rain jacket</li>}
          {data.wind > 25 && <li>✓ Secure loose items and be cautious in exposed areas</li>}
          {data.humidity > 75 && <li>✓ Choose shaded routes to avoid heat exhaustion</li>}
          {data.temp >= 10 && data.temp <= 35 && data.rain <= 5 && data.wind <= 25 && <li>✓ All conditions are favorable for travel</li>}
        </ul>
      </div>
    </div>
  );
};

export default MapRouteCard;
