import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store, persistor } from './redux/store';
import App from '~/App';
import reportWebVitals from './reportWebVitals';
import GlobalStyles from '~/components/GlobalStyles';
import { PersistGate } from 'redux-persist/integration/react';
import { AuthProvider } from '~/contexts/AuthContext';
import { LoginLayoutProvider } from './contexts/LoginLayoutContext';
import { PaginationProvider } from './contexts/PaginationContext';
import { CartProvider } from './contexts/CartContext';
import { WishListProvider } from './contexts/WishListContext';
import { MyAccountProvider } from './contexts/MyAccountContext';
import { CheckoutProvider } from './contexts/CheckoutContext';
import { disableReactDevTools } from '@fvilers/disable-react-devtools';

if (process.env.NODE_ENV === 'production') {
    disableReactDevTools();
}

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
    // <React.StrictMode>
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <GlobalStyles>
                <AuthProvider>
                    <LoginLayoutProvider>
                        <CartProvider>
                            <WishListProvider>
                                <MyAccountProvider>
                                    <CheckoutProvider>
                                        <PaginationProvider>
                                            <App />
                                        </PaginationProvider>
                                    </CheckoutProvider>
                                </MyAccountProvider>
                            </WishListProvider>
                        </CartProvider>
                    </LoginLayoutProvider>
                </AuthProvider>
            </GlobalStyles>
        </PersistGate>
    </Provider>,
    // </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
