import React, { createContext, useState } from 'react';

export const PpeContext = createContext();

export const PpeProvider = ({ children }) => {
    const [safetyMsgs, setSafetyMessages] = useState({});
    const [missingPpe, setMissingPpe] = useState([]);
    const [detectedPpe, setDetectedPpe] = useState([]);
    const [imageUrl, setImageUrl] = useState('');

    return (
        <PpeContext.Provider value={{ safetyMsgs, setSafetyMessages, missingPpe, setMissingPpe, detectedPpe, setDetectedPpe, imageUrl, setImageUrl }}>
            {children}
        </PpeContext.Provider>
    );
};
