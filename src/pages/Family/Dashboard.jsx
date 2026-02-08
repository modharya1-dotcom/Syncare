import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Video, Activity, Heart, User, Clock, Phone, Mail, Home, LogOut, Shield, ChevronRight, Play, ArrowLeft } from 'lucide-react';


const FamilyDashboard = () => {
    const navigate = useNavigate();
    const [assignedDoctor, setAssignedDoctor] = useState({
        name: 'Smith',
        specialization: 'Neurologist',
        status: 'Available',
        phone: '+1 234 567 890',
        email: 'drsmith@syncare.com'
    });

    const [sosActive, setSosActive] = useState(false);
    const [sosData, setSosData] = useState(null);

    useEffect(() => {
        const checkSOS = () => {
            const signal = JSON.parse(localStorage.getItem('sos_signal') || '{"active": false}');
            if (signal.active) {
                setSosActive(true);
                setSosData(signal);
                // Optional: trigger alert sound if help is needed
            } else {
                setSosActive(false);
            }
        };

        const interval = setInterval(checkSOS, 1000); // Poll every second for live signal
        return () => clearInterval(interval);
    }, []);

    const dismissSOS = () => {
        localStorage.setItem('sos_signal', JSON.stringify({ active: false }));
        setSosActive(false);
    };

    useEffect(() => {
        const users = JSON.parse(localStorage.getItem('users') || '{}');
        const doctors = Object.values(users).filter(u => u.role === 'Doctor');
        if (doctors.length > 0) {
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

    const handleLogout = () => {
        localStorage.removeItem('currentUser');
        navigate('/');
    };

    return (
        <div style={{ position: 'relative', width: '100%', minHeight: '100vh', background: 'var(--bg-primary)' }}>

            {/* Live SOS Signal Banner */}
            {sosActive && (
                <div className="animate-fade-in" style={{
                    position: 'fixed',
                    top: '90px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: '90%',
                    maxWidth: '800px',
                    background: 'var(--danger)',
                    color: 'white',
                    padding: '25px 40px',
                    borderRadius: '24px',
                    zIndex: 2000,
                    boxShadow: '0 20px 50px rgba(238, 103, 92, 0.4)',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    border: '4px solid white',
                    animation: 'sosPulse 1.5s infinite'
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                        <div style={{ width: '50px', height: '50px', background: 'white', borderRadius: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <Phone size={30} color="var(--danger)" />
                        </div>
                        <div>
                            <h2 style={{ margin: 0, color: 'white', fontSize: '1.8rem', fontWeight: 900 }}>CRITICAL SOS SIGNAL</h2>
                            <p style={{ margin: 0, opacity: 0.9, fontWeight: 700 }}>Signal received from {sosData?.patient}'s Syncare Bot</p>
                        </div>
                    </div>
                    <button
                        onClick={dismissSOS}
                        className="btn"
                        style={{ background: 'white', color: 'var(--danger)', fontWeight: 900, padding: '15px 30px' }}
                    >
                        HELP ARRIVED
                    </button>
                </div>
            )}


            {/* Premium Header */}
            <header className="glass-nav" style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                padding: '15px 40px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                zIndex: 1000,
                boxShadow: 'var(--shadow-sm)'
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ width: '32px', height: '32px', background: 'var(--primary)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Heart size={18} color="white" fill="white" />
                    </div>
                    <h2 style={{ color: 'var(--primary)', margin: 0, fontSize: '1.4rem' }}>Family Hub</h2>
                </div>

                <div style={{ display: 'flex', gap: '25px', alignItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'rgba(58, 90, 120, 0.05)', padding: '6px 16px', borderRadius: '100px' }}>
                        <span style={{ width: '8px', height: '8px', background: 'var(--success)', borderRadius: '50%' }}></span>
                        <span style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--primary)' }}>Patient: John Doe</span>
                    </div>
                    <button onClick={() => navigate(-1)} className="btn" style={{ color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '5px' }}>
                        <ArrowLeft size={18} /> Back
                    </button>
                    <button onClick={() => navigate('/')} className="btn" style={{ color: 'var(--text-muted)' }}><Home size={18} /> Home</button>
                    <button onClick={handleLogout} className="btn btn-primary" style={{ padding: '8px 20px' }}><LogOut size={18} /> Logout</button>
                </div>
            </header>

            <main style={{ paddingTop: '100px', paddingBottom: '60px', position: 'relative', zIndex: 10, maxWidth: '1400px', margin: '0 auto', paddingInline: '40px' }}>
                <div className="animate-fade-in" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '30px', marginTop: '30px' }}>

                    {/* Column 1: Patient & Status */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
                        <div className="premium-card" style={{ padding: '30px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '25px' }}>
                                <h3 style={{ margin: 0, fontSize: '1.2rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
                                    <User size={20} color="var(--primary)" /> Profile
                                </h3>
                                <Shield size={20} color="var(--success)" />
                            </div>
                            <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                                <div style={{ width: '80px', height: '80px', borderRadius: '24px', background: 'var(--secondary)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                    <User size={40} color="var(--primary)" />
                                </div>
                                <div>
                                    <h4 style={{ margin: 0, fontSize: '2rem' }}>John Doe</h4>
                                    <p style={{ color: 'var(--text-muted)', fontSize: '1.2rem', margin: '4px 0', fontWeight: 500 }}>Age 72 • Alzheimer's Type-B</p>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--success)', fontSize: '0.85rem', fontWeight: 700, marginTop: '8px' }}>
                                        <div style={{ width: '6px', height: '6px', background: 'var(--success)', borderRadius: '50%' }}></div>
                                        Currently Stable
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="premium-card" style={{ padding: '30px' }}>
                            <h3 style={{ margin: 0, fontSize: '1.2rem', display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '25px' }}>
                                <Activity size={20} color="var(--primary)" /> Vital Overview
                            </h3>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                                <div style={{ background: '#F9FAFB', padding: '20px', borderRadius: '16px', border: '1px solid rgba(0,0,0,0.1)' }}>
                                    <div style={{ fontSize: '1.1rem', color: '#000', fontWeight: 800, textTransform: 'uppercase' }}>Heart Rate</div>
                                    <div style={{ fontSize: '2.2rem', fontWeight: 900, color: 'var(--primary)' }}>72 BPM</div>
                                </div>
                                <div style={{ background: '#F9FAFB', padding: '20px', borderRadius: '16px', border: '1px solid rgba(0,0,0,0.1)' }}>
                                    <div style={{ fontSize: '1.1rem', color: '#000', fontWeight: 800, textTransform: 'uppercase' }}>Sleep Quality</div>
                                    <div style={{ fontSize: '2.2rem', fontWeight: 900, color: 'var(--success)' }}>Good</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Column 2: Recent Episodes & Video */}
                    <div className="premium-card" style={{ padding: '30px', gridColumn: 'span 1' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px' }}>
                            <h3 style={{ margin: 0, fontSize: '1.2rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <Video size={20} color="var(--primary)" /> Monitoring Feed
                            </h3>
                            <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--danger)', display: 'flex', alignItems: 'center', gap: '5px' }}>
                                <div style={{ width: '6px', height: '6px', background: 'var(--danger)', borderRadius: '50%' }}></div> LIVE
                            </span>
                        </div>

                        <div style={{ aspectRatio: '16/9', background: '#1A1A1A', borderRadius: '20px', overflow: 'hidden', position: 'relative', marginBottom: '25px' }}>
                            <div style={{ position: 'absolute', inset: 0, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(10px)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                    <Play size={24} color="white" fill="white" />
                                </div>
                            </div>
                        </div>

                        <h4 style={{ fontSize: '1rem', marginBottom: '15px' }}>Recent Snapshots</h4>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px' }}>
                            {[1, 2, 3].map(i => (
                                <div key={i} style={{ aspectRatio: '1/1', background: '#EEE', borderRadius: '12px', overflow: 'hidden', position: 'relative' }}>
                                    <img src={`https://images.unsplash.com/photo-1516733725897-1aa73b87c8e8?w=200&h=200&fit=crop`} alt="Snapshot" style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.8 }} />
                                    <div style={{ position: 'absolute', bottom: '5px', left: '5px', fontSize: '0.6rem', color: 'white', background: 'rgba(0,0,0,0.4)', padding: '2px 6px', borderRadius: '4px' }}>10:{i}5 AM</div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Column 3: Medical Support */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
                        <div className="premium-card" style={{ padding: '30px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '25px' }}>
                                <h3 style={{ margin: 0, fontSize: '1.2rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
                                    <Heart size={20} color="var(--accent)" /> Care Team
                                </h3>
                                <div style={{ padding: '4px 12px', background: 'rgba(106, 177, 135, 0.1)', color: 'var(--success)', borderRadius: '100px', fontSize: '0.75rem', fontWeight: 700 }}>
                                    {assignedDoctor.status}
                                </div>
                            </div>

                            <div style={{ display: 'flex', gap: '15px', alignItems: 'center', marginBottom: '20px' }}>
                                <div style={{ width: '60px', height: '60px', borderRadius: '18px', background: 'var(--bg-primary)', border: '1px solid #EEE', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                    <User size={30} color="var(--primary)" />
                                </div>
                                <div>
                                    <h4 style={{ margin: 0, fontSize: '1.1rem' }}>Dr. {assignedDoctor.name}</h4>
                                    <p style={{ color: 'var(--accent)', fontSize: '0.85rem', fontWeight: 600, margin: '2px 0' }}>{assignedDoctor.specialization}</p>
                                </div>
                            </div>

                            <div style={{ borderTop: '1px solid #F0F0F0', paddingTop: '20px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                                    <Phone size={16} /> {assignedDoctor.phone}
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                                    <Mail size={16} /> {assignedDoctor.email}
                                </div>
                            </div>
                        </div>

                        <div className="premium-card" style={{ padding: '30px', background: 'linear-gradient(135deg, var(--primary) 0%, #1A1A1A 100%)', color: 'white' }}>
                            <h3 style={{ margin: 0, fontSize: '1.2rem', color: 'white', display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '15px' }}>
                                <Shield size={20} color="white" /> Security Log
                            </h3>
                            <p style={{ fontSize: '0.85rem', opacity: 0.8, marginBottom: '20px' }}>Your data is encrypted and synced with clinical standards.</p>
                            <button className="btn" style={{ width: '100%', background: 'rgba(255,255,255,0.1)', color: 'white', borderRadius: '12px' }}>
                                View Compliance Report <ChevronRight size={18} />
                            </button>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default FamilyDashboard;
