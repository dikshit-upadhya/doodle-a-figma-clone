import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {
	ThemeProvider,
	createTheme,
	StyledEngineProvider,
} from '@mui/material';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
// import App from './testCode/penToolImplementation';
import '@fontsource/inter';

const theme = createTheme({
	palette: {
		gray: '#2c2c2c',
		darkGray: '#232323',
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
	},
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<BrowserRouter>
		<ThemeProvider theme={theme}>
			<StyledEngineProvider injectFirst>
				<App />
			</StyledEngineProvider>
		</ThemeProvider>
	</BrowserRouter>
);
