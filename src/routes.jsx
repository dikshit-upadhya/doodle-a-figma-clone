import { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import {v4 as uuid} from 'uuid'

export const routesArr = {
  EDITOR: {
    path: `${pre}/editor`,
    name: 'EDITOR',
    component: Editor,
    id: uuid()
  }
}

export function AppRoutes() {
	return (
		<Suspense>
				<Routes>
          {Object.values(routesArr).map(routeItem => (
            <Route path={routeItem.path} key={routeItem.id} element={<routeItem.component />} />
          ))}
        </Routes>
			</Suspense>
	);
}