import React, { useContext, Fragment } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import ContactItem from './ContactItem';
import ContactContext from '../../context/contact/contectContext';

const Contacts = () => {
	const contactContext = useContext(ContactContext);
	const { contacts, filtered } = contactContext;

	if (contacts.length === 0) {
		return (
			<Fragment>
				<h4>Contact List is Empty. Please add new Contact...</h4>
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
		</Fragment>
	);
};

export default Contacts;
