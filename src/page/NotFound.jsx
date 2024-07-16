import {useEffect} from 'react';
import {Modal, AutoCenter} from 'antd-mobile';

const NotFound = () => {
	return useEffect(() => {
		Modal.alert({
			title: <AutoCenter>{'您所访问的页面不存在'}</AutoCenter>,
			content: <AutoCenter>{'请检查输入后重试！'}</AutoCenter>,
			onConfirm: () => history.back(),
		});
	}, []); // 仅组件加载时执行一次
};

export default NotFound;
