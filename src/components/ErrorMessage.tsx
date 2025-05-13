import styled from "styled-components"

const Div = styled.div`
    font-size: 1.2rem;
`

export default function ErrorMessage({error}: {error: unknown}) {
    return (
        <Div>
            <p>There was an error and the quote could not be fetched. Please refresh and try again, or try again later.</p>
            <pre>{error instanceof Error ? `${error.name} - ${error.message}` : JSON.stringify(error)}</pre>
        </Div>
    )
}