import {useState, useMemo} from 'react';
import dayjs from 'dayjs';
import isToday from 'dayjs/plugin/isToday';

dayjs.extend(isToday);

const useDate = (d = new Date()) => {
	const [date, setDate] = useState(d);
	const [visible, setVisible] = useState(false);
	const showDate = () => setVisible(true);
	const hideDate = () => setVisible(false);
	const changeDate = setDate;

	const dayjsDate = useMemo(() => dayjs(date), [date]);
	const dateText = useMemo(
		() => (dayjsDate.isToday() ? '今天' : dayjsDate.format('YYYY/MM/DD')),
		[dayjsDate],
	);

	return {
		date: dayjsDate,
		dateText,
		visible,
		showDate,
		hideDate,
		changeDate,
	};
};

export {useDate};
