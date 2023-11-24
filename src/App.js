import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { publicRoutes } from './routes';
import DefaultLayout from './components/Layout/DefautLayout';
import { Fragment } from 'react';
import { UserProvider } from './hook/UserContext';
import { BrowserView } from 'react-device-detect';

function App() {
    return (
        <BrowserView>
            <UserProvider>
                <Router>
                    <div className="App">
                        <Routes>
                            {' '}
                            {/* <Route path="/" element={<Home />} />
                                            <Route path="login" element={<Login />} /> */}{' '}
                            {publicRoutes.map((route, index) => {
                                const Layout = route.layout === null ? Fragment : DefaultLayout;
                                const Page = route.component;
                                return (
                                    <Route
                                        key={index}
                                        path={route.path}
                                        element={
                                            <Layout>
                                                <Page />
                                            </Layout>
                                        }
                                    />
                                );
                            })}{' '}
                        </Routes>
                    </div>
                </Router>
            </UserProvider>
        </BrowserView>
    );
}

export default App;
