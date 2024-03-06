import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {
	ThemeProvider,
	createTheme,
	StyledEngineProvider,
} from '@mui/material';
import App from './App';

const theme = createTheme();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<ThemeProvider theme={theme}>
		<StyledEngineProvider injectFirst>
			<App />
		</StyledEngineProvider>
	</ThemeProvider>
);
