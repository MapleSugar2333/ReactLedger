import {DatePicker, NavBar} from 'antd-mobile';
import classNames from 'classnames';
import dayjs from 'dayjs';

import {useDate} from '$h/useDate';
import {useYearBillList} from '$h/useBillList';
import {getMonthOverview, getOverview} from '$u/billList';
import TwoLineOverview from '$c/TwoLineOverview';
import OneLineOverview from '$c/OneLineOverview';
import '$s/YearBill.scss';

const BillAll = () => {
	const {date, visible, showDate, hideDate, changeDate} = useDate();

	const selectedYear = date.get('year');
	const selectedYearBills = useYearBillList(selectedYear);

	const overview = getOverview(selectedYearBills);
	const thisYear = dayjs().get('year');
	const maxMonth = thisYear === selectedYear ? dayjs().get('month') + 1 : 12;
	const monthBillList = new Array(maxMonth)
		.fill('')
		.map((_, month) => getMonthOverview(selectedYearBills, month))
		.reverse();

	return (
		<div className='billDetail'>
			<NavBar className='nav' backArrow={false}>
				<div className='nav-title' onClick={showDate}>
					{selectedYear}年
					<span className={classNames('arrow', visible && 'expand')}></span>
				</div>
			</NavBar>
			<DatePicker
				className='kaDate'
				title='记账年份'
				precision='year'
				visible={visible}
				onClose={hideDate}
				max={new Date()}
				onConfirm={changeDate}
			/>
			<div className='content'>
				<div className='overview'>
					<TwoLineOverview
						pay={overview.pay}
						income={overview.income}
						className='overview'
					/>
				</div>
				{monthBillList.map((item, index) => {
					return (
						<div className='monthBill' key={index}>
							<div className='date'>{maxMonth - index}月</div>
							<OneLineOverview pay={item.pay} income={item.income} />
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default BillAll;
