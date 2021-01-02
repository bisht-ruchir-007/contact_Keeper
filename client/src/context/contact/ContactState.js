import React, { useReducer } from 'react';
import { v4 as uuid } from 'uuid';
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
		// Current Contact to be updated - Object
		current: null,
		// List of all the matching contacts - Array
		filtered: null
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
	const filterContacts = (text) => {
		dispach({ type: FILTER_CONTACTS, payload: text });
	};
	// Clear Filter
	const clearFilter = () => {
		dispach({ type: CLEAR_FILTER });
	};

	return (
		<ContactContext.Provider
			value={{
				contacts: state.contacts,
				current: state.current,
				filtered: state.filtered,
				addContact,
				updateContact,
				deleteContact,
				setCurrent,
				filterContacts,
				clearCurrent,
				clearFilter
			}}
		>
			{props.children}
		</ContactContext.Provider>
	);
};

export default ContactState;
