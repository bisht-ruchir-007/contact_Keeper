import React, { useReducer } from 'react';
import axios from 'axios';
import AuthContext from './authContext';
import authReducer from './authReducer';
import setAuthToken from '../../utils/setAuthToken';

import {
	REGISTER_SUCCESS,
	REGISTER_FAIL,
	USER_LOADED,
	AUTH_ERROR,
	LOGOUT,
	LOGIN_FAIL,
	LOGIN_SUCCESS,
	CLEAR_ERRORS
} from '../types';

const AuthState = (props) => {
	const initialState = {
		token: localStorage.getItem('token'),
		isAuthenticated: null,
		loading: true,
		user: null,
		error: null
	};

	const [ state, dispach ] = useReducer(authReducer, initialState);

	// Actions on AuthState

	// Load User
	const loadUser = async () => {
		//  load token into global headers
		if (localStorage.token) {
			setAuthToken(localStorage.token);
		}

		try {
			const res = await axios.get('/api/auth');

			dispach({
				type: USER_LOADED,
				payload: res.data
			});
		} catch (err) {
			dispach({
				type: AUTH_ERROR
			});
		}
	};

	// Register User
	const register = async (formData) => {
		const config = {
			headers: {
				'Content-Type': 'application/json'
			}
		};
		// not need to add localhost:5000 since its added in Proxy filed

		try {
			const res = await axios.post('/api/users', formData, config);
			// response will be the token
			dispach({
				type: REGISTER_SUCCESS,
				payload: res.data
			});

			loadUser();
		} catch (err) {
			dispach({
				type: REGISTER_FAIL,
				payload: err.response.data.msg
			});
		}
	};
	// Login User

	// Logout User

	// Clear Errors

	const clearErrors = () => {
		dispach({ type: CLEAR_ERRORS });
	};

	return (
		<AuthContext.Provider
			value={{
				token: state.token,
				isAuthenticated: state.isAuthenticated,
				loading: state.loading,
				user: state.user,
				error: state.error,
				register,
				loadUser,
				clearErrors
			}}
		>
			{props.children}
		</AuthContext.Provider>
	);
};

export default AuthState;
