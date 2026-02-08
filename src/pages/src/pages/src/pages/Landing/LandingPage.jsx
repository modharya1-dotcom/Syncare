import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { LogIn, UserPlus, Shield, Zap, Heart, Activity, ArrowRight, Github, Twitter, Linkedin } from 'lucide-react';

const LandingPage = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const session = JSON.parse(localStorage.getItem('currentUser'));
        if (session && session.role) {
            const roleRoutes = {
                Doctor: '/doctor/dashboard',
                Patient: '/patient/dashboard',
                Family: '/family/dashboard'
            };
            if (roleRoutes[session.role]) navigate(roleRoutes[session.role]);
        }
    }, [navigate]);

    return (
        <div style={{ position: 'relative', width: '100%', minHeight: '100vh', overflowX: 'hidden' }}>


            {/* Premium Navigation */}
            <nav className="glass-nav" style={{
                position: 'fixed',
                top: '20px',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '90%',
                maxWidth: '1200px',
                padding: '12px 30px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                zIndex: 1000,
                borderRadius: '24px',
                boxShadow: 'var(--shadow-md)'
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }} onClick={() => navigate('/')}>
                    <div style={{ width: '32px', height: '32px', background: 'var(--primary)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Heart size={18} color="white" fill="white" />
                    </div>
                    <h2 style={{ color: 'var(--primary)', margin: 0, fontSize: '1.5rem', fontWeight: 800 }}>Syncare</h2>
                </div>

                <div style={{ display: 'flex', gap: '12px' }}>
                    <button onClick={() => navigate('/login')} className="btn" style={{ color: 'var(--primary)' }}>Login</button>
                    <button onClick={() => navigate('/role-selection')} className="btn btn-primary">Get Started</button>
                </div>
            </nav>

            {/* Hero Section */}
            <main style={{
                paddingTop: '160px',
                paddingBottom: '100px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                position: 'relative',
                zIndex: 10
            }}>
                <div className="animate-fade-in" style={{ maxWidth: '900px', padding: '0 20px' }}>
                    <div style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '8px',
                        padding: '8px 16px',
                        background: 'rgba(58, 90, 120, 0.08)',
                        borderRadius: '100px',
                        color: 'var(--primary)',
                        fontSize: '0.9rem',
                        fontWeight: 600,
                        marginBottom: '30px'
                    }}>
                        <Shield size={16} />
                        HIPAA Compliant & Secure Care Monitoring
                    </div>

                    <h1 style={{
                        fontSize: 'clamp(3rem, 10vw, 5.5rem)',
                        fontWeight: 900,
                        margin: 0,
                        letterSpacing: '-2px',
                        lineHeight: 1.1,
                        background: 'linear-gradient(135deg, #1A1A1A 0%, #3A5A78 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                    }}>
                        Empowering Alzheimer's Care with AI.
                    </h1>

                    <p style={{
                        fontSize: 'clamp(1.3rem, 3vw, 1.8rem)',
                        color: 'var(--text-muted)',
                        marginTop: '30px',
                        maxWidth: '800px',
                        marginInline: 'auto',
                        lineHeight: 1.8,
                        fontWeight: 500
                    }}>
                        The next generation of Alzheimer's monitoring. Bridging the gap between patients, families, and doctors with intelligent real-time insights.
                    </p>

                    <div style={{ marginTop: '50px', display: 'flex', gap: '15px', justifyContent: 'center', flexWrap: 'wrap' }}>
                        <button onClick={() => navigate('/role-selection')} className="btn btn-primary" style={{ padding: '16px 40px', fontSize: '1.1rem' }}>
                            Join the Platform <ArrowRight size={20} />
                        </button>
                        <button className="btn btn-outline" style={{ padding: '16px 40px', fontSize: '1.1rem' }}>
                            Watch Demo
                        </button>
                    </div>
                </div>
            </main>

            {/* Features Section */}
            <section id="features" style={{ padding: '100px 6%', position: 'relative', zIndex: 10 }}>
                <div style={{ textAlign: 'center', marginBottom: '80px' }}>
                    <h2 style={{ fontSize: '2.5rem', color: 'var(--primary)' }}>Integrated Care Ecosystem</h2>
                    <p style={{ color: 'var(--text-muted)', maxWidth: '600px', margin: '20px auto' }}>
                        Syncare provides a unified platform for every stakeholder in the care journey.
                    </p>
                </div>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                    gap: '30px',
                    maxWidth: '1200px',
                    margin: '0 auto'
                }}>
                    <FeatureCard
                        icon={<Activity color="var(--primary)" />}
                        title="AI Biometrics"
                        desc="Advanced behavioral and health pattern tracking using wearable integration and AI algorithms."
                    />
                    <FeatureCard
                        icon={<Shield color="var(--primary)" />}
                        title="Secure Records"
                        desc="End-to-end encrypted medical data sharing between family members and healthcare providers."
                    />
                    <FeatureCard
                        icon={<Zap color="var(--primary)" />}
                        title="Real-time Alerts"
                        desc="Instant notifications for emergency events, wandering detection, and critical health changes."
                    />
                </div>
            </section>

            {/* Footer */}
            <footer style={{
                background: 'rgba(255, 255, 255, 0.9)',
                padding: '80px 6% 40px',
                borderTop: '1px solid #EEE',
                position: 'relative',
                zIndex: 10
            }}>
                <div style={{
                    maxWidth: '1200px',
                    margin: '0 auto',
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                    gap: '50px'
                }}>
                    <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
                            <div style={{ width: '28px', height: '28px', background: 'var(--primary)', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <Heart size={16} color="white" fill="white" />
                            </div>
                            <h3 style={{ margin: 0, color: 'var(--primary)' }}>Syncare</h3>
                        </div>
                        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                            Providing dignity and precision to Alzheimer's care through innovative AI solutions.
                        </p>
                    </div>

                    <div>
                        <h4 style={{ marginBottom: '20px' }}>Product</h4>
                        <ul style={{ listStyle: 'none', padding: 0, color: 'var(--text-muted)', fontSize: '0.9rem', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                            <li>Features</li>
                            <li>Pricing</li>
                            <li>Case Studies</li>
                        </ul>
                    </div>

                    <div>
                        <h4 style={{ marginBottom: '20px' }}>Company</h4>
                        <ul style={{ listStyle: 'none', padding: 0, color: 'var(--text-muted)', fontSize: '0.9rem', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                            <li>About Us</li>
                            <li>Join Team</li>
                            <li>Contact</li>
                        </ul>
                    </div>

                    <div>
                        <h4 style={{ marginBottom: '20px' }}>Connect</h4>
                        <div style={{ display: 'flex', gap: '15px' }}>
                            <Github size={20} color="var(--primary)" style={{ cursor: 'pointer' }} />
                            <Twitter size={20} color="var(--primary)" style={{ cursor: 'pointer' }} />
                            <Linkedin size={20} color="var(--primary)" style={{ cursor: 'pointer' }} />
                        </div>
                    </div>
                </div>

                <div style={{
                    maxWidth: '1200px',
                    margin: '60px auto 0',
                    paddingTop: '30px',
                    borderTop: '1px solid #EEE',
                    display: 'flex',
                    justifyContent: 'space-between',
                    fontSize: '0.85rem',
                    color: '#AAA'
                }}>
                    <div>© 2024 Syncare Health. All rights reserved.</div>
                    <div style={{ display: 'flex', gap: '20px' }}>
                        <span>Privacy Policy</span>
                        <span>Terms of Service</span>
                    </div>
                </div>
            </footer>
        </div>
    );
};

const FeatureCard = ({ icon, title, desc }) => (
    <div className="premium-card" style={{ padding: '40px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <div style={{ width: '48px', height: '48px', borderRadius: '14px', background: 'rgba(58, 90, 120, 0.05)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            {icon}
        </div>
        <h3 style={{ margin: 0 }}>{title}</h3>
        <p style={{ color: 'var(--text-muted)', margin: 0, fontSize: '0.95rem', lineHeight: 1.6 }}>{desc}</p>
    </div>
);

export default LandingPage;
