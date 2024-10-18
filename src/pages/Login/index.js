import { useTranslation } from 'react-i18next';

function Login() {
    const { t } = useTranslation('translation', { keyPrefix: 'login' });
    return <h2 className="text-5xl">{t('login')}</h2>;
}

export default Login;
