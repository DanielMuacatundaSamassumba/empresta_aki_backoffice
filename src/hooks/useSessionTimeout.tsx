import { useEffect, useState, useCallback } from 'react';
export default function useSessionTimeout() {

    const SESSION_DURATION = 60 * 60 * 1000;
    const STORAGE_KEY = 'session_expiry';
    const [time, setTime] = useState<number>(SESSION_DURATION / 1000);
    const [timeSession, setTimeSession] = useState<boolean>(false);

    const resetSession = useCallback(() => {
        const expiryTime = Date.now() + SESSION_DURATION;
        localStorage.setItem(STORAGE_KEY, expiryTime.toString());
        setTimeSession(false);
        setTime(SESSION_DURATION / 1000);
    }, []);

    useEffect(() => {
        const storedExpiry = localStorage.getItem(STORAGE_KEY);


        const expiry = storedExpiry ? parseInt(storedExpiry, 10)
            : Date.now() + SESSION_DURATION;


        if (!storedExpiry) {
            localStorage.setItem(STORAGE_KEY, expiry.toString());
        }

        setTime(Math.max(0, Math.floor((expiry - Date.now()) / 1000)));

        const interval = setInterval(() => {
            setTime(prev => {
                if (prev <= 1) {
                    clearInterval(interval);
                    setTimeSession(true);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);


        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        if (time <= 0) {
            setTimeSession(true);
        }
    }, [time]);

    return {
        time,
        timeSession,
        setTimeSession,
        resetSession,
    };
}
