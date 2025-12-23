import { GiphyFetch } from '@giphy/js-fetch-api';
import { GIPHY_CONFIG } from '../constants/config.js';

export const giphyClient = new GiphyFetch(GIPHY_CONFIG.API_KEY);

export const isConfigured = () => {
    return GIPHY_CONFIG.API_KEY && GIPHY_CONFIG.API_KEY !== '';
};