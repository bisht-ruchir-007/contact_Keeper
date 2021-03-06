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
	CLEAR_CONTACTS
} from '../types';

export default (state, action) => {
	switch (action.type) {
		case GET_CONTACTS:
			return {
				...state,
				contacts: action.payload,
				loading: false
			};
		case ADD_CONTACT:
			return {
				...state,
				contacts: [ action.payload, ...state.contacts ],
				loading: false
			};
		case UPDATE_CURRENT:
			if (state.filtered !== null) {
				return {
					...state,
					contacts: state.contacts.map(
						(contact) => (contact._id === action.payload._id ? action.payload : contact)
					),
					filtered: state.filtered.map(
						(contact) => (contact._id === action.payload._id ? action.payload : contact)
					),
					loading: false
				};
			} else {
				return {
					...state,
					contacts: state.contacts.map(
						(contact) => (contact._id === action.payload._id ? action.payload : contact)
					),

					loading: false
				};
			}

		case DELETE_CONTACT:
			if (state.filtered !== null) {
				return {
					...state,
					contacts: state.contacts.filter((contact) => contact._id !== action.payload),
					filtered: state.filtered.filter((contact) => contact._id !== action.payload)
				};
			} else {
				return {
					...state,
					contacts: state.contacts.filter((contact) => contact._id !== action.payload),
					loading: false
				};
			}
		case CLEAR_CONTACTS:
			return {
				...state,
				contacts: null,
				current: null,
				filtered: null,
				error: null
			};
		case SET_CURRENT:
			return {
				...state,
				current: action.payload
			};
		case CLEAR_CURRENT:
			return {
				...state,
				current: null
			};
		case FILTER_CONTACTS:
			return {
				...state,
				filtered: state.contacts.filter((contact) => {
					// gi - Global case inSensitive
					const regex = new RegExp(`${action.payload}`, 'gi');
					return contact.name.match(regex) || contact.email.match(regex);
				})
			};
		case CLEAR_FILTER:
			return {
				...state,
				filtered: null
			};
		case CONTACT_ERROR:
			return {
				...state,
				error: action.payload
			};
		default:
			return state;
	}
};
