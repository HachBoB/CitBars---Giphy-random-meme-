export function Button({ children, onClick, disabled = false, type = 'button' }) {
    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className="px-3 py-2 text-sm border border-white/20 rounded disabled:opacity-60"
        >
            {children}
        </button>
    );
}