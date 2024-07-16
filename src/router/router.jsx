import {createBrowserRouter, Navigate} from 'react-router-dom';

import KeepAccount from '$p/KeepAccount';
import Layout from '$p/Layout';
import MonthBill from '$p/MonthBill';
import YearBill from '$p/YearBill';
import NotFound from '$p/NotFound';

const router = createBrowserRouter([
	{
		path: '/',
		element: <Navigate to='/bill' replace />,
	},
	{
		path: '/keep',
		element: <KeepAccount />,
	},
	{
		path: '/bill',
		element: <Layout />,
		children: [
			{
				index: true,
				element: <MonthBill />,
			},
			{
				path: 'year',
				element: <YearBill />,
			},
		],
	},
	{
		path: '*',
		element: <NotFound />,
	},
]);

export default router;
