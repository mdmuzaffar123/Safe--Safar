import { useState } from "react";
import axios from "axios";
import Header from "./components/Headers";
import Search from "./components/Search";
import RiskCard from "./components/RiskCard";
import RouteAdvice from "./components/RouteAdvice";
import MapRouteCard from "./components/MapRouteCard";
import AQICard from "./components/AQICard";
import "./App.css";

function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const fetchClimateData = async (city) => {
    if (!city.trim()) {
      setError("Please enter a city name");
      return;
    }

    setLoading(true);
    setError(null);
    setData(null);

    try {
      const apiKey = import.meta.env.VITE_WEATHER_API_KEY;
      const weather = await axios.get(
        `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${encodeURIComponent(city)}&aqi=yes`
      );

      const aqiValue = weather.data.current.air_quality?.us_epa_index || 3;
      const aqiMapping = {
        1: 25,   // Good
        2: 75,   // Moderate
        3: 125,  // Unhealthy for Sensitive Groups
        4: 175,  // Unhealthy
        5: 225,  // Very Unhealthy
        6: 300,  // Hazardous
      };

      setData({
        city: weather.data.location.name,
        region: weather.data.location.region,
        country: weather.data.location.country,
        temp: weather.data.current.temp_c,
        humidity: weather.data.current.humidity,
        rain: weather.data.current.precip_mm || 0,
        wind: weather.data.current.wind_kph,
        condition: weather.data.current.condition.text,
        icon: weather.data.current.condition.icon,
        aqi: aqiMapping[aqiValue] || 75,
        latitude: weather.data.location.lat,
        longitude: weather.data.location.lon,
      });
    } catch (err) {
      setError("City not found. Please try another search.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`app-container ${isDarkMode ? "dark-mode" : "light-mode"}`}>
      <Header isDarkMode={isDarkMode} onToggleTheme={() => setIsDarkMode(!isDarkMode)} />
      <div className="main-content">
        {/* Home Section */}
        <section id="home" className="section home-section">
          <div className="search-container">
            <div className="search-wrapper">
              <Search onSearch={fetchClimateData} loading={loading} />
            </div>
          </div>

          {error && <div className="error-message">{error}</div>}

          {loading && (
            <div className="loading">
              <div className="spinner"></div>
              <p>Searching for weather data...</p>
            </div>
          )}

          {!loading && !error && !data && (
            <div className="welcome-section">
              <div className="welcome-card">
                <h2>Welcome to Climate-Safe Safar</h2>
                <p>Your smart travel companion for climate-aware journey planning</p>
                <p className="home-description">Search for any city to get real-time weather data and personalized travel recommendations based on climate conditions.</p>
              </div>
            </div>
          )}

          {!loading && data && (
            <div className="results-container">
              <RiskCard data={data} />
              <RouteAdvice data={data} />
              <MapRouteCard data={data} />
              <AQICard data={data} />
            </div>
          )}
        </section>

        {/* Features Section */}
        <section id="features" className="section features-section">
          <div className="section-header">
            <h2>Our Features</h2>
            <p>Everything you need for safe and informed travel planning</p>
          </div>
          <div className="features-grid">
            <div className="feature-card">
              <span className="feature-icon">🌡️</span>
              <h3>Real-Time Weather</h3>
              <p>Get current weather conditions for any city worldwide with accurate temperature, humidity, rainfall, and wind speed data.</p>
              <ul className="feature-list">
                <li>Accurate forecasts</li>
                <li>Global coverage</li>
                <li>Updated instantly</li>
              </ul>
            </div>
            <div className="feature-card">
              <span className="feature-icon">🚨</span>
              <h3>Risk Assessment</h3>
              <p>Understand travel risks based on comprehensive weather analysis. Get risk scores and travel mode recommendations.</p>
              <ul className="feature-list">
                <li>Smart algorithms</li>
                <li>Multi-factor analysis</li>
                <li>Risk categorization</li>
              </ul>
            </div>
            <div className="feature-card">
              <span className="feature-icon">🧭</span>
              <h3>Smart Recommendations</h3>
              <p>Receive personalized travel recommendations and safety tips tailored to current weather conditions.</p>
              <ul className="feature-list">
                <li>Safety tips</li>
                <li>Travel modes</li>
                <li>Precautions</li>
              </ul>
            </div>
            <div className="feature-card">
              <span className="feature-icon">🌙</span>
              <h3>Dark Mode</h3>
              <p>Switch between light and dark modes for comfortable viewing at any time of day.</p>
              <ul className="feature-list">
                <li>Easy on eyes</li>
                <li>Night-friendly</li>
                <li>One-click toggle</li>
              </ul>
            </div>
            <div className="feature-card">
              <span className="feature-icon">📍</span>
              <h3>City Autocomplete</h3>
              <p>Quickly find and search from 48+ major cities worldwide with intelligent suggestions.</p>
              <ul className="feature-list">
                <li>Smart filtering</li>
                <li>Quick search</li>
                <li>Global cities</li>
              </ul>
            </div>
            <div className="feature-card">
              <span className="feature-icon">📊</span>
              <h3>Detailed Analytics</h3>
              <p>Comprehensive weather metrics including humidity, rainfall, wind speed, and risk scoring.</p>
              <ul className="feature-list">
                <li>Detailed metrics</li>
                <li>Risk scoring</li>
                <li>Visual display</li>
              </ul>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="section about-section">
          <div className="section-header">
            <h2>About Climate-Safe Safar</h2>
            <p>Your Partner in Climate-Aware Travel</p>
          </div>
          <div className="about-content">
            <div className="about-card">
              <h3>Our Mission</h3>
              <p>
                Climate-Safe Safar is dedicated to making travel safer and more informed by providing real-time weather data and personalized risk assessments. We believe that every traveler deserves access to accurate climate information to make smart decisions about their journeys.
              </p>
            </div>
            <div className="about-card">
              <h3>Why Choose Us?</h3>
              <ul className="about-list">
                <li><strong>Accuracy:</strong> Real-time data from reliable weather APIs</li>
                <li><strong>User-Friendly:</strong> Simple, intuitive interface for all users</li>
                <li><strong>Smart Analysis:</strong> Advanced algorithms for risk assessment</li>
                <li><strong>Global Coverage:</strong> Information for cities worldwide</li>
                <li><strong>Safety First:</strong> Personalized recommendations for your safety</li>
                <li><strong>Always Available:</strong> 24/7 access to weather and travel data</li>
              </ul>
            </div>
            <div className="about-card">
              <h3>How It Works</h3>
              <ol className="about-list">
                <li>Enter a city name in the search box</li>
                <li>Get instant real-time weather data</li>
                <li>Receive a comprehensive risk assessment</li>
                <li>Get personalized travel recommendations</li>
                <li>Make informed decisions about your travel</li>
              </ol>
            </div>
            <div className="about-card">
              <h3>Technology</h3>
              <p>
                Built with modern web technologies including React for the frontend and WeatherAPI for accurate, real-time weather data. Our intelligent algorithms analyze multiple weather factors to provide comprehensive risk assessments.
              </p>
              <div className="tech-stack">
                <span className="tech-badge">React</span>
                <span className="tech-badge">WeatherAPI</span>
                <span className="tech-badge">Real-Time Data</span>
                <span className="tech-badge">AI Analysis</span>
              </div>
            </div>
          </div>
        </section>
      </div>
      <footer className="app-footer">
        <p>&copy; 2025 Climate-Safe Safar. Smart travel, climate-aware decisions.</p>
        <p>Powered by WeatherAPI</p>
      </footer>
    </div>
  );
}

export default App;
