import {memo} from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

const Icon = memo((props) => {
	return (
		<img
			onClick={props.onClick}
			className={classNames('icon', props.className)}
			src={`/img/${props.type}.svg`}
			alt='icon'
		/>
	);
});

Icon.displayName = 'Icon';
Icon.propTypes = {
	onClick: PropTypes.func,
	className: PropTypes.string,
	type: PropTypes.string.isRequired,
};

export default Icon;
