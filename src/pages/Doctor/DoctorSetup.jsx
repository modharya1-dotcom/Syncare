import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Camera, Save, ArrowLeft, User, Phone, Briefcase, Calendar } from 'lucide-react';


const DoctorSetup = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        age: '',
        specialization: '',
        photo: null
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const session = JSON.parse(localStorage.getItem('currentUser') || '{}');
        session.name = formData.name;
        localStorage.setItem('currentUser', JSON.stringify(session));

        const users = JSON.parse(localStorage.getItem('users') || '{}');
        if (session.email && users[session.email]) {
            users[session.email] = { ...users[session.email], ...formData };
            localStorage.setItem('users', JSON.stringify(users));
        }

        navigate('/doctor/dashboard');
    };

    return (
        <div style={{ position: 'relative', width: '100%', minHeight: '100vh', background: 'var(--bg-primary)', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '40px' }}>


            <div className="animate-fade-in premium-card" style={{ width: '100%', maxWidth: '540px', padding: '50px', position: 'relative', zIndex: 10 }}>
                <button onClick={() => navigate(-1)} style={{ position: 'absolute', top: '30px', left: '30px', background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px', fontWeight: 600 }}>
                    <ArrowLeft size={18} /> Back
                </button>

                <div style={{ textAlign: 'center', marginBottom: '40px' }}>
                    <h1 style={{ fontSize: '2rem', fontWeight: 900, color: 'var(--primary)', marginBottom: '10px' }}>Professional Profile</h1>
                    <p style={{ color: 'var(--text-muted)' }}>Set up your clinical identity to start managing care.</p>
                </div>

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '15px', marginBottom: '10px' }}>
                        <div style={{
                            width: '100px',
                            height: '100px',
                            borderRadius: '35px',
                            background: 'rgba(58, 90, 120, 0.05)',
                            border: '2px dashed rgba(58, 90, 120, 0.2)',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            cursor: 'pointer',
                            position: 'relative'
                        }}>
                            <Camera size={32} color="var(--primary)" />
                            <div style={{ position: 'absolute', bottom: '-5px', right: '-5px', background: 'var(--success)', width: '24px', height: '24px', borderRadius: '8px', border: '3px solid white' }}></div>
                        </div>
                        <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600 }}>Click to upload clinical photo</span>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                        <SetupField icon={User} label="Full Name" name="name" type="text" placeholder="Dr. Jane Smith" value={formData.name} onChange={handleChange} required />
                        <SetupField icon={Calendar} label="Age" name="age" type="number" placeholder="Experience Years" value={formData.age} onChange={handleChange} required />
                    </div>

                    <SetupField icon={Phone} label="Contact Phone" name="phone" type="tel" placeholder="+1 234 567 890" value={formData.phone} onChange={handleChange} required />

                    <SetupField icon={Briefcase} label="Clinical Specialization" name="specialization" type="text" placeholder="e.g. Neurologist, Psychologist" value={formData.specialization} onChange={handleChange} />

                    <button type="submit" className="btn btn-primary" style={{ padding: '16px', fontSize: '1.1rem', marginTop: '10px' }}>
                        <Save size={20} /> Complete Secure Setup
                    </button>
                </form>
            </div>
        </div>
    );
};

const SetupField = ({ icon: Icon, label, name, type, placeholder, value, onChange, required }) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <label style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Icon size={16} color="var(--primary)" /> {label}
        </label>
        <input
            name={name}
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            required={required}
            style={{
                padding: '14px 18px',
                borderRadius: '14px',
                border: '1.5px solid #EEE',
                outline: 'none',
                fontSize: '0.95rem',
                transition: 'var(--transition)',
                background: 'rgba(255,255,255,0.5)'
            }}
            onFocus={(e) => {
                e.target.style.borderColor = 'var(--primary)';
                e.target.style.background = 'white';
            }}
            onBlur={(e) => {
                e.target.style.borderColor = '#EEE';
                e.target.style.background = 'rgba(255,255,255,0.5)';
            }}
        />
    </div>
);

export default DoctorSetup;
