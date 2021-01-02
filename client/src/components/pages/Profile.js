import React, { Fragment, useContext, useEffect } from 'react';
import AuthContext from '../../context/auth/authContext';

const Profile = () => {
	const authContext = useContext(AuthContext);
	const { loadUser, user } = authContext;
	const { name, email } = user;
	useEffect(() => {
		loadUser();
		// eslint-disable-next-line
	}, []);

	return (
		<div className='text-center p'>
			<h1>User Details</h1>
			<h2>Name : {name}</h2>
			<h2>Email ID : {email}</h2>
		</div>
	);
};

export default Profile;
