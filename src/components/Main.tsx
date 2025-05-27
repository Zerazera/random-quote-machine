import styled, { css } from 'styled-components'
import type { QuoteProps } from '../types/quoteProps';
import type { ThemeProps } from '../types/themeProps';
import QuoteBoxFooter from './QuoteBoxFooter';
import Error from './ErrorMessage';

const StyledMain = styled.main`
    height: 90%;
    display: flex;
    justify-content: center;
    align-items: center;

    @media screen and (width < 1000px) {
        height: 70%;
    }
`

const QuoteBox = styled.div<{$theme: ThemeProps}>`
    ${({$theme}) => {
        return css`
            background-color: ${$theme.foreground};
            color: ${$theme.background};
        `
    }}

    transition: background-color 0.5s linear, color 0.5s linear;

    width: 60%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding-inline: 10px;

    @media screen and (width < 1000px) {
        width: 80%;
    }

    @media screen and (width < 800px) {
        width: 100%;
        padding-inline: 0;
    }
`

const BlockQuote = styled.blockquote<{$theme: ThemeProps}>`
    border-left: solid 5px ${({$theme}) => $theme.background};
    transition: border-color 0.5s linear;
    padding-left: 10px;

    #text {
        font-size: 1.5rem;
    }

    #author {
        text-align: right;
        font-size: 1.2rem;
    }

    @media screen and (width < 1000px) {
        #text {
            font-size: 1.3rem;
        }

        #author {
            font-size: 1rem;
        }
    }

    @media screen and (width < 600px) {
        width: 90%;
    }

    @media screen and (height < 400px) {
        margin-bottom: 0;

        #text {
            font-size: 1.2rem;
        }

        #author {
            font-size: 0.9rem;
        }
    }

`

type MainProps = {
    quote: QuoteProps, 
    $theme: ThemeProps, 
    changeTheme: () => void, 
    getQuote: () => void, 
    error: unknown
}

export default function Main({quote, $theme, changeTheme, getQuote, error}: MainProps) {    
    return (
        <StyledMain>
            <QuoteBox id="quote-box" $theme={$theme} aria-live="polite">
                {error === null && 
                <>
                <BlockQuote $theme={$theme}>
                    <p id="text">{quote.quote}</p>
                    <p id="author">~ {quote.author}</p>
                </BlockQuote>
                <QuoteBoxFooter $theme={$theme} changeTheme={changeTheme} getQuote={getQuote} quote={quote} />         
                </>
                }
                {error !== null && <Error error={error} />}
            </QuoteBox>
        </StyledMain>
    )
}