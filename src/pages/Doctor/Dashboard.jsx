import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { User, Users, Calendar, Mic, Activity, LogOut, Home as HomeIcon, CheckCircle, XCircle, Settings, Edit3, Heart, Shield, Bell, ArrowLeft, Save, Phone, Briefcase } from 'lucide-react';
import PatientList from './PatientList';
import Appointments from './Appointments';

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
    const [notifications, setNotifications] = useState([]);
    const [showNotifPanel, setShowNotifPanel] = useState(false);

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

    // SOS Notification Polling
    useEffect(() => {
        const checkSOS = () => {
            const signal = JSON.parse(localStorage.getItem('sos_signal') || '{"active": false}');
            if (signal.active) {
                const notifId = `sos-${signal.timestamp}`;
                setNotifications(prev => {
                    if (prev.find(n => n.id === notifId)) return prev;
                    return [{
                        id: notifId,
                        type: 'SOS',
                        message: `URGENCY: ${signal.patient} has triggered an SOS signal!`,
                        time: new Date(signal.timestamp).toLocaleTimeString()
                    }, ...prev];
                });
            }
        };
        const interval = setInterval(checkSOS, 2000);
        return () => clearInterval(interval);
    }, []);

    const updateDoctorData = (newData) => {
        setDoctorData(newData);
        const users = JSON.parse(localStorage.getItem('users') || '{}');
        if (newData.email && users[newData.email]) {
            users[newData.email] = { ...users[newData.email], ...newData };
            localStorage.setItem('users', JSON.stringify(users));
        }
        const session = JSON.parse(localStorage.getItem('currentUser') || '{}');
        session.name = newData.name;
        localStorage.setItem('currentUser', JSON.stringify(session));
    };

    const handleLogout = () => {
        localStorage.removeItem('currentUser');
        navigate('/');
    };

    const Sidebar = () => (
        <aside className="glass-nav" style={{
            width: '100px',
            height: 'calc(100vh - 40px)',
            margin: '20px',
            borderRadius: '30px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '40px 0',
            gap: '35px',
            position: 'fixed',
            left: 0,
            top: 0,
            zIndex: 1000,
            boxShadow: 'var(--shadow-lg)'
        }}>
            <div onClick={() => navigate('/')} style={{ cursor: 'pointer', background: 'var(--primary)', padding: '12px', borderRadius: '15px' }}>
                <Heart size={24} color="white" fill="white" />
            </div>

            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '30px', alignItems: 'center' }}>
                <SidebarItem icon={HomeIcon} title="Home" active={location.pathname === '/doctor' || location.pathname === '/doctor/'} onClick={() => navigate('/doctor')} />
                <SidebarItem icon={Users} title="Registry" active={location.pathname.includes('dashboard')} onClick={() => navigate('/doctor/dashboard')} />
                <SidebarItem icon={Calendar} title="Calendar" active={location.pathname.includes('appointments')} onClick={() => navigate('/doctor/appointments')} />
            </div>

            <SidebarItem icon={LogOut} title="Logout" onClick={handleLogout} />
        </aside>
    );

    const SidebarItem = ({ icon: Icon, active, onClick, title }) => (
        <div
            onClick={onClick}
            title={title}
            style={{
                cursor: 'pointer',
                color: active ? 'var(--primary)' : 'var(--text-muted)',
                transition: 'var(--transition)',
                padding: '12px',
                borderRadius: '16px',
                background: active ? 'rgba(58, 90, 120, 0.08)' : 'transparent',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}
        >
            <Icon size={24} strokeWidth={active ? 2.5 : 2} />
        </div>
    );

    const WelcomeHome = () => (
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <div className="animate-fade-in" style={{ maxWidth: '1200px', width: '100%' }}>
                <div style={{ marginBottom: '40px' }}>
                    <h1 style={{ fontSize: '2.5rem', fontWeight: 900, color: 'var(--primary)', margin: 0 }}>Welcome back,</h1>
                    <h2 style={{ fontSize: '2rem', fontWeight: 800, margin: 0, opacity: 0.8 }}>Dr. {doctorData.name}</h2>
                    <p style={{ color: 'var(--text-muted)', fontSize: '1.2rem', marginTop: '10px', fontWeight: 500 }}>Global Patient Review: 8 active cases.</p>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '25px' }}>
                    <div className="premium-card" style={{ padding: '30px', background: 'var(--primary)', color: 'white' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
                            <Activity color="white" size={28} />
                        </div>
                        <h3 style={{ color: 'white', marginBottom: '10px', fontSize: '1.4rem' }}>Registry Access</h3>
                        <p style={{ opacity: 0.9, marginBottom: '25px', fontSize: '1rem' }}>Enter patient dossiers for specific AI insights and behavior analysis.</p>
                        <button onClick={() => navigate('/doctor/dashboard')} className="btn" style={{ background: 'white', color: 'var(--primary)', width: '100%', padding: '12px', fontWeight: 800 }}>Enter Registry</button>
                    </div>

                    <div className="premium-card" style={{ padding: '30px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
                            <Calendar color="var(--primary)" size={28} />
                        </div>
                        <h3 style={{ fontSize: '1.4rem', marginBottom: '10px' }}>Schedule</h3>
                        <p style={{ color: 'var(--text-muted)', marginBottom: '25px', fontSize: '1rem' }}>Review appointments and clinical syncs for the week.</p>
                        <button onClick={() => navigate('/doctor/appointments')} className="btn btn-outline" style={{ width: '100%', padding: '12px', fontWeight: 800 }}>View Calendar</button>
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <div style={{ position: 'relative', width: '100%', height: '100vh', background: 'var(--bg-primary)', display: 'flex', overflow: 'hidden' }}>
            <Sidebar />

            <div style={{ flex: 1, paddingLeft: '140px', paddingTop: '30px', paddingRight: '40px', position: 'relative', zIndex: 10, overflowY: 'auto' }}>
                <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
                    <div style={{ display: 'flex', gap: '15px' }}>
                        <button onClick={() => navigate(-1)} className="btn btn-icon" title="Go Back">
                            <ArrowLeft size={20} />
                        </button>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                        <div
                            className="glass-nav"
                            style={{
                                padding: '10px',
                                borderRadius: '14px',
                                position: 'relative',
                                cursor: 'pointer',
                                background: showNotifPanel ? 'var(--primary)' : 'white',
                                color: showNotifPanel ? 'white' : 'var(--primary)'
                            }}
                            onClick={() => setShowNotifPanel(!showNotifPanel)}
                        >
                            <Bell size={20} />
                            {notifications.length > 0 && <div style={{ position: 'absolute', top: '8px', right: '8px', width: '8px', height: '8px', background: 'var(--danger)', borderRadius: '50%', border: '2px solid white' }}></div>}

                            {showNotifPanel && (
                                <div className="premium-card" style={{ position: 'absolute', top: '55px', right: '0', width: '300px', padding: '15px', zIndex: 3000, boxShadow: 'var(--shadow-lg)' }}>
                                    <h4 style={{ margin: '0 0 15px', display: 'flex', justifyContent: 'space-between' }}>
                                        Notifications
                                        <XCircle size={18} style={{ cursor: 'pointer' }} onClick={(e) => { e.stopPropagation(); setShowNotifPanel(false); }} />
                                    </h4>
                                    {notifications.length === 0 ? (
                                        <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>No new alerts.</p>
                                    ) : (
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                            {notifications.map(n => (
                                                <div key={n.id} style={{ background: 'rgba(211, 47, 47, 0.05)', padding: '10px', borderRadius: '12px', border: '1px solid rgba(211,47,47,0.1)' }}>
                                                    <div style={{ fontWeight: 800, fontSize: '0.75rem', color: 'var(--danger)' }}>{n.type} ALERT</div>
                                                    <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-main)' }}>{n.message}</div>
                                                    <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '4px' }}>{n.time}</div>
                                                </div>
                                            ))}
                                            <button
                                                onClick={(e) => { e.stopPropagation(); setNotifications([]); }}
                                                style={{ width: '100%', border: 'none', background: 'none', color: 'var(--primary)', fontWeight: 700, fontSize: '0.8rem', cursor: 'pointer', marginTop: '5px' }}
                                            >
                                                Clear All
                                            </button>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>

                        <div onClick={() => { setShowProfileModal(true); setIsEditing(false); }} style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '12px',
                            background: 'white',
                            padding: '8px 18px',
                            borderRadius: '20px',
                            cursor: 'pointer',
                            boxShadow: 'var(--shadow-sm)',
                            border: '1px solid rgba(0,0,0,0.05)'
                        }}>
                            <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'var(--primary)', color: 'white', display: 'flex', justifyContent: 'center', alignItems: 'center', fontWeight: 'bold', fontSize: '0.8rem' }}>
                                {doctorData.name.charAt(0)}
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-main)' }}>Dr. {doctorData.name}</span>
                                <span style={{ fontSize: '0.7rem', color: 'var(--success)', fontWeight: 700 }}>{doctorData.status}</span>
                            </div>
                        </div>
                    </div>
                </header>

                <Routes>
                    <Route path="/" element={<WelcomeHome />} />
                    <Route path="dashboard" element={<PatientList />} />
                    <Route path="appointments" element={<Appointments />} />
                </Routes>
            </div>

            {/* Editable Profile Modal */}
            {showProfileModal && (
                <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 2000, backdropFilter: 'blur(10px)' }}>
                    <div className="animate-fade-in premium-card" style={{ width: '450px', padding: '35px', position: 'relative' }}>
                        <button onClick={() => setShowProfileModal(false)} style={{ position: 'absolute', top: '25px', right: '25px', background: 'none', border: 'none', cursor: 'pointer' }}>
                            <XCircle size={28} color="#CCC" />
                        </button>

                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
                            <div style={{ width: '80px', height: '80px', borderRadius: '24px', background: 'var(--secondary)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                <User size={40} color="var(--primary)" />
                            </div>

                            {isEditing ? (
                                <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '15px' }}>
                                    <h3 style={{ margin: '0 0 10px', textAlign: 'center' }}>Edit Profile</h3>
                                    <EditInput label="Name" value={doctorData.name} onChange={(v) => setDoctorData({ ...doctorData, name: v })} />
                                    <EditInput label="Specialization" value={doctorData.specialization} onChange={(v) => setDoctorData({ ...doctorData, specialization: v })} />
                                    <EditInput label="Phone" value={doctorData.phone} onChange={(v) => setDoctorData({ ...doctorData, phone: v })} />
                                    <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                                        <button className="btn btn-primary" style={{ flex: 1 }} onClick={() => { updateDoctorData(doctorData); setIsEditing(false); }}>
                                            <Save size={18} /> Save Changes
                                        </button>
                                        <button className="btn btn-outline" style={{ flex: 1 }} onClick={() => setIsEditing(false)}>Cancel</button>
                                    </div>
                                </div>
                            ) : (
                                <>
                                    <div style={{ textAlign: 'center' }}>
                                        <h2 style={{ margin: 0, color: 'var(--primary)', fontSize: '1.6rem' }}>Dr. {doctorData.name}</h2>
                                        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '5px' }}>{doctorData.specialization}</p>
                                    </div>
                                    <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '15px' }}>
                                        <div style={{ borderBottom: '1px solid #F0F0F0', paddingBottom: '10px' }}>
                                            <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: 700 }}>PHONE</div>
                                            <div style={{ fontWeight: 600 }}>{doctorData.phone}</div>
                                        </div>
                                        <div style={{ borderBottom: '1px solid #F0F0F0', paddingBottom: '10px' }}>
                                            <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: 700 }}>EMAIL</div>
                                            <div style={{ fontWeight: 600 }}>{doctorData.email}</div>
                                        </div>
                                        <button className="btn btn-outline" style={{ width: '100%' }} onClick={() => setIsEditing(true)}>
                                            <Edit3 size={18} /> Edit Profile Info
                                        </button>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

const EditInput = ({ label, value, onChange }) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
        <label style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--primary)' }}>{label}</label>
        <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            style={{ padding: '12px', borderRadius: '12px', border: '1px solid #DDD', outline: 'none', width: '100%' }}
        />
    </div>
);

export default DoctorDashboard;
