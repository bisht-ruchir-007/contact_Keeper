import React, { Fragment } from 'react';
import Contact from '../contacts/Contacts';
import ContactForm from '../contacts/ContactForm';
import ContactFilter from '../contacts/ContentFilter';
const Home = () => {
	return (
		<Fragment>
			<center>
				<h2>Welcome to the Contact Keeper App</h2>
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
