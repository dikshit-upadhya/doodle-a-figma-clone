import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {
	ThemeProvider,
	createTheme,
	StyledEngineProvider,
} from '@mui/material';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import App from './App';
// import App from './testCode/squareDrawing';
import '@fontsource/inter';
import '@fontsource/inter/100.css';
import '@fontsource/inter/200.css';
import '@fontsource/inter/300.css';
import '@fontsource/inter/400.css';
import '@fontsource/inter/500.css';
import '@fontsource/inter/600.css';
import '@fontsource/inter/700.css';
import '@fontsource/inter/800.css';
import '@fontsource/inter/900.css';
import store from './store';

const theme = createTheme({
	palette: {
		lightGray: '#7A7A7A',
		gray: '#2c2c2c',
		darkGray: '#232323',
		darkerGray: '#1B1B1B',
		brightBlue: '#0c8ce9',
		brightBlueText: '#6ebaf2',
	},
	typography: {
		commonText: {
			fontSize: '14px',
			fontFamily: 'Inter',
		},
		layersListHeader: {
			fontSize: '11px',
			fontFamily: 'Inter',
		},
		layersListTitle: {
			fontSize: '11px',
			fontFamily: 'Inter',
		},
		layersListText: {
			fontSize: '13px',
			fontFamily: 'Inter',
		},
		globalMenu: {
			fontSize: '13px',
			fontFamily: 'Inter',
			fontWeight: '500',
		},
		toolbarText: {
			fontSize: '12px',
			fontFamily: 'Inter',
			fontWeight: '400',
		},
		buttonText: {
			fontSize: '12px',
			fontFamily: 'Inter',
			fontWeight: '600',
		},
	},
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<BrowserRouter>
		<Provider store={store}>
			<ThemeProvider theme={theme}>
				<StyledEngineProvider injectFirst>
					<App />
				</StyledEngineProvider>
			</ThemeProvider>
		</Provider>
	</BrowserRouter>
);
