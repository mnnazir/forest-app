

// // new line of code to design new page of login with supabase and bg of forest

// import React, { useState } from 'react';
// import { supabase } from '../supabase';
// import { useNavigate, Link } from 'react-router-dom';
// import './LoginPage.css'; // We'll create this CSS file

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
//         const { error } = await supabase.auth.signUp({
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
        
//         // Create user profile
//         const { data: { user } } = await supabase.auth.getUser();
//         if (user) {
//           await supabase
//             .from('user_profiles')
//             .insert([
//               {
//                 id: user.id,
//                 email: email,
//                 name: name,
//                 forest_size: forestSize,
//                 created_at: new Date().toISOString()
//               }
//             ]);
//         }
        
//         alert('✅ Account created! Please check your email for confirmation.');
//         navigate('/dashboard');
        
//       } else {
//         // Sign In
//         const { error } = await supabase.auth.signInWithPassword({
//           email,
//           password,
//         });
        
//         if (error) throw error;
        
//         alert('✅ Login successful!');
//         navigate('/dashboard');
//       }
//     } catch (error) {
//       alert('❌ ' + error.message);
//       console.error('Auth error:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="login-page">
//       {/* Background Image */}
//       <div className="login-background"></div>
      
//       <div className="login-container">
//         {/* Left Side - Branding */}
//         <div className="login-branding">
//           <div className="brand-logo">
//             <span className="logo-icon">🌲</span>
//             <h1>Forest Value Canvas</h1>
//           </div>
          
//           <div className="brand-tagline">
//             <h2>Welcome Back to Your Forest</h2>
//             <p>Join thousands of forest owners making sustainable decisions across Germany & Switzerland</p>
//           </div>
          
//           <div className="brand-features">
//             <div className="feature">
//               <span className="feature-icon">🔒</span>
//               <div className="feature-text">
//                 <h4>100% Private</h4>
//                 <p>Your data stays with you</p>
//               </div>
//             </div>
            
//             <div className="feature">
//               <span className="feature-icon">🎯</span>
//               <div className="feature-text">
//                 <h4>Value-Based</h4>
//                 <p>Tailored to your priorities</p>
//               </div>
//             </div>
            
//             <div className="feature">
//               <span className="feature-icon">🤝</span>
//               <div className="feature-text">
//                 <h4>Community Focused</h4>
//                 <p>For small-scale forest owners</p>
//               </div>
//             </div>
//           </div>
          
//           <div className="brand-testimonial">
//             <p className="testimonial-text">
//               "Finally a tool that understands my forest is more than just timber"
//             </p>
//             <p className="testimonial-author">— Hans Müller, Bavarian Forest Owner</p>
//           </div>
//         </div>

//         {/* Right Side - Login Form */}
//         <div className="login-form-container">
//           <div className="form-card">
//             {/* Tabs */}
//             <div className="form-tabs">
//               <button 
//                 className={`tab-btn ${!isSignUp ? 'active' : ''}`}
//                 onClick={() => setIsSignUp(false)}
//               >
//                 Sign In
//               </button>
//               <button 
//                 className={`tab-btn ${isSignUp ? 'active' : ''}`}
//                 onClick={() => setIsSignUp(true)}
//               >
//                 Create Account
//               </button>
//             </div>

//             {/* Form */}
//             <form className="auth-form" onSubmit={handleAuth}>
//               <div className="form-header">
//                 <h2>{isSignUp ? 'Start Your Forest Journey' : 'Welcome Back'}</h2>
//                 <p>{isSignUp ? 'Create your free account' : 'Sign in to continue'}</p>
//               </div>

//               {isSignUp && (
//                 <>
//                   <div className="form-group">
//                     <label htmlFor="name">
//                       <span className="label-icon">👤</span>
//                       Your Name
//                     </label>
//                     <input
//                       id="name"
//                       type="text"
//                       placeholder="John Doe"
//                       value={name}
//                       onChange={(e) => setName(e.target.value)}
//                       required={isSignUp}
//                       className="form-input"
//                     />
//                   </div>

//                   <div className="form-group">
//                     <label htmlFor="forestSize">
//                       <span className="label-icon">🌳</span>
//                       Forest Size
//                     </label>
//                     <select 
//                       id="forestSize"
//                       value={forestSize}
//                       onChange={(e) => setForestSize(e.target.value)}
//                       required={isSignUp}
//                       className="form-input"
//                     >
//                       <option value="">Select forest size</option>
//                       <option value="<1">Less than 1 hectare</option>
//                       <option value="1-5">1-5 hectares</option>
//                       <option value="5-10">5-10 hectares</option>
//                       <option value="10-20">10-20 hectares</option>
//                       <option value=">20">More than 20 hectares</option>
//                     </select>
//                   </div>
//                 </>
//               )}

//               <div className="form-group">
//                 <label htmlFor="email">
//                   <span className="label-icon">📧</span>
//                   Email Address
//                 </label>
//                 <input
//                   id="email"
//                   type="email"
//                   placeholder="your@email.com"
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                   required
//                   className="form-input"
//                 />
//               </div>

//               <div className="form-group">
//                 <label htmlFor="password">
//                   <span className="label-icon">🔑</span>
//                   Password
//                 </label>
//                 <input
//                   id="password"
//                   type="password"
//                   placeholder="••••••••"
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                   required
//                   className="form-input"
//                 />
//               </div>

//               {!isSignUp && (
//                 <div className="form-options">
//                   <label className="checkbox">
//                     <input type="checkbox" />
//                     <span className="checkmark"></span>
//                     Remember me
//                   </label>
//                   <button 
//                     type="button" 
//                     className="forgot-password"
//                     onClick={() => alert('Password reset feature coming soon!')}
//                   >
//                     Forgot password?
//                   </button>
//                 </div>
//               )}

//               <button 
//                 type="submit" 
//                 disabled={loading}
//                 className="submit-btn"
//               >
//                 {loading ? (
//                   <span className="loading-spinner"></span>
//                 ) : (
//                   isSignUp ? 'Create Account' : 'Sign In'
//                 )}
//                 <span className="btn-arrow">→</span>
//               </button>

//               <div className="divider">
//                 <span>or continue with</span>
//               </div>

//               <button 
//                 type="button"
//                 onClick={() => supabase.auth.signInWithOAuth({ provider: 'google' })}
//                 className="google-btn"
//               >
//                 <span className="google-icon">G</span>
//                 Continue with Google
//               </button>
//             </form>

//             <div className="form-footer">
//               <p>
//                 {isSignUp ? 'Already have an account?' : "Don't have an account?"}
//                 <button 
//                   onClick={() => setIsSignUp(!isSignUp)}
//                   className="toggle-link"
//                 >
//                   {isSignUp ? ' Sign In' : ' Create Account'}
//                 </button>
//               </p>
              
//               <p className="terms">
//                 By continuing, you agree to our 
//                 <Link to="/terms"> Terms</Link> and 
//                 <Link to="/privacy"> Privacy Policy</Link>
//               </p>
//             </div>

//             {/* Demo Credentials */}
//             <div className="demo-credentials">
//               <h4>Demo Account:</h4>
//               <div className="demo-info">
//                 <div className="demo-item">
//                   <span className="demo-label">Email:</span>
//                   <span className="demo-value">demo@forest.com</span>
//                 </div>
//                 <div className="demo-item">
//                   <span className="demo-label">Password:</span>
//                   <span className="demo-value">123456</span>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Quick Links */}
//           <div className="quick-links">
//             <Link to="/" className="home-link">
//               ← Back to Home
//             </Link>
//             <div className="support">
//               Need help? <Link to="/contact">Contact Support</Link>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default LoginPage;


import React, { useState } from 'react';
import { supabase } from '../supabase';
import { useNavigate, Link } from 'react-router-dom';
import './LoginPage.css';

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
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: { name, forest_size: forestSize, user_type: 'forest_owner' }
          }
        });
        if (error) throw error;
        
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
          await supabase.from('user_profiles').insert([{
            id: user.id, email, name, forest_size: forestSize
          }]);
        }
        
        alert('✅ Account created! Please check your email.');
        navigate('/dashboard');
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        alert('✅ Login successful!');
        navigate('/dashboard');
      }
    } catch (error) {
      alert('❌ ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      {/* Background with gradient overlay */}
      <div className="login-bg"></div>
      
      <div className="login-wrapper">
        {/* Left Side - Beautiful Forest Image */}
        <div className="login-hero">
          <div className="hero-overlay">
            <div className="hero-content">
              <div className="logo-container">
                <span className="logo-icon">🌲</span>
                <h1>Forest Value Canvas</h1>
              </div>
              
              <div className="hero-text">
                <h2>Visualize Your Forest's True Value</h2>
                <p>Join small-scale forest owners across Germany & Switzerland in making sustainable, value-based decisions for your woodland.</p>
              </div>
              
              <div className="stats-grid">
                <div className="stat">
                  <div className="stat-number">16M+</div>
                  <div className="stat-label">Forest Owners</div>
                </div>
                <div className="stat">
                  <div className="stat-number">60%</div>
                  <div className="stat-label">European Forests</div>
                </div>
                <div className="stat">
                  <div className="stat-number">100%</div>
                  <div className="stat-label">Data Private</div>
                </div>
              </div>
              
              <div className="testimonials">
                <div className="testimonial">
                  <p>"This tool helped me balance heritage preservation with sustainable timber management."</p>
                  <div className="testimonial-author">
                    <span className="author-avatar">👨‍🌾</span>
                    <div>
                      <strong>Hans Müller</strong>
                      <small>Black Forest, Germany</small>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Clean Login Form */}
        <div className="login-form-side">
          <div className="form-container">
            <div className="form-header">
              <h2>{isSignUp ? 'Create Your Account' : 'Welcome Back'}</h2>
              <p>{isSignUp ? 'Start your forest management journey today' : 'Sign in to continue to your dashboard'}</p>
            </div>

            {/* Toggle Switch */}
            <div className="toggle-switch">
              <button 
                className={`toggle-btn ${!isSignUp ? 'active' : ''}`}
                onClick={() => setIsSignUp(false)}
              >
                Sign In
              </button>
              <button 
                className={`toggle-btn ${isSignUp ? 'active' : ''}`}
                onClick={() => setIsSignUp(true)}
              >
                Sign Up
              </button>
              <div className="toggle-slider"></div>
            </div>

            <form className="auth-form" onSubmit={handleAuth}>
              {isSignUp && (
                <>
                  <div className="input-group">
                    <label>
                      <span className="input-icon">👤</span>
                      Full Name
                    </label>
                    <input
                      type="text"
                      placeholder="Enter your name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required={isSignUp}
                    />
                  </div>

                  <div className="input-group">
                    <label>
                      <span className="input-icon">🌳</span>
                      Forest Size
                    </label>
                    <select 
                      value={forestSize}
                      onChange={(e) => setForestSize(e.target.value)}
                      required={isSignUp}
                    >
                      <option value="">Select size range</option>
                      <option value="<1">Less than 1 hectare</option>
                      <option value="1-5">1-5 hectares</option>
                      <option value="5-10">5-10 hectares</option>
                      <option value="10-20">10-20 hectares</option>
                      <option value=">20">More than 20 hectares</option>
                    </select>
                  </div>
                </>
              )}

              <div className="input-group">
                <label>
                  <span className="input-icon">📧</span>
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="input-group">
                <label>
                  <span className="input-icon">🔐</span>
                  Password
                </label>
                <input
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              {!isSignUp && (
                <div className="form-options">
                  <label className="checkbox">
                    <input type="checkbox" />
                    <span className="checkmark"></span>
                    Remember me
                  </label>
                  <button type="button" className="forgot-link">
                    Forgot password?
                  </button>
                </div>
              )}

              <button 
                type="submit" 
                disabled={loading}
                className="submit-button"
              >
                {loading ? (
                  <>
                    <span className="spinner"></span>
                    Processing...
                  </>
                ) : (
                  <>
                    {isSignUp ? 'Create Account' : 'Sign In'}
                    <span className="btn-arrow">→</span>
                  </>
                )}
              </button>

              <div className="divider">
                <span>or continue with</span>
              </div>

              <button 
                type="button"
                onClick={() => supabase.auth.signInWithOAuth({ provider: 'google' })}
                className="google-button"
              >
                <span className="google-icon">G</span>
                Google
              </button>
            </form>

            <div className="form-footer">
              <p>
                {isSignUp ? 'Already have an account?' : "Don't have an account?"}
                <button 
                  onClick={() => setIsSignUp(!isSignUp)}
                  className="toggle-link"
                >
                  {isSignUp ? ' Sign In' : ' Sign Up'}
                </button>
              </p>
              
              <div className="demo-box">
                <h4>Demo Account (Try First):</h4>
                <div className="demo-credentials">
                  <div className="credential">
                    <span>Email:</span>
                    <code>demo@forest.com</code>
                  </div>
                  <div className="credential">
                    <span>Password:</span>
                    <code>123456</code>
                  </div>
                </div>
              </div>

              <div className="quick-links">
                <Link to="/" className="home-link">
                  ← Back to Homepage
                </Link>
                <span className="support">
                  Need help? <Link to="/contact">Contact us</Link>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;