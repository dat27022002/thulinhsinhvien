import Home from '~/pages/Home';
import Login from '~/pages/Login';

export const publicRoute = [
    { path: '', component: Home },
    { path: 'Login', component: Login },
];
export const privateRoute = [];
