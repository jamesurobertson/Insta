import { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import { ToastContainer } from 'react-toastify';
import App from './App';
import {
    PostsContextProvider,
    ProfileContextProvider,
    UserContextProvider,
} from './Contexts';
import GlobalStyle from './Styles/GlobalStyle';

ReactDOM.render(
    <StrictMode>
        <UserContextProvider>
            <ProfileContextProvider>
                <PostsContextProvider>
                    <ToastContainer autoClose={3000} limit={3} />
                    <GlobalStyle />
                    <App />
                </PostsContextProvider>
            </ProfileContextProvider>
        </UserContextProvider>
    </StrictMode>,
    document.getElementById('root')
);
