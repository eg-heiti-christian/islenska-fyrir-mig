
interface Props {
    error: string | null;
    onRetry?: () => void;
    isRetrying?: boolean;
}
export default function ErrorBanner({ error, onRetry, isRetrying }: Props) {

    return (
        <>
            {error ? (
                <div className="error-banner" role="alert">
                <div className="error-text">{error}</div>
                <button
                    type="button"
                    className="error-action"
                    onClick={onRetry}
                    disabled={isRetrying}
                >
                    {isRetrying ? 'Retrying...' : 'Retry'}
                </button>
                </div>
            ) : null}
        </>
    )
}