import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';

const Layout = lazy(() => import('./views/Layout'));
const ProtectedViews = lazy(() => import('./views/ProtectedViews'));
const Editor = lazy(() => import('./views/Editor'));

function AppRoutes() {
	return (
		<Suspense>
			<Routes>
				<Route path="/" element={<Layout />}>
					<Route path="/" element={<ProtectedViews />}>
						<Route path="/editor" element={<Editor />} />
					</Route>
				</Route>
			</Routes>
		</Suspense>
	);
}

export default AppRoutes;
