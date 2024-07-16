import {CapsuleTabs, DatePicker, Input, NavBar, Button} from 'antd-mobile';
import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import classNames from 'classnames';
import {useDispatch} from 'react-redux';
import dayjs from 'dayjs';

import Icon from '$c/Icon';
import {createBill} from '$sl/billSlice';
import {billListData} from '$u/billList';
import {useDate} from '$h/useDate';
import '$s/KeepAccount.scss';

const KeepAccounts = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [money, setMoney] = useState('');
	const [billType, setBillType] = useState('pay');
	const [selectedBillType, setSelectedBillType] = useState('');

	const {visible, dateText, showDate, hideDate, changeDate} = useDate();

	const saveBill = async () => {
		const m = money.replace(/e/g, '');
		if (!m) {
			return alert('请输入合法的金额！');
		}
		if (m[0] === '-') {
			if (billType === 'pay') {
				return alert('负支出请切换到收入！');
			} else {
				return alert('负收入请切换到支出！');
			}
		}
		if (!selectedBillType) {
			return alert('请从下方按钮选择这笔钱的用途！');
		}
		const data = {
			type: billType,
			money: +m * (billType === 'pay' ? -1 : 1),
			date:
				dateText === '今天' ? dayjs() : dayjs(`${dateText} ${dayjs().format('HH:mm:ss')}`),
			useFor: selectedBillType,
		};
		await dispatch(createBill(data));
		navigate('/bill');
	};

	const TypeList = () => {
		return billListData[billType].map((item) => (
			<div className='kaType' key={item.type}>
				<div className='title'>{item.name}</div>
				<div className='list'>
					{item.list.map((subItem) => (
						<div
							className={classNames(
								'item',
								selectedBillType === subItem.type && 'selected',
							)}
							key={subItem.type}
							onClick={() => setSelectedBillType(subItem.type)}>
							<div className='icon'>
								<Icon type={subItem.type} />
							</div>
							<div className='text'>{subItem.name}</div>
						</div>
					))}
				</div>
			</div>
		));
	};

	return (
		<div className='keepAccounts'>
			<NavBar className='nav' onBack={() => navigate(-1)}>
				记一笔
			</NavBar>
			<div className='header'>
				<div className='kaType'>
					<CapsuleTabs onChange={setBillType}>
						<CapsuleTabs.Tab title='支出' key='pay' />
						<CapsuleTabs.Tab title='收入' key='income' />
					</CapsuleTabs>
				</div>
				<div className='kaFormWrapper'>
					<div className='kaForm'>
						<div className='date' onClick={showDate}>
							<Icon type='calendar' />
							<span className='text'>{dateText}</span>
							<DatePicker
								className='kaDate'
								title='记账日期'
								visible={visible}
								onClose={hideDate}
								max={new Date()}
								onConfirm={changeDate}
							/>
						</div>
						<div className='kaInput'>
							<Input
								className='input'
								placeholder='0.00'
								type='number'
								value={money}
								onChange={setMoney}
							/>
							<span className='iconYuan'>¥</span>
						</div>
					</div>
				</div>
			</div>
			<div className='kaTypeList'>
				<TypeList />
			</div>
			<div className='btns'>
				<Button className='btn save' onClick={saveBill}>
					保存
				</Button>
			</div>
		</div>
	);
};

export default KeepAccounts;
