import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import companyLogo from "./airbnb-11-722672.png";
import './Navigation.css';

function Navigation({ isLoaded }) {
    const sessionUser = useSelector(state => state.session.user);

    return (
        <div className='nav-bar-wrapper'>
            <ul className='nav-bar'>
                <li className='home-button-container'>
                    <NavLink exact to="/" className='home-button'>
                        <img src={companyLogo} className='nav-bar-logo' alt='Bnb-Ria logo'/>
                        <span className='home-button-text'>Bnb-Ria</span>
                    </NavLink>
                </li>
                <span className='profile-links'>
                    {isLoaded && sessionUser && (
                        <NavLink to={`/users/${sessionUser.id}/spots/new`} className={"create-spot-link"}>
                            Create a New Spot
                        </NavLink>
                    )}
                    {isLoaded && (
                        <li className='profile-button-container'>
                            <ProfileButton user={sessionUser} />
                        </li>
                    )}
                </span>
            </ul>
        </div>

    );
}

export default Navigation;
