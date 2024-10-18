import React from 'react';
import ReactDOM from 'react-dom/client';
import { I18nextProvider } from 'react-i18next';
import { Provider } from 'react-redux';

import GlobalStyles from '~/components/GlobalStyles';
import App from '~/App';
import i18n from './utils/i18n';
import store from './redux/store';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <I18nextProvider i18n={i18n}>
        <GlobalStyles>
            <Provider store={store}>
                <App />
            </Provider>
        </GlobalStyles>
    </I18nextProvider>,
);
