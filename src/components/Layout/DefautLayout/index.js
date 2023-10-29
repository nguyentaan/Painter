import Header from '~/components/Layout/DefautLayout/Header';
import SubHeader from '~/components/Layout/DefautLayout/SubHeader';

function DefaultLayout({ children }) {
    return (
        <div>
            <Header />
            <div className="container">
                <SubHeader />
                <div className="content">{children}</div>
            </div>
        </div>
    );
}

export default DefaultLayout;
