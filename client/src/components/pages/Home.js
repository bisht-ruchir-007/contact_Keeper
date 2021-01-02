import React, { Fragment, useContext, useEffect } from 'react';
import Contact from '../contacts/Contacts';
import ContactForm from '../contacts/ContactForm';
import ContactFilter from '../contacts/ContentFilter';
import AuthContext from '../../context/auth/authContext';

const Home = () => {
	const authContext = useContext(AuthContext);
	const { loadUser, user } = authContext;
	useEffect(() => {
		loadUser();
		// eslint-disable-next-line
	}, []);

	return (
		<Fragment>
			<center>
				<h2>
					Welcome {'   '}
					<strong>
						<span className='text-primary'>{user && user.name}</span>
					</strong>
				</h2>
			</center>
			<div className='grid-2 p'>
				<div>
					<ContactForm />
				</div>
				<div>
					<ContactFilter />
					<Contact />
				</div>
			</div>
		</Fragment>
	);
};

export default Home;
