import React, { useReducer } from 'react';
import axios from 'axios';
// import { v4 as uuid } from 'uuid';
import ContactContext from './contectContext';
import contactReducer from './contactReducer';
import {
	GET_CONTACTS,
	ADD_CONTACT,
	DELETE_CONTACT,
	SET_CURRENT,
	CLEAR_CURRENT,
	UPDATE_CURRENT,
	FILTER_CONTACTS,
	CLEAR_FILTER,
	CONTACT_ERROR,
	CLEAR_CONTACTS,
	SET_ALERT,
	REMOVE_ALERT
} from '../types';

const ContactState = (props) => {
	const initialState = {
		contacts: null,
		// Current Contact to be updated - Object
		current: null,
		// List of all the matching contacts - Array
		filtered: null,
		error: null
	};

	const [ state, dispach ] = useReducer(contactReducer, initialState);

	// Actions on ContactState
	// Get Contacts
	const getContacts = async () => {
		try {
			const res = await axios.get('/api/contacts');
			dispach({ type: GET_CONTACTS, payload: res.data });
		} catch (err) {
			dispach({ type: CONTACT_ERROR, payload: err.response.msg });
		}
	};
	// Add contact
	const addContact = async (contact) => {
		//gen radmon id -- testing
		// contact.id = uuid();
		const config = {
			headers: {
				'Content-Type': 'application/json'
			}
		};
		try {
			// no need to send token id as its stored in Global state
			const res = await axios.post('/api/contacts', contact, config);
			dispach({
				type: ADD_CONTACT,
				payload: res.data
			});
		} catch (err) {
			dispach({
				type: CONTACT_ERROR,
				payload: err.response.msg
			});
		}
	};
	// Delte contact
	const deleteContact = async (id) => {
		try {
			await axios.delete(`/api/contacts/${id}`);

			dispach({
				type: DELETE_CONTACT,
				payload: id
			});
		} catch (err) {
			dispach({
				type: CONTACT_ERROR,
				payload: err.response.msg
			});
		}
	};
	// Update Contact
	const updateContact = async (contact) => {
		const config = {
			headers: {
				'Content-Type': 'application/json'
			}
		};
		try {
			const res = await axios.put(`/api/contacts/${contact._id}`, contact, config);

			dispach({
				type: UPDATE_CURRENT,
				payload: res.data
			});
		} catch (err) {
			dispach({
				type: CONTACT_ERROR,
				payload: err.response.msg
			});
		}
	};
	// Set current contact
	const setCurrent = (contact) => {
		dispach({ type: SET_CURRENT, payload: contact });
	};
	// clear current contact
	const clearCurrent = () => {
		dispach({ type: CLEAR_CURRENT });
	};

	// Filter contacts
	const filterContacts = (text) => {
		dispach({ type: FILTER_CONTACTS, payload: text });
	};
	// Clear Filter
	const clearFilter = () => {
		dispach({ type: CLEAR_FILTER });
	};
	//Clear Contacts
	const clearContacts = () => {
		dispach({ type: CLEAR_CONTACTS });
	};

	return (
		<ContactContext.Provider
			value={{
				contacts: state.contacts,
				current: state.current,
				filtered: state.filtered,
				error: state.error,
				getContacts,
				addContact,
				updateContact,
				deleteContact,
				setCurrent,
				filterContacts,
				clearCurrent,
				clearFilter,
				clearContacts
			}}
		>
			{props.children}
		</ContactContext.Provider>
	);
};

export default ContactState;
