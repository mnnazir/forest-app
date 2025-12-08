import React, { useState } from 'react';
import { supabase } from '../supabase';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState('');
  const [forestSize, setForestSize] = useState('');
  const navigate = useNavigate();

  const handleAuth = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isSignUp) {
        // Sign Up
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              name: name,
              forest_size: forestSize,
              user_type: 'forest_owner'
            }
          }
        });
        
        if (error) throw error;
        
        // Create user profile in database
        if (data.user) {
          const { error: profileError } = await supabase
            .from('user_profiles')
            .insert([
              {
                id: data.user.id,
                email: email,
                name: name,
                forest_size: forestSize,
                created_at: new Date().toISOString()
              }
            ]);
          
          if (profileError) throw profileError;
        }
        
        alert('✅ Sign up successful! Please check your email for confirmation.');
        navigate('/dashboard');
        
      } else {
        // Sign In
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        
        if (error) throw error;
        
        alert('✅ Login successful!');
        navigate('/dashboard');
      }
    } catch (error) {
      alert('❌ Error: ' + error.message);
      console.error('Auth error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-header">
          <div className="logo-large">🌲</div>
          <h1>Forest Ecosystem Services</h1>
          <p className="tagline">For Small-Scale Forest Owners</p>
        </div>

        <div className="login-card">
          <div className="login-tabs">
            <button 
              className={`tab ${!isSignUp ? 'active' : ''}`}
              onClick={() => setIsSignUp(false)}
            >
              Login
            </button>
            <button 
              className={`tab ${isSignUp ? 'active' : ''}`}
              onClick={() => setIsSignUp(true)}
            >
              Sign Up
            </button>
          </div>

          <form onSubmit={handleAuth} className="auth-form">
            {isSignUp && (
              <>
                <div className="form-group">
                  <label>Your Name</label>
                  <input
                    type="text"
                    placeholder="John Doe"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required={isSignUp}
                    className="auth-input"
                  />
                </div>

                <div className="form-group">
                  <label>Forest Size (hectares)</label>
                  <select 
                    value={forestSize}
                    onChange={(e) => setForestSize(e.target.value)}
                    required={isSignUp}
                    className="auth-input"
                  >
                    <option value="">Select size</option>
                    <option value="<1">Less than 1 ha</option>
                    <option value="1-5">1-5 ha</option>
                    <option value="5-10">5-10 ha</option>
                    <option value="10-20">10-20 ha</option>
                    <option value=">20">More than 20 ha</option>
                  </select>
                </div>
              </>
            )}

            <div className="form-group">
              <label>Email Address</label>
              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="auth-input"
              />
            </div>

            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="auth-input"
              />
            </div>

            {!isSignUp && (
              <div className="remember-forgot">
                <label className="checkbox-label">
                  <input type="checkbox" /> Remember me
                </label>
                <a href="#" className="forgot-link">Forgot password?</a>
              </div>
            )}

            <button type="submit" disabled={loading} className="auth-btn">
              {loading ? (
                <span className="spinner">⏳</span>
              ) : (
                isSignUp ? 'Create Account' : 'Login to Dashboard'
              )}
            </button>

            <div className="divider">
              <span>or continue with</span>
            </div>

            <button 
              type="button"
              onClick={() => supabase.auth.signInWithOAuth({ provider: 'google' })}
              className="google-btn"
            >
              <span className="google-icon">G</span>
              Google
            </button>
          </form>

          <div className="login-footer">
            <p>
              {isSignUp 
                ? 'Already have an account? ' 
                : "Don't have an account? "}
              <button 
                onClick={() => setIsSignUp(!isSignUp)}
                className="toggle-btn"
              >
                {isSignUp ? 'Login here' : 'Sign up here'}
              </button>
            </p>
            
            <p className="privacy-note">
              By continuing, you agree to our Terms and Privacy Policy
            </p>
          </div>
        </div>

        <div className="demo-credentials">
          <p><strong>Demo Account:</strong> demo@forest.com | password: 123456</p>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;