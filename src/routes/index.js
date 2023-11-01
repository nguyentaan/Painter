// Layouts
// import { HeaderOnly } from '~/components/Layout';
import DefaultLayout from '~/components/Layout/DefautLayout';
import config from '~/config';

// Pages
import Home from '~/pages/Home';
import Login from '~/pages/Login';
import Register from '~/pages/Register';

// Public routes
const publicRoutes = [
    { path: config.routes.home, component: Home, layout: DefaultLayout },
    { path: config.routes.login, component: Login, layout: null },
    { path: config.routes.register, component: Register, layout: null },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
