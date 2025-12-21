const RiskCard = ({ data }) => {
  const riskScore = data.rain * 0.4 + data.aqi * 0.3 + (Math.min(data.temp, 50) / 50) * 20 + data.wind * 0.1;

  let riskLevel = "safe";
  let riskIcon = "✅";
  let riskText = "Safe";

  if (riskScore > 60) {
    riskLevel = "high-risk";
    riskIcon = "🚨";
    riskText = "High Risk";
  } else if (riskScore > 30) {
    riskLevel = "moderate-risk";
    riskIcon = "⚠️";
    riskText = "Moderate";
  }

  return (
    <div className="risk-card">
      <div className="risk-header">
        <div className="location-info">
          <h2 className="city-name">{data.city}</h2>
          <p className="location-details">{data.region}, {data.country}</p>
        </div>
        <div className="weather-icon-large">
          {data.icon && <img src={`https:${data.icon}`} alt={data.condition} />}
        </div>
      </div>

      <div className="condition-display">
        <p className="condition-text">{data.condition}</p>
      </div>

      <div className="weather-metrics">
        <div className="metric">
          <div className="metric-icon">🌡️</div>
          <div className="metric-content">
            <span className="metric-label">Temperature</span>
            <span className="metric-value">{data.temp}°C</span>
          </div>
        </div>
        <div className="metric">
          <div className="metric-icon">💧</div>
          <div className="metric-content">
            <span className="metric-label">Humidity</span>
            <span className="metric-value">{data.humidity}%</span>
          </div>
        </div>
        <div className="metric">
          <div className="metric-icon">🌧️</div>
          <div className="metric-content">
            <span className="metric-label">Rainfall</span>
            <span className="metric-value">{data.rain} mm</span>
          </div>
        </div>
        <div className="metric">
          <div className="metric-icon">💨</div>
          <div className="metric-content">
            <span className="metric-label">Wind Speed</span>
            <span className="metric-value">{data.wind} kph</span>
          </div>
        </div>
      </div>

      <div className={`risk-level ${riskLevel}`}>
        <div className="risk-icon">{riskIcon}</div>
        <div className="risk-content">
          <h3 className="risk-title">Travel Risk: {riskText}</h3>
          <p className="risk-score">Risk Score: {riskScore.toFixed(1)}/100</p>
        </div>
      </div>
    </div>
  );
};

export default RiskCard;
