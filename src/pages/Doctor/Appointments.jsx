import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Plus, X, Clock, User } from 'lucide-react';

const Appointments = () => {
    // Start at current date (February 2026 based on context)
    const [currentDate, setCurrentDate] = useState(new Date());
    const [appointments, setAppointments] = useState({});
    const [selectedDate, setSelectedDate] = useState(null);
    const [showModal, setShowModal] = useState(false);

    // For Modal Form
    const [newAppt, setNewAppt] = useState({ title: '', time: '', patient: '' });
    const [editingId, setEditingId] = useState(null);

    // Persist appointments
    useEffect(() => {
        const stored = localStorage.getItem('doctorAppointments');
        if (stored) {
            setAppointments(JSON.parse(stored));
        }
    }, []);

    const saveAppointments = (newAppts) => {
        setAppointments(newAppts);
        localStorage.setItem('doctorAppointments', JSON.stringify(newAppts));
    };

    // Calendar Logic
    const getDaysInMonth = (date) => new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    const getFirstDayOfMonth = (date) => new Date(date.getFullYear(), date.getMonth(), 1).getDay();

    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    const handlePrevMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
    };

    const handleNextMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
    };

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

        const apptObj = {
            id: editingId || Date.now(),
            ...newAppt
        };

        const currentAppts = appointments[selectedDate] || [];

        let updatedList;
        if (editingId) {
            updatedList = currentAppts.map(a => a.id === editingId ? apptObj : a);
        } else {
            updatedList = [...currentAppts, apptObj];
        }

        // Sort by time
        updatedList.sort((a, b) => a.time.localeCompare(b.time));

        saveAppointments({
            ...appointments,
            [selectedDate]: updatedList
        });

        setShowModal(false);
    };

    const handleDeleteAppt = (id) => {
        if (!selectedDate) return;
        const currentAppts = appointments[selectedDate] || [];
        const updatedList = currentAppts.filter(a => a.id !== id);
        saveAppointments({
            ...appointments,
            [selectedDate]: updatedList
        });
    };

    const renderCalendarGrid = () => {
        const totalDays = getDaysInMonth(currentDate);
        const startDay = getFirstDayOfMonth(currentDate); // 0 = Sunday

        const days = [];
        // Empty cells for padding
        for (let i = 0; i < startDay; i++) {
            days.push(<div key={`empty-${i}`} style={{ height: '100px', background: '#f9f9f9', border: '1px solid #eee' }}></div>);
        }

        // Days
        for (let d = 1; d <= totalDays; d++) {
            const dateStr = `${currentDate.getFullYear()}-${currentDate.getMonth()}-${d}`;
            const dayAppts = appointments[dateStr] || [];

            // Check if it's "today"
            const today = new Date();
            const isToday = today.getDate() === d && today.getMonth() === currentDate.getMonth() && today.getFullYear() === currentDate.getFullYear();

            days.push(
                <div
                    key={d}
                    onClick={() => handleDateClick(d)}
                    style={{
                        height: '100px',
                        background: '#fff',
                        border: isToday ? '2px solid #84DCC6' : '1px solid #eee',
                        padding: '5px',
                        cursor: 'pointer',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '2px',
                        overflow: 'hidden',
                        transition: 'background 0.2s',
                        borderRadius: '5px'
                    }}
                    onMouseOver={(e) => !isToday && (e.currentTarget.style.background = '#f5f5f5')}
                    onMouseOut={(e) => !isToday && (e.currentTarget.style.background = '#fff')}
                >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontWeight: 'bold', fontSize: '0.9rem', color: isToday ? '#84DCC6' : '#333' }}>{d}</span>
                        {dayAppts.length > 0 && <span style={{ fontSize: '0.7rem', color: '#666' }}>{dayAppts.length} appts</span>}
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', marginTop: '5px', overflowY: 'auto' }}>
                        {dayAppts.slice(0, 2).map((apt, idx) => (
                            <div key={idx} style={{ fontSize: '0.7rem', background: '#C1AE8F', color: '#fff', padding: '2px 4px', borderRadius: '3px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                {apt.time} - {apt.patient}
                            </div>
                        ))}
                        {dayAppts.length > 2 && <div style={{ fontSize: '0.7rem', color: '#999', textAlign: 'center' }}>+{dayAppts.length - 2} more</div>}
                    </div>
                </div>
            );
        }

        return days;
    };

    return (
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h2 style={{ color: '#fff', margin: 0 }}>My Schedule</h2>
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px', background: '#fff', padding: '10px 20px', borderRadius: '30px', boxShadow: '0 4px 10px rgba(0,0,0,0.1)' }}>
                    <button onClick={handlePrevMonth} style={{ background: 'none', border: 'none', cursor: 'pointer' }}><ChevronLeft size={20} /></button>
                    <span style={{ fontSize: '1.2rem', fontWeight: 'bold', minWidth: '150px', textAlign: 'center' }}>
                        {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
                    </span>
                    <button onClick={handleNextMonth} style={{ background: 'none', border: 'none', cursor: 'pointer' }}><ChevronRight size={20} /></button>
                </div>
            </div>

            <div style={{ background: '#fff', padding: '20px', borderRadius: '20px', flex: 1, display: 'flex', flexDirection: 'column', boxShadow: '0 10px 25px rgba(0,0,0,0.05)' }}>
                {/* Weekday Headers */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', marginBottom: '10px', textAlign: 'center', fontWeight: 'bold', color: '#999' }}>
                    <div>Sun</div><div>Mon</div><div>Tue</div><div>Wed</div><div>Thu</div><div>Fri</div><div>Sat</div>
                </div>

                {/* Calendar Grid */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '5px', flex: 1, overflowY: 'auto' }}>
                    {renderCalendarGrid()}
                </div>
            </div>

            {/* Appointment Modal */}
            {showModal && (
                <div style={{
                    position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000
                }}>
                    <div style={{ background: '#fff', padding: '30px', borderRadius: '20px', width: '400px', maxWidth: '90%' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                            <h3 style={{ margin: 0 }}> Appointments for {selectedDate}</h3>
                            <button onClick={() => setShowModal(false)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}><X size={24} /></button>
                        </div>

                        {/* Existing Appointments List */}
                        <div style={{ maxHeight: '200px', overflowY: 'auto', marginBottom: '20px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                            {(appointments[selectedDate] || []).length === 0 ? (
                                <p style={{ color: '#999', fontStyle: 'italic' }}>No appointments yet.</p>
                            ) : (
                                (appointments[selectedDate] || []).map(apt => (
                                    <div key={apt.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#f5f5f5', padding: '10px', borderRadius: '10px' }}>
                                        <div>
                                            <div style={{ fontWeight: 'bold' }}>{apt.time} - {apt.patient}</div>
                                            <div style={{ fontSize: '0.8rem', color: '#666' }}>{apt.title}</div>
                                        </div>
                                        <div style={{ display: 'flex', gap: '5px' }}>
                                            <button
                                                onClick={() => {
                                                    setNewAppt(apt);
                                                    setEditingId(apt.id);
                                                }}
                                                style={{ fontSize: '0.8rem', color: '#C1AE8F', border: '1px solid #C1AE8F', background: 'none', padding: '2px 8px', borderRadius: '5px', cursor: 'pointer' }}>
                                                Edit
                                            </button>
                                            <button
                                                onClick={() => handleDeleteAppt(apt.id)}
                                                style={{ fontSize: '0.8rem', color: '#ff4d4d', border: '1px solid #ff4d4d', background: 'none', padding: '2px 8px', borderRadius: '5px', cursor: 'pointer' }}>
                                                Del
                                            </button>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>

                        <hr style={{ border: 'none', borderTop: '1px solid #eee', margin: '20px 0' }} />

                        {/* Add/Edit Form */}
                        <h4 style={{ marginBottom: '15px' }}>{editingId ? 'Edit Appointment' : 'Add New Appointment'}</h4>
                        <form onSubmit={handleSaveAppt} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                            <div style={{ display: 'flex', gap: '10px' }}>
                                <div style={{ flex: 1 }}>
                                    <label style={{ display: 'block', fontSize: '0.8rem', color: '#666', marginBottom: '5px' }}>Time</label>
                                    <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #ddd', borderRadius: '8px', padding: '8px' }}>
                                        <Clock size={16} color="#999" style={{ marginRight: '8px' }} />
                                        <input
                                            type="time"
                                            value={newAppt.time}
                                            onChange={e => setNewAppt({ ...newAppt, time: e.target.value })}
                                            style={{ border: 'none', outline: 'none', width: '100%' }}
                                            required
                                        />
                                    </div>
                                </div>
                                <div style={{ flex: 2 }}>
                                    <label style={{ display: 'block', fontSize: '0.8rem', color: '#666', marginBottom: '5px' }}>Patient Name</label>
                                    <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #ddd', borderRadius: '8px', padding: '8px' }}>
                                        <User size={16} color="#999" style={{ marginRight: '8px' }} />
                                        <input
                                            type="text"
                                            placeholder="John Doe"
                                            value={newAppt.patient}
                                            onChange={e => setNewAppt({ ...newAppt, patient: e.target.value })}
                                            style={{ border: 'none', outline: 'none', width: '100%' }}
                                            required
                                        />
                                    </div>
                                </div>
                            </div>

                            <div>
                                <label style={{ display: 'block', fontSize: '0.8rem', color: '#666', marginBottom: '5px' }}>Appointment Type / Notes</label>
                                <input
                                    type="text"
                                    placeholder="Regular Checkup, Urgent, etc."
                                    value={newAppt.title}
                                    onChange={e => setNewAppt({ ...newAppt, title: e.target.value })}
                                    style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '8px', outline: 'none' }}
                                    required
                                />
                            </div>

                            <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                                {editingId && (
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setEditingId(null);
                                            setNewAppt({ title: '', time: '09:00', patient: '' });
                                        }}
                                        style={{ flex: 1, padding: '10px', borderRadius: '10px', border: '1px solid #ddd', background: '#fff', cursor: 'pointer' }}
                                    >
                                        Cancel Edit
                                    </button>
                                )}
                                <button
                                    type="submit"
                                    style={{ flex: 2, padding: '10px', borderRadius: '10px', border: 'none', background: '#84DCC6', color: '#fff', fontWeight: 'bold', cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '5px' }}
                                >
                                    <Plus size={18} /> {editingId ? 'Save Changes' : 'Add Appointment'}
                                </button>
                            </div>
                        </form>

                    </div>
                </div>
            )}
        </div>
    );
};

export default Appointments;
