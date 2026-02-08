import React from 'react';
import { Plus, User } from 'lucide-react';

const PatientList = () => {
    const patients = [
        { id: 1, name: 'John Doe', age: 72, stage: 'Early Stage' },
        { id: 2, name: 'Alice Smith', age: 68, stage: 'Middle Stage' },
        { id: 3, name: 'Robert Brown', age: 75, stage: 'Late Stage' },
    ];

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h2 style={{ color: '#fff' }}>My Patients</h2>
                <button style={{ background: '#333', color: '#fff', padding: '10px 20px', borderRadius: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Plus size={18} /> Add Patient
                </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '20px' }}>
                {patients.map(p => (
                    <div key={p.id} style={{ background: '#fff', padding: '20px', borderRadius: '15px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
                        <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: '#eee', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <User size={30} color="#999" />
                        </div>
                        <h3 style={{ margin: 0 }}>{p.name}</h3>
                        <span style={{ color: '#888', fontSize: '0.9rem' }}>{p.age} years • {p.stage}</span>
                        <button style={{ marginTop: '10px', padding: '8px 16px', borderRadius: '15px', border: '1px solid #ddd', background: 'transparent' }}>View Profile</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PatientList;
