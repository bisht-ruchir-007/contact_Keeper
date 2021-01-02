import React, { useContext, Fragment, useEffect } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import ContactItem from './ContactItem';
import ContactContext from '../../context/contact/contectContext';
import Spinner from '../layout/Spinner';
const Contacts = () => {
	const contactContext = useContext(ContactContext);
	const { contacts, filtered, getContacts, loading } = contactContext;

	useEffect(() => {
		getContacts();
		//eslint-disable-next-line
	}, []);

	if (contacts !== null && contacts.length === 0) {
		return (
			<Fragment>
				<h4>Contact List is Empty.</h4>
			</Fragment>
		);
	}

	if (filtered && filtered.length === 0) {
		return (
			<Fragment>
				<h4>No matching Contact found.</h4>
			</Fragment>
		);
	}

	return (
		<Fragment>
			{contacts !== null && !loading ? (
				<TransitionGroup>
					{filtered !== null ? (
						filtered.map((contact) => (
							<CSSTransition key={contact._id} timeout={500} classNames='item'>
								<ContactItem contact={contact} />
							</CSSTransition>
						))
					) : (
						contacts.map((contact) => (
							<CSSTransition key={contact._id} timeout={500} classNames='item'>
								<ContactItem contact={contact} />
							</CSSTransition>
						))
					)}
				</TransitionGroup>
			) : (
				<Spinner />
			)}
		</Fragment>
	);
};

export default Contacts;
