cat > src/AboutUs.jsx <<'EOF'
import React from 'react';
import './AboutUs.css';

function AboutUs() {
  return (
    <div className="about-us-container">
      <h1>About Paradise Nursery 🌿</h1>
      <p className="about-us-description">
        Welcome to Paradise Nursery, where green meets serenity!
      </p>
      <p className="about-us-content">
        We are passionate about bringing nature closer to you.
        Our mission is to provide beautiful, healthy and high-quality
        plants for every home.
      </p>
      <h2>Our Mission</h2>
      <p className="about-us-content">
        From aromatic herbs to medicinal plants and air-purifying
        greenery, we help you create a healthier and greener lifestyle.
      </p>
      <h2>Grow With Us</h2>
      <p className="about-us-content">
        Whether you are a beginner or an experienced plant lover,
        Paradise Nursery is here to support your green journey.
      </p>
    </div>
  );
}

export default AboutUs;
EOF