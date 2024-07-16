import {memo, useMemo} from 'react';
import PropTypes from 'prop-types';

import '$s/TwoLineOverview.scss';

const TwoLineOverview = memo((props) => {
	const pay = useMemo(() => Math.abs(props.pay).toFixed(2), [props.pay]);
	const income = useMemo(() => props.income.toFixed(2), [props.income]);
	const balance = useMemo(() => (props.income + props.pay).toFixed(2), [props.income, props.pay]);

	return (
		<div className='twoLineOverview'>
			<div className='item'>
				<span className='money'>{pay}</span>
				<span className='type'>支出</span>
			</div>
			<div className='item'>
				<span className='money'>{income}</span>
				<span className='type'>收入</span>
			</div>
			<div className='item'>
				<span className='money'>{balance}</span>
				<span className='type'>结余</span>
			</div>
		</div>
	);
});

TwoLineOverview.displayName = 'TwoLineOverview';
TwoLineOverview.propTypes = {
	pay: PropTypes.number.isRequired,
	income: PropTypes.number.isRequired,
};

export default TwoLineOverview;
