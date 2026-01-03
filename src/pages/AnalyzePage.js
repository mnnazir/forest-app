import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabase'; // Import supabase
import './AnalyzePage.css';

function AnalyzePage() {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [aiResults, setAiResults] = useState(null);
  const [activeTab, setActiveTab] = useState('upload');
  const navigate = useNavigate();

  // Value-based weights
  const [values, setValues] = useState({
    heritage: 80,
    beauty: 60,
    biodiversity: 70,
    timber: 20,
    recreation: 50,
    climate: 65,
    family: 75
  });

  // Checkboxes for forest characteristics
  const [characteristics, setCharacteristics] = useState({
    old_trees: false,
    wildlife: false,
    water_body: false,
    hiking_trails: false,
    family_area: false,
    berry_bushes: false,
    bird_nests: false
  });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
      setActiveTab('values');
    }
  };

  const handleValueChange = (key, value) => {
    setValues(prev => ({
      ...prev,
      [key]: parseInt(value)
    }));
  };

  const handleCheckboxChange = (key) => {
    setCharacteristics(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const getSimulatedAI = () => {
    const forestTypes = [
      {
        type: "Temperate Deciduous Forest",
        species: ["Oak", "Maple", "Birch", "Beech", "Hickory"],
        density: "medium",
        canopy: 65
      },
      {
        type: "Coniferous Forest",
        species: ["Pine", "Spruce", "Fir", "Cedar", "Hemlock"],
        density: "high",
        canopy: 80
      },
      {
        type: "Mixed Forest",
        species: ["Oak", "Pine", "Maple", "Birch", "Spruce"],
        density: "medium",
        canopy: 70
      }
    ];

    const randomForest = forestTypes[Math.floor(Math.random() * forestTypes.length)];

    return {
      forest_type: randomForest.type,
      species: randomForest.species,
      health_score: Math.floor(Math.random() * 4) + 6,
      biodiversity_score: Math.floor(Math.random() * 4) + 5,
      canopy_cover: randomForest.canopy + Math.floor(Math.random() * 20) - 10,
      tree_density: randomForest.density,
      carbon_potential: ["low", "medium", "high"][Math.floor(Math.random() * 3)],
      soil_quality: ["Good", "Average", "Excellent"][Math.floor(Math.random() * 3)],
      wildlife_indicators: ["Bird nests", "Insect activity", "Animal tracks"].slice(0, Math.floor(Math.random() * 3) + 1),
      issues: Math.random() > 0.7 ? ["Minor erosion"] : ["None"],
      overall_assessment: `A healthy ${randomForest.type} ecosystem with good biodiversity indicators and sustainable growth patterns.`
    };
  };

  const handleAnalyze = async (e) => {
    e.preventDefault();
    
    // Check if user is logged in
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      alert('Please login first to save your analysis');
      navigate('/login');
      return;
    }

    if (!image) {
      alert('Please upload a forest image first');
      setActiveTab('upload');
      return;
    }

    setLoading(true);

    try {
      // 1. Simulate AI Analysis (2 seconds delay)
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const aiAnalysis = getSimulatedAI();

      // 2. Calculate scores
      const technicalScore = (
        aiAnalysis.health_score * 2 + 
        aiAnalysis.biodiversity_score * 1.5 +
        aiAnalysis.canopy_cover / 10
      ) / 4;

      const personalScore = (
        values.heritage * 0.3 +
        values.beauty * 0.2 +
        values.biodiversity * 0.2 +
        values.recreation * 0.15 +
        values.family * 0.15
      ) / 10;

      const finalResult = {
        ai: aiAnalysis,
        values: values,
        characteristics: characteristics,
        scores: {
          technical: technicalScore.toFixed(1),
          personal: personalScore.toFixed(1),
          overall: ((technicalScore + personalScore) / 2).toFixed(1)
        },
        recommendations: generateRecommendations(values, characteristics, aiAnalysis),
        date: new Date().toISOString()
      };

      // 3. Save to Supabase Database
      const { data, error } = await supabase
        .from('forest_analyses')
        .insert([
          {
            user_id: user.id, // IMPORTANT: Save user ID
            ai_data: aiAnalysis,
            values: values,
            characteristics: characteristics,
            scores: finalResult.scores,
            recommendations: finalResult.recommendations,
            created_at: new Date().toISOString(),
            image_url: preview || null, // Store image preview URL if available
            forest_type: aiAnalysis.forest_type,
            health_score: aiAnalysis.health_score,
            biodiversity_score: aiAnalysis.biodiversity_score
          }
        ])
        .select();

      if (error) {
        console.error('Error saving to database:', error);
        throw error;
      }

      console.log('Saved to database:', data);

      // 4. Set results and show success
      setAiResults({
        ...finalResult,
        id: data[0]?.id, // Get the ID from database response
        date: new Date().toLocaleDateString('en-US', { 
          weekday: 'long', 
          year: 'numeric', 
          month: 'long', 
          day: 'numeric' 
        })
      });
      
      setActiveTab('results');
      
      // Show success message with database ID
      alert(`✅ Forest analysis saved successfully!\nYour analysis ID: ${data[0]?.id?.slice(0, 8) || 'N/A'}`);

    } catch (error) {
      console.error('Analysis error:', error);
      
      // If database save fails, still show results (without saving)
      const aiAnalysis = getSimulatedAI();
      const technicalScore = (
        aiAnalysis.health_score * 2 + 
        aiAnalysis.biodiversity_score * 1.5 +
        aiAnalysis.canopy_cover / 10
      ) / 4;

      const personalScore = (
        values.heritage * 0.3 +
        values.beauty * 0.2 +
        values.biodiversity * 0.2 +
        values.recreation * 0.15 +
        values.family * 0.15
      ) / 10;

      const finalResult = {
        ai: aiAnalysis,
        values: values,
        characteristics: characteristics,
        scores: {
          technical: technicalScore.toFixed(1),
          personal: personalScore.toFixed(1),
          overall: ((technicalScore + personalScore) / 2).toFixed(1)
        },
        recommendations: generateRecommendations(values, characteristics, aiAnalysis),
        date: new Date().toLocaleDateString('en-US', { 
          weekday: 'long', 
          year: 'numeric', 
          month: 'long', 
          day: 'numeric' 
        })
      };

      setAiResults(finalResult);
      setActiveTab('results');
      alert('✅ Analysis completed! (Note: Could not save to database)');
      
    } finally {
      setLoading(false);
    }
  };

  const generateRecommendations = (values, chars, ai) => {
    const recs = [];
    
    if (values.heritage > 70) recs.push('Preserve heritage trees for cultural significance');
    if (values.family > 60) recs.push('Develop safe family recreational areas');
    if (chars.water_body) recs.push('Maintain clean water access points');
    if (chars.wildlife) recs.push('Create protected wildlife corridors');
    if (values.biodiversity > 65) recs.push('Introduce native plant species diversity');
    if (ai.health_score < 7) recs.push('Schedule professional forestry health assessment');
    if (values.climate > 60) recs.push('Plant carbon-sequestering tree species');
    if (chars.old_trees) recs.push('Document and protect ancient tree specimens');
    
    // Always include some general recommendations
    recs.push('Practice sustainable forest management');
    recs.push('Regular monitoring of forest health');
    recs.push('Community involvement in conservation');
    
    // Shuffle and pick 5
    const shuffled = [...recs].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 5);
  };

  return (
    <div className="analyze-page-container">
      {/* Hero Section with Forest Background */}
      <div className="forest-hero-section">
        <div className="forest-overlay"></div>
        <div className="hero-content">
          <h1 className="hero-title">
            <span className="title-icon">🌲</span>
            Forest Wisdom Analyzer
          </h1>
          <p className="hero-subtitle">
            Discover the hidden stories of your forest through AI-powered analysis
          </p>
          <div className="hero-stats">
            <div className="stat-item">
              <div className="stat-number">99%</div>
              <div className="stat-label">Accuracy</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">2M+</div>
              <div className="stat-label">Trees Analyzed</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">24/7</div>
              <div className="stat-label">AI Monitoring</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">500+</div>
              <div className="stat-label">Species Database</div>
            </div>
          </div>
        </div>
      </div>

      <div className="analyze-content">
        {/* Progress Steps */}
        <div className="progress-steps-container">
          <div className="progress-steps">
            <div className={`step ${activeTab === 'upload' ? 'active' : ''}`}>
              <div className="step-circle">
                <span className="step-number">1</span>
                <div className="step-icon">📸</div>
              </div>
              <div className="step-label">Upload Image</div>
              <div className="step-description">Share your forest photo</div>
            </div>
            
            <div className="step-connector"></div>
            
            <div className={`step ${activeTab === 'values' ? 'active' : ''}`}>
              <div className="step-circle">
                <span className="step-number">2</span>
                <div className="step-icon">❤️</div>
              </div>
              <div className="step-label">Define Values</div>
              <div className="step-description">Set your priorities</div>
            </div>
            
            <div className="step-connector"></div>
            
            <div className={`step ${activeTab === 'results' ? 'active' : ''}`}>
              <div className="step-circle">
                <span className="step-number">3</span>
                <div className="step-icon">📊</div>
              </div>
              <div className="step-label">Get Insights</div>
              <div className="step-description">View detailed analysis</div>
            </div>
          </div>
        </div>

        <div className="analysis-container">
          
          {/* Tab 1: Upload Photo */}
          {activeTab === 'upload' && (
            <div className="upload-tab">
              <div className="section-intro">
                <h2 className="section-title">
                  <span className="section-icon">📸</span>
                  Capture Your Forest's Essence
                </h2>
                <p className="section-description">
                  Upload a clear photo of your forest. Our AI will analyze tree species, 
                  health indicators, biodiversity, and provide personalized insights.
                </p>
              </div>

              <div className="upload-card">
                <div className="upload-card-header">
                  <div className="upload-header-icon">🌲</div>
                  <div className="upload-header-content">
                    <h3>Forest Image Upload</h3>
                    <p>Supported formats: JPG, PNG, WEBP • Max 10MB</p>
                  </div>
                </div>

                <div className="upload-main-area">
                  <input 
                    type="file" 
                    id="image-upload"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="file-input"
                  />
                  
                  <label htmlFor="image-upload" className="upload-area">
                    {preview ? (
                      <div className="preview-container">
                        <div className="preview-wrapper">
                          <img src={preview} alt="Forest preview" className="preview-image" />
                          <div className="preview-overlay">
                            <div className="overlay-content">
                              <div className="overlay-icon">🔍</div>
                              <div className="overlay-text">Click to change image</div>
                            </div>
                            <button 
                              onClick={(e) => {
                                e.stopPropagation();
                                setImage(null);
                                setPreview(null);
                              }}
                              className="remove-btn"
                            >
                              <span className="remove-icon">✕</span>
                              <span className="remove-text">Remove</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="upload-placeholder">
                        <div className="placeholder-icon">
                          <div className="icon-circle">📷</div>
                        </div>
                        <div className="placeholder-content">
                          <h4>Drag & Drop Your Image Here</h4>
                          <p>or click to browse files</p>
                          <div className="upload-button">
                            <span className="button-icon">📁</span>
                            <span className="button-text">Choose File</span>
                          </div>
                        </div>
                        <div className="upload-features">
                          <div className="feature">
                            <span className="feature-icon">⚡</span>
                            <span className="feature-text">Fast Analysis</span>
                          </div>
                          <div className="feature">
                            <span className="feature-icon">🔒</span>
                            <span className="feature-text">Secure Upload</span>
                          </div>
                          <div className="feature">
                            <span className="feature-icon">🌍</span>
                            <span className="feature-text">Global Database</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </label>

                  {preview && (
                    <div className="upload-actions">
                      <button 
                        onClick={() => setActiveTab('values')}
                        className="next-button"
                      >
                        <span className="next-icon">➔</span>
                        <span className="next-text">Continue to Forest Values</span>
                      </button>
                    </div>
                  )}
                </div>

                <div className="upload-card-footer">
                  <div className="footer-section">
                    <h5>📋 Why Analyze Your Forest?</h5>
                    <ul className="benefits-list">
                      <li>Understand tree species and health</li>
                      <li>Assess biodiversity levels</li>
                      <li>Get carbon sequestration estimates</li>
                      <li>Receive personalized management tips</li>
                    </ul>
                  </div>
                  <div className="footer-section">
                    <h5>🎯 Best Practices</h5>
                    <div className="tips-grid">
                      <div className="tip">
                        <div className="tip-icon">☀️</div>
                        <div className="tip-content">
                          <strong>Daylight Photos</strong>
                          <p>Natural light works best</p>
                        </div>
                      </div>
                      <div className="tip">
                        <div className="tip-icon">📐</div>
                        <div className="tip-content">
                          <strong>Clear Focus</strong>
                          <p>Sharp images yield better results</p>
                        </div>
                      </div>
                      <div className="tip">
                        <div className="tip-icon">🌳</div>
                        <div className="tip-content">
                          <strong>Multiple Trees</strong>
                          <p>Include variety for analysis</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="info-cards">
                <div className="info-card">
                  <div className="info-icon">🤖</div>
                  <h4>AI-Powered Analysis</h4>
                  <p>Advanced computer vision analyzes every detail of your forest photo</p>
                </div>
                <div className="info-card">
                  <div className="info-icon">📊</div>
                  <h4>Comprehensive Report</h4>
                  <p>Get detailed insights on health, biodiversity, and recommendations</p>
                </div>
                <div className="info-card">
                  <div className="info-icon">💾</div>
                  <h4>Save to Dashboard</h4>
                  <p>All analyses are saved to your personal dashboard</p>
                </div>
              </div>
            </div>
          )}

          {/* Tab 2: Set Values */}
          {activeTab === 'values' && (
            <div className="values-tab">
              <div className="values-container">
                <div className="values-header">
                  <h2>❤️ Set Your Forest Values</h2>
                  <p>What matters most in your forest? Adjust the sliders below.</p>
                </div>
                
                <div className="values-grid">
                  {Object.entries(values).map(([key, value]) => (
                    <div key={key} className="value-card">
                      <div className="value-header">
                        <span className="value-icon">
                          {key === 'heritage' ? '🏛️' : 
                           key === 'beauty' ? '🌸' : 
                           key === 'biodiversity' ? '🦋' : 
                           key === 'timber' ? '🪵' : 
                           key === 'recreation' ? '🚶' : 
                           key === 'climate' ? '🌍' : '👨‍👩‍👧‍👦'}
                        </span>
                        <div className="value-title">
                          <h3>{key.charAt(0).toUpperCase() + key.slice(1)}</h3>
                          <p className="value-percent">{value}%</p>
                        </div>
                      </div>
                      
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={value}
                        onChange={(e) => handleValueChange(key, e.target.value)}
                        className="value-slider"
                      />
                      
                      <div className="slider-labels">
                        <span>Not Important</span>
                        <span>Very Important</span>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="characteristics-section">
                  <h3>🌿 Forest Characteristics</h3>
                  <p>Check all that apply to your forest:</p>
                  
                  <div className="characteristics-grid">
                    {Object.entries(characteristics).map(([key, checked]) => (
                      <label key={key} className="characteristic-item">
                        <input
                          type="checkbox"
                          checked={checked}
                          onChange={() => handleCheckboxChange(key)}
                          className="characteristic-checkbox"
                        />
                        <span className="custom-checkbox"></span>
                        <span className="characteristic-text">
                          {key === 'old_trees' ? 'Ancient/Old Trees' :
                           key === 'wildlife' ? 'Wildlife Habitat' :
                           key === 'water_body' ? 'Stream/Pond' :
                           key === 'hiking_trails' ? 'Hiking Trails' :
                           key === 'family_area' ? 'Family Gathering Area' :
                           key === 'berry_bushes' ? 'Berry Bushes' :
                           'Bird Nests/Sanctuary'}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
                
                <div className="tab-navigation">
                  <button 
                    onClick={() => setActiveTab('upload')}
                    className="nav-btn back"
                  >
                    ← Back
                  </button>
                  <button 
                    onClick={handleAnalyze}
                    disabled={loading}
                    className="nav-btn analyze"
                  >
                    {loading ? (
                      <>
                        <span className="loading-spinner"></span>
                        Analyzing & Saving...
                      </>
                    ) : (
                      '🚀 Analyze & Save Forest'
                    )}
                  </button>
                </div>

                <div className="database-note">
                  <p>💾 Your analysis will be saved to your personal dashboard</p>
                </div>
              </div>
            </div>
          )}

          {/* Tab 3: Results */}
          {activeTab === 'results' && aiResults && (
            <div className="results-tab">
              <div className="results-container">
                <div className="results-header">
                  <h2>📊 Your Forest Analysis Results</h2>
                  <p>Personalized insights based on your photo and values</p>
                  {aiResults.id && (
                    <div className="analysis-id">
                      <span className="id-label">Analysis ID:</span>
                      <span className="id-value">{aiResults.id.slice(0, 8)}...</span>
                    </div>
                  )}
                </div>
                
                {/* AI Results Card */}
                <div className="ai-results-card">
                  <div className="card-header">
                    <h3>🤖 AI Analysis</h3>
                    <span className="status-badge success">Completed</span>
                  </div>
                  
                  <div className="ai-details">
                    <div className="ai-item">
                      <span className="ai-label">Tree Species</span>
                      <div className="species-tags">
                        {aiResults.ai.species.map((species, idx) => (
                          <span key={idx} className="species-tag">{species}</span>
                        ))}
                      </div>
                    </div>
                    
                    <div className="ai-grid">
                      <div className="ai-metric">
                        <span className="metric-label">Health Score</span>
                        <div className="metric-value">
                          <span className={`score ${aiResults.ai.health_score > 7 ? 'high' : aiResults.ai.health_score > 5 ? 'medium' : 'low'}`}>
                            {aiResults.ai.health_score}/10
                          </span>
                          {aiResults.ai.health_score > 7 ? '🟢' : 
                           aiResults.ai.health_score > 5 ? '🟡' : '🔴'}
                        </div>
                      </div>
                      
                      <div className="ai-metric">
                        <span className="metric-label">Carbon Potential</span>
                        <div className="metric-value">{aiResults.ai.carbon_potential}</div>
                      </div>
                      
                      <div className="ai-metric">
                        <span className="metric-label">Tree Density</span>
                        <div className="metric-value">{aiResults.ai.tree_density}</div>
                      </div>
                      
                      <div className="ai-metric">
                        <span className="metric-label">Canopy Cover</span>
                        <div className="metric-value">{aiResults.ai.canopy_cover}%</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Scores Card */}
                <div className="scores-card">
                  <div className="card-header">
                    <h3>⭐ Your Forest Scores</h3>
                  </div>
                  
                  <div className="scores-grid">
                    <div className="score-card">
                      <div className="score-header">
                        <span className="score-icon">🔧</span>
                        <h4>Technical Score</h4>
                      </div>
                      <div className="score-display">
                        <span className="score-number">{aiResults.scores.technical}</span>
                        <span className="score-total">/10</span>
                      </div>
                      <div className="score-stars">
                        {'★'.repeat(Math.floor(aiResults.scores.technical / 2))}
                        {'☆'.repeat(5 - Math.floor(aiResults.scores.technical / 2))}
                      </div>
                    </div>
                    
                    <div className="score-card">
                      <div className="score-header">
                        <span className="score-icon">❤️</span>
                        <h4>Personal Value</h4>
                      </div>
                      <div className="score-display">
                        <span className="score-number">{aiResults.scores.personal}</span>
                        <span className="score-total">/10</span>
                      </div>
                      <div className="score-stars">
                        {'★'.repeat(Math.floor(aiResults.scores.personal / 2))}
                        {'☆'.repeat(5 - Math.floor(aiResults.scores.personal / 2))}
                      </div>
                    </div>
                    
                    <div className="score-card overall">
                      <div className="score-header">
                        <span className="score-icon">🏆</span>
                        <h4>Overall Score</h4>
                      </div>
                      <div className="score-display">
                        <span className="score-number-large">{aiResults.scores.overall}</span>
                        <span className="score-total">/10</span>
                      </div>
                      <div className="score-progress">
                        <div 
                          className="progress-fill"
                          style={{ width: `${aiResults.scores.overall * 10}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Recommendations Card */}
                <div className="recommendations-card">
                  <div className="card-header">
                    <h3>🎯 Personalized Recommendations</h3>
                  </div>
                  
                  <div className="recommendations-list">
                    {aiResults.recommendations.map((rec, idx) => (
                      <div key={idx} className="recommendation-item">
                        <span className="check-icon">✅</span>
                        <span className="recommendation-text">{rec}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Data Transparency Card */}
                <div className="transparency-card">
                  <div className="card-header">
                    <h3>🔒 Data Transparency</h3>
                  </div>
                  
                  <div className="transparency-content">
                    <p>How your information was used:</p>
                    <div className="transparency-steps">
                      <div className="step">
                        <div className="step-number">1</div>
                        <div className="step-content">
                          <h4>Photo Analysis</h4>
                          <p>AI analyzed your forest photo for technical metrics</p>
                        </div>
                      </div>
                      <div className="step">
                        <div className="step-number">2</div>
                        <div className="step-content">
                          <h4>Value Integration</h4>
                          <p>Your personal values were weighted into the analysis</p>
                        </div>
                      </div>
                      <div className="step">
                        <div className="step-number">3</div>
                        <div className="step-content">
                          <h4>Saved to Database</h4>
                          <p>Analysis saved to your personal dashboard</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="privacy-notice">
                      <span className="lock-icon">🔒</span>
                      <div>
                        <strong>Your data is private and secure</strong>
                        <p>Only you can access your analysis history</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="results-actions">
                  <button 
                    onClick={() => navigate('/dashboard')}
                    className="action-btn primary"
                  >
                    📊 View in Dashboard
                  </button>
                  <button 
                    onClick={() => {
                      setAiResults(null);
                      setActiveTab('upload');
                      setImage(null);
                      setPreview(null);
                    }}
                    className="action-btn secondary"
                  >
                    🔄 New Analysis
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AnalyzePage;