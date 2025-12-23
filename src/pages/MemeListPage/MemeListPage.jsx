import { useEffect, useState } from 'react';
import { MemeCard } from '@/features/MemeCard/index.js';
import { Button } from '@/shared/ui/Button.jsx';
import { Loader } from '@/shared/ui/Loader.jsx';
import { fetchRandomMemes } from '@/shared/api/memeApi.js';

const CATEGORIES = [
    { value: 'meme',     label: 'Рандом' },
    { value: 'funny',    label: 'Смешнявки' },
    { value: 'cats',     label: 'Котики' },
    { value: 'dogs',     label: 'Собачки' },
    { value: 'anime',    label: 'Аниме', crossed: true },
    { value: 'football', label: 'Футбольчик' }
];

export function MemeListPage() {
    const [memes, setMemes] = useState([]);
    const [category, setCategory] = useState('meme');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const loadMemes = async (cat = category) => {
        try {
            setLoading(true);
            setError('');
            const data = await fetchRandomMemes(cat);
            setMemes(data);
        } catch (e) {
            setError(e.message || 'Ошибка загрузки');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadMemes('meme');
    }, []);

    const handleCategoryChange = (e) => {
        const newCat = e.target.value;
        setCategory(newCat);
        loadMemes(newCat);
    };

    return (
        <div className="space-y-4">
            <header>
                <h1 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white/90">
                    Meme Gifs best super ultra gallery
                </h1>
                <p className="text-sm text-white/70">
                    5 рандомных GIF
                </p>
            </header>

            <div className="flex flex-wrap items-center gap-3">
                <div className="flex items-center gap-2">
                    <span className="text-sm text-white/70">Категория:</span>

                    <div className="rounded-md border border-white/25 bg-black/40 backdrop-blur px-2 py-1">
                        <select
                            value={category}
                            onChange={handleCategoryChange}
                            disabled={loading}
                            className="outline-none border-none text-sm text-white pr-2"
                        >
                            {CATEGORIES.map((c) => (
                                <option
                                    key={c.value}
                                    value={c.value}
                                    className={"bg-black text-white"+
                                        (c.crossed ? 'line-through text-white/30' : '')
                                    }
                                >
                                    {c.label}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                <Button
                    className="bg-white text-black"
                    onClick={() => loadMemes()}
                    disabled={loading}
                >
                    Обновить мемы
                </Button>
            </div>

            {error && (
                <div className="text-sm text-red-100 border border-red-500/70 bg-red-900/40 rounded-md px-3 py-2 mt-2">
                    {error}
                </div>
            )}

            {loading ? (
                <Loader />
            ) : (
                <div className="flex justify-center gap-[1%] flex-wrap sm:grid-cols-2 lg:grid-cols-3">
                    {memes.map((meme) => (
                        <MemeCard key={meme.id} meme={meme} />
                    ))}
                </div>
            )}
        </div>
    );
}
