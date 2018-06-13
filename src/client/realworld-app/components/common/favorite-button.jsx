import React, { Component, Fragment } from 'react'
import { articleApi } from '../../../api/article'

export class FavoriteButton extends Component {
    toggleFavorite = () => {
        const {favorited, slug, onChange} = this.props;
        if(!favorited) {
            articleApi.favorite(slug).then(({article}) => onChange(article.favorited, article.favoritesCount));
        } else {
            articleApi.unfavorite(slug).then(({article}) => onChange(article.favorited, article.favoritesCount));
        }
    }
    render() {
        const {favorited, count, label} = this.props;
        return (
            <button className={`btn btn-sm ${favorited ? 'btn-primary' : 'btn-outline-primary'} ${!label ? 'pull-xs-right' : ''} `} onClick={this.toggleFavorite}>
                <i className="ion-heart" />
                &nbsp;
                {label ? (
                    <Fragment>{favorited ? 'Unfavorite' : 'Favorite'} Post <span className="counter">({count})</span></Fragment>
                ) : (
                    <span className="counter">{count}</span>
                )}

            </button>
        );
    }
}