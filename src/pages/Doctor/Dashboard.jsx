import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { User, Users, Calendar, Mic, Activity, LogOut, Home as HomeIcon, CheckCircle, XCircle, Settings, Edit3 } from 'lucide-react';
import PatientList from './PatientList';
import Appointments from './Appointments';
import AIMode from './AIMode';

const DoctorDashboard = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [doctorData, setDoctorData] = useState({
        name: 'Smith',
        specialization: 'Neurologist',
        phone: '+1 234 567 890',
        email: '',
        status: 'Available',
        photo: null
    });
    const [showProfileModal, setShowProfileModal] = useState(false);
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        const session = JSON.parse(localStorage.getItem('currentUser') || '{}');
        const storedUsers = JSON.parse(localStorage.getItem('users') || '{}');
        const userData = storedUsers[session.email] || {};

        setDoctorData(prev => ({
            ...prev,
            name: session.name || prev.name,
            email: session.email || '',
            specialization: userData.specialization || prev.specialization,
            phone: userData.phone || prev.phone,
            status: userData.status || 'Available'
        }));
    }, []);

    const updateDoctorData = (newData) => {
        setDoctorData(newData);
        // Persist to users list for Family dashboard access
        const users = JSON.parse(localStorage.getItem('users') || '{}');
        if (newData.email && users[newData.email]) {
            users[newData.email] = { ...users[newData.email], ...newData };
            localStorage.setItem('users', JSON.stringify(users));
        }
        // Update session name if it changed
        const session = JSON.parse(localStorage.getItem('currentUser') || '{}');
        session.name = newData.name;
        localStorage.setItem('currentUser', JSON.stringify(session));
    };

    const WelcomeHome = () => (
        <div style={{
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            color: '#fff',
            textAlign: 'center',
            padding: '20px'
        }}>
            {/* Large Profile Photo */}
            <div style={{
                width: '180px',
                height: '180px',
                borderRadius: '50%',
                background: '#fff',
                marginBottom: '25px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
                overflow: 'hidden',
                border: '5px solid rgba(255,255,255,0.3)'
            }}>
                <User size={100} color="#C1AE8F" />
            </div>

            <h1 style={{ fontSize: '3.5rem', marginBottom: '40px', fontWeight: 'bold' }}>Welcome Dr. {doctorData.name.split(' ').pop()}</h1>

            {/* Clickable Box to Open Features */}
            <div
                onClick={() => navigate('/doctor/hub')}
                style={{
                    width: '100%',
                    maxWidth: '400px',
                    height: '150px',
                    background: 'rgba(255,255,255,0.15)',
                    backdropFilter: 'blur(10px)',
                    borderRadius: '25px',
                    border: '2px solid rgba(255,255,255,0.2)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    boxShadow: '0 8px 32px rgba(0,0,0,0.1)'
                }}
                onMouseOver={(e) => {
                    e.currentTarget.style.transform = 'translateY(-10px)';
                    e.currentTarget.style.background = 'rgba(255,255,255,0.25)';
                }}
                onMouseOut={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.background = 'rgba(255,255,255,0.15)';
                }}
            >
                <div style={{ display: 'flex', gap: '20px', marginBottom: '10px' }}>
                    <Users color="#fff" size={30} />
                    <Calendar color="#fff" size={30} />
                    <Mic color="#fff" size={30} />
                </div>
                <h3 style={{ margin: 0, fontSize: '1.2rem', fontWeight: 'normal' }}>Open Dashboard Hub</h3>
                <p style={{ margin: '5px 0 0', opacity: 0.7, fontSize: '0.9rem' }}>Patients • Appointments • AI Insights</p>
            </div>
        </div>
    );

    const HubPage = () => (
        <div style={{ padding: '20px' }}>
            <h2 style={{ color: '#fff', marginBottom: '30px' }}>Dashboard Hub</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '30px' }}>
                <HubCard
                    title="My Patients"
                    icon={Users}
                    desc="Manage patient profiles and health records"
                    onClick={() => navigate('/doctor/dashboard')}
                />
                <HubCard
                    title="Appointments"
                    icon={Calendar}
                    desc="View and schedule patient consultations"
                    onClick={() => navigate('/doctor/appointments')}
                />
                <HubCard
                    title="AI Insights"
                    icon={Mic}
                    desc="Analyze voice data and patient behavior"
                    onClick={() => navigate('/doctor/ai-mode')}
                    highlight
                />
            </div>
        </div>
    );

    const HubCard = ({ title, icon: Icon, desc, onClick, highlight }) => (
        <div
            onClick={onClick}
            style={{
                background: '#fff',
                padding: '30px',
                borderRadius: '25px',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: '0 4px 15px rgba(0,0,0,0.05)',
                display: 'flex',
                flexDirection: 'column',
                gap: '15px',
                border: highlight ? '2px solid #84DCC6' : 'none'
            }}
            onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
            onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
        >
            <div style={{ width: '60px', height: '60px', borderRadius: '15px', background: highlight ? '#84DCC6' : '#f5f5f5', display: 'flex', justifyContent: 'center', alignItems: 'center', color: highlight ? '#fff' : '#C1AE8F' }}>
                <Icon size={30} />
            </div>
            <div>
                <h3 style={{ margin: 0, color: '#333' }}>{title}</h3>
                <p style={{ margin: '5px 0 0', color: '#666', fontSize: '0.9rem' }}>{desc}</p>
            </div>
        </div>
    );

    const ProfileIcon = () => (
        <div
            onClick={() => setShowProfileModal(true)}
            style={{
                position: 'absolute',
                top: '20px',
                left: '20px',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                background: 'rgba(255,255,255,0.9)',
                padding: '8px 15px',
                borderRadius: '30px',
                boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
                cursor: 'pointer',
                zIndex: 100,
                border: '1px solid #eee'
            }}
        >
            <div style={{ width: '35px', height: '35px', borderRadius: '50%', background: '#C1AE8F', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <User size={18} color="#fff" />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{ fontSize: '0.85rem', fontWeight: 'bold', color: '#333' }}>Dr. {doctorData.name.split(' ').pop()}</span>
                <span style={{ fontSize: '0.7rem', color: doctorData.status === 'Available' ? 'green' : 'red', display: 'flex', alignItems: 'center', gap: '3px' }}>
                    {doctorData.status === 'Available' ? <CheckCircle size={10} /> : <XCircle size={10} />}
                    {doctorData.status}
                </span>
            </div>
        </div>
    );

    return (
        <div style={{ height: '100vh', width: '100vw', display: 'flex', background: '#C1AE8F', position: 'relative', overflow: 'hidden' }}>

            {/* Top Left Profile Icon */}
            <ProfileIcon />

            {/* Logout Button (Top Right) */}
            <button
                onClick={() => { localStorage.removeItem('currentUser'); navigate('/'); }}
                style={{
                    position: 'absolute', top: '20px', right: '20px',
                    background: 'rgba(255,255,255,0.9)', border: 'none', padding: '8px 15px', borderRadius: '20px',
                    display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', zIndex: 100
                }}
            >
                <LogOut size={16} color="#666" />
                <span style={{ fontSize: '0.85rem' }}>Logout</span>
            </button>

            {/* Sidebar (Hide on Welcome/Hub screens) */}
            {location.pathname !== '/doctor' && location.pathname !== '/doctor/' && location.pathname !== '/doctor/hub' && (
                <div style={{
                    width: '80px',
                    background: 'rgba(255,255,255,0.9)',
                    backdropFilter: 'blur(10px)',
                    margin: '80px 0 20px 20px',
                    borderRadius: '20px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    padding: '20px 0',
                    gap: '20px',
                    boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
                    zIndex: 20
                }}>
                    <div onClick={() => navigate('/doctor')} style={{ cursor: 'pointer', color: '#666' }} title="Home"><HomeIcon size={24} /></div>
                    <div onClick={() => navigate('/doctor/hub')} style={{ cursor: 'pointer', color: '#666' }} title="Hub"><Settings size={24} /></div>
                    <div style={{ width: '30px', height: '1px', background: '#ddd' }}></div>
                    <div onClick={() => navigate('/doctor/dashboard')} style={{ cursor: 'pointer', color: location.pathname.includes('dashboard') ? '#84DCC6' : '#666' }} title="Patients"><Users size={24} /></div>
                    <div onClick={() => navigate('/doctor/appointments')} style={{ cursor: 'pointer', color: location.pathname.includes('appointments') ? '#84DCC6' : '#666' }} title="Calendar"><Calendar size={24} /></div>
                    <div onClick={() => navigate('/doctor/ai-mode')} style={{ cursor: 'pointer', color: location.pathname.includes('ai-mode') ? '#84DCC6' : '#666' }} title="AI"><Mic size={24} /></div>
                </div>
            )}

            {/* Main Content Area */}
            <div style={{ flex: 1, padding: '80px 40px 40px', overflowY: 'auto' }}>
                <Routes>
                    <Route path="/" element={<WelcomeHome />} />
                    <Route path="hub" element={<HubPage />} />
                    <Route path="dashboard" element={<PatientList />} />
                    <Route path="appointments" element={<Appointments />} />
                    <Route path="ai-mode" element={<AIMode />} />
                </Routes>
            </div>

            {/* Profile Detail Modal */}
            {showProfileModal && (
                <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000, backdropFilter: 'blur(5px)' }}>
                    <div style={{ background: '#fff', width: '450px', borderRadius: '30px', padding: '40px', position: 'relative' }}>
                        <button onClick={() => { setShowProfileModal(false); setIsEditing(false); }} style={{ position: 'absolute', top: '20px', right: '20px', background: 'none', border: 'none', cursor: 'pointer' }}><XCircle size={24} color="#ccc" /></button>

                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '15px' }}>
                            <div style={{ width: '100px', height: '100px', borderRadius: '50%', background: '#f5f5f5', display: 'flex', justifyContent: 'center', alignItems: 'center', border: '3px solid #C1AE8F' }}>
                                <User size={50} color="#C1AE8F" />
                            </div>
                            <h2 style={{ margin: 0 }}>Dr. {doctorData.name}</h2>
                            <span style={{ fontSize: '0.9rem', color: '#666' }}>{doctorData.specialization}</span>

                            <div style={{ width: '100%', marginTop: '20px', display: 'flex', flexDirection: 'column', gap: '15px' }}>
                                {['name', 'specialization', 'phone', 'email'].map(field => (
                                    <div key={field} style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                                        <label style={{ fontSize: '0.75rem', color: '#999', textTransform: 'capitalize' }}>{field}</label>
                                        {isEditing ? (
                                            <input
                                                value={doctorData[field]}
                                                onChange={(e) => setDoctorData({ ...doctorData, [field]: e.target.value })}
                                                style={{ padding: '8px 12px', borderRadius: '8px', border: '1px solid #ddd' }}
                                            />
                                        ) : (
                                            <span style={{ fontSize: '0.95rem', fontWeight: '500' }}>{doctorData[field] || 'Not set'}</span>
                                        )}
                                    </div>
                                ))}

                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#f9f9f9', padding: '15px', borderRadius: '15px', marginTop: '10px' }}>
                                    <div>
                                        <div style={{ fontSize: '0.75rem', color: '#999' }}>Availability Status</div>
                                        <div style={{ fontSize: '0.95rem', fontWeight: 'bold', color: doctorData.status === 'Available' ? 'green' : 'red' }}>{doctorData.status}</div>
                                    </div>
                                    <button
                                        onClick={() => updateDoctorData({ ...doctorData, status: doctorData.status === 'Available' ? 'Not Available' : 'Available' })}
                                        style={{ padding: '8px 15px', borderRadius: '20px', border: 'none', background: doctorData.status === 'Available' ? '#ff6b6b' : '#84DCC6', color: '#fff', cursor: 'pointer', fontSize: '0.8rem' }}
                                    >
                                        Set {doctorData.status === 'Available' ? 'Busy' : 'Available'}
                                    </button>
                                </div>
                            </div>

                            <button
                                onClick={() => {
                                    if (isEditing) updateDoctorData(doctorData);
                                    setIsEditing(!isEditing);
                                }}
                                style={{ width: '100%', marginTop: '20px', padding: '12px', borderRadius: '15px', border: 'none', background: '#333', color: '#fff', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px', cursor: 'pointer' }}
                            >
                                {isEditing ? <CheckCircle size={18} /> : <Edit3 size={18} />}
                                {isEditing ? 'Save Profile' : 'Edit Profile'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DoctorDashboard;
