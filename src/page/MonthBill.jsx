import {DatePicker, NavBar} from 'antd-mobile';
import {useEffect, useMemo} from 'react';
import {useLocation} from 'react-router-dom';
import groupBy from 'lodash/groupBy';
import {orderBy} from 'lodash';
import classNames from 'classnames';
import dayjs from 'dayjs';

import {getOverview} from '$u/billList';
import {useMonthBillList} from '$h/useBillList';
import {useDate} from '$h/useDate';
import TwoLineOverview from '$c/TwoLineOverview';
import DailyBill from '$c/DailyBill';
import '$s/MonthBill.scss';

const MonthlyBill = () => {
	const {state} = useLocation();
	const {date, visible, showDate, hideDate, changeDate} = useDate();

	const selectedYear = date.get('year');
	const selectedMonth = date.get('month');
	const currentBillList = useMonthBillList(selectedYear, selectedMonth);

	const overview = getOverview(currentBillList);

	const monthBills = useMemo(() => {
		const billGroup = groupBy(currentBillList, (item) => dayjs(item.date).format('YYYY-MM-DD'));
		const sortedKeys = orderBy(
			Object.keys(billGroup),
			(item) => new Date(item).getTime(),
			'desc',
		);
		return {
			keys: sortedKeys,
			billGroup,
		};
	}, [currentBillList]);

	useEffect(() => {
		if (state) {
			changeDate(state.date);
		}
	}, [state, changeDate]);

	const renderMonthBills = () => {
		const {keys, billGroup} = monthBills;
		return keys.map((key) => {
			const dateText = dayjs(key).format('MM月DD日');
			const overview = getOverview(billGroup[key]);
			return (
				<DailyBill
					key={key}
					overview={overview}
					dateText={dateText}
					billList={billGroup[key]}
				/>
			);
		});
	};

	return (
		<div className='monthlyBill'>
			<NavBar className='nav' backArrow={false}>
				月度收支
			</NavBar>
			<div className='content'>
				<div className='header'>
					<div className='date' onClick={showDate}>
						<span className='text'>
							{selectedYear} | {selectedMonth + 1}月账单
						</span>
						<span className={classNames('arrow', visible && 'expand')}></span>
					</div>
					<DatePicker
						className='kaDate'
						title='记账月份'
						precision='month'
						visible={visible}
						onClose={hideDate}
						max={new Date()}
						onConfirm={changeDate}
					/>
					<TwoLineOverview pay={overview.pay} income={overview.income} type='month' />
				</div>
				{renderMonthBills()}
			</div>
		</div>
	);
};

export default MonthlyBill;
