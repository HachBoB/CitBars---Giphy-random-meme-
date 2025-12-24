import { giphyClient, isConfigured } from './giphyClient.js';
import { GIPHY_CONFIG } from '../constants/config.js';
import { CATEGORIES_CONFIG, STICKER_QUERIES } from '@/shared/constants/memeConfig.js';

export async function fetchRandomMemes(
    categoryKey = 'meme',
    mediaType = 'gifs',
    rating = 'pg',
) {
    if (!isConfigured()) {
        throw new Error('API ключ не настроен');
    }

    const cfg = CATEGORIES_CONFIG[categoryKey] || CATEGORIES_CONFIG.meme;

    if (cfg.type === 'random') {
        if (mediaType === 'stickers') {

            // псевдо‑рандом потому что giphyClient.random не хочет брать type и отсылает просто гифки :(
            const randomOffset = Math.floor(Math.random() * 100);

            const { data } = await giphyClient.search('funny', {
                limit: GIPHY_CONFIG.LIMIT,
                offset: randomOffset,
                type: 'stickers',
                rating, // <- сюда
            });

            return data.map((gif) => ({
                id: gif.id,
                title: gif.title || 'Стикер',
                url: gif.images.fixed_height.url,
                originalUrl: gif.url,
            }));
        }

        const results = [];
        for (let i = 0; i < GIPHY_CONFIG.LIMIT; i++) {
            const { data } = await giphyClient.random('gifs', {
                tag: cfg.query,
                rating,
            });

            results.push({
                id: data.id,
                title: data.title || 'Случайный мем',
                url: data.images.fixed_height.url,
                originalUrl: data.url,
            });
        }
        return results;
    }

    const randomOffset = Math.floor(Math.random() * 50);

    if (mediaType === 'stickers') {
        const q = STICKER_QUERIES[categoryKey] || cfg.query;

        const { data } = await giphyClient.search(q, {
            limit: GIPHY_CONFIG.LIMIT,
            offset: randomOffset,
            type: 'stickers',
            rating,
        });

        return data.map((gif) => ({
            id: gif.id,
            title: gif.title || 'Стикер',
            url: gif.images.fixed_height.url,
            originalUrl: gif.url,
        }));
    }

    const { data } = await giphyClient.search(cfg.query, {
        limit: GIPHY_CONFIG.LIMIT,
        offset: randomOffset,
        rating,
    });

    return data.map((gif) => ({
        id: gif.id,
        title: gif.title || 'Гифка',
        url: gif.images.fixed_height.url,
        originalUrl: gif.url,
    }));
}
