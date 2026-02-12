
interface Props {
    headerText: string;
    subHeaderText: string;
    subtitleText: string;
}
export default function ViewCardHeader({ headerText, subHeaderText, subtitleText }: Props) {

    return (
        <>
            <header className="header">
                <p className="eyebrow">{headerText}</p>
                <h1>{subHeaderText}</h1>
                <p className="subtitle">{subtitleText}</p>
            </header>
        </>
    )
}