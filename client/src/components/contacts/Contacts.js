import React, { useContext, Fragment } from 'react';
import ContactItem from './ContactItem';
import ContactContext from '../../context/contact/contectContext';

const Contacts = () => {
	const contactContext = useContext(ContactContext);
	const { contacts } = contactContext;

	if (contacts.length > 0) {
		return <Fragment>{contacts.map((contact) => <ContactItem key={contact.id} contact={contact} />)}</Fragment>;
	} else {
		return (
			<Fragment>
				<p>No Contacts Found</p>
			</Fragment>
		);
	}
};

export default Contacts;
