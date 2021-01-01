import React, { useReducer } from 'react';
import { v1 as uuid } from 'uuid';
import ContactContext from './contectContext';
import contactReducer from './contactReducer';
import {
	ADD_CONTACT,
	DELETE_CONTACT,
	SET_CURRENT,
	CLEAR_CURRENT,
	UPDATE_CURRENT,
	FILTER_CONTACTS,
	CLEAR_FILTER,
	SET_ALERT,
	REMOVE_ALERT
} from '../types';

const ContactState = (props) => {
	const initialState = {
		contacts: [
			{
				id: 1,
				name: 'Jill Johnson',
				email: 'jill@gmail.com',
				phone: '445-234-2343',
				type: 'personal'
			},
			{
				id: 2,
				name: 'Sara Watson',
				email: 'sara@gmail.com',
				phone: '234-345-2343',
				type: 'personal'
			},
			{
				id: 3,
				name: 'Harry White',
				email: 'harry@gmail.com',
				phone: '234-234-2343',
				type: 'professional'
			}
		],
		current: null
	};

	const [ state, dispach ] = useReducer(contactReducer, initialState);

	// Actions on ContactState

	// Add contact
	const addContact = (contact) => {
		//gen radmon id -- testing
		contact.id = uuid();
		dispach({ type: ADD_CONTACT, payload: contact });
	};
	// Delte contact
	const deleteContact = (id) => {
		dispach({ type: DELETE_CONTACT, payload: id });
	};
	// Set current contact
	const setCurrent = (contact) => {
		dispach({ type: SET_CURRENT, payload: contact });
	};
	// clear current contact
	const clearCurrent = () => {
		dispach({ type: CLEAR_CURRENT });
	};
	// Update Contact
	const updateContact = (contact) => {
		dispach({ type: UPDATE_CURRENT, payload: contact });
	};
	// Filter contacts

	// Clear Filter
	return (
		<ContactContext.Provider
			value={{
				contacts: state.contacts,
				current: state.current,
				addContact,
				updateContact,
				deleteContact,
				setCurrent,
				clearCurrent
			}}
		>
			{props.children}
		</ContactContext.Provider>
	);
};

export default ContactState;
