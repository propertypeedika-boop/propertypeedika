import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { HelmetProvider } from 'react-helmet-async';
import ErrorBoundary from './components/ErrorBoundary';

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <ErrorBoundary>
            <HelmetProvider>
                <App />
            </HelmetProvider>
        </ErrorBoundary>
    </StrictMode>,
)
