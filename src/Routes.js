import React, {useContext} from 'react';
import {backendURL} from './config'
import {UserContext} from "./context"
import { Route, Redirect } from 'react-router-dom';
import Nav from "./components/Nav"

export const ProtectedRoute = ({ component: Component, path, exact }) => {
	const {setCurrentUserFollowingCount, setCurrentUserFollowerCount, currentUserId, setCurrentUserId, setCurrentUserProfilePic} = useContext(UserContext)


	if (!currentUserId && !localStorage.getItem('Isntgram_access_token')) {
		return <Redirect to='/auth/login'/>
	}
	if (!currentUserId) {
		const body = {access_token: localStorage.getItem("Isntgram_access_token")}
		fetch(`${backendURL}/session/check`, {
			method: "POST",
			Authorization: localStorage.getItem("Isntgram_acess_token"),
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(body),
		}).then(res => {
			return res.json()
		}).then(obj => {
            setCurrentUserId(obj.user.id)
            setCurrentUserProfilePic(obj.user.profile_image_url)
            setCurrentUserFollowerCount(obj.user.numFollowers)
            setCurrentUserFollowingCount(obj.user.numFollowing)

		}).catch(error =>{
			window.location.href="/auth/login"

		})
	}

	return (
        <>
        <Nav/>
		<Route
			path={path}
			exact={exact}
            render={(props) => <Component {...props} /> }
		/>
        </>
	);
};

export const AuthRoute = ({ component: Component, path, exact }) => {
	const { currentUserId } = useContext(UserContext);
	return (
		<Route
			path={path}
			exact={exact}
			render={(props) => (currentUserId ? <Redirect to='/' /> : <Component {...props} />)}
		/>
	);
};
