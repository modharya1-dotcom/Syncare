import React, { useState } from 'react';
import { Plus, User, ChevronRight, Activity, XCircle } from 'lucide-react';
import ClinicalSimulation from '../../components/ClinicalSimulation';

const PatientList = () => {
    const [selectedPatient, setSelectedPatient] = useState(null);

    const patients = [
        { id: 1, name: 'John Doe', age: 72, stage: 'Early Stage', status: 'Stable' },
        { id: 2, name: 'Alice Smith', age: 68, stage: 'Middle Stage', status: 'Reviewing' },
        { id: 3, name: 'Robert Brown', age: 75, stage: 'Late Stage', status: 'Critical' },
    ];

    const openDossier = (patient) => {
        setSelectedPatient(patient);
    };

    const closeDossier = () => {
        setSelectedPatient(null);
    };

    return (
        <div className="animate-fade-in" style={{ position: 'relative' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
                <h2 style={{ color: 'var(--primary)', fontWeight: 800, fontSize: '1.8rem' }}>Clinical Patient Registry</h2>
                <button className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <Plus size={20} /> Register New Record
                </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '25px' }}>
                {patients.map(p => (
                    <div key={p.id} className="premium-card" style={{ padding: '30px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                            <div style={{ width: '64px', height: '64px', borderRadius: '20px', background: 'var(--secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <User size={30} color="var(--primary)" />
                            </div>
                            <span style={{
                                padding: '6px 14px',
                                background: p.status === 'Critical' ? 'rgba(225, 106, 106, 0.1)' : 'rgba(58, 90, 120, 0.05)',
                                color: p.status === 'Critical' ? 'var(--danger)' : 'var(--primary)',
                                borderRadius: '100px',
                                fontSize: '0.8rem',
                                fontWeight: 700
                            }}>
                                {p.status}
                            </span>
                        </div>

                        <div>
                            <h3 style={{ margin: 0, fontSize: '1.3rem', color: 'var(--text-main)', fontWeight: 800 }}>{p.name}</h3>
                            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '8px', fontWeight: 500 }}>{p.age} Years • {p.stage}</p>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '15px', padding: '15px', background: 'rgba(58, 90, 120, 0.03)', borderRadius: '16px' }}>
                            <Activity size={18} color="var(--primary)" />
                            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Last synced: 14m ago</span>
                        </div>

                        <button
                            onClick={() => openDossier(p)}
                            className="btn btn-outline"
                            style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px', width: '100%', padding: '12px', fontSize: '0.95rem', fontWeight: 700 }}
                        >
                            Full Clinical Dossier <ChevronRight size={20} />
                        </button>
                    </div>
                ))}
            </div>

            {/* Clinical Dossier Modal with Simulation */}
            {selectedPatient && (
                <div style={{
                    position: 'fixed',
                    inset: 0,
                    background: 'rgba(0,0,0,0.6)',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    zIndex: 2000,
                    backdropFilter: 'blur(10px)',
                    padding: '40px'
                }}>
                    <div className="animate-fade-in" style={{
                        width: '100%',
                        maxWidth: '1100px',
                        position: 'relative'
                    }}>
                        <button
                            onClick={closeDossier}
                            style={{
                                position: 'absolute',
                                top: '-20px',
                                right: '-20px',
                                background: 'var(--primary)',
                                border: 'none',
                                borderRadius: '50%',
                                padding: '5px',
                                cursor: 'pointer',
                                zIndex: 10,
                                boxShadow: 'var(--shadow-lg)'
                            }}
                        >
                            <XCircle size={32} color="white" />
                        </button>

                        <div style={{
                            background: 'white',
                            borderRadius: '40px',
                            overflow: 'hidden',
                            boxShadow: 'var(--shadow-premium)'
                        }}>
                            <div style={{ padding: '30px 40px', background: 'var(--primary)', color: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <div>
                                    <h2 style={{ margin: 0, color: 'white' }}>Clinical Dossier: {selectedPatient.name}</h2>
                                    <p style={{ margin: '5px 0 0', opacity: 0.8 }}>{selectedPatient.age} Years • {selectedPatient.stage} • Last Sync 14m ago</p>
                                </div>
                                <div style={{ textAlign: 'right' }}>
                                    <div style={{ fontSize: '0.8rem', opacity: 0.7 }}>SYNC STATUS</div>
                                    <div style={{ fontWeight: 800, color: 'var(--success)' }}>ENCRYPTED</div>
                                </div>
                            </div>

                            <div style={{ padding: '0px 0 40px' }}>
                                <ClinicalSimulation patientName={selectedPatient.name} age={selectedPatient.age} />
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PatientList;
