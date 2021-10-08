import React from 'react';
import { Router, Switch, Route } from 'react-router';
import { history } from '../shared/history';
import { DocumentPage } from '../pages/document';
import { MainPage } from '../pages/main';

const routes = [
    {
        exact: true,
        path: '/',
        component: MainPage,
    },
    {
        path: '/documents/:id',
        component: DocumentPage,
    },
];

export function Routes() {
    return (
        <Router history={history}>
            <Switch>
                {routes.map(({ exact, path, component: Component }) => (
                    <Route exact={exact} path={path} key={path}>
                        <Component />
                    </Route>
                ))}
            </Switch>
        </Router>
    );
}
