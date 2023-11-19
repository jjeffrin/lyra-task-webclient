import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { FetchContextProvider } from './contexts/fetchContext';
import { AuthContextProvider } from './contexts/authContext';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';

// fonts import
import '@fontsource/inter/100.css'
import '@fontsource/inter/200.css'
import '@fontsource/inter/300.css'
import '@fontsource/inter/400.css'
import '@fontsource/inter/500.css'
import '@fontsource/inter/600.css'
import '@fontsource/inter/700.css'
import '@fontsource/inter/800.css'
import '@fontsource/inter/900.css'
import { ToastContextProvider } from './contexts/toastContext';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const appTheme = extendTheme({
  fonts: {
    heading: 'Inter',
    body: 'Inter',
  },
})

root.render(
  // <React.StrictMode>
  <ChakraProvider theme={appTheme}>
    <FetchContextProvider>
      <AuthContextProvider>
        <ToastContextProvider>
          <App />
        </ToastContextProvider>
      </AuthContextProvider>
    </FetchContextProvider>
  </ChakraProvider>
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
