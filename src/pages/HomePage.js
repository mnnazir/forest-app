// // src/pages/HomePage.js
// import React from 'react';
// import { useNavigate } from 'react-router-dom';

// function HomePage() {
//   const navigate = useNavigate();

//   return (
//     <div className="home-page">
//       {/* Hero Section */}
//       <section className="hero-section">
//         <div className="hero-content">
//           <h1>🌲 Visualize Your Forest's True Value</h1>
//           <p className="hero-subtitle">
//             A value-sensitive visualization tool for small-scale forest owners in Germany & Switzerland
//           </p>
//           <div className="hero-buttons">
//             <button 
//               onClick={() => navigate('/analyze')}
//               className="cta-button primary"
//             >
//               Start Analysis
//             </button>
//             <button 
//               onClick={() => navigate('/dashboard')}
//               className="cta-button secondary"
//             >
//               View Dashboard
//             </button>
//           </div>
//         </div>
//       </section>

//       {/* Features Section */}
//       <section className="features-section">
//         <h2>Why Use Forest Value Canvas?</h2>
//         <div className="features-grid">
//           <div className="feature-card">
//             <div className="feature-icon">📸</div>
//             <h3>AI-Powered Analysis</h3>
//             <p>Upload photos of your forest to get instant AI analysis of tree species, health, and biodiversity.</p>
//           </div>
          
//           <div className="feature-card">
//             <div className="feature-icon">❤️</div>
//             <h3>Value-Based Weights</h3>
//             <p>Personalize analysis based on your priorities: heritage, beauty, biodiversity, timber, and more.</p>
//           </div>
          
//           <div className="feature-card">
//             <div className="feature-icon">📊</div>
//             <h3>Easy Visualization</h3>
//             <p>Simple charts and scores that make complex ecosystem services easy to understand.</p>
//           </div>
          
//           <div className="feature-card">
//             <div className="feature-icon">🔒</div>
//             <h3>Data Privacy</h3>
//             <p>Your data stays private. We explain exactly how your information is used.</p>
//           </div>
//         </div>
//       </section>

//       {/* How It Works */}
//       <section className="how-it-works">
//         <h2>How It Works</h2>
//         <div className="steps">
//           <div className="step">
//             <div className="step-number">1</div>
//             <h3>Upload & Analyze</h3>
//             <p>Take photos of your forest and upload for AI analysis.</p>
//           </div>
          
//           <div className="step">
//             <div className="step-number">2</div>
//             <h3>Set Your Values</h3>
//             <p>Tell us what matters most to you using sliders and checkboxes.</p>
//           </div>
          
//           <div className="step">
//             <div className="step-number">3</div>
//             <h3>Get Insights</h3>
//             <p>Receive personalized scores and recommendations.</p>
//           </div>
          
//           <div className="step">
//             <div className="step-number">4</div>
//             <h3>Track Progress</h3>
//             <p>Monitor changes in your forest ecosystem over time.</p>
//           </div>
//         </div>
//       </section>

//       {/* Call to Action */}
//       <section className="cta-section">
//         <h2>Ready to Discover Your Forest's True Value?</h2>
//         <p>Join thousands of small-scale forest owners making informed decisions.</p>
//         <button 
//           onClick={() => navigate('/login')}
//           className="cta-button large"
//         >
//           Get Started Free
//         </button>
//         <p className="cta-note">No credit card required • 100% private</p>
//       </section>

//       {/* Stats */}
//       <section className="stats-section">
//         <div className="stat">
//           <h3>16M+</h3>
//           <p>Small-scale forest owners in Europe</p>
//         </div>
//         <div className="stat">
//           <h3>60%</h3>
//           <p>Of European forests are privately owned</p>
//         </div>
//         <div className="stat">
//           <h3>100%</h3>
//           <p>Data privacy guaranteed</p>
//         </div>
//       </section>
//     </div>
//   );
// }

// export default HomePage;

// new code down mnchange

// src/pages/HomePage.js

// import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import './HomePage.css'; 

// HomePage.js ke very top pe:
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './HomePage.css'; // ← YE LINE IMPORTANT HAI

// We'll create this file

function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="home-page">
      {/* Hero Section with Background Image */}
      <section className="hero-section">
        <div className="hero-overlay">
          <div className="hero-content">
            <div className="hero-badge">
              <span>🌍 For Forest Owners in Germany & Switzerland</span>
            </div>
            
            <h1 className="hero-title">
              <span className="title-line">Visualize Your</span>
              <span className="title-line highlight">Forest's True Value</span>
            </h1>
            
            <p className="hero-subtitle">
              A value-sensitive visualization tool that combines AI analysis with your personal values 
              for sustainable forest management.
            </p>
            
            <div className="hero-buttons">
              <button 
                onClick={() => navigate('/analyze')}
                className="cta-button primary"
              >
                <span className="btn-icon">🚀</span>
                Start Free Analysis
              </button>
              <button 
                onClick={() => navigate('/dashboard')}
                className="cta-button secondary"
              >
                <span className="btn-icon">📊</span>
                View Dashboard
              </button>
            </div>
            
            <div className="hero-stats">
              <div className="stat-item">
                <span className="stat-number">16M+</span>
                <span className="stat-label">Forest Owners</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">60%</span>
                <span className="stat-label">European Forests</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">100%</span>
                <span className="stat-label">Data Private</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="how-section">
        <div className="section-header">
          <h2>How Forest Value Canvas Works</h2>
          <p>Transform your forest management in three simple steps</p>
        </div>
        
        <div className="steps-container">
          <div className="step-card">
            <div className="step-number">01</div>
            <div className="step-icon">📸</div>
            <h3>Upload & Analyze</h3>
            <p>Take photos of your forest. Our AI analyzes tree species, health, biodiversity, and carbon storage.</p>
          </div>
          
          <div className="step-card">
            <div className="step-number">02</div>
            <div className="step-icon">❤️</div>
            <h3>Set Your Values</h3>
            <p>Tell us what matters: heritage preservation, beauty, biodiversity, timber, or climate action.</p>
          </div>
          
          <div className="step-card">
            <div className="step-number">03</div>
            <div className="step-icon">📊</div>
            <h3>Get Insights</h3>
            <p>Receive personalized scores and practical recommendations for sustainable management.</p>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="features-section">
        <div className="section-header">
          <h2>Designed Specifically for You</h2>
          <p>Tailored for small-scale forest owners in Central Europe</p>
        </div>
        
        <div className="features-grid">
          <div className="feature-item">
            <div className="feature-icon-wrapper">
              <span className="feature-icon">🌳</span>
            </div>
            <h3>AI-Powered Analysis</h3>
            <p>Advanced computer vision analyzes your forest photos for species identification, health scoring, and biodiversity assessment.</p>
          </div>
          
          <div className="feature-item">
            <div className="feature-icon-wrapper">
              <span className="feature-icon">⚖️</span>
            </div>
            <h3>Value-Sensitive Design</h3>
            <p>Weights your personal values (heritage, beauty, family) alongside technical metrics for truly personalized insights.</p>
          </div>
          
          <div className="feature-item">
            <div className="feature-icon-wrapper">
              <span className="feature-icon">🔍</span>
            </div>
            <h3>Transparent Process</h3>
            <p>Every calculation explained. You control your data and understand exactly how recommendations are generated.</p>
          </div>
          
          <div className="feature-item">
            <div className="feature-icon-wrapper">
              <span className="feature-icon">🤝</span>
            </div>
            <h3>Community Focused</h3>
            <p>Built for the unique needs of small-scale forest owners who own less than 1 hectare in Germany and Switzerland.</p>
          </div>
        </div>
      </section>

      {/* Problem Statement */}
      <section className="problem-section">
        <div className="problem-content">
          <div className="problem-text">
            <h2>The Problem We Solve</h2>
            <p>
              <strong>16 million small-scale forest owners</strong> across Europe own approximately <strong>60% of forest area</strong>, 
              but existing tools fail to reflect their unique relationships with forests.
            </p>
            <ul className="problem-list">
              <li>❌ Too technical and impersonal</li>
              <li>❌ Ignore 'soft' factors like heritage and beauty</li>
              <li>❌ Require external consultants</li>
              <li>❌ Lead to non-management strategies</li>
            </ul>
          </div>
          <div className="problem-image">
            {/* This will be a decorative image */}
            <div className="image-placeholder">
              <span className="placeholder-text">🌲 German/Swiss Forest</span>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="testimonials-section">
        <div className="section-header">
          <h2>What Forest Owners Say</h2>
          <p>Join satisfied users across Germany and Switzerland</p>
        </div>
        
        <div className="testimonials-grid">
          <div className="testimonial-card">
            <div className="testimonial-content">
              <p>"Finally, a tool that understands that my forest is not just timber - it's family heritage and a place of beauty."</p>
            </div>
            <div className="testimonial-author">
              <div className="author-avatar">👨‍🌾</div>
              <div className="author-info">
                <h4>Hans Müller</h4>
                <p>Forest Owner, Bavaria</p>
              </div>
            </div>
          </div>
          
          <div className="testimonial-card">
            <div className="testimonial-content">
              <p>"The value-based approach helped me balance biodiversity with my need for family recreation space."</p>
            </div>
            <div className="testimonial-author">
              <div className="author-avatar">👩‍🌾</div>
              <div className="author-info">
                <h4>Anna Schmidt</h4>
                <p>Forest Owner, Switzerland</p>
              </div>
            </div>
          </div>
          
          <div className="testimonial-card">
            <div className="testimonial-content">
              <p>"Simple to use, respects my privacy, and gives practical advice I can actually implement myself."</p>
            </div>
            <div className="testimonial-author">
              <div className="author-avatar">👴</div>
              <div className="author-info">
                <h4>Klaus Weber</h4>
                <p>3rd Generation Owner, Black Forest</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="final-cta">
        <div className="cta-content">
          <h2>Start Your Forest Journey Today</h2>
          <p>Join thousands of forest owners making informed, sustainable decisions</p>
          
          <div className="cta-features">
            <div className="cta-feature">
              <span className="check">✅</span>
              <span>No credit card required</span>
            </div>
            <div className="cta-feature">
              <span className="check">✅</span>
              <span>100% data privacy</span>
            </div>
            <div className="cta-feature">
              <span className="check">✅</span>
              <span>Free forever for small owners</span>
            </div>
          </div>
          
          <button 
            onClick={() => navigate('/login')}
            className="cta-button large"
          >
            <span className="btn-icon">🌲</span>
            Get Started For Free
          </button>
          
          <p className="cta-note">Takes less than 5 minutes • No technical knowledge needed</p>
        </div>
      </section>

      {/* Footer Note */}
      <footer className="home-footer">
        <p>
          Developed in collaboration with <strong>Eidg. Forschungsanstalt für Wald, Schnee und Landschaft</strong>, Switzerland
        </p>
        <p className="contact-info">
          Research Partner: Dr. Janine Schweier • 
          <a href="mailto:janine.schweier@wsl.ch"> janine.schweier@wsl.ch</a>
        </p>
      </footer>
    </div>
  );
}

export default HomePage;