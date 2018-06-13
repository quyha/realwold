import React, { Component } from 'react';
import { profileApi } from '../../../api/profile'

export class FollowButton extends Component {
    constructor (props) {
        super(props);
    }
    toggleFollow = () => {
        const {username, following, onChange} = this.props;
        if (following) {
            profileApi.unfollow(username).then(({profile}) => onChange(profile.following));
        } else {
            profileApi.follow(username).then(({profile}) => onChange(profile.following));
        }
    }
    render() {
        const {username, following} = this.props;
        return (
            <button className="btn btn-sm btn-outline-secondary" onClick={this.toggleFollow}>
                <i className="ion-plus-round" />
                &nbsp;
                {following ? 'Unfollow' : 'Follow'} {username}
            </button>
        );
    }
}