import {TabBar} from 'antd-mobile';
import {Outlet, useLocation, useNavigate} from 'react-router-dom';
import {BillOutline, CalculatorOutline, AddCircleOutline} from 'antd-mobile-icons';

import '$s/Layout.scss';

const tabs = [
	{
		key: '/keep',
		title: '记账',
		icon: <AddCircleOutline />,
	},
	{
		key: '/bill',
		title: '月度账单',
		icon: <BillOutline />,
	},
	{
		key: '/bill/year',
		title: '年度账单',
		icon: <CalculatorOutline />,
	},
];

const Layout = () => {
	const location = useLocation();
	const navigate = useNavigate();
	return (
		<div className='kaLayout'>
			<div className='page'>
				<Outlet />
			</div>
			<TabBar className='tabbar' activeKey={location.pathname} onChange={navigate}>
				{tabs.map((item) => (
					<TabBar.Item key={item.key} icon={item.icon} title={item.title} />
				))}
			</TabBar>
		</div>
	);
};

export default Layout;
