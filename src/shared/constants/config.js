export const GIPHY_CONFIG = {
    API_KEY: import.meta.env.VITE_GIPHY_API_KEY,
    LIMIT: 5,
};

export const RATINGS = [
    { value: 'g', label: 'G' },
    { value: 'pg', label: 'PG' },
    { value: 'y', label: 'Y' },
    { value: 'pg-13', label: 'PG-13' },
    { value: 'r', label: 'R' },
];