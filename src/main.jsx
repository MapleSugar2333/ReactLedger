import ReactDOM from 'react-dom/client';
import {Provider} from 'react-redux';
import {RouterProvider} from 'react-router-dom';

import store from '$sr/billStore';
import router from '$/router/router';
import '$s/index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
	<Provider store={store}>
		<RouterProvider router={router} />
	</Provider>,
);
