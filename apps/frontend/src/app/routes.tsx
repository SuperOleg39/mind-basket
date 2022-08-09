import { Router, Switch, Route } from 'react-router';
import { DocumentPage } from '../pages/document';
import { MainPage } from '../pages/main';
import { history } from '../shared/lib/router/history';
import { RouteLoader } from '../shared/lib/router/loader/route-loader';

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
						<RouteLoader loader={(Component as any).loader}>
							<Component />
						</RouteLoader>
					</Route>
				))}
			</Switch>
		</Router>
	);
}
