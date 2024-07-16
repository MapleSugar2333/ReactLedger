import {configureStore} from 'ReduxToolkit';

import billReducer from '$sl/billSlice';

const billStore = configureStore({
	reducer: {
		bills: billReducer,
	},
});

export default billStore;
