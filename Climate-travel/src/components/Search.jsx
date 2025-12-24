import { useState } from "react";

const Search = ({ onSearch, loading }) => {
  const [city, setCity] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const citiesList = [
    "London", "New York", "Tokyo", "Mumbai", "Paris", "Dubai", "Singapore",
    "Hong Kong", "Sydney", "Bangkok", "Los Angeles", "Chicago", "Berlin",
    "Toronto", "Amsterdam", "Barcelona", "Rome", "Istanbul", "Moscow", "Madrid",
    "Mexico City", "São Paulo", "Buenos Aires", "Cairo", "Seoul", "Bangkok",
    "Kuala Lumpur", "Jakarta", "Manila", "Delhi", "Bangalore", "Los Angeles",
    "San Francisco", "Miami", "Boston", "Seattle", "Denver", "Austin",
    "Vancouver", "Melbourne", "Auckland", "Dublin", "Prague", "Vienna",
    "Budapest", "Warsaw", "Athens", "Lisbon", "Zurich", "Geneva"
  ];

  const handleInputChange = (e) => {
    const value = e.target.value;
    setCity(value);

    if (value.trim() === "") {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    const filtered = citiesList.filter(cityName =>
      cityName.toLowerCase().includes(value.toLowerCase())
    );

    setSuggestions(filtered.slice(0, 6));
    setShowSuggestions(true);
  };

  const handleSuggestionClick = (selectedCity) => {
    setCity(selectedCity);
    setSuggestions([]);
    setShowSuggestions(false);
    onSearch(selectedCity);
  };

  const handleSearch = () => {
    setShowSuggestions(false);
    onSearch(city);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !loading) {
      setShowSuggestions(false);
      handleSearch();
    }
  };

  return (
    <div>
      <div className="search-input-group">
        <div className="search-input-wrapper">
          <input
            type="text"
            className="search-input"
            placeholder="Enter city name..."
            value={city}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
            onFocus={() => city.trim() && suggestions.length > 0 && setShowSuggestions(true)}
            disabled={loading}
          />
          {showSuggestions && suggestions.length > 0 && (
            <div className="suggestions-dropdown">
              {suggestions.map((suggestion, index) => (
                <div
                  key={index}
                  className="suggestion-item"
                  onClick={() => handleSuggestionClick(suggestion)}
                >
                  <span className="suggestion-icon">📍</span>
                  <span className="suggestion-text">{suggestion}</span>
                  <span className="suggestion-arrow">→</span>
                </div>
              ))}
            </div>
          )}
        </div>
        <button
          className="search-button"
          onClick={handleSearch}
          disabled={loading}
        >
          {loading ? "Searching..." : "Search"}
        </button>
      </div>
      <p className="search-hint">💡 Try searching for: Mumbai, London, New York, Tokyo, Mumbai...</p>
    </div>
  );
};

export default Search;
