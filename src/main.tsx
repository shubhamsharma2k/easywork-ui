import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import './App.css'
import './bootstrap.min.css'
import { ChakraProvider } from '@chakra-ui/react'
import { StoreProvider } from 'easy-peasy'
import { store } from './store/config'
import 'react-datepicker/dist/react-datepicker.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
    <StoreProvider store={store}>
        <ChakraProvider>
            <App />
        </ChakraProvider>
    </StoreProvider>
)
