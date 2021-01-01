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

export default (state, action) => {
	switch (action.type) {
		case ADD_CONTACT:
			return {
				...state,
				contacts: [ ...state.contacts, action.payload ]
			};
		case UPDATE_CURRENT:
			return {
				...state,
				contacts: state.contacts.map((contact) => (contact.id === action.payload.id ? action.payload : contact))
			};
		case DELETE_CONTACT:
			if (state.filtered !== null) {
				return {
					...state,
					contacts: state.contacts.filter((contact) => contact.id !== action.payload),
					filtered: state.filtered.filter((contact) => contact.id !== action.payload)
				};
			} else {
				return {
					...state,
					contacts: state.contacts.filter((contact) => contact.id !== action.payload)
				};
			}

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
		default:
			return state;
	}
};
