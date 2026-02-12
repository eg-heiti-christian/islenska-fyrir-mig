

interface Props {
    children?: React.ReactNode;
}

export default function View (props: Props) {
    return (
        <div className="page">
            <main className="card">
                {props.children}
            </main>
        </div>
    )
}