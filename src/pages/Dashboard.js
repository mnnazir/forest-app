// import React, { useEffect, useState } from 'react';
// import { supabase } from '../supabase';

// function Dashboard() {
//   const [user, setUser] = useState(null);
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [isSignUp, setIsSignUp] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [analyses, setAnalyses] = useState([]);

//   useEffect(() => {
//     checkUser();
//   }, []);

//   const checkUser = async () => {
//     const { data: { user } } = await supabase.auth.getUser();
//     // setUser(user);  MN CHANGED
//     if (user) {
//       fetchAnalyses(user.id);
//     }
//   };

//   const fetchAnalyses = async (userId) => {
//     const { data, error } = await supabase
//       .from('forest_analyses')
//       .select('*')
//       .eq('user_id', userId)
//       .order('created_at', { ascending: false });
    
//     if (!error && data) {
//       setAnalyses(data);
//     }
//   };

//   const handleAuth = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       if (isSignUp) {
//         // Sign Up
//         const { data, error } = await supabase.auth.signUp({
//           email,
//           password,
//         });
//         if (error) throw error;
//         alert('✅ Sign up successful! Please check your email.');
//       } else {
//         // Sign In
//         const { data, error } = await supabase.auth.signInWithPassword({
//           email,
//           password,
//         });
//         if (error) throw error;
//         alert('✅ Login successful!');
//         setUser(data.user);
//         fetchAnalyses(data.user.id);
//       }
//     } catch (error) {
//       alert('❌ Error: ' + error.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleLogout = async () => {
//     await supabase.auth.signOut();
//     setUser(null);
//     setAnalyses([]);
//   };

//   return (
//     <div className="page">
//       <h1>📊 Dashboard</h1>
      
//       {!user ? (
//         <div className="auth-container">
//           <h2>{isSignUp ? 'Create Account' : 'Login'}</h2>
          
//           <form onSubmit={handleAuth} className="auth-form">
//             <input
//               type="email"
//               placeholder="Email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//               className="auth-input"
//             />
//             <input
//               type="password"
//               placeholder="Password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//               className="auth-input"
//             />
            
//             <button type="submit" disabled={loading} className="auth-btn">
//               {loading ? 'Processing...' : (isSignUp ? 'Sign Up' : 'Login')}
//             </button>
//           </form>

//           <div className="auth-footer">
//             <button onClick={() => setIsSignUp(!isSignUp)} className="toggle-btn">
//               {isSignUp ? 'Already have account? Login' : 'New user? Sign Up'}
//             </button>
            
//             <p className="demo-credentials">
//               Demo: test@example.com | password: 123456
//             </p>
//           </div>
//         </div>
//       ) : (
//         <>
//           <div className="dashboard-header">
//             <div className="user-info">
//               <h2>Welcome, {user.email}</h2>
//               <p>You are successfully logged in</p>
//             </div>
//             <button onClick={handleLogout} className="logout-btn">
//               Logout
//             </button>
//           </div>

//           <div className="stats">
//             <div className="stat-card">
//               <h3>Total Analyses</h3>
//               <p className="stat-number">{analyses.length}</p>
//             </div>
//             <div className="stat-card">
//               <h3>Avg Biodiversity</h3>
//               <p className="stat-number">
//                 {analyses.length > 0 
//                   ? Math.round(analyses.reduce((sum, a) => sum + (a.biodiversity || 0), 0) / analyses.length)
//                   : 0
//                 }
//               </p>
//             </div>
//             <div className="stat-card">
//               <h3>Last Analysis</h3>
//               <p className="stat-number">
//                 {analyses.length > 0 
//                   ? new Date(analyses[0].created_at).toLocaleDateString()
//                   : 'Never'
//                 }
//               </p>
//             </div>
//           </div>

//           <div className="analyses-section">
//             <h2>Your Forest Analyses</h2>
            
//             {analyses.length === 0 ? (
//               <div className="empty-state">
//                 <p>📭 No analyses yet</p>
//                 <p>Go to Analyze page to upload your first forest image!</p>
//               </div>
//             ) : (
//               <div className="analyses-list">
//                 {analyses.map((analysis) => (
//                   <div key={analysis.id} className="analysis-card">
//                     <div className="analysis-header">
//                       <h3>Analysis #{analysis.id}</h3>
//                       <span className="date">
//                         {new Date(analysis.created_at).toLocaleString()}
//                       </span>
//                     </div>
                    
//                     <div className="analysis-body">
//                       <div className="analysis-item">
//                         <span>Biodiversity:</span>
//                         <span className={`score ${analysis.biodiversity > 70 ? 'high' : analysis.biodiversity > 40 ? 'medium' : 'low'}`}>
//                           {analysis.biodiversity}/100
//                         </span>
//                       </div>
                      
//                       <div className="analysis-item">
//                         <span>Health:</span>
//                         <span className={`health ${analysis.health?.toLowerCase()}`}>
//                           {analysis.health}
//                         </span>
//                       </div>
                      
//                       <div className="analysis-item">
//                         <span>Species:</span>
//                         <span>{analysis.species?.join(', ') || 'Not specified'}</span>
//                       </div>
                      
//                       <div className="analysis-item">
//                         <span>Carbon Storage:</span>
//                         <span>{analysis.carbon_storage || 'N/A'}</span>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>
//         </>
//       )}
//     </div>
//   );
// }

// export default Dashboard;


import React, { useEffect, useState } from 'react';
import { supabase } from '../supabase';
import './Dashboard.css'; // Agar CSS file hai toh

function Dashboard() {
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [loading, setLoading] = useState(false);
  const [analyses, setAnalyses] = useState([]);
  const [saveError, setSaveError] = useState(null);
  const [isSaving, setIsSaving] = useState(false);

  // Check user on component mount
  useEffect(() => {
    console.log("Dashboard mounted - checking user...");
    checkUser();
    
    // Listen for auth changes (login/logout)
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log("Auth state changed:", event);
        if (session?.user) {
          setUser(session.user);
          fetchAnalyses(session.user.id);
        } else {
          setUser(null);
          setAnalyses([]);
        }
      }
    );
    
    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, []);

  // Check current user
  const checkUser = async () => {
    try {
      console.log("Checking user session...");
      
      const { data, error } = await supabase.auth.getUser();
      
      if (error) {
        console.error("Auth session error:", error.message);
        setUser(null);
        return;
      }
      
      console.log("User found:", data.user?.email);
      setUser(data.user); // ✅ YEH LINE IMPORTANT HAI
      
      if (data.user) {
        await fetchAnalyses(data.user.id);
      } else {
        setAnalyses([]);
      }
    } catch (err) {
      console.error("Error checking user:", err);
      setUser(null);
    }
  };

  // Fetch user's analyses
  const fetchAnalyses = async (userId) => {
    try {
      console.log("Fetching analyses for user:", userId);
      
      const { data, error } = await supabase
        .from('forest_analyses') // Table name - change if different
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });
      
      if (error) {
        console.error("Fetch error:", error);
        return;
      }
      
      console.log("Fetched analyses:", data?.length || 0);
      setAnalyses(data || []);
    } catch (err) {
      console.error("Error fetching analyses:", err);
    }
  };

  // ✅ IMPORTANT: Save new analysis function
  const saveAnalysis = async (analysisData) => {
    if (!user) {
      alert("❌ Please login first to save analysis!");
      return { success: false, error: "Not logged in" };
    }
    
    setIsSaving(true);
    setSaveError(null);
    
    try {
      console.log("Saving analysis:", analysisData);
      
      // Prepare data for Supabase
      const saveData = {
        user_id: user.id,
        image_url: analysisData.imageUrl || analysisData.image || "no-image.jpg",
        biodiversity: analysisData.biodiversity || analysisData.score || 0,
        health: analysisData.health || 'Unknown',
        species: Array.isArray(analysisData.species) ? analysisData.species : 
                (analysisData.species ? [analysisData.species] : []),
        carbon_storage: analysisData.carbonStorage || analysisData.carbon || 'N/A',
        analysis_data: analysisData.fullData || analysisData, // Store full data
        created_at: new Date().toISOString()
      };
      
      console.log("Data to save:", saveData);
      
      // Save to Supabase
      const { data, error } = await supabase
        .from('forest_analyses')
        .insert([saveData])
        .select();
      
      if (error) {
        console.error("❌ SUPABASE SAVE ERROR:", {
          message: error.message,
          code: error.code,
          details: error.details,
          hint: error.hint
        });
        
        setSaveError(error.message);
        alert(`❌ Save failed: ${error.message}`);
        return { success: false, error: error.message };
      }
      
      console.log("✅ Analysis saved successfully! ID:", data[0]?.id);
      
      // Refresh analyses list
      await fetchAnalyses(user.id);
      
      alert('✅ Analysis saved successfully!');
      return { success: true, id: data[0]?.id, data: data[0] };
      
    } catch (err) {
      console.error("❌ Unexpected save error:", err);
      setSaveError(err.message);
      alert(`❌ Error: ${err.message}`);
      return { success: false, error: err.message };
    } finally {
      setIsSaving(false);
    }
  };

  // Handle authentication
  const handleAuth = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      alert("Please enter email and password");
      return;
    }
    
    setLoading(true);
    setSaveError(null);

    try {
      if (isSignUp) {
        // Sign Up
        const { data, error } = await supabase.auth.signUp({
          email: email.trim(),
          password: password.trim(),
        });
        
        if (error) throw error;
        
        alert('✅ Sign up successful! You can now login.');
        setIsSignUp(false); // Switch to login
        setEmail('');
        setPassword('');
        
      } else {
        // Sign In
        const { data, error } = await supabase.auth.signInWithPassword({
          email: email.trim(),
          password: password.trim(),
        });
        
        if (error) throw error;
        
        alert('✅ Login successful!');
        setUser(data.user);
        await fetchAnalyses(data.user.id);
      }
    } catch (error) {
      console.error("Auth error:", error);
      setSaveError(error.message);
      alert(`❌ Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  // Handle logout
  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      setUser(null);
      setAnalyses([]);
      setEmail('');
      setPassword('');
      alert('Logged out successfully');
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  // Test save function (for debugging)
  const testSave = async () => {
    const testData = {
      imageUrl: "test-image.jpg",
      biodiversity: 85,
      health: "Excellent",
      species: ["Oak", "Pine", "Maple"],
      carbonStorage: "120 tons/ha",
      fullData: { test: true, timestamp: new Date().toISOString() }
    };
    
    const result = await saveAnalysis(testData);
    console.log("Test save result:", result);
  };

  return (
    <div className="page">
      <h1>🌳 Forest Analysis Dashboard</h1>
      
      {/* Debug buttons - remove in production */}
      <div style={{ marginBottom: '10px', display: 'flex', gap: '10px' }}>
        <button onClick={checkUser} className="debug-btn">
          🔄 Check User
        </button>
        <button onClick={testSave} className="debug-btn">
          🧪 Test Save
        </button>
        <button onClick={() => console.log("User:", user, "Analyses:", analyses)} className="debug-btn">
          📊 Log State
        </button>
      </div>
      
      {saveError && (
        <div className="error-message">
          ⚠️ Last Error: {saveError}
        </div>
      )}
      
      {!user ? (
        <div className="auth-container">
          <h2>{isSignUp ? 'Create Account' : 'Login to Dashboard'}</h2>
          
          <form onSubmit={handleAuth} className="auth-form">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="auth-input"
              disabled={loading}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="auth-input"
              disabled={loading}
            />
            
            <button 
              type="submit" 
              disabled={loading || isSaving} 
              className="auth-btn"
            >
              {loading ? 'Processing...' : (isSignUp ? 'Sign Up' : 'Login')}
            </button>
          </form>

          <div className="auth-footer">
            <button 
              onClick={() => setIsSignUp(!isSignUp)} 
              className="toggle-btn"
              disabled={loading}
            >
              {isSignUp ? 'Already have account? Login' : 'New user? Sign Up'}
            </button>
            
            <p className="demo-credentials">
              💡 Demo: test@example.com | password: 123456
            </p>
          </div>
        </div>
      ) : (
        <>
          <div className="dashboard-header">
            <div className="user-info">
              <h2>👋 Welcome, {user.email}</h2>
              <p className="user-id">User ID: {user.id.substring(0, 8)}...</p>
            </div>
            <div className="header-actions">
              <button onClick={testSave} className="action-btn" disabled={isSaving}>
                {isSaving ? 'Saving...' : '🧪 Test Save'}
              </button>
              <button onClick={handleLogout} className="logout-btn">
                🚪 Logout
              </button>
            </div>
          </div>

          <div className="stats">
            <div className="stat-card">
              <h3>📊 Total Analyses</h3>
              <p className="stat-number">{analyses.length}</p>
            </div>
            <div className="stat-card">
              <h3>🌿 Avg Biodiversity</h3>
              <p className="stat-number">
                {analyses.length > 0 
                  ? Math.round(analyses.reduce((sum, a) => sum + (a.biodiversity || 0), 0) / analyses.length)
                  : 0
                }/100
              </p>
            </div>
            <div className="stat-card">
              <h3>⏰ Last Analysis</h3>
              <p className="stat-number">
                {analyses.length > 0 
                  ? new Date(analyses[0].created_at).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })
                  : 'Never'
                }
              </p>
            </div>
            <div className="stat-card">
              <h3>🔄 Save Status</h3>
              <p className="stat-number">
                {isSaving ? 'Saving...' : 'Ready'}
              </p>
            </div>
          </div>

          <div className="analyses-section">
            <div className="section-header">
              <h2>📋 Your Forest Analyses ({analyses.length})</h2>
              <button onClick={() => fetchAnalyses(user.id)} className="refresh-btn">
                🔄 Refresh
              </button>
            </div>
            
            {analyses.length === 0 ? (
              <div className="empty-state">
                <p>📭 No analyses yet</p>
                <p>Go to Analyze page to upload your first forest image!</p>
                <p className="hint">
                  💡 Use the "Test Save" button above to create a sample analysis
                </p>
              </div>
            ) : (
              <div className="analyses-list">
                {analyses.map((analysis) => (
                  <div key={analysis.id} className="analysis-card">
                    <div className="analysis-header">
                      <h3>Analysis #{analysis.id}</h3>
                      <span className="date">
                        {new Date(analysis.created_at).toLocaleString()}
                      </span>
                    </div>
                    
                    <div className="analysis-image">
                      {analysis.image_url && !analysis.image_url.includes('no-image') ? (
                        <img 
                          src={analysis.image_url} 
                          alt="Forest analysis" 
                          className="analysis-thumbnail"
                        />
                      ) : (
                        <div className="no-image">🖼️ No Image</div>
                      )}
                    </div>
                    
                    <div className="analysis-body">
                      <div className="analysis-row">
                        <div className="analysis-item">
                          <span className="label">🌿 Biodiversity:</span>
                          <span className={`score ${analysis.biodiversity > 70 ? 'high' : analysis.biodiversity > 40 ? 'medium' : 'low'}`}>
                            {analysis.biodiversity || 0}/100
                          </span>
                        </div>
                        
                        <div className="analysis-item">
                          <span className="label">💚 Health:</span>
                          <span className={`health ${analysis.health?.toLowerCase() || 'unknown'}`}>
                            {analysis.health || 'Unknown'}
                          </span>
                        </div>
                      </div>
                      
                      <div className="analysis-row">
                        <div className="analysis-item">
                          <span className="label">🌳 Species:</span>
                          <span className="species-list">
                            {Array.isArray(analysis.species) && analysis.species.length > 0 
                              ? analysis.species.join(', ')
                              : (analysis.species || 'Not specified')}
                          </span>
                        </div>
                        
                        <div className="analysis-item">
                          <span className="label">🌍 Carbon Storage:</span>
                          <span className="carbon">
                            {analysis.carbon_storage || 'N/A'}
                          </span>
                        </div>
                      </div>
                      
                      {analysis.analysis_data && (
                        <div className="analysis-full-data">
                          <details>
                            <summary>📄 View Full Data</summary>
                            <pre className="data-json">
                              {JSON.stringify(analysis.analysis_data, null, 2)}
                            </pre>
                          </details>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </>
      )}
      
      {/* Debug info - remove in production */}
      <div className="debug-info">
        <details>
          <summary>🐛 Debug Info</summary>
          <p><strong>User:</strong> {user ? user.email : 'Not logged in'}</p>
          <p><strong>Analyses Count:</strong> {analyses.length}</p>
          <p><strong>Save Status:</strong> {isSaving ? 'Saving...' : 'Idle'}</p>
          <p><strong>Last Error:</strong> {saveError || 'None'}</p>
        </details>
      </div>
    </div>
  );
}

export default Dashboard; 