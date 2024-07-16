import {memo, useState, useMemo, useCallback} from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import Icon from '$c/Icon';
import OneLineOverview from '$c/OneLineOverview';
import {billTypeToName} from '$u/billList';
import '$s/DailyBill.scss';

const DailyBill = memo((props) => {
	const [expand, setExpand] = useState(true);

	const toggleExpand = useCallback(() => {
		setExpand((expand) => !expand);
	}, []);

	const oneLineOverview = useMemo(() => {
		return <OneLineOverview pay={props.overview.pay} income={props.overview.income} />;
	}, [props.overview.pay, props.overview.income]);

	const billList = useMemo(() => {
		return props.billList.map((item) => (
			<div className='bill' key={item.id}>
				<div className='icon'>
					<Icon type={item.useFor} />
				</div>
				<div className='detail'>
					<div className='billType'>{billTypeToName[item.useFor]}</div>
				</div>
				<div className={classNames('money', item.type)}>
					{Number(item.money).toFixed(2)}
				</div>
			</div>
		));
	}, [props.billList]);

	return (
		<div className={classNames('dailyBill', expand && 'expand')}>
			<div className='header'>
				<div className='dateIcon' onClick={toggleExpand}>
					<span className='date'>{props.dateText}</span>
					<span className={classNames('arrow', expand && 'expand')}></span>
				</div>
				{oneLineOverview}
			</div>
			<div className='billList'>{billList}</div>
		</div>
	);
});

DailyBill.displayName = 'DailyBill';
DailyBill.propTypes = {
	dateText: PropTypes.string.isRequired,
	overview: PropTypes.shape({
		pay: PropTypes.number.isRequired,
		income: PropTypes.number.isRequired,
	}).isRequired,
	billList: PropTypes.array.isRequired,
};

export default DailyBill;
