import React, { useState, useEffect } from 'react';
import { Video, Activity, Heart, User, Clock, Phone, Mail } from 'lucide-react';

const FamilyDashboard = () => {
    const [assignedDoctor, setAssignedDoctor] = useState({
        name: 'Smith',
        specialization: 'Neurologist',
        status: 'Available',
        phone: '+1 234 567 890',
        email: 'drsmith@syncare.com'
    });

    useEffect(() => {
        // Find a doctor from the users list to display
        const users = JSON.parse(localStorage.getItem('users') || '{}');
        const doctors = Object.values(users).filter(u => u.role === 'Doctor');

        if (doctors.length > 0) {
            // Pick the first registered doctor for this prototype
            const d = doctors[0];
            setAssignedDoctor({
                name: d.name || 'Smith',
                specialization: d.specialization || 'Neurologist',
                status: d.status || 'Available',
                phone: d.phone || '+1 234 567 890',
                email: d.email || ''
            });
        }
    }, []);

    return (
        <div style={{ width: '100vw', height: '100vh', background: '#f5f5f5', display: 'flex', flexDirection: 'column' }}>

            {/* Header */}
            <div style={{ background: '#FF9F9F', padding: '20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: '#fff' }}>
                <h2 style={{ margin: 0 }}>Family Dashboard</h2>
                <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
                    <div style={{ background: 'rgba(255,255,255,0.2)', padding: '5px 15px', borderRadius: '15px' }}>Patient: John Doe</div>
                    <button
                        onClick={() => window.location.href = '/'}
                        style={{ background: 'white', color: '#FF9F9F', border: 'none', padding: '5px 15px', borderRadius: '20px', cursor: 'pointer', fontWeight: 'bold' }}
                    >
                        Home
                    </button>
                    <button
                        onClick={() => {
                            localStorage.removeItem('currentUser');
                            window.location.href = '/';
                        }}
                        style={{ background: 'white', color: '#FF9F9F', border: 'none', padding: '5px 15px', borderRadius: '20px', cursor: 'pointer', fontWeight: 'bold' }}
                    >
                        Logout
                    </button>
                </div>
            </div>

            <div style={{ flex: 1, padding: '30px', overflowY: 'auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '30px' }}>

                {/* Patient Info Card */}
                <div style={{ background: '#fff', borderRadius: '25px', padding: '25px', boxShadow: '0 10px 30px rgba(0,0,0,0.05)', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    <h3 style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#333', margin: 0 }}>
                        <User size={20} /> Patient Info
                    </h3>
                    <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                        <div style={{ width: '80px', height: '80px', borderRadius: '20px', background: '#ffebeb', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <User size={40} color="#FF9F9F" />
                        </div>
                        <div>
                            <h4 style={{ margin: 0, fontSize: '1.2rem' }}>John Doe</h4>
                            <p style={{ color: '#666', fontSize: '0.9rem', margin: '5px 0' }}>Age: 72 | Early Stage</p>
                            <div style={{ background: '#e6fffa', color: '#00b386', padding: '4px 12px', borderRadius: '15px', fontSize: '0.8rem', display: 'inline-block' }}>
                                Stable - Resting
                            </div>
                        </div>
                    </div>
                </div>

                {/* Doctor Info Card - NEW */}
                <div style={{ background: '#fff', borderRadius: '25px', padding: '25px', boxShadow: '0 10px 30px rgba(0,0,0,0.05)', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <h3 style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#333', margin: 0 }}>
                            <Heart size={20} color="#84DCC6" /> Assigned Doctor
                        </h3>
                        <div style={{
                            background: assignedDoctor.status === 'Available' ? '#e6fffa' : '#fff5f5',
                            color: assignedDoctor.status === 'Available' ? '#00b386' : '#ff4d4d',
                            padding: '4px 12px',
                            borderRadius: '15px',
                            fontSize: '0.8rem',
                            fontWeight: 'bold',
                            border: `1px solid ${assignedDoctor.status === 'Available' ? '#00b386' : '#ff4d4d'}`
                        }}>
                            {assignedDoctor.status}
                        </div>
                    </div>

                    <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                        <div style={{ width: '80px', height: '80px', borderRadius: '20px', background: '#f0f0f0', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <User size={40} color="#C1AE8F" />
                        </div>
                        <div>
                            <h4 style={{ margin: 0, fontSize: '1.2rem' }}>Dr. {assignedDoctor.name}</h4>
                            <p style={{ color: '#C1AE8F', fontSize: '0.9rem', margin: '5px 0', fontWeight: 'bold' }}>{assignedDoctor.specialization}</p>
                        </div>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', borderTop: '1px solid #f0f0f0', paddingTop: '15px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.9rem', color: '#666' }}>
                            <Phone size={14} /> {assignedDoctor.phone}
                        </div>
                        {assignedDoctor.email && (
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.9rem', color: '#666' }}>
                                <Mail size={14} /> {assignedDoctor.email}
                            </div>
                        )}
                    </div>
                </div>

                {/* Recent Episodes */}
                <div style={{ background: '#fff', borderRadius: '25px', padding: '25px', boxShadow: '0 10px 30px rgba(0,0,0,0.05)', gridColumn: 'span 1' }}>
                    <h3 style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px', color: '#333', margin: 0 }}>
                        <Video size={20} /> Recent Episodes
                    </h3>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))', gap: '15px', marginTop: '20px' }}>
                        {[1, 2, 3].map(i => (
                            <div key={i} style={{ aspectRatio: '16/9', background: '#333', borderRadius: '15px', position: 'relative', cursor: 'pointer', overflow: 'hidden' }}>
                                <div style={{ position: 'absolute', inset: 0, display: 'flex', justifyContent: 'center', alignItems: 'center', background: 'rgba(0,0,0,0.2)' }}>
                                    <div style={{ width: '30px', height: '30px', borderRadius: '50%', background: 'rgba(255,255,255,0.3)', display: 'flex', justifyContent: 'center', alignItems: 'center', backdropFilter: 'blur(4px)' }}>
                                        <div style={{ width: 0, height: 0, borderTop: '5px solid transparent', borderBottom: '5px solid transparent', borderLeft: '10px solid white' }}></div>
                                    </div>
                                </div>
                                <span style={{ position: 'absolute', bottom: '8px', right: '8px', color: 'white', fontSize: '0.65rem', background: 'rgba(0,0,0,0.6)', padding: '2px 6px', borderRadius: '4px' }}>10:3{i} AM</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* AI Highlights */}
                <div style={{ background: '#fff', borderRadius: '25px', padding: '25px', boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }}>
                    <h3 style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#333', margin: 0 }}>
                        <Activity size={20} /> Today's Highlights
                    </h3>
                    <ul style={{ paddingLeft: '20px', color: '#555', lineHeight: '1.8', marginTop: '20px', fontSize: '0.95rem' }}>
                        <li>Morning routine completed successfully.</li>
                        <li>Engaged in 15 mins of conversation.</li>
                        <li>Mood: Positive</li>
                        <li>Heart rate & Sleep: Normal</li>
                    </ul>
                </div>

            </div>
        </div>
    );
};

export default FamilyDashboard;
