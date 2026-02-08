import React, { useEffect, useState, useRef } from 'react';
import { Activity, Shield, Heart, Zap, User, Clock, MessageSquare, Mic, Send, Calendar as CalendarIcon } from 'lucide-react';
import useSpeechRecognition from '../hooks/useSpeechRecognition';

const ClinicalSimulation = ({ patientName = "John D.", age = "72" }) => {
    const [pulse, setPulse] = useState(72);
    const [activeTab, setActiveTab] = useState('monitoring'); // 'monitoring' or 'ai-chat'

    // AI Chat State
    const { text, isListening, startListening, stopListening } = useSpeechRecognition();
    const [inputValue, setInputValue] = useState('');
    const [messages, setMessages] = useState([
        { role: 'ai', content: `Clinical analysis ready for ${patientName}. I've processed the latest telemetry and behavioral logs. How can I assist with diagnosis?` }
    ]);
    const [isThinking, setIsThinking] = useState(false);
    const chatEndRef = useRef(null);

    useEffect(() => {
        const interval = setInterval(() => {
            setPulse(p => p + (Math.random() > 0.5 ? 1 : -1));
        }, 2000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        if (text) setInputValue(text);
    }, [text]);

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, isThinking]);

    const handleSendMessage = async (e) => {
        e.preventDefault();
        const input = inputValue.trim();
        if (!input) return;

        setMessages(prev => [...prev, { role: 'user', content: input }]);
        setInputValue('');
        setIsThinking(true);

        setTimeout(() => {
            const response = generateAIInsights(input.toLowerCase(), patientName);
            setMessages(prev => [...prev, { role: 'ai', content: response }]);
            setIsThinking(false);
        }, 1500);
    };

    const generateAIInsights = (query, name) => {
        if (query.includes('behavior') || query.includes('how is')) {
            return `${name} shows increased wandering at night (2-4 AM). Daytime lucidity is 85%. Family reports good routine adherence.`;
        }
        if (query.includes('sleep')) {
            return `Sleep quality dropped 15% this week. More awakening events detected. Correlates with evening agitation in logs.`;
        }
        if (query.includes('medication') || query.includes('pills')) {
            return `Medication compliance: 100%. Heart rate stable post-dosage. No adverse reactions detected.`;
        }
        if (query.includes('confusion')) {
            return `Confusion episode logged yesterday 10:15 AM (12 min duration). Cognitive score: 14/30. Redirected by family.`;
        }
        if (query.includes('mood')) {
            return `Anxiety elevated in evenings (Sundowning). Family advised to increase ambient lighting after 6 PM.`;
        }
        return `Query recorded for ${name}. Patient stable but requires continued evening monitoring. Anything specific to review?`;
    };

    return (
        <div style={{
            width: '100%',
            background: 'var(--white)',
            borderRadius: '0 0 40px 40px',
            position: 'relative',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column'
        }}>
            {/* Tab Navigation */}
            <div style={{ display: 'flex', borderBottom: '2px solid #F0F0F0', background: '#FAFAFA' }}>
                <TabButton
                    active={activeTab === 'monitoring'}
                    onClick={() => setActiveTab('monitoring')}
                    icon={Activity}
                    label="Daily Monitoring"
                />
                <TabButton
                    active={activeTab === 'ai-chat'}
                    onClick={() => setActiveTab('ai-chat')}
                    icon={MessageSquare}
                    label="Clinical AI Assistant"
                />
            </div>

            {/* Tab Content */}
            {activeTab === 'monitoring' ? (
                <MonitoringView pulse={pulse} patientName={patientName} age={age} />
            ) : (
                <AIChat
                    messages={messages}
                    isThinking={isThinking}
                    inputValue={inputValue}
                    setInputValue={setInputValue}
                    handleSendMessage={handleSendMessage}
                    isListening={isListening}
                    startListening={startListening}
                    stopListening={stopListening}
                    chatEndRef={chatEndRef}
                    patientName={patientName}
                />
            )}
        </div>
    );
};

const TabButton = ({ active, onClick, icon: Icon, label }) => (
    <button
        onClick={onClick}
        style={{
            flex: 1,
            padding: '18px 30px',
            background: active ? 'white' : 'transparent',
            border: 'none',
            borderBottom: active ? '3px solid var(--primary)' : '3px solid transparent',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '10px',
            fontWeight: active ? 800 : 600,
            fontSize: '1rem',
            color: active ? 'var(--primary)' : 'var(--text-muted)',
            transition: 'all 0.3s ease'
        }}
    >
        <Icon size={20} />
        {label}
    </button>
);

const MonitoringView = ({ pulse, patientName, age }) => (
    <div style={{ display: 'flex', minHeight: '500px' }}>
        {/* Left Stats Panel */}
        <div style={{ width: '280px', padding: '30px', borderRight: '1px solid #F0F0F0', display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <h4 style={{ margin: '0 0 15px', fontSize: '1.1rem', color: 'var(--primary)' }}>Clinical Summary</h4>
            <StatBox icon={Heart} label="Heart Rate" value={`${pulse} BPM`} color="var(--danger)" />
            <StatBox icon={Zap} label="Activity" value="Stable" color="var(--primary)" />
            <StatBox icon={Shield} label="Security" value="Encrypted" color="var(--success)" />

            <div style={{ marginTop: 'auto', padding: '15px', background: 'rgba(58, 90, 120, 0.05)', borderRadius: '16px' }}>
                <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '5px' }}>PATIENT</div>
                <div style={{ fontWeight: 700 }}>{patientName}</div>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Age {age}</div>
            </div>
        </div>

        {/* Main Visualization */}
        <div style={{ flex: 1, background: '#FBFBFB', position: 'relative', overflow: 'hidden', padding: '30px' }}>
            <div style={{ marginBottom: '25px' }}>
                <h3 style={{ margin: 0, color: 'var(--primary)', fontSize: '1.2rem' }}>AI Cognitive Flow</h3>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '5px' }}>
                    <Clock size={14} style={{ display: 'inline', marginRight: '5px' }} />
                    Updated 1s ago
                </div>
            </div>

            {/* Progress Bars */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginBottom: '30px' }}>
                <ProgressBar label="Cognitive Stability" value={65} color="var(--primary)" />
                <ProgressBar label="Agitation Risk" value={40} color="var(--danger)" />
                <ProgressBar label="Sleep Quality" value={55} color="var(--success)" />
            </div>

            {/* Wave Visualization */}
            <div style={{
                height: '200px',
                border: '1px solid rgba(58, 90, 120, 0.1)',
                borderRadius: '20px',
                background: 'rgba(255,255,255,0.5)',
                backdropFilter: 'blur(5px)',
                position: 'relative',
                overflow: 'hidden'
            }}>
                <WaveContainer color="rgba(58, 90, 120, 0.1)" delay="0s" height="120px" />
                <WaveContainer color="rgba(132, 220, 198, 0.1)" delay="-3s" height="90px" />

                <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center' }}>
                    <div className="pulse-tag">Neural Pattern Recognition Active</div>
                </div>
            </div>
        </div>

        <style>{`
            @keyframes wave {
                0% { transform: translateX(-50%) skewY(0deg); }
                50% { transform: translateX(-25%) skewY(3deg); }
                100% { transform: translateX(-50%) skewY(0deg); }
            }
            .pulse-tag {
                padding: 8px 16px;
                background: var(--primary);
                color: white;
                border-radius: 10px;
                font-size: 0.8rem;
                font-weight: 700;
                animation: pulse 2s infinite;
            }
        `}</style>
    </div>
);

const AIChat = ({ messages, isThinking, inputValue, setInputValue, handleSendMessage, isListening, startListening, stopListening, chatEndRef, patientName }) => (
    <div style={{ display: 'flex', flexDirection: 'column', height: '500px' }}>
        {/* Chat Header */}
        <div style={{ padding: '20px 30px', borderBottom: '1px solid #F0F0F0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
                <h4 style={{ margin: 0, fontSize: '1.1rem', color: 'var(--primary)' }}>Clinical Intelligence for {patientName}</h4>
                <div style={{ fontSize: '0.75rem', color: 'var(--success)', fontWeight: 700, marginTop: '3px' }}>
                    <div style={{ width: '6px', height: '6px', background: 'var(--success)', borderRadius: '50%', display: 'inline-block', marginRight: '5px' }}></div>
                    Processing Live Telemetry
                </div>
            </div>
            <button
                onClick={() => isListening ? stopListening() : startListening()}
                className={isListening ? "btn sos-active" : "btn btn-primary"}
                style={{ padding: '8px 16px', fontSize: '0.85rem' }}
            >
                <Mic size={16} /> {isListening ? 'Listening...' : 'Voice Query'}
            </button>
        </div>

        {/* Chat Messages */}
        <div style={{ flex: 1, padding: '25px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '15px', background: '#F9FAFB' }}>
            {messages.map((msg, idx) => (
                <div key={idx} style={{
                    display: 'flex',
                    gap: '12px',
                    flexDirection: msg.role === 'ai' ? 'row' : 'row-reverse',
                    alignItems: 'flex-start'
                }}>
                    <div style={{
                        width: '35px',
                        height: '35px',
                        borderRadius: '10px',
                        background: msg.role === 'ai' ? 'var(--primary)' : 'var(--text-muted)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0
                    }}>
                        {msg.role === 'ai' ? <MessageSquare size={18} color="white" /> : <User size={18} color="white" />}
                    </div>
                    <div style={{
                        maxWidth: '75%',
                        padding: '14px 20px',
                        borderRadius: msg.role === 'ai' ? '4px 20px 20px 20px' : '20px 4px 20px 20px',
                        background: msg.role === 'ai' ? 'white' : 'var(--primary)',
                        color: msg.role === 'ai' ? 'var(--text-main)' : 'white',
                        fontSize: '0.95rem',
                        fontWeight: 500,
                        lineHeight: '1.5',
                        boxShadow: 'var(--shadow-sm)',
                        border: msg.role === 'ai' ? '1px solid #EEE' : 'none'
                    }}>
                        {msg.content}
                    </div>
                </div>
            ))}
            {isThinking && (
                <div style={{ display: 'flex', gap: '12px' }}>
                    <div style={{ width: '35px', height: '35px', borderRadius: '10px', background: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <MessageSquare size={18} color="white" />
                    </div>
                    <div style={{ background: 'white', padding: '12px 20px', borderRadius: '4px 18px 18px 18px', border: '1px solid #EEE' }}>
                        <div style={{ display: 'flex', gap: '5px' }}>
                            <span style={{ width: '7px', height: '7px', background: '#CCC', borderRadius: '50%', animation: 'pulse 1s infinite' }}></span>
                            <span style={{ width: '7px', height: '7px', background: '#CCC', borderRadius: '50%', animation: 'pulse 1s infinite 0.2s' }}></span>
                            <span style={{ width: '7px', height: '7px', background: '#CCC', borderRadius: '50%', animation: 'pulse 1s infinite 0.4s' }}></span>
                        </div>
                    </div>
                </div>
            )}
            <div ref={chatEndRef} />
        </div>

        {/* Input Area */}
        <form onSubmit={handleSendMessage} style={{ padding: '20px 25px', background: 'white', borderTop: '1px solid #F0F0F0', display: 'flex', gap: '12px' }}>
            <input
                type="text"
                placeholder={isListening ? "Listening..." : "Ask about behavior, sleep, symptoms..."}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                style={{
                    flex: 1,
                    padding: '12px 20px',
                    borderRadius: '14px',
                    border: '1.5px solid #EEE',
                    fontSize: '0.95rem',
                    outline: 'none'
                }}
            />
            <button type="submit" className="btn btn-primary" style={{ padding: '0 20px' }}>
                <Send size={18} />
            </button>
        </form>
    </div>
);

const StatBox = ({ icon: Icon, label, value, color }) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
        <div style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>{label}</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Icon size={16} color={color} />
            <div style={{ fontSize: '1.1rem', fontWeight: 900, color: 'var(--text-main)' }}>{value}</div>
        </div>
    </div>
);

const ProgressBar = ({ label, value, color }) => (
    <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
            <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-main)' }}>{label}</span>
            <span style={{ fontSize: '0.85rem', fontWeight: 800, color }}>{value}%</span>
        </div>
        <div style={{ width: '100%', height: '10px', background: '#EEE', borderRadius: '6px', overflow: 'hidden' }}>
            <div style={{ width: `${value}%`, height: '100%', background: color, borderRadius: '6px', transition: 'width 0.5s ease' }}></div>
        </div>
    </div>
);

const WaveContainer = ({ color, delay, height }) => (
    <div style={{
        position: 'absolute',
        width: '200%',
        height: height,
        background: color,
        bottom: '0',
        left: '0',
        borderRadius: '40%',
        animation: `wave 15s infinite ease-in-out ${delay}`,
        opacity: 0.8
    }} />
);

export default ClinicalSimulation;
