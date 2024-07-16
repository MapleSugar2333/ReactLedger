import {memo, useMemo} from 'react';
import PropTypes from 'prop-types';

import '$s/OneLineOverview.scss';

const OneLineOverview = memo((props) => {
	const pay = useMemo(() => Math.abs(props.pay).toFixed(2), [props.pay]);
	const income = useMemo(() => props.income.toFixed(2), [props.income]);
	const balance = useMemo(() => (props.income + props.pay).toFixed(2), [props.income, props.pay]);

	return (
		<div className='oneLineOverview'>
			<div className='pay'>
				<span className='type'>支出</span>
				<span className='money'>{pay}</span>
			</div>
			<div className='income'>
				<span className='type'>收入</span>
				<span className='money'>{income}</span>
			</div>
			<div className='balance'>
				<span className='money'>{balance}</span>
				<span className='type'>结余</span>
			</div>
		</div>
	);
});

OneLineOverview.displayName = 'OneLineOverview';
OneLineOverview.propTypes = {
	pay: PropTypes.number.isRequired,
	income: PropTypes.number.isRequired,
};

export default OneLineOverview;
