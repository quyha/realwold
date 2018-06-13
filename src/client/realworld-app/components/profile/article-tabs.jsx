import React, { Component, Fragment } from 'react'
import { Link, Route } from 'react-router-dom'
import { PagingArticle } from '../home/paging-article';

export class Tabs extends Component{
    render() {
        const {tabs, parentUrl, currentUrl} = this.props;
        return (
            <Fragment>
                <div className="articles-toggle">
                    <ul className="nav nav-pills outline-active">
                        {
                            tabs.map((tab, k) => (
                                <li className="nav-item" key={k}>
                                    <Link to={`${parentUrl}${tab.url}`}
                                          className={`nav-link ${currentUrl === parentUrl + tab.url && 'active'}`}>{tab.label}</Link>
                                </li>
                            ))
                        }
                    </ul>
                </div>
                {tabs.map((tab, k) => (
                    <Route
                        exact
                        path={`${parentUrl}${tab.url}`}
                        render={() => (
                            <PagingArticle
                                api={(page) => tab.api(page)}
                            />
                        )}
                        key={k}
                    />
                ))}
            </Fragment>
        );
    }
};