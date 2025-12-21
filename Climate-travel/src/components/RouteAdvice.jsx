

const RouteAdvice = ({ data }) => {
  let advice = "Walking or cycling is generally safe for travel";
  let icon = "🚶‍♂️";
  const tips = ["Wear comfortable shoes", "Stay hydrated", "Check local news", "Inform someone of your route"];

  if (data.rain > 10 && data.wind > 20) {
    advice = "Heavy rain with strong winds - Use public transport or stay indoors";
    icon = "🚌";
    tips.length = 0;
    tips.push("Avoid outdoor activities", "Use umbrella if traveling", "Check weather updates frequently", "Travel during daylight only");
  } else if (data.rain > 10) {
    advice = "Heavy rainfall - Prefer public transportation or indoor activities";
    icon = "🚌";
    tips.length = 0;
    tips.push("Carry waterproof bags", "Use public transport", "Avoid flooded areas", "Keep phone charged");
  } else if (data.wind > 25) {
    advice = "Strong winds detected - Exercise caution during travel";
    icon = "💨";
    tips.length = 0;
    tips.push("Secure loose items", "Avoid tall structures", "Drive carefully", "Use windproof clothing");
  } else if (data.temp > 38) {
    advice = "Extreme heat - Use air-conditioned transport and stay hydrated";
    icon = "🔥";
    tips.length = 0;
    tips.push("Drink plenty of water", "Avoid midday travel", "Use sunscreen", "Wear light colored clothes");
  } else if (data.temp < 0) {
    advice = "Freezing temperatures - Stay indoors and dress warmly if traveling";
    icon = "❄️";
    tips.length = 0;
    tips.push("Bundle up warmly", "Use heated transport", "Avoid slippery surfaces", "Keep emergency supplies");
  }

  return (
    <div className="advice-card">
      <div className="advice-header">
        <h3>Travel Recommendations</h3>
      </div>
      <div className="advice-content">
        <span className="advice-icon">{icon}</span>
        <p className="advice-text">{advice}</p>
      </div>
      <div className="advice-tips">
        <h4>Safety Tips 🛡️</h4>
        <ul>
          {tips.map((tip, index) => (
            <li key={index}>{tip}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default RouteAdvice;
