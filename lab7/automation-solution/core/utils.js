export const validateEmail = (email) => /\S+@\S+\.\S+/.test(email);
export const formatPrice = (price) => price.toFixed(2);
export const isAdult = (age) => age >= 18;
export const calculateDiscount = (price, percent) => price - (price * (percent / 100));
export const isEmpty = (str) => !str || str.trim() === '';
