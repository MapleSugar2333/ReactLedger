import {useCallback, useEffect, useMemo} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import dayjs from 'dayjs';

import {getBills} from '$sl/billSlice';

const useBillList = () => {
	const dispatch = useDispatch();
	const {billList} = useSelector((state) => state.bills);

	useEffect(() => {
		dispatch(getBills());
	}, [dispatch]);

	return {billList};
};

const useYearBillList = (selectedYear) => {
	const {billList} = useBillList();
	const flt = useCallback(
		(item) => selectedYear === dayjs(item.date).get('year'),
		[selectedYear],
	);
	const yearBills = useMemo(() => billList.filter(flt), [billList, flt]);

	return yearBills;
};

const useMonthBillList = (selectedYear, selectedMonth) => {
	const selectedYearBills = useYearBillList(selectedYear);
	const flt = useCallback(
		(item) => selectedMonth === dayjs(item.date).get('month'),
		[selectedMonth],
	);
	const currentBillList = useMemo(() => selectedYearBills.filter(flt), [selectedYearBills, flt]);

	return currentBillList;
};

export {useBillList, useYearBillList, useMonthBillList};
