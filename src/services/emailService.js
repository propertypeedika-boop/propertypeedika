import emailjs from '@emailjs/browser';

// Initialize EmailJS with Public Key
// Ideally, this should be in an environment variable: VITE_EMAILJS_PUBLIC_KEY
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'ytxukhDnK7xDkCTE3';
const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID || 'service_vp4zjws';
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'template_b4xqwas';

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
