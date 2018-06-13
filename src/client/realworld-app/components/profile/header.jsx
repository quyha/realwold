import React, { Component, Fragment } from 'react'
import { profileApi } from '../../../api/profile'
import { userInfo } from '../../../services/user-info';
import { Link } from 'react-router-dom';
import { route} from '../../../route/route';
import { FollowButton } from '../common/follow-button'

export class ProfileHeader extends Component{
    constructor (props) {
        super(props);
        this.state = {
            profile: ''
        };
    }
    componentDidMount() {
        const {username} = this.props;
        profileApi.get(username).then(({profile}) => {
            this.setState({profile});
        });
    }

    render() {
        const {profile} = this.state;
        let user = userInfo.get();
        return (
            <Fragment>
                {profile == null ?
                    null
                    : (
                    <Fragment>
                        <img src={profile.image} className="user-img" />
                        <h4>{profile.username}</h4>
                        <p>
                            {profile.bio}
                        </p>
                        {user && user.username === profile.username
                            ? <Link to={route('setting')} className="btn btn-sm btn-outline-secondary action-btn">Edit Profile Settings</Link>
                            : <FollowButton
                                username={profile.username}
                                following={profile.following}
                                onChange={following => this.setState({profile: {...profile, following}})}
                            />
                        }
                    </Fragment>
                )}

            </Fragment>
        );
    }
}