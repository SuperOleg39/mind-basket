import { PropsWithChildren, useEffect } from 'react';

export const RouteLoader = ({
	loader,
	children,
}: PropsWithChildren<{ loader?: () => Promise<unknown> }>) => {
	useEffect(() => {
		if (typeof loader === 'function') {
			loader();
		}
	}, []);

	return <>{children}</>;
};
