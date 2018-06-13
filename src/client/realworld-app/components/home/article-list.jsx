import React, {Component} from 'react';
import {Fragment} from 'react';
import { route } from '../../../route/route'
import { Link } from 'react-router-dom'
import { FavoriteButton } from '../common/favorite-button'
import { Cols } from '../../../utils/Cols';

export class ArticleList extends Component{
    constructor(props) {
        super(props);
        this.state = {
            articles: null
        }
    }
    componentDidMount() {
        this.props.api().then(articles => this.setState({articles}));
    }
    render() {
        const {articles} = this.state;
        return (
            <Fragment>
                {articles == null ? (
                    <div className="post-preview">
                        Loading ...
                    </div>
                ) : articles.length === 0 ? (
                    <div className="post-preview">
                        No articles are here... yet.
                    </div>
                ) :(
                    articles.map((article, i) => (
                        <div className="article-preview" key={i}>
                            <div className="article-meta">
                                <Link to={route('profile',{username : article.author.username})}><img src={article.author.image} /></Link>
                                <div className="info">
                                    <Link to={route('profile',{username : article.author.username})} className="author">{article.author.username}</Link>
                                    <span className="date">{new Date(article.createdAt).toLocaleString()}</span>
                                </div>
                                <FavoriteButton
                                    slug={article.slug}
                                    favorited={article.favorited}
                                    count={article.favoritesCount}
                                    onChange={(favorited, favoritesCount) => this.setState({
                                        articles: Cols.replace1(articles, article, {...article, favorited, favoritesCount})
                                    })}
                                />
                            </div>
                            <Link to={route('article',{slug: article.slug})} className="preview-link">
                                <h1>{article.title}</h1>
                                <p>{article.description}</p>
                                <span>Read more...</span>
                            </Link>
                        </div>
                    ))
                )}
            </Fragment>
        );
    }
}