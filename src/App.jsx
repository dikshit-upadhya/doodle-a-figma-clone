import React from 'react';
import { AppRoutes } from './routes';
import GlobalContextMenu from './components/ui/GlobalMenu';

function App() {
	return (
		<div>
			<GlobalContextMenu />
			<AppRoutes />
		</div>
	);
}

export default App;
