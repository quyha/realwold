import React, { Component } from 'react';
import { ProfileHeader } from './header'
import { Tabs } from './article-tabs'
import { articleApi } from '../../../api/article'

export class Profile extends Component{
    render() {
        const {match, history} = this.props;
        let username = this.props.match.params.username;
        let tabs = [
            {
                label: 'My Articles',
                url: '',
                api: (page) => articleApi.getByAuthor(page, username)
            },
            {
                label: 'Favorite Articles',
                url: '/favorite',
                api: (page) => articleApi.getFavorited(page, username)
            }
        ];
        return (
            <div className="profile-page">
                <div className="user-info">
                    <div className="container">
                        <div className="row">
                            <div className="col-xs-12 col-md-10 offset-md-1">
                                <ProfileHeader
                                    key={username}
                                    username={username}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container">
                    <div className="row">
                        <div className="col-xs-12 col-md-10 offset-md-1">
                            <Tabs
                                key={username}
                                tabs={tabs}
                                parentUrl={match.url}
                                currentUrl={history.location.pathname}
                            />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}