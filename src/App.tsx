import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import { SelectedVegContextProvider } from './contexts/SelectedVegContext'

import { Router } from './Router'
import { GlobalStyle } from './styles/global'
import { defaultTheme } from './styles/themes/default'

export function App() {
  return (
    <SelectedVegContextProvider>
      <BrowserRouter>
        <ThemeProvider theme={defaultTheme}>
          <Router />
          <GlobalStyle />
        </ThemeProvider>
      </BrowserRouter>
    </SelectedVegContextProvider>
  )
}
