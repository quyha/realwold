import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import FormValidator from '../../../common/form-validator';
import {userApi} from "../../../api/user";
import {Obj} from "../../../utils/object";
import {userInfo} from "../../../services/user-info";

export class Login extends Component{
    constructor(props) {
        super(props);
        this.validator = new FormValidator([
            {
                field: 'email',
                method: 'isEmpty',
                validWhen: false,
                message: 'Email is required'
            },{
                field: 'email',
                method: 'isEmail',
                validWhen: true,
                message: 'That is not a valid email'
            },{
                field: 'password',
                method: 'isEmpty',
                validWhen: false,
                message: 'Password is required'
            }
        ]);
        this.state = {
            email: '',
            password: '',
            errors: '',
            submitting: false,
            validation: this.validator.reset()
        }
    }
    onChangeInput(name, e) {
        this.setState({
            [name]: e.target.value
        });
    }
    doLogin = () => {
        const validation = this.validator.validate(this.state);
        const {email, password} = this.state;
        this.setState({validation, submitting: true});
        if(validation.isValid) {
            userApi.login({email, password}).then(({errors, user}) => {
                if(errors) {
                    this.setState({errors, submitting: false});
                }
                userInfo.set(user);
                this.props.history.push('/');
            });
        }
    }

    render() {
        const {email, password, errors, submitting, validation} = this.state;
        return (
            <div className="auth-page">
                <div className="container page">
                    <div className="row">
                        <div className="col-md-6 offset-md-3 col-xs-12">
                            <h1 className="text-xs-center">Sign in</h1>
                            <p className="text-xs-center">
                                <Link to="/register">Need an account?</Link>
                            </p>
                            {errors && (
                                <ul className="error-messages">
                                    <li>{Obj.mapValueToList(errors, (list, key) => (
                                        key + list
                                    ))}</li>
                                </ul>
                            )}
                            <form onSubmit={(e) => {
                                e.preventDefault();
                                return this.doLogin();
                            }}>
                                <fieldset className="form-group">
                                    <input className="form-control form-control-lg" type="text" placeholder="Email"
                                           onChange={(e) => this.onChangeInput("email", e)}
                                    />
                                    <span className="error-messages">{validation.email.message}</span>
                                </fieldset>
                                <fieldset className="form-group">
                                    <input className="form-control form-control-lg" type="password" placeholder="Password"
                                           onChange={(e) => this.onChangeInput("password", e)}
                                    />
                                    <span className="error-messages">{validation.password.message}</span>
                                </fieldset>
                                <button className="btn btn-lg btn-primary pull-xs-right" disabled={submitting}>
                                    Sign in
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}