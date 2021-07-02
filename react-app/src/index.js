import { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import { ToastContainer } from 'react-toastify';
import App from './App';
import {
    PostsContextProvider,
    ProfileContextProvider,
    UserContextProvider,
    LikeContextProvider,
    FollowContextProvider,
} from './Contexts';
import GlobalStyle from './Styles/GlobalStyle';

ReactDOM.render(
    <StrictMode>
        <UserContextProvider>
            <ProfileContextProvider>
                <PostsContextProvider>
                    <LikeContextProvider>
                        <FollowContextProvider>
                            <ToastContainer autoClose={3000} limit={3} />
                            <GlobalStyle />
                            <App />
                        </FollowContextProvider>
                    </LikeContextProvider>
                </PostsContextProvider>
            </ProfileContextProvider>
        </UserContextProvider>
    </StrictMode>,
    document.getElementById('root')
);
