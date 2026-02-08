import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Plus, X, Clock, User, Calendar as CalendarIcon, CheckCircle } from 'lucide-react';

const Appointments = () => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [appointments, setAppointments] = useState({});
    const [selectedDate, setSelectedDate] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [newAppt, setNewAppt] = useState({ title: '', time: '', patient: '' });
    const [editingId, setEditingId] = useState(null);

    useEffect(() => {
        const stored = localStorage.getItem('doctorAppointments');
        if (stored) setAppointments(JSON.parse(stored));
    }, []);

    const saveAppointments = (newAppts) => {
        setAppointments(newAppts);
        localStorage.setItem('doctorAppointments', JSON.stringify(newAppts));
    };

    const getDaysInMonth = (date) => new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    const getFirstDayOfMonth = (date) => new Date(date.getFullYear(), date.getMonth(), 1).getDay();

    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    const handlePrevMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
    const handleNextMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));

    const handleDateClick = (day) => {
        const dateStr = `${currentDate.getFullYear()}-${currentDate.getMonth()}-${day}`;
        setSelectedDate(dateStr);
        setNewAppt({ title: '', time: '09:00', patient: '' });
        setEditingId(null);
        setShowModal(true);
    };

    const handleSaveAppt = (e) => {
        e.preventDefault();
        if (!selectedDate) return;
        const apptObj = { id: editingId || Date.now(), ...newAppt };
        const currentAppts = appointments[selectedDate] || [];
        let updatedList = editingId ? currentAppts.map(a => a.id === editingId ? apptObj : a) : [...currentAppts, apptObj];
        updatedList.sort((a, b) => a.time.localeCompare(b.time));
        saveAppointments({ ...appointments, [selectedDate]: updatedList });
        setShowModal(false);
    };

    const handleDeleteAppt = (id) => {
        if (!selectedDate) return;
        const currentAppts = appointments[selectedDate] || [];
        saveAppointments({ ...appointments, [selectedDate]: currentAppts.filter(a => a.id !== id) });
    };

    const renderCalendarGrid = () => {
        const totalDays = getDaysInMonth(currentDate);
        const startDay = getFirstDayOfMonth(currentDate);
        const days = [];
        for (let i = 0; i < startDay; i++) days.push(<div key={`empty-${i}`} style={{ height: '140px', opacity: 0.3 }}></div>);

        for (let d = 1; d <= totalDays; d++) {
            const dateStr = `${currentDate.getFullYear()}-${currentDate.getMonth()}-${d}`;
            const dayAppts = appointments[dateStr] || [];
            const isToday = new Date().toDateString() === new Date(currentDate.getFullYear(), currentDate.getMonth(), d).toDateString();

            days.push(
                <div
                    key={d}
                    onClick={() => handleDateClick(d)}
                    className="premium-card"
                    style={{
                        height: '140px',
                        background: isToday ? 'rgba(58, 90, 120, 0.05)' : 'white',
                        border: isToday ? '2px solid var(--primary)' : '1px solid #EEE',
                        padding: '15px',
                        cursor: 'pointer',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '8px',
                        overflow: 'hidden',
                        borderRadius: '20px'
                    }}
                    onMouseOver={(e) => !isToday && (e.currentTarget.style.borderColor = 'var(--primary)')}
                    onMouseOut={(e) => !isToday && (e.currentTarget.style.borderColor = '#EEE')}
                >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontWeight: 900, fontSize: '1.1rem', color: isToday ? 'var(--primary)' : 'var(--text-main)' }}>{d}</span>
                        {dayAppts.length > 0 && <span style={{ fontSize: '0.75rem', color: 'var(--primary)', fontWeight: 700 }}>{dayAppts.length} Appts</span>}
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', overflowY: 'hidden' }}>
                        {dayAppts.slice(0, 2).map((apt, idx) => (
                            <div key={idx} style={{ fontSize: '0.75rem', background: 'var(--primary)', color: '#fff', padding: '4px 8px', borderRadius: '8px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                {apt.time} - {apt.patient}
                            </div>
                        ))}
                        {dayAppts.length > 2 && <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textAlign: 'center' }}>+{dayAppts.length - 2} more</div>}
                    </div>
                </div>
            );
        }
        return days;
    };

    return (
        <div className="animate-fade-in" style={{ height: '100%', display: 'flex', flexDirection: 'column', gap: '30px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h2 style={{ color: 'var(--primary)', margin: 0, fontWeight: 900, fontSize: '3rem' }}>Clinical Calendar</h2>
                <div className="glass-nav" style={{ display: 'flex', alignItems: 'center', gap: '15px', padding: '10px 25px', borderRadius: '100px', boxShadow: 'var(--shadow-sm)' }}>
                    <button onClick={handlePrevMonth} className="btn-icon"><ChevronLeft size={20} /></button>
                    <span style={{ fontSize: '1.1rem', fontWeight: 800, minWidth: '160px', textAlign: 'center', color: 'var(--primary)' }}>
                        {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
                    </span>
                    <button onClick={handleNextMonth} className="btn-icon"><ChevronRight size={20} /></button>
                </div>
            </div>

            <div className="premium-card" style={{ padding: '30px', flex: 1, display: 'flex', flexDirection: 'column', boxShadow: 'var(--shadow-lg)' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', marginBottom: '20px', textAlign: 'center', fontWeight: 800, color: 'var(--text-muted)', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '1px' }}>
                    <div>Sun</div><div>Mon</div><div>Tue</div><div>Wed</div><div>Thu</div><div>Fri</div><div>Sat</div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '15px', flex: 1, overflowY: 'auto', padding: '5px' }}>
                    {renderCalendarGrid()}
                </div>
            </div>

            {showModal && (
                <div style={{ position: 'fixed', inset: 0, background: 'rgba(58, 90, 120, 0.4)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 2000, backdropFilter: 'blur(10px)' }}>
                    <div className="premium-card" style={{ width: '480px', padding: '40px', background: 'white' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
                            <h3 style={{ margin: 0, color: 'var(--primary)' }}>Consultations: {selectedDate}</h3>
                            <button onClick={() => setShowModal(false)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}><X size={24} color="var(--text-muted)" /></button>
                        </div>

                        <div style={{ maxHeight: '250px', overflowY: 'auto', marginBottom: '30px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                            {(appointments[selectedDate] || []).length === 0 ? (
                                <p style={{ color: 'var(--text-muted)', fontStyle: 'italic', textAlign: 'center' }}>No consultations scheduled.</p>
                            ) : (
                                (appointments[selectedDate] || []).map(apt => (
                                    <div key={apt.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(58, 90, 120, 0.03)', padding: '15px', borderRadius: '16px', border: '1px solid #F0F0F0' }}>
                                        <div>
                                            <div style={{ fontWeight: 900, color: 'var(--text-main)', fontSize: '1.2rem' }}>{apt.time} - {apt.patient}</div>
                                            <div style={{ fontSize: '1rem', color: 'var(--text-muted)', fontWeight: 500 }}>{apt.title}</div>
                                        </div>
                                        <div style={{ display: 'flex', gap: '10px' }}>
                                            <button onClick={() => { setNewAppt(apt); setEditingId(apt.id); }} style={{ color: 'var(--primary)', border: 'none', background: 'none', fontWeight: 700, fontSize: '0.8rem', cursor: 'pointer' }}>Edit</button>
                                            <button onClick={() => handleDeleteAppt(apt.id)} style={{ color: 'var(--danger)', border: 'none', background: 'none', fontWeight: 700, fontSize: '0.8rem', cursor: 'pointer' }}>Delete</button>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>

                        <hr style={{ border: 'none', borderTop: '1px solid #EEE', margin: '30px 0' }} />

                        <form onSubmit={handleSaveAppt} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                                <FormField label="Time" icon={Clock} type="time" value={newAppt.time} onChange={e => setNewAppt({ ...newAppt, time: e.target.value })} required />
                                <FormField label="Patient" icon={User} type="text" placeholder="Full Name" value={newAppt.patient} onChange={e => setNewAppt({ ...newAppt, patient: e.target.value })} required />
                            </div>
                            <FormField label="Consultation Type" icon={CalendarIcon} type="text" placeholder="e.g. Behavioral Review" value={newAppt.title} onChange={e => setNewAppt({ ...newAppt, title: e.target.value })} required />

                            <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '10px', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px' }}>
                                {editingId ? <CheckCircle size={20} /> : <Plus size={20} />}
                                {editingId ? 'Save Clinical Changes' : 'Schedule Consultation'}
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

const FormField = ({ label, icon: Icon, ...props }) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
        <label style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>{label}</label>
        <div style={{ display: 'flex', alignItems: 'center', border: '1.5px solid #EEE', borderRadius: '12px', padding: '10px 14px', background: 'white' }}>
            <Icon size={16} color="var(--primary)" style={{ marginRight: '10px' }} />
            <input {...props} style={{ border: 'none', outline: 'none', width: '100%', fontSize: '0.9rem', color: 'var(--text-main)' }} />
        </div>
    </div>
);

export default Appointments;
