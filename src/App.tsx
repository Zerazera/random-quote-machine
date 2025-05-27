import { useState, useEffect } from 'react'
import { themes } from './themes'
import styled, { css } from 'styled-components'
import Main from './components/Main'
import type { QuoteProps } from './types/quoteProps'
import type { ThemeProps } from './types/themeProps'

const Body = styled.div<{$theme: ThemeProps}>`
  ${({$theme}) => {
    return css`
      background-color: ${$theme.background};
      color: ${$theme.foreground};
    `
  }}

    width: 100vw;
    height: 100vh;
    transition: background-color 0.5s linear, color 0.5s linear;
`

const Title = styled.h1`
    text-align: center;
    margin-top: 0;
    padding-top: 0.67em;
    font-size: 2rem;

    @media screen and (width < 1000px) {
      padding-top: 0.33em;
      margin-bottom: 1em;
    }
`

export default function App() {
  const [theme, setTheme] = useState<ThemeProps>(themes[0])
  const [quote, setQuote] = useState<QuoteProps>({
    quote: '',
    author: ''
  })
  const [quotes, setQuotes] = useState<QuoteProps[]>([])
  const [error, setError] = useState<unknown>(null);

  useEffect(() => {
    const fetchQuotes = async () => {
      try {
        const res = await fetch("https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json")
        const data = await res.json()
        setQuotes(data.quotes)
        setQuote(data.quotes[Math.floor(Math.random() * data.quotes.length)])
        selectRandomTheme()
      } 
      catch(err) {
        console.log(err)
        setError(err)
      }
    }

    fetchQuotes()
  }, [])

  const selectRandomTheme = () => {
    const newTheme = themes[Math.floor(Math.random() * themes.length)]
    if (Math.random() < .5) [newTheme.foreground, newTheme.background] = [newTheme.background, newTheme.foreground]
    setTheme(newTheme)
  }  

  const selectRandomQuote = () => {
    setQuote(quotes[Math.floor(Math.random() * quotes.length)])
    selectRandomTheme()
  }

  return (
    <Body $theme={theme}>
      <header>
          <Title>Random Quote Machine</Title>
      </header>
      <Main quote={quote} $theme={theme} changeTheme={selectRandomTheme} getQuote={selectRandomQuote} error={error} />
    </Body>
  )
}