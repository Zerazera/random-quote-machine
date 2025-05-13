import styled, { css } from 'styled-components'
import XIconSvg from '../assets/X_icon.svg'
import RedditIconSvg from '../assets/iconmonstr-reddit-4.svg'
import type { ThemeProps } from '../types/themeProps'
import type { QuoteProps } from '../types/quoteProps'

const Footer = styled.footer`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    padding: 20px;

    @media screen and (width < 600px) {
        padding: 10px;
    }
`

const Button = styled.button<{$theme: ThemeProps}>`
    background-color: rgba(0, 0, 0, 0);
    color: ${({$theme}) => $theme.background};
    border: 1px solid ${({$theme}) => $theme.background };
    transition: background-color 0.5s linear, color 0.5s linear;
    padding: 10px;
    height: fit-content;
    font-size: 1.2rem;
    cursor: pointer;
    margin-left: 5px;

    &:hover {
        ${({$theme}) => {
            return css`
            color: ${$theme.foreground};
            background-color: ${$theme.background};
            `
        }}
    }

    @media screen and (width < 900px) {
        font-size: 0.9rem;    
    }

    @media screen and (width < 600px) {
        padding: 5px;
    }
`

const Img = styled.img<{$theme: ThemeProps}>`
    width: 50px;
    margin-right: 25px;
    background-color: ${({$theme}) => $theme.foreground === 'black' ? 'white' : $theme.foreground};
    transition: background-color 0.5s linear, color 0.5s linear;
    border-radius: 50px;

    @media screen and (width < 800px) {
        width: 30px;
        margin-right: 10px;
    }
`

type QuoteBoxFooterProps = {
    $theme: ThemeProps, 
    changeTheme: () => void, 
    getQuote: () => void, 
    quote: QuoteProps
}

export default function QuoteBoxFooter({$theme, changeTheme, getQuote, quote}: QuoteBoxFooterProps) {
    const linkQuoteText = `${encodeURIComponent(quote.quote)} %0A%0A ~ ${encodeURIComponent(quote.author)}`

    return (
        <Footer>
            <span>
                <a id="tweet-quote" href={`https://twitter.com/intent/tweet?text=${linkQuoteText}`} target="_blank">
                    <Img id="x-icon" src={XIconSvg} alt="X icon" $theme={$theme} />
                </a>
                <a href={`https://old.reddit.com/submit?text=${linkQuoteText}`} target='_blank'>
                    <Img id="reddit-icon" src={RedditIconSvg} alt="Reddit icon" $theme={$theme} />
                </a>
            </span>

            <span>
                <Button $theme={$theme} onClick={changeTheme}>Change theme</Button>
                <Button id="new-quote" $theme={$theme} onClick={getQuote}>Get New Quote</Button>                
            </span>
        </Footer>
    )
}