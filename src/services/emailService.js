import emailjs from '@emailjs/browser';

// Initialize EmailJS with Public Key
// Ideally, this should be in an environment variable: VITE_EMAILJS_PUBLIC_KEY
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'YOUR_PUBLIC_KEY';
const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID || 'YOUR_SERVICE_ID';
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'YOUR_TEMPLATE_ID';

export const sendEmail = async (templateParams) => {
    try {
        const response = await emailjs.send(
            SERVICE_ID,
            TEMPLATE_ID,
            templateParams,
            PUBLIC_KEY
        );
        return { success: true, response };
    } catch (error) {
        console.error('EmailJS Error:', error);
        return { success: false, error };
    }
};
