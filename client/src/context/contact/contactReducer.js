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
		case DELETE_CONTACT:
			return {
				...state,
				contacts: state.contacts.filter((contact) => contact.id !== action.payload)
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
		default:
			return state;
	}
};
