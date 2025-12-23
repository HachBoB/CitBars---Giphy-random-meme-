import { giphyClient, isConfigured } from './giphyClient.js';
import { GIPHY_CONFIG } from '../constants/config.js';

const CATEGORY_QUERIES = {
    meme:      { type: 'random', query: 'meme' },
    funny:     { type: 'search', query: 'funny meme' },
    cats:      { type: 'search', query: 'cat meme' },
    dogs:      { type: 'search', query: 'dog meme' },
    anime:     { type: 'search', query: 'anime meme' },
    football:  { type: 'search', query: 'football meme' },
};

export async function fetchRandomMemes(categoryKey = 'meme') {
    if (!isConfigured()) {
        throw new Error('API ключ не настроен');
    }

    const cfg = CATEGORY_QUERIES[categoryKey] || CATEGORY_QUERIES.meme;

    if (cfg.type === 'random') {
        const results = [];

        for (let i = 0; i < GIPHY_CONFIG.LIMIT; i++) {
            const { data } = await giphyClient.random('gifs', {
                tag: cfg.query,
            });

            results.push({
                id: data.id,
                title: data.title || 'Случайный мем',
                url: data.images.fixed_height.url,
                originalUrl: data.url
            });
        }

        return results;
    }

    const randomOffset = Math.floor(Math.random() * 100);

    const { data } = await giphyClient.search(cfg.query, {
        limit: GIPHY_CONFIG.LIMIT,
        offset: randomOffset,
    });

    return data.map(gif => ({
        id: gif.id,
        title: gif.title || 'Гифка',
        url: gif.images.fixed_height.url,
        originalUrl: gif.url
    }));
}
