import React, { useState, useContext, useEffect } from 'react';
import ContactContext from '../../context/contact/contectContext';
const ContactForm = () => {
	const contactContext = useContext(ContactContext);

	const { addContact, updateContact, current, clearCurrent } = contactContext;

	const [ contact, setContact ] = useState({
		name: '',
		email: '',
		phone: '',
		type: 'personal'
	});

	// set the state
	useEffect(
		() => {
			if (current !== null) {
				setContact(current);
			} else {
				setContact({
					name: '',
					email: '',
					phone: '',
					type: 'personal'
				});
			}
		},
		[ contactContext, current ]
	);

	const { name, phone, email, type } = contact;

	const onChange = (e) =>
		setContact({
			...contact,
			[e.target.name]: e.target.value
		});

	const onSubmit = (e) => {
		e.preventDefault();
		// Adding a new Contact
		if (current === null) {
			addContact(contact);
		} else {
			// updating a exsisting Contact
			updateContact(contact);
		}
		setContact({
			name: '',
			email: '',
			phone: '',
			type: 'personal'
		});
		clearAll();
	};

	const clearAll = () => {
		clearCurrent();
	};

	return (
		<div>
			<form onSubmit={onSubmit}>
				<h2 className='text-primary'>{current ? ' Edit Content' : 'Add Contact'}</h2>
				<input type='text' placeholder='Enter the Name' name='name' value={name} onChange={onChange} />
				<input type='email' placeholder='Enter the Email ID' name='email' value={email} onChange={onChange} />
				<input
					type='text'
					placeholder='Enter the Phone Number'
					name='phone'
					value={phone}
					onChange={onChange}
				/>
				<h5>Contact Type</h5>
				<input type='radio' name='type' value='personal' checked={type === 'personal'} onChange={onChange} />
				Personal {'  '}
				<input
					type='radio'
					name='type'
					value='professional'
					checked={type === 'professional'}
					onChange={onChange}
				/>
				Professional {'  '}
				<div>
					<input
						type='submit'
						value={current ? 'Update Content' : 'Submit'}
						className='btn btn-primary btn-block'
					/>
				</div>
				{current && (
					<div>
						<h6 className='text-center'>Add a new Contact ?</h6>
						<button className='btn btn-success btn-block' onClick={clearAll}>
							Add Contact
						</button>
					</div>
				)}
			</form>
		</div>
	);
};

export default ContactForm;
