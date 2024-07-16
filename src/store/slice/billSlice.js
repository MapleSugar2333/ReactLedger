import {createSlice} from 'ReduxToolkit';
import server from '$u/server';

const billSlice = createSlice({
	name: 'bills',
	initialState: {
		billList: [],
	},
	reducers: {
		addBill(state, action) {
			state.billList.push(action.payload);
		},
		setBillList(state, action) {
			state.billList = action.payload;
		},
	},
});
const {addBill, setBillList} = billSlice.actions;

// 记一笔
const createBill = (data) => {
	return async (dispatch) => {
		try {
			const r = await server.post('/ledger', data);
			if (r.data.status === 'success') {
				alert('记账成功!');
				dispatch(addBill(r.data.bill));
			} else if (r.data.message) return alert(`记账失败，${r.data.message}!`);
			else return alert('记账失败!');
		} catch (e) {
			console.error('数据发送异常:', e);
		}
	};
};

// 获取
const getBills = () => {
	return async (dispatch) => {
		try {
			const r = await server.get('/ledger');
			if (r.data.status === 'success') dispatch(setBillList(r.data.bills));
			else if (r.data.message) console.error(`获取失败，${r.data.message}!`);
			else console.error('获取失败!');
		} catch (e) {
			console.error('数据发送异常:', e);
		}
	};
};

export default billSlice.reducer;
export {createBill, getBills};
