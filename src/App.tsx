import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import { SelectedVegContextProvider } from './contexts/SelectedVegContext'

import { Router } from './Router'
import { GlobalStyle } from './styles/global'
import { defaultTheme } from './styles/themes/default'

import 'react-toastify/dist/ReactToastify.css'
import { CustomToastContainer } from './components/CustomToastContainer'
import { AuthProvider } from './contexts/AuthContext'
import { VegsListContextProvider } from './contexts/VegsListContext'

export function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <VegsListContextProvider>
          <SelectedVegContextProvider>
            <ThemeProvider theme={defaultTheme}>
              <Router />
              <GlobalStyle />
              <CustomToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                closeOnClick
                pauseOnFocusLoss
                draggable
                rtl={false}
                newestOnTop={false}
              />
            </ThemeProvider>
          </SelectedVegContextProvider>
        </VegsListContextProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}
