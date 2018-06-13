import React, { Component } from 'react';
import {PagingArticle} from "./paging-article";
import { articleApi } from '../../../api/article'

export class Home extends Component{
    render() {
        return(
            <div className="home-page">

                <div className="banner">
                    <div className="container">
                        <h1 className="logo-font">conduit</h1>
                        <p>A place to share your knowledge.</p>
                    </div>
                </div>

                <div className="container page">
                    <div className="row">
                        <div className="col-md-9">
                            <div className="feed-toggle">
                                <ul className="nav nav-pills outline-active">
                                    <li className="nav-item">
                                        <a className="nav-link active" href="#">Global Feed</a>
                                    </li>
                                </ul>
                            </div>
                            <PagingArticle
                                api={(page) => articleApi.getArticleList(page)}
                            />
                        </div>

                        <div className="col-md-3">
                            <div className="sidebar">
                                <p>Popular Tags</p>

                                <div className="tag-list">
                                    <a href="#" className="tag-pill tag-default">programming</a>
                                    <a href="#" className="tag-pill tag-default">javascript</a>
                                    <a href="#" className="tag-pill tag-default">javascript</a>
                                    <a href="#" className="tag-pill tag-default">javascript</a>
                                    <a href="#" className="tag-pill tag-default">javascript</a>
                                    <a href="#" className="tag-pill tag-default">javascript</a>
                                    <a href="#" className="tag-pill tag-default">javascript</a>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

            </div>
        );
    }
}