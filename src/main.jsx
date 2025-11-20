import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import ThemeCustomization from "./themes/index.jsx"; // Make sure theme is correctly imported
import RTLLayout from './components/RTLLayout.jsx';
import { AuthProvider } from './contexts/AuthContext.jsx'; // Import AuthProvider
import Locales from './components/Locales.jsx'
import ProviderWrapper from './ProviderWrapper.jsx';

import { QueryClient,QueryClientProvider } from '@tanstack/react-query';


const queryClient = new QueryClient()
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
      <ProviderWrapper>
      {/* <ThemeCustomization> */}
        {/* <RTLLayout> */}
          {/* <Locales> */}
            <App />
          {/* </Locales> */}
        {/* </RTLLayout> */}
      {/* </ThemeCustomization> */}
      </ProviderWrapper>
    </AuthProvider>
    </QueryClientProvider>
  </StrictMode>,
)