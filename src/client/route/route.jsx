import React from 'react';
import {Home} from "../realworld-app/components/home/home";
import {NotFound} from "../realworld-app/components/errors/404";
import {Login} from "../realworld-app/components/login/login";
import {Register} from "../realworld-app/components/register/register";
import {Setting} from "../realworld-app/components/setting/setting";
import { Profile } from '../realworld-app/components/profile/profile';
import { Article } from '../realworld-app/components/article/article';
import { Editor } from '../realworld-app/components/editor/editor'

export const routes = [
    {
        path: '/',
        exact: true,
        main: () => <Home/>
    },
    {
        path: '/login',
        name: 'login',
        exact: false,
        unauthen: true,
        main: ({history}) => <Login history={history}/>
    },
    {
        path: '/register',
        name: 'register',
        exact: false,
        unauthen: true,
        main: ({history}) => <Register history={history}/>
    },
    {
        path: '/setting',
        exact: false,
        name: 'setting',
        authen: true,
        main: ({history}) => <Setting history={history}/>
    },
    {
        path: '/profile/:username',
        name: 'profile',
        exact: false,
        authen: false,
        main: ({match, history}) => <Profile match={match} history={history}/>
    },
    {
        path: '/articles/:slug',
        name: 'article',
        exact: false,
        authen: false,
        main: ({match, history}) => <Article match={match} history={history}/>
    },
    {
        path: '/editor/:slug',
        name: 'editor.edit',
        exact: false,
        authen: true,
        main: ({match, history}) => <Editor match={match} history={history} />
    },
    {
        path: '/editor',
        name: 'editor',
        exact: false,
        authen: true,
        main: ({match, history}) => <Editor match={match} history={history}/>
    },

    {
        path: '',
        exact: true,
        main: () => <NotFound/>
    }
];
export const route = (name, obj = {}) => {
    const path = routes.find(r => r.name === name).path;
    if (obj.length < 1) return path;
    const regex = /:.+?(?=[-\/])|:.+/g;
    let m = path.match(regex);
    let newPath = path;
    for (let k in obj) {
        if (obj.hasOwnProperty(k)) {
            if (m.includes(`:${k}`)) {
                newPath = newPath.replace(`:${k}`, obj[k]);
            }
        }
    }
    return newPath;
};