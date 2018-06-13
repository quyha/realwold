import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import {userInfo} from "../../../services/user-info";

const MenuLink = ({ label, to, exact, icon }) => {
    return <Route
        path={to}
        exact={exact}
        children={({ match }) => {
            const active = match ? 'active' : '';
            return (
                <li className={`nav-item ${active}`}>
                    <Link className="nav-link" to={to}>
                        {icon &&
                        <i className={icon}></i>
                        }{label}
                    </Link>
                </li>
            );
        }}
    />
};
export class Header extends Component{

    render() {
        const isLogin = userInfo.get() != null;
        const Menus = [
            {
                name: 'Home',
                exact: true,
                to: '/',
                requiredAuth: false
            },
            {
                name: 'Sign in',
                exact: false,
                to: '/login',
                requiredAuth: false
            },
            {
                name: 'Sign up',
                exact: false,
                to: '/register',
                requiredAuth: false
            },
            {
                name: ' New Post ',
                exact: false,
                to: '/editor',
                icon: 'ion-compose',
                requiredAuth: true
            },
            {
                name: ' Setting',
                exact: false,
                to: '/setting',
                icon: 'ion-gear-a',
                requiredAuth: true
            },
            {
                name: `${userInfo.get() ? userInfo.get().username : 'Profile'}`,
                exact: false,
                to: `/profile/${userInfo.get() ? userInfo.get().username : ''}`,
                requiredAuth: true
            }
        ];
        return(
            <nav className="navbar navbar-light">
                <div className="container">
                    <Link className="navbar-brand" to="/">conduit</Link>
                    <ul className="nav navbar-nav pull-xs-right">
                        {
                           Menus.map((value, key) => (
                               isLogin == value.requiredAuth &&
                               <MenuLink
                                   key={key}
                                   label={value.name}
                                   to={value.to}
                                   exact={value.exact}
                                   icon={value.icon ? value.icon : null}
                               />
                           ))
                        }
                    </ul>
                </div>
            </nav>
        );
    }
}
