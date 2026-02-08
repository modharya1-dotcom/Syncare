import { useState, useCallback, useRef } from 'react';

const useSpeechRecognition = () => {
    const [text, setText] = useState('');
    const [isListening, setIsListening] = useState(false);
    const [error, setError] = useState(null);
    const recognitionRef = useRef(null);

    // Check browser support
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    const startListening = useCallback((options = { continuous: false }) => {
        if (!SpeechRecognition) {
            setError('Browser does not support Speech Recognition.');
            return;
        }

        if (isListening) return; // Already listening

        const recognition = new SpeechRecognition();
        recognitionRef.current = recognition;

        recognition.continuous = options.continuous;
        recognition.interimResults = true;
        recognition.lang = 'en-US';

        recognition.onstart = () => {
            setIsListening(true);
            setError(null);
        };

        recognition.onresult = (event) => {
            let finalTranscript = '';
            let interimTranscript = '';

            for (let i = event.resultIndex; i < event.results.length; ++i) {
                if (event.results[i].isFinal) {
                    finalTranscript += event.results[i][0].transcript;
                } else {
                    interimTranscript += event.results[i][0].transcript;
                }
            }

            // Update text with the latest results
            // Note: for continuous, we might want to append or handle differently, 
            // but for this simple hook, replacing text is okay for now or checking the mode.
            // Actually, joining all transcripts is safer for continuous views.
            const currentText = Array.from(event.results)
                .map(result => result[0].transcript)
                .join('');

            setText(currentText);
        };

        recognition.onerror = (event) => {
            console.error('Speech recognition error', event.error);
            setError(event.error);
            // Don't necessarily stop listening on some errors if continuous, but usually browser stops.
            if (event.error === 'not-allowed' || event.error === 'service-not-allowed') {
                setIsListening(false);
            }
        };

        recognition.onend = () => {
            setIsListening(false);
            // If we wanted true "always on", we'd restart here if the user didn't manually stop.
            // But browsers often block auto-restart without user interaction to prevent abuse.
        };

        recognition.start();
    }, [SpeechRecognition, isListening]);

    const stopListening = useCallback(() => {
        if (recognitionRef.current) {
            recognitionRef.current.stop();
            setIsListening(false);
        }
    }, []);

    return { text, isListening, error, startListening, stopListening, hasSupport: !!SpeechRecognition };
};

export default useSpeechRecognition;
