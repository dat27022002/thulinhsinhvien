import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { Toaster } from 'react-hot-toast';

import GlobalStyles from '~/components/GlobalStyles';
import App from '~/App';
import store from './redux/store';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <GlobalStyles>
        <Provider store={store}>
            <App />
            <Toaster />
        </Provider>
    </GlobalStyles>,
);
