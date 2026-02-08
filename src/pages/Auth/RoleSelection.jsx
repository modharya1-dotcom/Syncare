import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Stethoscope, User, Heart } from 'lucide-react';

const RoleSelection = () => {
    const navigate = useNavigate();

    const RoleCard = ({ title, icon: Icon, path, color }) => (
        <div
            onClick={() => navigate(path)}
            style={{
                background: '#ffffffff',
                padding: '30px',
                borderRadius: '20px',
                boxShadow: '0 8px 20px rgba(0,0,0,0.05)',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '15px',
                width: '250px',
                transition: 'transform 0.2s',
            }}
            onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
            onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
        >
            <div style={{
                width: '80px',
                height: '80px',
                borderRadius: '50%',
                background: `${color}20`, // 20% opacity using hex
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                color: color
            }}>
                <Icon size={40} />
            </div>
            <h3 style={{ color: '#333' }}>{title}</h3>
        </div>
    );

    return (
        <div style={{
            width: '100vw',
            height: '100vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            background: '#E7DDDD',
            fontFamily: 'var(--font-family)',
            gap: '40px'
        }}>

            <div style={{ textAlign: 'center' }}>
                <h1 style={{ color: '#333', marginBottom: '10px' }}>Who are you?</h1>
                <p style={{ color: '#666' }}>Please select your role to continue</p>
            </div>

            <div style={{ display: 'flex', gap: '30px', flexWrap: 'wrap', justifyContent: 'center' }}>
                <RoleCard
                    title="Doctor"
                    icon={Stethoscope}
                    path="/signup?role=Doctor"
                    color="#C1AE8F" // Using the doctor theme color
                />
                <RoleCard
                    title="Patient"
                    icon={User}
                    path="/signup?role=Patient"
                    color="#84DCC6"
                />
                <RoleCard
                    title="Family Member"
                    icon={Heart}
                    path="/signup?role=Family"
                    color="#FF9F9F"
                />
            </div>

        </div>
    );
};

export default RoleSelection;
