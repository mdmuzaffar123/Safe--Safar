const AQICard = ({ data }) => {
  const getAQILevel = () => {
    const aqi = data.aqi || 50;

    if (aqi <= 50) {
      return {
        level: "Good",
        category: "safe",
        icon: "✅",
        description: "Air quality is satisfactory. You can engage in outdoor activities.",
        color: "#51cf66",
        bgColor: "#e8f5e9",
        textColor: "#2e7d32",
      };
    } else if (aqi <= 100) {
      return {
        level: "Moderate",
        category: "moderate",
        icon: "⚠️",
        description: "Air quality is acceptable. However, sensitive groups may experience issues.",
        color: "#ffa500",
        bgColor: "#fff3e0",
        textColor: "#e65100",
      };
    } else if (aqi <= 150) {
      return {
        level: "Unhealthy for Sensitive Groups",
        category: "sensitive",
        icon: "⚠️",
        description: "Members of sensitive groups may experience health effects. Reduce outdoor activities.",
        color: "#ff9800",
        bgColor: "#ffe0b2",
        textColor: "#e65100",
      };
    } else if (aqi <= 200) {
      return {
        level: "Unhealthy",
        category: "unhealthy",
        icon: "🚨",
        description: "Everyone may experience health effects. Limit outdoor activities.",
        color: "#ff6b6b",
        bgColor: "#ffebee",
        textColor: "#c62828",
      };
    } else if (aqi <= 300) {
      return {
        level: "Very Unhealthy",
        category: "very-unhealthy",
        icon: "🚨",
        description: "Health alert! Everyone should reduce outdoor activities.",
        color: "#d32f2f",
        bgColor: "#ffcdd2",
        textColor: "#b71c1c",
      };
    } else {
      return {
        level: "Hazardous",
        category: "hazardous",
        icon: "🔴",
        description: "Health warning! Avoid outdoor activities. Stay indoors.",
        color: "#b71c1c",
        bgColor: "#ffcdd2",
        textColor: "#b71c1c",
        isBlinking: true,
      };
    }
  };

  const aqiInfo = getAQILevel();
  const aqi = data.aqi || 50;

  return (
    <div className={`aqi-card ${aqiInfo.category} ${aqiInfo.isBlinking ? "blink-alert" : ""}`}>
      <div className="aqi-header">
        <div className="aqi-icon-section">
          <span className="aqi-icon">{aqiInfo.icon}</span>
          <div className="aqi-title-section">
            <h3 className="aqi-level">{aqiInfo.level}</h3>
            <p className="aqi-index">AQI: {Math.round(aqi)}</p>
          </div>
        </div>
      </div>

      <div className="aqi-description">
        <p>{aqiInfo.description}</p>
      </div>

      <div className="aqi-bar-container">
        <div className="aqi-bar-label">
          <span>Good</span>
          <span>Moderate</span>
          <span>Unhealthy</span>
          <span>Very Unhealthy</span>
          <span>Hazardous</span>
        </div>
        <div className="aqi-bar">
          <div className="aqi-bar-fill" style={{ width: `${Math.min((aqi / 300) * 100, 100)}%` }}></div>
          <div
            className="aqi-indicator"
            style={{
              left: `${Math.min((aqi / 300) * 100, 100)}%`,
              backgroundColor: aqiInfo.color,
            }}
          ></div>
        </div>
        <div className="aqi-bar-range">
          <span>0-50</span>
          <span>51-100</span>
          <span>101-150</span>
          <span>151-200</span>
          <span>201-300+</span>
        </div>
      </div>

      <div className="aqi-details">
        <div className="aqi-detail-item">
          <span className="detail-label">Category</span>
          <span className="detail-value">{aqiInfo.level}</span>
        </div>
        <div className="aqi-detail-item">
          <span className="detail-label">Health Impact</span>
          <span className="detail-value">
            {aqi <= 50 ? "Minimal" : aqi <= 100 ? "Minor" : aqi <= 150 ? "Moderate" : aqi <= 200 ? "Serious" : "Severe"}
          </span>
        </div>
      </div>

      {aqiInfo.isBlinking && (
        <div className="aqi-alert">
          <p>🚨 HAZARDOUS AIR QUALITY - STAY INDOORS 🚨</p>
        </div>
      )}

      <div className="aqi-recommendations">
        <h4>💡 Recommendations</h4>
        <ul>
          {aqi <= 50 && (
            <>
              <li>✓ Excellent day for outdoor activities</li>
              <li>✓ No restrictions on travel</li>
            </>
          )}
          {aqi > 50 && aqi <= 100 && (
            <>
              <li>✓ Safe for most outdoor activities</li>
              <li>✓ Sensitive groups may want to limit strenuous activities</li>
            </>
          )}
          {aqi > 100 && aqi <= 150 && (
            <>
              <li>✗ Members of sensitive groups should limit outdoor activities</li>
              <li>✗ Consider wearing N95 masks if going outside</li>
              <li>✗ Close windows to keep indoor air clean</li>
            </>
          )}
          {aqi > 150 && aqi <= 200 && (
            <>
              <li>✗ Everyone should reduce outdoor exposure</li>
              <li>✗ Use air purifiers indoors</li>
              <li>✗ Wear protective masks (N95/N99) if outdoors</li>
            </>
          )}
          {aqi > 200 && aqi <= 300 && (
            <>
              <li>✗ Avoid outdoor activities</li>
              <li>✗ Stay indoors with air purifiers</li>
              <li>✗ Limit travel to essential trips only</li>
            </>
          )}
          {aqi > 300 && (
            <>
              <li>✗ STAY INDOORS - Do not travel</li>
              <li>✗ Use air purifiers continuously</li>
              <li>✗ Wear N95/N99 masks if you must go outside</li>
              <li>✗ Consider rescheduling your trip</li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
};

export default AQICard;
