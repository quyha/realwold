import React, { Component } from 'react';
import {userInfo} from "../../../services/user-info";
import {userApi} from "../../../api/user";
import { Obj } from '../../../utils/object'

export class Setting extends Component{
    constructor(props) {
        super(props);
        this.state = {
            user: userInfo.get(),
            submitting: false,
            errors: '',
        };
    }
    handleInputChange(e, name) {
        const {user} = this.state;
        this.setState({
            user: {
                ...user,
                [name]: e.target.value
            }
        });
    }

    doSubmit = () => {
        const {user} = this.state;
        const {history} = this.props;
        this.setState({submitting: true});
        userApi.update(user).then(({errors, user}) => {
            if(user) {
                userInfo.set(user);
                history.push('/');
            } else {
                this.setState({errors, submitting: false});
            }
        });
    }
    render() {
        const {user, errors} = this.state;
        return (
            <div className="settings-page">
                <div className="container page">
                    <div className="row">
                        <div className="col-md-6 offset-md-3 col-xs-12">
                            <h1 className="text-xs-center">Your Settings</h1>
                            {errors && (
                                <ul className="error-messages">
                                    <li>{Obj.mapValueToList(errors, (list, key) => (
                                        key + list
                                    ))}</li>
                                </ul>
                            )}
                            <form onSubmit={(e) => {
                                e.preventDefault();
                                this.doSubmit();
                            }}>
                                <fieldset>
                                    <fieldset className="form-group">
                                        <input className="form-control" type="text" placeholder="URL of profile picture"
                                               value={user.image || ''}
                                               onChange={e => this.handleInputChange(e, 'image')}
                                        />
                                    </fieldset>
                                    <fieldset className="form-group">
                                        <input className="form-control form-control-lg" type="text" placeholder="Your Name"
                                               value={user.username || ''}
                                               onChange={e => this.handleInputChange(e, 'username')}
                                        />
                                    </fieldset>
                                    <fieldset className="form-group">
                                        <textarea className="form-control form-control-lg" rows={8} placeholder="Short bio about you"
                                              value={user.bio || ''}
                                              onChange={e =>this.handleInputChange(e, 'bio')}
                                        />
                                    </fieldset>
                                    <fieldset className="form-group">
                                        <input className="form-control form-control-lg" type="text" placeholder="Email"
                                               value={user.email || ''}
                                               onChange={e => this.handleInputChange(e, 'email')}
                                        />
                                    </fieldset>
                                    <fieldset className="form-group">
                                        <input className="form-control form-control-lg" type="password" placeholder="Password" />
                                    </fieldset>
                                    <button className="btn btn-lg btn-primary pull-xs-right">
                                        Update Settings
                                    </button>
                                </fieldset>
                            </form>
                            <hr/>
                            <button
                                className="btn btn-outline-danger"
                                onClick={() => userInfo.set(null)}
                            >
                                Or click here to logout.
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}