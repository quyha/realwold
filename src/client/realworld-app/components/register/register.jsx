import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import FormValidator from "../../../common/form-validator";
import { userInfo } from '../../../services/user-info'
import { userApi } from '../../../api/user'
import { Obj } from '../../../utils/object'

export class Register extends Component {
    constructor(props) {
        super(props);
        this.validator = new FormValidator([
            {
                field: 'username',
                method: 'isEmpty',
                validWhen: false,
                message: 'Username is required'
            },{
                field: 'email',
                method: 'isEmail',
                validWhen: true,
                message: 'That is not a valid email'
            },{
                field: 'email',
                method: 'isEmpty',
                validWhen: false,
                message: 'Email is required'
            },{
                field: 'password',
                method: 'isEmpty',
                validWhen: false,
                message: 'Password is required'
            }
        ]);
        this.state = {
            username: '',
            email: '',
            password: '',
            errors: '',
            validation: this.validator.reset()
        };
    }

    handleChangeInput(name,e) {
        const value = e.target.value;
        this.setState({
            [name] : value
        });
    }
    doRegister() {
        const validation = this.validator.validate(this.state);
        const {username, email, password} = this.state;
        this.setState({validation});
        if(validation.isValid) {
            userApi.register({username, email, password}).then(({errors, user}) => {
                if(user) {
                    userInfo.set(user);
                    // history.push('/setting');
                } else {
                    this.setState({errors});
                }
            });
        }
    }

    render() {
        const {username, email, password, validation, errors} = this.state;
        // let validation = this.
        return(
            <div className="auth-page">
                <div className="container page">
                    <div className="row">
                        <div className="col-md-6 offset-md-3 col-xs-12">
                            <h1 className="text-xs-center">Sign up</h1>
                            <p className="text-xs-center">
                                <Link to="/login">Have an account?</Link>
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
                                this.doRegister();
                            }}>
                                <fieldset className="form-group">
                                    <input className="form-control form-control-lg" type="text" placeholder="Your Name"
                                           value={username}
                                           onChange={e => this.handleChangeInput("username", e)}
                                    />
                                    <span className="error-messages">{validation.username.message}</span>
                                </fieldset>
                                <fieldset className="form-group">
                                    <input className="form-control form-control-lg" type="text" placeholder="Email"
                                           value={email}
                                           onChange={e => this.handleChangeInput("email", e)}
                                    />
                                    <span className="error-messages">{validation.email.message}</span>
                                </fieldset>
                                <fieldset className="form-group">
                                    <input className="form-control form-control-lg" type="password" placeholder="Password"
                                           value={password}
                                           onChange={e => this.handleChangeInput("password", e)}
                                    />
                                    <span className="error-messages">{validation.password.message}</span>
                                </fieldset>
                                <button type="submit" className="btn btn-lg btn-primary pull-xs-right">
                                    Sign up
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}