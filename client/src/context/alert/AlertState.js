import React, { useReducer } from 'react';
import AlertContext from './alertContext';
import alertReducer from './alertReducer';
import { v4 as uuid } from 'uuid';
import { SET_ALERT, REMOVE_ALERT } from '../types';

const AlertState = (props) => {
	const initialState = [];

	const [ state, dispach ] = useReducer(alertReducer, initialState);

	// Actions on Alerts

	// Set Alerts
	const setAlert = (msg, type, timeout = 3000) => {
		const id = uuid();
		dispach({
			type: SET_ALERT,
			payload: { msg, type, id }
		});

		// Remove alert alfter some timeOut
		setTimeout(
			() =>
				dispach({
					type: REMOVE_ALERT,
					payload: id
				}),
			timeout
		);
	};

	return (
		<AlertContext.Provider
			value={{
				alerts: state,
				setAlert
			}}
		>
			{props.children}
		</AlertContext.Provider>
	);
};

export default AlertState;