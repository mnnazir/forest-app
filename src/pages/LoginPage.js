// import React, { useState } from 'react';
// import { supabase } from '../supabase';
// import { useNavigate } from 'react-router-dom';

// function LoginPage() {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [isSignUp, setIsSignUp] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [name, setName] = useState('');
//   const [forestSize, setForestSize] = useState('');
//   const navigate = useNavigate();

//   const handleAuth = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       if (isSignUp) {
//         // Sign Up
//         const { data, error } = await supabase.auth.signUp({
//           email,
//           password,
//           options: {
//             data: {
//               name: name,
//               forest_size: forestSize,
//               user_type: 'forest_owner'
//             }
//           }
//         });
        
//         if (error) throw error;
        
//         // Create user profile in database
//         if (data.user) {
//           const { error: profileError } = await supabase
//             .from('user_profiles')
//             .insert([
//               {
//                 id: data.user.id,
//                 email: email,
//                 name: name,
//                 forest_size: forestSize,
//                 created_at: new Date().toISOString()
//               }
//             ]);
          
//           if (profileError) throw profileError;
//         }
        
//         alert('✅ Sign up successful! Please check your email for confirmation.');
//         navigate('/dashboard');
        
//       } else {
//         // Sign In
//         const { data, error } = await supabase.auth.signInWithPassword({
//           email,
//           password,
//         });
        
//         if (error) throw error;
        
//         alert('✅ Login successful!');
//         navigate('/dashboard');
//       }
//     } catch (error) {
//       alert('❌ Error: ' + error.message);
//       console.error('Auth error:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="login-page">
//       <div className="login-container">
//         <div className="login-header">
//           <div className="logo-large">🌲</div>
//           <h1>Forest Ecosystem Services</h1>
//           <p className="tagline">For Small-Scale Forest Owners</p>
//         </div>

//         <div className="login-card">
//           <div className="login-tabs">
//             <button 
//               className={`tab ${!isSignUp ? 'active' : ''}`}
//               onClick={() => setIsSignUp(false)}
//             >
//               Login
//             </button>
//             <button 
//               className={`tab ${isSignUp ? 'active' : ''}`}
//               onClick={() => setIsSignUp(true)}
//             >
//               Sign Up
//             </button>
//           </div>

//           <form onSubmit={handleAuth} className="auth-form">
//             {isSignUp && (
//               <>
//                 <div className="form-group">
//                   <label>Your Name</label>
//                   <input
//                     type="text"
//                     placeholder="John Doe"
//                     value={name}
//                     onChange={(e) => setName(e.target.value)}
//                     required={isSignUp}
//                     className="auth-input"
//                   />
//                 </div>

//                 <div className="form-group">
//                   <label>Forest Size (hectares)</label>
//                   <select 
//                     value={forestSize}
//                     onChange={(e) => setForestSize(e.target.value)}
//                     required={isSignUp}
//                     className="auth-input"
//                   >
//                     <option value="">Select size</option>
//                     <option value="<1">Less than 1 ha</option>
//                     <option value="1-5">1-5 ha</option>
//                     <option value="5-10">5-10 ha</option>
//                     <option value="10-20">10-20 ha</option>
//                     <option value=">20">More than 20 ha</option>
//                   </select>
//                 </div>
//               </>
//             )}

//             <div className="form-group">
//               <label>Email Address</label>
//               <input
//                 type="email"
//                 placeholder="you@example.com"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 required
//                 className="auth-input"
//               />
//             </div>

//             <div className="form-group">
//               <label>Password</label>
//               <input
//                 type="password"
//                 placeholder="••••••••"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 required
//                 className="auth-input"
//               />
//             </div>

//             {!isSignUp && (
//               <div className="remember-forgot">
//                 <label className="checkbox-label">
//                   <input type="checkbox" /> Remember me
//                 </label>
//                 <a href="#" className="forgot-link">Forgot password?</a>
//               </div>
//             )}

//             <button type="submit" disabled={loading} className="auth-btn">
//               {loading ? (
//                 <span className="spinner">⏳</span>
//               ) : (
//                 isSignUp ? 'Create Account' : 'Login to Dashboard'
//               )}
//             </button>

//             <div className="divider">
//               <span>or continue with</span>
//             </div>

//             <button 
//               type="button"
//               onClick={() => supabase.auth.signInWithOAuth({ provider: 'google' })}
//               className="google-btn"
//             >
//               <span className="google-icon">G</span>
//               Google
//             </button>
//           </form>

//           <div className="login-footer">
//             <p>
//               {isSignUp 
//                 ? 'Already have an account? ' 
//                 : "Don't have an account? "}
//               <button 
//                 onClick={() => setIsSignUp(!isSignUp)}
//                 className="toggle-btn"
//               >
//                 {isSignUp ? 'Login here' : 'Sign up here'}
//               </button>
//             </p>
            
//             <p className="privacy-note">
//               By continuing, you agree to our Terms and Privacy Policy
//             </p>
//           </div>
//         </div>

//         <div className="demo-credentials">
//           <p><strong>Demo Account:</strong> demo@forest.com | password: 123456</p>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default LoginPage;


// new line of code to design new page of login with supabase and bg of forest

import React, { useState } from 'react';
import { supabase } from '../supabase';
import { useNavigate, Link } from 'react-router-dom';
import './LoginPage.css'; // We'll create this CSS file

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
        const { error } = await supabase.auth.signUp({
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
        
        // Create user profile
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
          await supabase
            .from('user_profiles')
            .insert([
              {
                id: user.id,
                email: email,
                name: name,
                forest_size: forestSize,
                created_at: new Date().toISOString()
              }
            ]);
        }
        
        alert('✅ Account created! Please check your email for confirmation.');
        navigate('/dashboard');
        
      } else {
        // Sign In
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        
        if (error) throw error;
        
        alert('✅ Login successful!');
        navigate('/dashboard');
      }
    } catch (error) {
      alert('❌ ' + error.message);
      console.error('Auth error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      {/* Background Image */}
      <div className="login-background"></div>
      
      <div className="login-container">
        {/* Left Side - Branding */}
        <div className="login-branding">
          <div className="brand-logo">
            <span className="logo-icon">🌲</span>
            <h1>Forest Value Canvas</h1>
          </div>
          
          <div className="brand-tagline">
            <h2>Welcome Back to Your Forest</h2>
            <p>Join thousands of forest owners making sustainable decisions across Germany & Switzerland</p>
          </div>
          
          <div className="brand-features">
            <div className="feature">
              <span className="feature-icon">🔒</span>
              <div className="feature-text">
                <h4>100% Private</h4>
                <p>Your data stays with you</p>
              </div>
            </div>
            
            <div className="feature">
              <span className="feature-icon">🎯</span>
              <div className="feature-text">
                <h4>Value-Based</h4>
                <p>Tailored to your priorities</p>
              </div>
            </div>
            
            <div className="feature">
              <span className="feature-icon">🤝</span>
              <div className="feature-text">
                <h4>Community Focused</h4>
                <p>For small-scale forest owners</p>
              </div>
            </div>
          </div>
          
          <div className="brand-testimonial">
            <p className="testimonial-text">
              "Finally a tool that understands my forest is more than just timber"
            </p>
            <p className="testimonial-author">— Hans Müller, Bavarian Forest Owner</p>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="login-form-container">
          <div className="form-card">
            {/* Tabs */}
            <div className="form-tabs">
              <button 
                className={`tab-btn ${!isSignUp ? 'active' : ''}`}
                onClick={() => setIsSignUp(false)}
              >
                Sign In
              </button>
              <button 
                className={`tab-btn ${isSignUp ? 'active' : ''}`}
                onClick={() => setIsSignUp(true)}
              >
                Create Account
              </button>
            </div>

            {/* Form */}
            <form className="auth-form" onSubmit={handleAuth}>
              <div className="form-header">
                <h2>{isSignUp ? 'Start Your Forest Journey' : 'Welcome Back'}</h2>
                <p>{isSignUp ? 'Create your free account' : 'Sign in to continue'}</p>
              </div>

              {isSignUp && (
                <>
                  <div className="form-group">
                    <label htmlFor="name">
                      <span className="label-icon">👤</span>
                      Your Name
                    </label>
                    <input
                      id="name"
                      type="text"
                      placeholder="John Doe"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required={isSignUp}
                      className="form-input"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="forestSize">
                      <span className="label-icon">🌳</span>
                      Forest Size
                    </label>
                    <select 
                      id="forestSize"
                      value={forestSize}
                      onChange={(e) => setForestSize(e.target.value)}
                      required={isSignUp}
                      className="form-input"
                    >
                      <option value="">Select forest size</option>
                      <option value="<1">Less than 1 hectare</option>
                      <option value="1-5">1-5 hectares</option>
                      <option value="5-10">5-10 hectares</option>
                      <option value="10-20">10-20 hectares</option>
                      <option value=">20">More than 20 hectares</option>
                    </select>
                  </div>
                </>
              )}

              <div className="form-group">
                <label htmlFor="email">
                  <span className="label-icon">📧</span>
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label htmlFor="password">
                  <span className="label-icon">🔑</span>
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="form-input"
                />
              </div>

              {!isSignUp && (
                <div className="form-options">
                  <label className="checkbox">
                    <input type="checkbox" />
                    <span className="checkmark"></span>
                    Remember me
                  </label>
                  <button 
                    type="button" 
                    className="forgot-password"
                    onClick={() => alert('Password reset feature coming soon!')}
                  >
                    Forgot password?
                  </button>
                </div>
              )}

              <button 
                type="submit" 
                disabled={loading}
                className="submit-btn"
              >
                {loading ? (
                  <span className="loading-spinner"></span>
                ) : (
                  isSignUp ? 'Create Account' : 'Sign In'
                )}
                <span className="btn-arrow">→</span>
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
                Continue with Google
              </button>
            </form>

            <div className="form-footer">
              <p>
                {isSignUp ? 'Already have an account?' : "Don't have an account?"}
                <button 
                  onClick={() => setIsSignUp(!isSignUp)}
                  className="toggle-link"
                >
                  {isSignUp ? ' Sign In' : ' Create Account'}
                </button>
              </p>
              
              <p className="terms">
                By continuing, you agree to our 
                <Link to="/terms"> Terms</Link> and 
                <Link to="/privacy"> Privacy Policy</Link>
              </p>
            </div>

            {/* Demo Credentials */}
            <div className="demo-credentials">
              <h4>Demo Account:</h4>
              <div className="demo-info">
                <div className="demo-item">
                  <span className="demo-label">Email:</span>
                  <span className="demo-value">demo@forest.com</span>
                </div>
                <div className="demo-item">
                  <span className="demo-label">Password:</span>
                  <span className="demo-value">123456</span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="quick-links">
            <Link to="/" className="home-link">
              ← Back to Home
            </Link>
            <div className="support">
              Need help? <Link to="/contact">Contact Support</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;