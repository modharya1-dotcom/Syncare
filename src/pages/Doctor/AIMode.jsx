import React, { useEffect, useState, useRef } from 'react';
import { Calendar as CalendarIcon, MessageSquare, Mic, Send, User } from 'lucide-react';
import useSpeechRecognition from '../../hooks/useSpeechRecognition';

const AIMode = () => {
    const { text, isListening, startListening, stopListening } = useSpeechRecognition();
    const [inputValue, setInputValue] = useState('');
    const [messages, setMessages] = useState([
        { role: 'ai', content: "Hello Dr. Smith. I've analyzed the telemetry from John Doe's SynCare Watch and the behavior logs from the family hub. How can I assist you with clinical insights today?" }
    ]);
    const [isThinking, setIsThinking] = useState(false);
    const chatEndRef = useRef(null);

    const scrollToBottom = () => {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isThinking]);

    useEffect(() => {
        if (text) {
            setInputValue(text);
        }
    }, [text]);

    const handleSendMessage = async (e) => {
        e.preventDefault();
        const input = inputValue.trim();
        if (!input) return;

        const userMessage = { role: 'user', content: input };
        setMessages(prev => [...prev, userMessage]);
        setInputValue('');
        setIsThinking(true);

        // Simulated AI logic
        setTimeout(() => {
            const response = generateAIInsights(input.toLowerCase());
            setMessages(prev => [...prev, { role: 'ai', content: response }]);
            setIsThinking(false);
        }, 1500);
    };

    const generateAIInsights = (query) => {
        if (query.includes('behavior') || query.includes('how is he')) {
            return "John Doe has been exhibiting increased wandering behavior between 2:00 AM and 4:00 AM. However, his daytime lucidity remains high (85% consistency). The family reports he is following his morning routine well.";
        }
        if (query.includes('sleep')) {
            return "His sleep quality has dropped by 15% this week. We're seeing more frequent awakening events. This might correlate with the mild agitation noted in the evening logs.";
        }
        if (query.includes('medication') || query.includes('pills')) {
            return "Medication compliance is at 100%. The SynCare Watch confirmed heart rate stability post-administration of his morning dosage.";
        }
        if (query.includes('confusion') || query.includes('confused')) {
            return "There was a notable episode of confusion yesterday at 10:15 AM regarding his location. It lasted 12 minutes before he was redirected by his spouse. Cognitive score for the session was 14/30.";
        }
        if (query.includes('mood') || query.includes('feel')) {
            return "His secondary mood analysis suggests higher-than-average anxiety levels during the evening hours (Sundowning syndrome). Family has been advised to increase ambient lighting.";
        }
        return "I've recorded that query. Based on current data, the patient is stable but requires continued monitoring of his evening agitation levels. Anything specific you'd like to look into?";
    };

    return (
        <div style={{ height: 'calc(100vh - 120px)', display: 'flex', gap: '30px', paddingBottom: '20px' }}>

            {/* Left Panel: Monitoring & Static Insights */}
            <div style={{ flex: '0 0 350px', display: 'flex', flexDirection: 'column', gap: '30px' }}>
                <div className="premium-card" style={{ padding: '25px', flex: 1 }}>
                    <h3 style={{ marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px', fontSize: '1.2rem' }}>
                        <CalendarIcon size={22} color="var(--primary)" /> Daily Monitoring
                    </h3>
                    <div style={{
                        height: '240px',
                        background: 'rgba(58, 90, 120, 0.03)',
                        borderRadius: '20px',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '0.9rem',
                        color: 'var(--text-muted)',
                        border: '1.5px dashed var(--glass-border)'
                    }}>
                        <div style={{ width: '80%', height: '8px', background: '#EEE', borderRadius: '4px', marginBottom: '15px' }}>
                            <div style={{ width: '65%', height: '100%', background: 'var(--primary)', borderRadius: '4px' }}></div>
                        </div>
                        Cognitive Stability: 65%
                        <div style={{ width: '80%', height: '8px', background: '#EEE', borderRadius: '4px', margin: '15px 0' }}>
                            <div style={{ width: '40%', height: '100%', background: 'var(--danger)', borderRadius: '4px' }}></div>
                        </div>
                        Agitation Risk: 40%
                    </div>
                </div>

                <div className="premium-card" style={{ padding: '25px', flex: 1 }}>
                    <h3 style={{ marginBottom: '20px', fontSize: '1.2rem', fontWeight: 800 }}>Clinical Summary</h3>
                    <div style={{ fontSize: '1.1rem', color: 'var(--text-main)', lineHeight: '1.8', fontWeight: 500 }}>
                        • Confusion noted @ 10:15 AM<br />
                        • Heart Rate: Stable (72 BPM)<br />
                        • Activity: 4.2k Steps today<br />
                        • Recent SOS: None
                    </div>
                </div>
            </div>

            {/* Right Panel: AI Clinical Assistant Chat */}
            <div className="premium-card" style={{ flex: 1, padding: '0', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
                <div style={{
                    padding: '20px 30px',
                    borderBottom: '1px solid rgba(0,0,0,0.05)',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    background: 'rgba(255,255,255,0.5)'
                }}>
                    <div>
                        <h3 style={{ margin: 0, fontSize: '1.4rem', fontWeight: 900, color: 'var(--primary)' }}>Clinical Intelligence Agent</h3>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem', color: 'var(--success)', fontWeight: 700 }}>
                            <div style={{ width: '6px', height: '6px', background: 'var(--success)', borderRadius: '50%' }}></div>
                            Processing Live Telemetry
                        </div>
                    </div>
                    <button
                        onClick={() => isListening ? stopListening() : startListening()}
                        className={isListening ? "btn sos-active" : "btn"}
                        style={{
                            padding: '10px 20px',
                            fontSize: '0.9rem',
                            background: isListening ? 'var(--danger)' : 'var(--primary)',
                            color: 'white'
                        }}
                    >
                        <Mic size={18} /> {isListening ? 'Listening...' : 'Voice Query'}
                    </button>
                </div>

                {/* Chat History */}
                <div style={{
                    flex: 1,
                    padding: '30px',
                    overflowY: 'auto',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '20px',
                    background: '#F9FAFB'
                }}>
                    {messages.map((msg, idx) => (
                        <div key={idx} style={{
                            display: 'flex',
                            gap: '15px',
                            flexDirection: msg.role === 'ai' ? 'row' : 'row-reverse',
                            alignItems: 'flex-start'
                        }}>
                            <div style={{
                                width: '40px',
                                height: '40px',
                                borderRadius: '12px',
                                background: msg.role === 'ai' ? 'var(--primary)' : 'var(--text-muted)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                flexShrink: 0,
                                boxShadow: 'var(--shadow-sm)'
                            }}>
                                {msg.role === 'ai' ? <MessageSquare size={20} color="white" /> : <User size={20} color="white" />}
                            </div>
                            <div style={{
                                maxWidth: '75%',
                                padding: '18px 24px',
                                borderRadius: msg.role === 'ai' ? '4px 24px 24px 24px' : '24px 4px 24px 24px',
                                background: msg.role === 'ai' ? 'white' : 'var(--primary)',
                                color: msg.role === 'ai' ? 'var(--text-main)' : 'white',
                                fontSize: '1.1rem',
                                fontWeight: 500,
                                lineHeight: '1.6',
                                boxShadow: 'var(--shadow-sm)',
                                border: msg.role === 'ai' ? '1px solid #EEE' : 'none'
                            }}>
                                {msg.content}
                            </div>
                        </div>
                    ))}
                    {isThinking && (
                        <div style={{ display: 'flex', gap: '15px' }}>
                            <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <MessageSquare size={20} color="white" />
                            </div>
                            <div style={{ background: 'white', padding: '15px 25px', borderRadius: '4px 20px 20px 20px', border: '1px solid #EEE' }}>
                                <div style={{ display: 'flex', gap: '6px' }}>
                                    <span style={{ width: '8px', height: '8px', background: '#CCC', borderRadius: '50%', animation: 'pulse 1s infinite' }}></span>
                                    <span style={{ width: '8px', height: '8px', background: '#CCC', borderRadius: '50%', animation: 'pulse 1s infinite 0.2s' }}></span>
                                    <span style={{ width: '8px', height: '8px', background: '#CCC', borderRadius: '50%', animation: 'pulse 1s infinite 0.4s' }}></span>
                                </div>
                            </div>
                        </div>
                    )}
                    <div ref={chatEndRef} />
                </div>

                {/* Input Area */}
                <form onSubmit={handleSendMessage} style={{
                    padding: '25px 30px',
                    background: 'white',
                    borderTop: '1px solid rgba(0,0,0,0.05)',
                    display: 'flex',
                    gap: '15px'
                }}>
                    <input
                        type="text"
                        placeholder={isListening ? "Listening to your query..." : "Ask about behavior, sleep, or symptoms..."}
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        style={{
                            flex: 1,
                            padding: '16px 25px',
                            borderRadius: '16px',
                            border: '1.5px solid #EEE',
                            fontSize: '1.1rem',
                            outline: 'none',
                            transition: 'var(--transition)'
                        }}
                        onFocus={(e) => e.target.style.borderColor = 'var(--primary)'}
                        onBlur={(e) => e.target.style.borderColor = '#EEE'}
                    />
                    <button type="submit" className="btn btn-primary" style={{ padding: '0 25px' }}>
                        <Send size={20} />
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AIMode;
