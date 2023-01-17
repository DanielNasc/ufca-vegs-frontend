import { BrowserRouter } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { ThemeProvider } from 'styled-components'
import { SelectedVegContextProvider } from './contexts/SelectedVegContext'

import { Router } from './Router'
import { GlobalStyle } from './styles/global'
import { defaultTheme } from './styles/themes/default'

import "react-toastify/dist/ReactToastify.css"

export function App() {
  return (
    <SelectedVegContextProvider>
      <BrowserRouter>
        <ThemeProvider theme={defaultTheme}>
          <Router />
          <GlobalStyle />
          <ToastContainer
            position='top-right'
            autoClose={3000}
            hideProgressBar={false}
            closeOnClick
            pauseOnFocusLoss
            draggable
            theme='dark'
            rtl={false}
            newestOnTop={false}

          />
        </ThemeProvider>
      </BrowserRouter>
    </SelectedVegContextProvider>
  )
}
