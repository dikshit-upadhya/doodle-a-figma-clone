import React from 'react';
import { Outlet } from 'react-router';
import GlobalContextMenu from '../../components/ui/GlobalMenu';

function Layout() {
	return (
		<>
			<GlobalContextMenu />
			<Outlet />
		</>
	);
}

export default Layout;
