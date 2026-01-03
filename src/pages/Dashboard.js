import React, { useEffect, useState } from 'react';
import { supabase } from '../supabase';

function Dashboard() {
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [loading, setLoading] = useState(false);
  const [analyses, setAnalyses] = useState([]);

  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    // setUser(user);  MN CHANGED
    if (user) {
      fetchAnalyses(user.id);
    }
  };

  const fetchAnalyses = async (userId) => {
    const { data, error } = await supabase
      .from('forest_analyses')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });
    
    if (!error && data) {
      setAnalyses(data);
    }
  };

  const handleAuth = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isSignUp) {
        // Sign Up
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
        });
        if (error) throw error;
        alert('✅ Sign up successful! Please check your email.');
      } else {
        // Sign In
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
        alert('✅ Login successful!');
        setUser(data.user);
        fetchAnalyses(data.user.id);
      }
    } catch (error) {
      alert('❌ Error: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setAnalyses([]);
  };

  return (
    <div className="page">
      <h1>📊 Dashboard</h1>
      
      {!user ? (
        <div className="auth-container">
          <h2>{isSignUp ? 'Create Account' : 'Login'}</h2>
          
          <form onSubmit={handleAuth} className="auth-form">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="auth-input"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="auth-input"
            />
            
            <button type="submit" disabled={loading} className="auth-btn">
              {loading ? 'Processing...' : (isSignUp ? 'Sign Up' : 'Login')}
            </button>
          </form>

          <div className="auth-footer">
            <button onClick={() => setIsSignUp(!isSignUp)} className="toggle-btn">
              {isSignUp ? 'Already have account? Login' : 'New user? Sign Up'}
            </button>
            
            <p className="demo-credentials">
              Demo: test@example.com | password: 123456
            </p>
          </div>
        </div>
      ) : (
        <>
          <div className="dashboard-header">
            <div className="user-info">
              <h2>Welcome, {user.email}</h2>
              <p>You are successfully logged in</p>
            </div>
            <button onClick={handleLogout} className="logout-btn">
              Logout
            </button>
          </div>

          <div className="stats">
            <div className="stat-card">
              <h3>Total Analyses</h3>
              <p className="stat-number">{analyses.length}</p>
            </div>
            <div className="stat-card">
              <h3>Avg Biodiversity</h3>
              <p className="stat-number">
                {analyses.length > 0 
                  ? Math.round(analyses.reduce((sum, a) => sum + (a.biodiversity || 0), 0) / analyses.length)
                  : 0
                }
              </p>
            </div>
            <div className="stat-card">
              <h3>Last Analysis</h3>
              <p className="stat-number">
                {analyses.length > 0 
                  ? new Date(analyses[0].created_at).toLocaleDateString()
                  : 'Never'
                }
              </p>
            </div>
          </div>

          <div className="analyses-section">
            <h2>Your Forest Analyses</h2>
            
            {analyses.length === 0 ? (
              <div className="empty-state">
                <p>📭 No analyses yet</p>
                <p>Go to Analyze page to upload your first forest image!</p>
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
                    
                    <div className="analysis-body">
                      <div className="analysis-item">
                        <span>Biodiversity:</span>
                        <span className={`score ${analysis.biodiversity > 70 ? 'high' : analysis.biodiversity > 40 ? 'medium' : 'low'}`}>
                          {analysis.biodiversity}/100
                        </span>
                      </div>
                      
                      <div className="analysis-item">
                        <span>Health:</span>
                        <span className={`health ${analysis.health?.toLowerCase()}`}>
                          {analysis.health}
                        </span>
                      </div>
                      
                      <div className="analysis-item">
                        <span>Species:</span>
                        <span>{analysis.species?.join(', ') || 'Not specified'}</span>
                      </div>
                      
                      <div className="analysis-item">
                        <span>Carbon Storage:</span>
                        <span>{analysis.carbon_storage || 'N/A'}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default Dashboard;

