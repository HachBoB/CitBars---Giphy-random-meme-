export function MemeCard({ meme }) {
    const handleClick = () => {
        window.open(meme.originalUrl, '_blank');
    };

    return (
        <article className="w-[30%] mt-[1%] rounded-xl p-4 flex flex-col gap-2
                   bg-neutral-900/40 border border-white/10
                   shadow-[0_25px_60px_rgba(0,0,0,0.7)] backdrop-blur-sm">
            <div className=" h-[80%] bg-black overflow-hidden ">
                <img
                    src={meme.url}
                    alt={meme.title}
                    loading="lazy"
                    className="w-full h-full object-cover"
                />
            </div>

            <div className="text-sm font-semibold line-clamp-2">{meme.title}</div>
            <button
                onClick={handleClick}
                className="text-xs underline text-white/70 self-start"
            >
                Открыть на GIPHY
            </button>
            <div className="text-xs text-white/60">
                {meme.category} ({meme.tag})
            </div>
        </article>
    );
}
