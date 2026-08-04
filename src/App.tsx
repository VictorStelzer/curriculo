import { AppRoutes } from './routes'

import { BrowserRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async';

import { MobileProvider } from '@/contexts/MobileContext'
import { AppThemeProvider } from './contexts/ThemeContext'

function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <AppThemeProvider>
          <MobileProvider>
            <AppRoutes />
          </MobileProvider>
        </AppThemeProvider>
      </BrowserRouter>
    </HelmetProvider>
  )
}

export default App
