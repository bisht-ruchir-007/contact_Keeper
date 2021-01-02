import React, { Fragment, useContext } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import AuthContext from '../../context/auth/authContext';

const Navbar = ({ title, icon }) => {
	const authContext = useContext(AuthContext);
	const { isAuthenticated, logout } = authContext;

	const onLogout = () => {
		logout();
	};

	const authLinks = (
		<Fragment>
			<li>
				<Link to='/'>Contacts</Link>
			</li>
			<li>
				<Link to='/about'>About</Link>
			</li>
			<li>
				<Link to='/profile'>Profile</Link>
			</li>
			<li>
				<a href='' onClick={onLogout}>
					<i className='fas fa-sign-out-alt'>
						<span className='hide-sm'>Logout</span>
					</i>
				</a>
			</li>
		</Fragment>
	);

	const guestLinks = (
		<Fragment>
			<li>
				<Link to='/register'>Register</Link>
			</li>
			<li>
				<Link to='/login'>Login</Link>
			</li>
		</Fragment>
	);

	return (
		<div className='navbar bg-primary'>
			<h1>
				<i className={icon} /> {title}
			</h1>
			<ul>{isAuthenticated ? authLinks : guestLinks}</ul>
		</div>
	);
};

Navbar.propTypes = {
	title: PropTypes.string.isRequired,
	icon: PropTypes.string
};

Navbar.defaultProps = {
	title: 'Contact Keeper',
	icon: 'far fa-address-book'
};

export default Navbar;
