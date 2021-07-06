import { useContext } from 'react';
import { UserContext } from './Contexts/userContext';
import { Route, Redirect } from 'react-router-dom';
import Nav from './components/Nav';
import { toast } from 'react-toastify';

export const ProtectedRoute = ({ component: Component, path, exact }) => {
    const { currentUser } = useContext(UserContext);
    if (!currentUser.id) {
        toast.info('Please Login', {
            position: 'top-right',
            autoClose: 5000,
            closeOnClick: true,
        });
        return <Redirect to='/auth/login' />;
    }

    return (
        <>
            <Nav />
            <Route
                path={path}
                exact={exact}
                render={(props) => <Component {...props} />}
            />
        </>
    );
};

export const AuthRoute = ({ component: Component, path, exact }) => {
    const { currentUser } = useContext(UserContext);

    if (currentUser.id) {
        return <Redirect to='/' />;
    }
    return (
        <Route
            path={path}
            exact={exact}
            render={(props) => <Component {...props} />}
        />
    );
};
