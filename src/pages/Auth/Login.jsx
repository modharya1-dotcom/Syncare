import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, ArrowRight } from 'lucide-react';

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = (e) => {
        e.preventDefault();
        // Simulate login logic
        // 1. Get existing users database
        const users = JSON.parse(localStorage.getItem('users') || '{}');
        const user = users[email];

        // 2. Verify credentials
        if (!user || user.password !== password) {
            alert('Invalid email or password. Please try again or sign up.');
            return;
        }

        // 3. Set persistent session
        localStorage.setItem('currentUser', JSON.stringify(user));

        // 4. Redirect based on stored role
        const storedRole = user.role;

        if (storedRole === 'Doctor') {
            navigate('/doctor/setup');
        } else if (storedRole === 'Patient') {
            navigate('/patient/dashboard');
        } else if (storedRole === 'Family') {
            navigate('/family/dashboard');
        } else {
            navigate('/role-selection');
        }
    };

    return (
        <div style={{
            width: '100vw',
            height: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            background: '#E7DDDD',
            fontFamily: 'var(--font-family)'
        }}>
            <div style={{
                background: '#fff',
                padding: '40px',
                borderRadius: '20px',
                boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
                width: '100%',
                maxWidth: '400px',
                display: 'flex',
                flexDirection: 'column',
                gap: '20px'
            }}>
                <h2 style={{ textAlign: 'center', color: '#333' }}>Welcome Back</h2>

                <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>

                    <div style={{ position: 'relative' }}>
                        <Mail size={20} style={{ position: 'absolute', left: '15px', top: '50%', transform: 'translateY(-50%)', color: '#999' }} />
                        <input
                            type="email"
                            placeholder="Email Address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            autoComplete="username"
                            style={{
                                width: '100%',
                                padding: '12px 15px 12px 45px',
                                borderRadius: '10px',
                                border: '1px solid #ddd',
                                fontSize: '1rem',
                                outline: 'none'
                            }}
                            required
                        />
                    </div>

                    <div style={{ position: 'relative' }}>
                        <Lock size={20} style={{ position: 'absolute', left: '15px', top: '50%', transform: 'translateY(-50%)', color: '#999' }} />
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            autoComplete="current-password"
                            style={{
                                width: '100%',
                                padding: '12px 15px 12px 45px',
                                borderRadius: '10px',
                                border: '1px solid #ddd',
                                fontSize: '1rem',
                                outline: 'none'
                            }}
                            required
                        />
                    </div>

                    <div style={{ textAlign: 'right', fontSize: '0.9rem', color: '#84DCC6', cursor: 'pointer' }}>
                        Forgot Password?
                    </div>

                    <button
                        type="submit"
                        style={{
                            padding: '12px',
                            borderRadius: '10px',
                            border: 'none',
                            background: '#84DCC6',
                            color: '#fff',
                            fontSize: '1.1rem',
                            fontWeight: 'bold',
                            marginTop: '10px',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            gap: '10px'
                        }}
                    >
                        Sign In
                        <ArrowRight size={20} />
                    </button>
                </form>

                <div style={{ textAlign: 'center', color: '#999', fontSize: '0.9rem' }}>
                    Or continue with
                </div>

                <button style={{
                    padding: '12px',
                    borderRadius: '10px',
                    border: '1px solid #ddd',
                    background: '#fff',
                    color: '#333',
                    fontSize: '1rem',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: '10px'
                }}>
                    <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" style={{ width: '20px' }} />
                    Google
                </button>

                <div style={{ textAlign: 'center', marginTop: '20px', fontSize: '0.9rem' }}>
                    Don't have an account? <span onClick={() => navigate('/role-selection')} style={{ color: '#84DCC6', cursor: 'pointer', fontWeight: 'bold' }}>Sign Up</span>
                </div>

            </div>
        </div>
    );
};

export default Login;
