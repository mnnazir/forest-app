// import React, { useState, useEffect } from 'react';
// import { supabase } from '../supabase';
// import { useNavigate } from 'react-router-dom';

// function AnalyzePage() {
//   const [image, setImage] = useState(null);
//   const [preview, setPreview] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [aiResults, setAiResults] = useState(null);
//   const navigate = useNavigate();

//   // Value-based weights (checkboxes/sliders)
//   const [values, setValues] = useState({
//     heritage: 80,
//     beauty: 60,
//     biodiversity: 70,
//     timber: 20,
//     recreation: 50,
//     climate: 65,
//     family: 75
//   });

//   // Checkboxes for forest characteristics
//   const [characteristics, setCharacteristics] = useState({
//     old_trees: false,
//     wildlife: false,
//     water_body: false,
//     hiking_trails: false,
//     family_area: false,
//     berry_bushes: false,
//     bird_nests: false
//   });

//   useEffect(() => {
//     checkAuth();
//   }, []);

//   const checkAuth = async () => {
//     const { data: { user } } = await supabase.auth.getUser();
//     if (!user) {
//       alert('Please login first!');
//       navigate('/login');
//     }
//   };

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setImage(file);
//       setPreview(URL.createObjectURL(file));
//     }
//   };

//   const handleValueChange = (key, value) => {
//     setValues(prev => ({
//       ...prev,
//       [key]: parseInt(value)
//     }));
//   };

//   const handleCheckboxChange = (key) => {
//     setCharacteristics(prev => ({
//       ...prev,
//       [key]: !prev[key]
//     }));
//   };

//   const handleAnalyze = async (e) => {
//     e.preventDefault();
    
//     const { data: { user } } = await supabase.auth.getUser();
//     if (!user) {
//       navigate('/login');
//       return;
//     }

//     if (!image) {
//       alert('Please upload a forest image first');
//       return;
//     }

//     setLoading(true);

//     try {
//       // 1. Upload image
//       const fileExt = image.name.split('.').pop();
//       const fileName = `${user.id}_${Date.now()}.${fileExt}`;
      
//       const { data: uploadData, error: uploadError } = await supabase.storage
//         .from('forest-images')
//         .upload(fileName, image);
      
//       if (uploadError) throw uploadError;

//       // 2. Simulate AI Analysis
//       const simulatedAI = {
//         species: ['Oak', 'Pine', 'Birch', 'Maple', 'Spruce'],
//         health_score: Math.floor(Math.random() * 6) + 5, // 5-10
//         carbon_storage: Math.floor(Math.random() * 50) + 20,
//         tree_density: Math.floor(Math.random() * 400) + 100,
//         canopy_cover: Math.floor(Math.random() * 50) + 50,
//         soil_quality: ['Good', 'Average', 'Excellent'][Math.floor(Math.random() * 3)]
//       };

//       // 3. Calculate scores based on values
//       const technicalScore = (
//         simulatedAI.health_score * 2 + 
//         simulatedAI.carbon_storage / 10 + 
//         simulatedAI.canopy_cover / 10
//       ) / 4;

//       const personalScore = (
//         values.heritage * 0.3 +
//         values.beauty * 0.2 +
//         values.biodiversity * 0.2 +
//         values.recreation * 0.15 +
//         values.family * 0.15
//       ) / 10;

//       const finalResult = {
//         ai: simulatedAI,
//         values: values,
//         characteristics: characteristics,
//         scores: {
//           technical: technicalScore.toFixed(1),
//           personal: personalScore.toFixed(1),
//           overall: ((technicalScore + personalScore) / 2).toFixed(1)
//         },
//         recommendations: generateRecommendations(values, characteristics, simulatedAI)
//       };

//       // 4. Save to database
//       const { error: dbError } = await supabase
//         .from('forest_analyses')
//         .insert([
//           {
//             user_id: user.id,
//             image_url: uploadData.path,
//             ai_data: simulatedAI,
//             values: values,
//             characteristics: characteristics,
//             scores: finalResult.scores,
//             recommendations: finalResult.recommendations,
//             created_at: new Date().toISOString()
//           }
//         ]);
      
//       if (dbError) throw dbError;

//       setAiResults(finalResult);
//       alert('✅ Forest analysis completed! Check your results below.');

//     } catch (error) {
//       console.error('Error:', error);
//       alert('❌ Error: ' + error.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const generateRecommendations = (values, chars, ai) => {
//     const recs = [];
    
//     if (values.heritage > 70) recs.push('Preserve heritage trees');
//     if (values.family > 60) recs.push('Add family seating area');
//     if (chars.water_body) recs.push('Maintain water body access');
//     if (chars.wildlife) recs.push('Create wildlife corridors');
//     if (values.biodiversity > 65) recs.push('Plant diverse native species');
//     if (ai.health_score < 7) recs.push('Schedule health checkup');
//     if (values.climate > 60) recs.push('Increase carbon-sequestering trees');
    
//     return recs.slice(0, 4); // Max 4 recommendations
//   };

//   const renderProgressBar = (value) => {
//     const width = value + '%';
//     return (
//       <div className="progress-container">
//         <div className="progress-bar" style={{ width: width }}></div>
//         <span className="progress-text">{value}%</span>
//       </div>
//     );
//   };

//   return (
//     <div className="analyze-page">
//       <h1>🌳 Forest Value Canvas</h1>
      
//       {/* FOREST VALUE CANVAS LAYOUT */}
//       <div className="canvas-container">
        
//         {/* ROW 1: Photo Upload + AI Results */}
//         <div className="canvas-row">
//           <div className="canvas-card requirement-card">
//             <div className="card-header">
//               <span className="req-number">📸 1</span>
//               <h3>Photo + AI Input</h3>
//             </div>
            
//             <div className="upload-section">
//               <input 
//                 type="file" 
//                 id="image-upload"
//                 accept="image/*"
//                 onChange={handleImageChange}
//                 className="file-input"
//               />
//               <label htmlFor="image-upload" className="upload-label">
//                 📁 Upload Forest Photos
//               </label>
              
//               {preview && (
//                 <div className="image-preview-small">
//                   <img src={preview} alt="Preview" />
//                 </div>
//               )}
//             </div>
            
//             {aiResults && (
//               <div className="ai-results">
//                 <h4>AI Analysis Results:</h4>
//                 <ul>
//                   <li>🌿 <strong>Tree Species:</strong> {aiResults.ai.species.join(', ')}</li>
//                   <li>💚 <strong>Health Score:</strong> {aiResults.ai.health_score}/10 {
//                     aiResults.ai.health_score > 7 ? '🟢' : 
//                     aiResults.ai.health_score > 5 ? '🟡' : '🔴'
//                   }</li>
//                   <li>🌍 <strong>Carbon Storage:</strong> {aiResults.ai.carbon_storage} tons</li>
//                   <li>🌳 <strong>Tree Density:</strong> {aiResults.ai.tree_density} trees/ha</li>
//                   <li>☀️ <strong>Canopy Cover:</strong> {aiResults.ai.canopy_cover}%</li>
//                 </ul>
//               </div>
//             )}
//           </div>

//           {/* Value-based Weights */}
//           <div className="canvas-card requirement-card">
//             <div className="card-header">
//               <span className="req-number">❤️ 2</span>
//               <h3>Value-Based Weights</h3>
//             </div>
            
//             <div className="values-section">
//               <p className="section-subtitle">What matters most to you?</p>
              
//               {Object.entries(values).map(([key, value]) => (
//                 <div key={key} className="value-item">
//                   <label className="value-label">
//                     <span className="value-icon">
//                       {key === 'heritage' ? '🏛️' : 
//                        key === 'beauty' ? '🌸' : 
//                        key === 'biodiversity' ? '🦋' : 
//                        key === 'timber' ? '🪵' : 
//                        key === 'recreation' ? '🚶' : 
//                        key === 'climate' ? '🌍' : '👨‍👩‍👧‍👦'}
//                     </span>
//                     <span className="value-name">{key.charAt(0).toUpperCase() + key.slice(1)}</span>
//                   </label>
                  
//                   <div className="slider-container">
//                     <input
//                       type="range"
//                       min="0"
//                       max="100"
//                       value={value}
//                       onChange={(e) => handleValueChange(key, e.target.value)}
//                       className="value-slider"
//                     />
//                     {renderProgressBar(value)}
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>

//         {/* ROW 2: Forest Characteristics Checkboxes */}
//         <div className="canvas-row">
//           <div className="canvas-card full-width">
//             <div className="card-header">
//               <span className="req-number">🌿</span>
//               <h3>Forest Characteristics</h3>
//               <p className="section-subtitle">Check what your forest has:</p>
//             </div>
            
//             <div className="checkbox-grid">
//               {Object.entries(characteristics).map(([key, checked]) => (
//                 <label key={key} className="checkbox-item">
//                   <input
//                     type="checkbox"
//                     checked={checked}
//                     onChange={() => handleCheckboxChange(key)}
//                     className="checkbox-input"
//                   />
//                   <span className="checkbox-custom"></span>
//                   <span className="checkbox-label">
//                     {key === 'old_trees' ? 'Ancient/Old Trees' :
//                      key === 'wildlife' ? 'Wildlife Habitat' :
//                      key === 'water_body' ? 'Stream/Pond' :
//                      key === 'hiking_trails' ? 'Hiking Trails' :
//                      key === 'family_area' ? 'Family Gathering Area' :
//                      key === 'berry_bushes' ? 'Berry Bushes' :
//                      'Bird Nests/Sanctuary'}
//                   </span>
//                 </label>
//               ))}
//             </div>
//           </div>
//         </div>

//         {/* ROW 3: Visualization & Results */}
//         <div className="canvas-row">
//           <div className="canvas-card requirement-card">
//             <div className="card-header">
//               <span className="req-number">📊 3</span>
//               <h3>Easy Visualization</h3>
//             </div>
            
//             {aiResults ? (
//               <div className="results-visualization">
//                 <div className="score-card">
//                   <h4>YOUR FOREST SCORE:</h4>
//                   <div className="score-display">
//                     <div className="score-item">
//                       <span className="score-label">Technical:</span>
//                       <span className="score-value">{aiResults.scores.technical}/10</span>
//                       <div className="stars">
//                         {'⭐'.repeat(Math.floor(aiResults.scores.technical / 2))}
//                         {(aiResults.scores.technical % 2) >= 1 ? '☆' : ''}
//                       </div>
//                     </div>
                    
//                     <div className="score-item">
//                       <span className="score-label">Personal Value:</span>
//                       <span className="score-value">{aiResults.scores.personal}/10</span>
//                       <div className="stars">
//                         {'⭐'.repeat(Math.floor(aiResults.scores.personal / 2))}
//                         {(aiResults.scores.personal % 2) >= 1 ? '☆' : ''}
//                       </div>
//                     </div>
                    
//                     <div className="score-item overall">
//                       <span className="score-label">Overall:</span>
//                       <span className="score-value-large">{aiResults.scores.overall}/10</span>
//                     </div>
//                   </div>
//                 </div>
                
//                 <div className="recommendations">
//                   <h4>Simple Recommendations:</h4>
//                   <ul>
//                     {aiResults.recommendations.map((rec, idx) => (
//                       <li key={idx}>✅ {rec}</li>
//                     ))}
//                   </ul>
//                 </div>
//               </div>
//             ) : (
//               <div className="empty-results">
//                 <p>Upload image and set values to see your forest score</p>
//               </div>
//             )}
//           </div>

//           {/* Data Transparency */}
//           <div className="canvas-card requirement-card">
//             <div className="card-header">
//               <span className="req-number">🔍 4</span>
//               <h3>Data Transparency</h3>
//             </div>
            
//             <div className="transparency-info">
//               <h4>How we use your information:</h4>
//               <ol className="transparency-steps">
//                 <li>
//                   <span className="step-number">1</span>
//                   <span className="step-text">Photos → AI analysis → Technical data</span>
//                 </li>
//                 <li>
//                   <span className="step-number">2</span>
//                   <span className="step-text">Your values → Personalization weights</span>
//                 </li>
//                 <li>
//                   <span className="step-number">3</span>
//                   <span className="step-text">Combined → Your unique forest story</span>
//                 </li>
//               </ol>
              
//               <div className="privacy-badge">
//                 <span className="lock-icon">🔒</span>
//                 <div>
//                   <strong>Your data is safe and private!</strong>
//                   <p>We never share your personal information</p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Analyze Button */}
//       <div className="analyze-action">
//         <button 
//           onClick={handleAnalyze}
//           disabled={loading || !image}
//           className="analyze-btn-large"
//         >
//           {loading ? (
//             <>
//               <span className="spinner">⏳</span> Analyzing...
//             </>
//           ) : (
//             <>
//               🚀 ANALYZE MY FOREST
//             </>
//           )}
//         </button>
        
//         <p className="analyze-note">
//           Click to process your image with AI and generate personalized insights
//         </p>
//       </div>
//     </div>
//   );
// }

// export default AnalyzePage;





// new line of code 

import React, { useState, useEffect } from 'react';
import { supabase } from '../supabase';
import { useNavigate } from 'react-router-dom';
import './AnalyzePage.css'; // We'll create this CSS file

function AnalyzePage() {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [aiResults, setAiResults] = useState(null);
  const [activeTab, setActiveTab] = useState('upload'); // For tabs
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

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      navigate('/login');
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
      setActiveTab('values'); // Move to next tab
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

  const handleAnalyze = async (e) => {
    e.preventDefault();
    
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
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
      // 1. Upload image
      const fileExt = image.name.split('.').pop();
      const fileName = `${user.id}_${Date.now()}.${fileExt}`;
      
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('forest-images')
        .upload(fileName, image);
      
      if (uploadError) throw uploadError;

      // 2. Simulate AI Analysis
      const simulatedAI = {
        species: ['Oak', 'Pine', 'Birch', 'Maple', 'Spruce'],
        health_score: Math.floor(Math.random() * 6) + 5,
        carbon_storage: Math.floor(Math.random() * 50) + 20,
        tree_density: Math.floor(Math.random() * 400) + 100,
        canopy_cover: Math.floor(Math.random() * 50) + 50,
        soil_quality: ['Good', 'Average', 'Excellent'][Math.floor(Math.random() * 3)]
      };

      // 3. Calculate scores
      const technicalScore = (
        simulatedAI.health_score * 2 + 
        simulatedAI.carbon_storage / 10 + 
        simulatedAI.canopy_cover / 10
      ) / 4;

      const personalScore = (
        values.heritage * 0.3 +
        values.beauty * 0.2 +
        values.biodiversity * 0.2 +
        values.recreation * 0.15 +
        values.family * 0.15
      ) / 10;

      const finalResult = {
        ai: simulatedAI,
        values: values,
        characteristics: characteristics,
        scores: {
          technical: technicalScore.toFixed(1),
          personal: personalScore.toFixed(1),
          overall: ((technicalScore + personalScore) / 2).toFixed(1)
        },
        recommendations: generateRecommendations(values, characteristics, simulatedAI)
      };

      // 4. Save to database
      const { error: dbError } = await supabase
        .from('forest_analyses')
        .insert([
          {
            user_id: user.id,
            image_url: uploadData.path,
            ai_data: simulatedAI,
            values: values,
            characteristics: characteristics,
            scores: finalResult.scores,
            recommendations: finalResult.recommendations,
            created_at: new Date().toISOString()
          }
        ]);
      
      if (dbError) throw dbError;

      setAiResults(finalResult);
      setActiveTab('results');
      alert('✅ Forest analysis completed!');

    } catch (error) {
      console.error('Error:', error);
      alert('❌ Error: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const generateRecommendations = (values, chars, ai) => {
    const recs = [];
    
    if (values.heritage > 70) recs.push('Preserve heritage trees');
    if (values.family > 60) recs.push('Add family seating area');
    if (chars.water_body) recs.push('Maintain water body access');
    if (chars.wildlife) recs.push('Create wildlife corridors');
    if (values.biodiversity > 65) recs.push('Plant diverse native species');
    if (ai.health_score < 7) recs.push('Schedule health checkup');
    if (values.climate > 60) recs.push('Increase carbon-sequestering trees');
    
    return recs.slice(0, 4);
  };

  const renderProgressBar = (value) => {
    const width = value + '%';
    return (
      <div className="progress-container">
        <div className="progress-bar" style={{ width: width }}></div>
        <span className="progress-text">{value}%</span>
      </div>
    );
  };

  return (
    <div className="analyze-page-container">
      {/* Beautiful Forest Background */}
      <div className="forest-background"></div>
      
      <div className="analyze-content">
        {/* Page Header */}
        <div className="analyze-header">
          <h1>🌳 Forest Value Canvas</h1>
          <p className="subtitle">Transform your forest photos into personalized insights</p>
        </div>

        {/* Progress Steps */}
        <div className="progress-steps">
          <div className={`step ${activeTab === 'upload' ? 'active' : ''}`}>
            <span className="step-number">1</span>
            <span className="step-text">Upload Photo</span>
          </div>
          <div className={`step ${activeTab === 'values' ? 'active' : ''}`}>
            <span className="step-number">2</span>
            <span className="step-text">Set Values</span>
          </div>
          <div className={`step ${activeTab === 'results' ? 'active' : ''}`}>
            <span className="step-number">3</span>
            <span className="step-text">View Results</span>
          </div>
        </div>

        {/* Main Analysis Container */}
        <div className="analysis-container">
          
          {/* Tab 1: Upload Photo */}
          {activeTab === 'upload' && (
            <div className="upload-tab">
              <div className="upload-card">
                <div className="upload-header">
                  <h2>📸 Upload Your Forest Photo</h2>
                  <p>Take a clear photo of your forest for AI analysis</p>
                </div>
                
                <div className="upload-area">
                  <input 
                    type="file" 
                    id="image-upload"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="file-input"
                  />
                  <label htmlFor="image-upload" className="upload-label">
                    <div className="upload-icon">📁</div>
                    <div className="upload-text">
                      <h3>Click to upload</h3>
                      <p>JPG, PNG or HEIC (max 10MB)</p>
                    </div>
                  </label>
                  
                  {preview && (
                    <div className="preview-container">
                      <h4>Preview:</h4>
                      <div className="image-preview">
                        <img src={preview} alt="Forest preview" />
                        <button 
                          onClick={() => setImage(null)}
                          className="remove-btn"
                        >
                          ✕ Remove
                        </button>
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="upload-tips">
                  <h4>📝 Tips for best results:</h4>
                  <ul>
                    <li>Take photos in daylight</li>
                    <li>Include multiple tree species</li>
                    <li>Show forest floor and canopy</li>
                    <li>Avoid blurry or dark photos</li>
                  </ul>
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
                    {loading ? 'Analyzing...' : '🚀 Analyze Forest'}
                  </button>
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
                        <span className="metric-label">Carbon Storage</span>
                        <div className="metric-value">{aiResults.ai.carbon_storage} tons</div>
                      </div>
                      
                      <div className="ai-metric">
                        <span className="metric-label">Tree Density</span>
                        <div className="metric-value">{aiResults.ai.tree_density} trees/ha</div>
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
                          <h4>Personalized Results</h4>
                          <p>Combined analysis created your unique forest story</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="privacy-notice">
                      <span className="lock-icon">🔒</span>
                      <div>
                        <strong>Your data is private and secure</strong>
                        <p>We never share personal information with third parties</p>
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