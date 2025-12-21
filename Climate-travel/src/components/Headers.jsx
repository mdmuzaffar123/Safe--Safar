const Header = ({ isDarkMode, onToggleTheme }) => {
  return (
    <header className="header">
      <div className="header-content">
        <div className="logo-container">
          <div className="logo-icon">🌍</div>
          <div className="logo-text">
            <h1 className="brand-name">Climate Travel</h1>
            <p className="brand-tagline">Smart Journey</p>
          </div>
        </div>
        <nav className="header-nav">
          <a href="#home">Home</a>
          <a href="#features">Features</a>
          <a href="#about">About</a>
          <button className="theme-toggle" onClick={onToggleTheme} title="Toggle dark mode">
            {isDarkMode ? "☀️" : "🌙"}
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;

