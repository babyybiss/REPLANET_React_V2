import {Outlet} from 'react-router-dom';
import Header from '../component/common/Header';
import Footer from '../component/common/Footer';

function Layout() {
    return (
        <div>
            <Header/>
            <Outlet/>
            <Footer/>
        </div>

    )
}

export default Layout;