import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Stethoscope, User, Heart } from 'lucide-react';


const RoleSelection = () => {
    const navigate = useNavigate();

    const RoleCard = ({ title, icon: Icon, path, color }) => (
        <div
            onClick={() => navigate(path)}
            style={{
                background: 'rgba(255, 255, 255, 0.95)',
                padding: '40px 30px',
                borderRadius: '32px',
                boxShadow: 'var(--shadow-md)',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '20px',
                width: '100%',
                maxWidth: '280px',
                transition: 'var(--transition)',
                border: '1px solid rgba(255, 255, 255, 0.6)',
                zIndex: 10
            }}
            onMouseOver={(e) => {
                e.currentTarget.style.transform = 'translateY(-10px)';
                e.currentTarget.style.boxShadow = 'var(--shadow-lg)';
                e.currentTarget.style.borderColor = 'var(--primary)';
            }}
            onMouseOut={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'var(--shadow-md)';
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.6)';
            }}
        >
            <div style={{
                width: '80px',
                height: '80px',
                borderRadius: '24px',
                background: `${color}15`,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                color: color
            }}>
                <Icon size={40} />
            </div>
            <h3 style={{ color: 'var(--text-main)', fontSize: '1.4rem', fontWeight: 700 }}>{title}</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', textAlign: 'center' }}>
                Join the SynCare community as a {title.toLowerCase()}.
            </p>
        </div>
    );

    return (
        <div style={{
            position: 'relative',
            width: '100vw',
            height: '100vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            overflow: 'hidden',
            gap: '50px',
            padding: '20px'
        }}>


            <div style={{ textAlign: 'center', zIndex: 10 }}>
                <h1 style={{
                    fontSize: '4rem',
                    fontWeight: 900,
                    color: 'var(--primary)',
                    marginBottom: '20px'
                }}>Who are you?</h1>
                <p style={{
                    fontSize: '1.5rem',
                    color: 'var(--text-muted)',
                    maxWidth: '600px',
                    margin: '0 auto',
                    fontWeight: 500
                }}>Tailoring the SynCare experience to your specific needs.</p>
            </div>

            <div style={{
                display: 'flex',
                gap: '30px',
                flexWrap: 'wrap',
                justifyContent: 'center',
                width: '100%',
                maxWidth: '1000px',
                zIndex: 10
            }}>
                <RoleCard
                    title="Doctor"
                    icon={Stethoscope}
                    path="/signup?role=Doctor"
                    color="#3A5A78"
                />
                <RoleCard
                    title="Patient"
                    icon={User}
                    path="/signup?role=Patient"
                    color="#507090"
                />
                <RoleCard
                    title="Family"
                    icon={Heart}
                    path="/signup?role=Family"
                    color="#A68D6A"
                />
            </div>

            <button
                onClick={() => navigate('/')}
                style={{
                    position: 'absolute',
                    top: '40px',
                    left: '40px',
                    color: 'var(--primary)',
                    background: 'transparent',
                    fontWeight: 600,
                    zIndex: 20
                }}
            >
                ← Back to Home
            </button>
        </div>
    );
};

export default RoleSelection;
