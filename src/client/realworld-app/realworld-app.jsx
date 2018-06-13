import React, {Component} from 'react';
import {routes} from "../route/route";
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom';
import { Header } from "./components/header/header";
import {Footer} from "./components/footer/footer";
import {userInfo} from "../services/user-info";
import { apiAuthConfig } from '../api/api-auth';
import * as api from '../api/api-sender';

export class RealWordApp extends Component{
    constructor (props) {
        super(props);
        let headers = {};
        if(userInfo.get()) {
            headers = {
                'Authorization': `Token ${userInfo.get().token}`,
            };
        }
        api.setHeader(headers);
    }
    componentDidMount() {
        userInfo.onChange(this, this.forceUpdate.bind(this));
        apiAuthConfig.setAuth(() => {
            if(userInfo.get()) {
                return true;
            }
            window.location.hash = '/login';
        })

    }
    componentWillUnmount() {
        userInfo.unChange(this);
    }

    render() {
        return(
            <HashRouter>
                <div className="realworld-app">
                    <Header />
                    <Switch>
                        {showContent(routes)}
                    </Switch>
                    <Footer />
                </div>
            </HashRouter>
        );
    }
}
const showContent = (routes) => {
    let result = null;
    const user = userInfo.get();
    const requireAuthen = component => (user === null ? redirect('/') : component);
    const requiredUnauthen = component => (user !== null ? redirect('/') :component);
    if(routes.length > 0) {
        result = routes.map((value, key) => (
            <Route
                key={key}
                path={value.path}
                exact={value.exact}
                component={value.unauthen ? requiredUnauthen(value.main) : value.authen ? requireAuthen(value.main) : value.main}
            />
        ));
    }
    return result;
}
function redirect(location) {
    return class RedirectRoute extends Component {
        constructor(props){
            super(props);
            props.history.push(location);
        }
        render() {
            return null;
        }
    }
}