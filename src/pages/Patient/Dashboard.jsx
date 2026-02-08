import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mic, Watch, MoreHorizontal, Settings, Home as HomeIcon, Heart, Shield, LogOut, Activity, ArrowLeft } from 'lucide-react';
import useSpeechRecognition from '../../hooks/useSpeechRecognition';


const PatientDashboard = () => {
    const navigate = useNavigate();
    const { text, isListening, startListening, stopListening, hasSupport, error } = useSpeechRecognition();
    const [continuousMode, setContinuousMode] = useState(false);
    const [aiResponse, setAiResponse] = useState('');
    const [isThinking, setIsThinking] = useState(false);
    const [sosActive, setSosActive] = useState(false);

    const speak = (msg) => {
        window.speechSynthesis.cancel();
        const speech = new SpeechSynthesisUtterance(msg);
        speech.lang = 'en-US';
        speech.pitch = 1.0;
        speech.rate = 1.0;
        speech.onend = () => {
            // Automatically turn on mic after bot finishes speaking
            startListening({ continuous: continuousMode });
        };
        window.speechSynthesis.speak(speech);
    };

    const getAIResponse = (input) => {
        const query = input.toLowerCase().trim();

        // SOS Trigger
        if (query.includes('aaaaa') || query.includes('help') || query.includes('emergency')) {
            localStorage.setItem('sos_signal', JSON.stringify({
                active: true,
                timestamp: new Date().getTime(),
                patient: 'John Doe'
            }));
            setSosActive(true);
            return "EMERGENCY DETECTED. I am alerting your family and medical team right now. Please stay exactly where you are, help is on the way.";
        }

        // Empathy Patterns
        if (query.includes('not feeling good') || query.includes('sad') || query.includes('lonely') || query.includes('bad')) {
            return "I'm so sorry to hear that. Please remember that you are very well cared for, and your family loves you deeply. Why don't we listen to some of your favorite music or take a slow breath together? I'm right here with you.";
        }

        if (query.includes('pain') || query.includes('hurt')) {
            return "I've noted that you're in pain. I am informing Dr. Smith immediately so they can check on your medication. Can you tell me exactly where it hurts?";
        }

        if (query.includes('hello') || query.includes('hi')) return "Hello! I am your Syncare assistant. It's wonderful to hear your voice. How are you feeling in this moment?";

        if (query.includes('time')) return `Of course. It is currently ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}. You're doing great today.`;

        if (query.includes('who are you')) return "I am Syncare, your personal digital companion. My only job is to keep you safe, healthy, and connected to the people who love you.";

        if (query.includes('thank')) return "You are so welcome. It is my pleasure to assist you.";

        if (query.includes('weather')) return "The weather is calm today. It might be a nice time to look out the window and enjoy the view. Would you like that?";

        return "I understand. I've recorded that for your care team. Is there anything else you'd like to share with me? I'm listening.";
    };

    useEffect(() => {
        if (!isListening && text && text.trim().length > 0) {
            setIsThinking(true);
            const timer = setTimeout(() => {
                const response = getAIResponse(text);
                setAiResponse(response);
                setIsThinking(false);
                speak(response);
            }, 1000);
            return () => clearTimeout(timer);
        }
    }, [isListening, text]);

    const toggleListening = () => {
        if (isListening) stopListening();
        else startListening({ continuous: continuousMode });
    };

    const handleLogout = () => {
        localStorage.removeItem('currentUser');
        navigate('/');
    };

    if (!hasSupport) {
        return (
            <div style={{ padding: '40px', textAlign: 'center' }}>
                <h2>Speech Recognition Unsupported</h2>
                <p>Please use a modern browser like Chrome or Edge to access voice features.</p>
            </div>
        );
    }

    return (
        <div style={{ position: 'relative', width: '100%', height: '100vh', background: 'var(--bg-primary)', overflow: 'hidden' }}>


            {/* Premium Header */}
            <header className="glass-nav" style={{
                position: 'fixed',
                top: '20px',
                left: '20px',
                right: '20px',
                padding: '12px 30px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                zIndex: 1000,
                borderRadius: '24px',
                boxShadow: 'var(--shadow-sm)'
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ width: '32px', height: '32px', background: 'var(--primary)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Heart size={18} color="white" fill="white" />
                    </div>
                    <h2 style={{ color: 'var(--primary)', margin: 0, fontSize: '1.3rem' }}>Syncare Assistant</h2>
                </div>

                <div style={{ display: 'flex', gap: '15px' }}>
                    <button onClick={() => navigate(-1)} className="btn" style={{ color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '5px' }}>
                        <ArrowLeft size={18} /> Back
                    </button>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'rgba(58, 90, 120, 0.05)', padding: '6px 16px', borderRadius: '100px', cursor: 'pointer' }}>
                        <Watch size={18} color="var(--primary)" />
                        <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--primary)' }}>Sync Watch</span>
                    </div>
                    <button onClick={handleLogout} className="btn" style={{ color: 'var(--text-muted)' }}><LogOut size={18} /></button>
                </div>
            </header>

            <main style={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                position: 'relative',
                zIndex: 10,
                paddingInline: '20px'
            }}>

                {/* Voice Hub */}
                <div className="animate-fade-in" style={{ textAlign: 'center', marginBottom: '40px' }}>
                    <div
                        onClick={toggleListening}
                        style={{
                            width: '220px',
                            height: '220px',
                            borderRadius: '80px',
                            background: 'white',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            cursor: 'pointer',
                            boxShadow: isListening ? '0 0 80px rgba(58, 90, 120, 0.3)' : 'var(--shadow-lg)',
                            transition: 'var(--transition)',
                            position: 'relative',
                            border: '1px solid rgba(255,255,255,0.8)'
                        }}
                    >
                        <div style={{
                            width: '180px',
                            height: '180px',
                            borderRadius: '65px',
                            background: isListening ? 'var(--danger)' : 'var(--primary)',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            transition: 'var(--transition)',
                            boxShadow: 'inset 0 4px 10px rgba(0,0,0,0.1)'
                        }}>
                            <Mic size={70} color="white" strokeWidth={1.5} />
                        </div>

                        {isListening && (
                            <div style={{
                                position: 'absolute',
                                inset: '-15px',
                                border: '2px solid var(--danger)',
                                borderRadius: '90px',
                                animation: 'pulse 2s infinite'
                            }}></div>
                        )}
                    </div>

                    <h3 style={{
                        marginTop: '30px',
                        fontSize: '1.5rem',
                        color: isListening ? 'var(--danger)' : 'var(--primary)',
                        fontWeight: 700
                    }}>
                        {isListening ? "Listening..." : "Tap to Speak"}
                    </h3>
                </div>

                {/* Conversation Display */}
                <div style={{
                    width: '100%',
                    maxWidth: '650px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '20px',
                }}>
                    {text && (
                        <div className="premium-card animate-fade-in" style={{
                            padding: '20px 30px',
                            alignSelf: 'flex-end',
                            borderRadius: '30px 30px 4px 30px',
                            background: 'white',
                            color: 'var(--text-main)',
                            fontSize: '1.1rem',
                            fontWeight: 600,
                            maxWidth: '85%'
                        }}>
                            "{text}"
                        </div>
                    )}

                    {(isThinking || aiResponse) && (
                        <div className="premium-card animate-fade-in" style={{
                            padding: '24px 34px',
                            alignSelf: 'flex-start',
                            borderRadius: '30px 30px 30px 4px',
                            background: 'var(--primary)',
                            color: 'white',
                            fontSize: '1.4rem',
                            fontWeight: 700,
                            maxWidth: '90%',
                            boxShadow: 'var(--shadow-premium)',
                            lineHeight: '1.4'
                        }}>
                            {isThinking ? (
                                <div style={{ display: 'flex', gap: '6px' }}>
                                    <span className="dot-pulse">.</span>
                                    <span className="dot-pulse">.</span>
                                    <span className="dot-pulse">.</span>
                                </div>
                            ) : aiResponse}
                        </div>
                    )}
                </div>
            </main>

            {/* Emergency SOS Bar */}
            <div style={{
                position: 'fixed',
                bottom: '30px',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '90%',
                maxWidth: '1200px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                zIndex: 1000
            }}>
                <div style={{ display: 'flex', gap: '15px' }}>
                    <div className="premium-card" style={{ padding: '12px 25px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <Activity size={24} color="var(--success)" />
                        <span style={{ fontWeight: 900, color: 'var(--primary)', fontSize: '1.3rem' }}>HEART: 72 BPM</span>
                    </div>
                </div>

                <button
                    onClick={() => {
                        if (sosActive) {
                            localStorage.setItem('sos_signal', JSON.stringify({ active: false }));
                            setSosActive(false);
                        } else {
                            getAIResponse('emergency');
                        }
                    }}
                    className={sosActive ? "sos-active" : ""}
                    style={{
                        padding: '20px 40px',
                        background: 'var(--danger)',
                        color: 'white',
                        borderRadius: '24px',
                        border: '4px solid white',
                        boxShadow: '0 10px 30px rgba(225, 106, 106, 0.4)',
                        fontSize: '2rem',
                        fontWeight: 900,
                        cursor: 'pointer',
                        transition: 'var(--transition)'
                    }}
                    onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                    onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
                >
                    {sosActive ? "SIGNAL SENT" : "EMERGENCY SOS"}
                </button>
            </div>

            <style>{`
                @keyframes pulse {
                    0% { transform: scale(1); opacity: 0.5; }
                    100% { transform: scale(1.1); opacity: 0; }
                }
                @keyframes dotPulse {
                    0%, 100% { opacity: 0.2; }
                    50% { opacity: 1; }
                }
                .dot-pulse { animation: dotPulse 1.5s infinite; }
                .dot-pulse:nth-child(2) { animation-delay: 0.2s; }
                .dot-pulse:nth-child(3) { animation-delay: 0.4s; }
            `}</style>
        </div>
    );
};

export default PatientDashboard;
