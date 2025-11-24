// Utility function to format price numbers to Indian currency format
export const formatPrice = (price) => {
    if (!price || price === 0) return 'Price on Request';

    const crore = 10000000;
    const lakh = 100000;

    if (price >= crore) {
        const value = (price / crore).toFixed(2);
        return `₹ ${value} Cr`;
    } else if (price >= lakh) {
        const value = (price / lakh).toFixed(2);
        return `₹ ${value} Lakhs`;
    } else {
        return `₹ ${price.toLocaleString('en-IN')}`;
    }
};
