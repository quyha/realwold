import * as send from './api-sender';
import { apiAuth} from './api-auth';

const articleApi = {
    getArticleList(page) {
        return send.get(`/articles?limit=10&offset=${(page - 1) * 10}`);
    },
    getByAuthor(page, author) {
        return send.get(`/articles?author=${author}&limit=10&offset=${(page - 1) * 10}`);
    },
    getFavorited(page, by) {
        return send.get(`/articles?favorited=${by}&limit=10&offset=${(page - 1) * 10}`);
    },
    getArticle(slug) {
        return send.get(`/articles/${slug}`);
    },
    create(article) {
        return send.post(`/articles`, {article: article});
    },
    update(article) {
        return send.put(`/articles/${article.slug}`, {article: article});
    },
    delete(slug) {
        return send.del(`/articles/${slug}`);
    },
    favorite: apiAuth((slug) => {
        return send.post(`articles/${slug}/favorite`,{});
    }),
    unfavorite: apiAuth((slug) => {
        return send.del(`articles/${slug}/favorite`);
    }),
    getComments(slug) {
        return send.get(`articles/${slug}/comments`);
    },
    addComment(slug, body) {
        return send.post(`articles/${slug}/comments`, {comment:{body}});
    },
    deleteComment: apiAuth((slug, id) => {
        return send.del(`articles/${slug}/comments/${id}`);
    })
}
export {articleApi};