import React from 'react';
import { Outlet } from 'react-router';

function ProtectedViews() {
	return <Outlet />;
}

export default ProtectedViews;
