import React, { useEffect, useRef } from 'react';
import { Outlet } from 'react-router';
import { Box } from '@mui/material';
import GlobalContextMenu from '../../components/ui/GlobalMenu';

function Layout() {
	const rootDivRef = useRef();

	const handleGlobalWheel = (e) => {
		if (e.ctrlKey) {
			e.preventDefault();
		}
	};

	useEffect(() => {
		const element = rootDivRef.current;
		if (element) {
			element.addEventListener('wheel', handleGlobalWheel, {
				capture: true,
				passive: false,
			});
		}

		return () => {
			if (element) {
				element.removeEventListener('wheel', handleGlobalWheel);
			}
		};
	}, []);

	return (
		<Box ref={rootDivRef}>
			<GlobalContextMenu />
			<Outlet />
		</Box>
	);
}

export default Layout;
