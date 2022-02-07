import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Box from '@mui/material/Box';
import { List, ListItem, Typography, Divider } from '@mui/material';
import { Button, Input } from '@mui/material';
import ListItemText from '@mui/material/ListItemText';
import './sideDraft.css';

export default function SideDraft({ draftData, order, setOrder, supplier }) {
	const [totalPrice, setTotalPrice] = useState(0);
	const [date, setDate] = useState('');
	const [time, setTime] = useState('');
	let history = useHistory();

	const getTotalPrice = () => {
		let sum = 0;
		const newTotal = draftData.map((product) => {
			return (sum += product.price * product.quantity);
		});
		setTotalPrice(parseInt(sum));
	};
	const handle = () => {
		let order = {
			items: draftData.slice(),
			costumerNumber: supplier.costumer_number,
			date: date,
			time: time,
			supplierId: draftData[0].supplier_id,
			totalPrice: totalPrice,
			orderNumber: new Date().getTime(),
		};
		let orders = [];
		orders = JSON.parse(localStorage.getItem('orders'));
		if (orders == null) {
			orders = [];
			orders.push(order);
			localStorage.setItem('orders', JSON.stringify(orders));
		} else {
			orders.push(order);
			localStorage.setItem('orders', JSON.stringify(orders));
		}

		setOrder(order);
		history.push('/manage-order');
	};
	useEffect(() => {
		getTotalPrice();
	}, [draftData]);

	return (
		<Box className={draftData.length > 0 ? 'draft' : 'draft_none'}>
			<Typography sx={{ fontSize: 'h6.fontSize', border: '2px solid', padding: '4px' }}>{supplier.name}</Typography>
			<hr />
			{draftData.length > 0 &&
				draftData.map((itemDraft) => {
					return (
						<div key={itemDraft.name}>
							<List>
								<ListItem style={{ textAlign: 'right' }}>
									<ListItemText primary={itemDraft.name} />
									<ListItemText primary={itemDraft.price} />
									<ListItemText primary={itemDraft.quantity} />
								</ListItem>
							</List>
						</div>
					);
				})}
			<h5>{supplier.mim_order}</h5>
			<p>{totalPrice} ₪</p>
			<p>מינימום הזמנה :{supplier?.min_order} </p>

			<Input
				type="date"
				onChange={(e) => {
					setDate(e.target.value);
				}}
			/>
			<br />
			<Input
				onChange={(e) => {
					setTime(e.target.value);
				}}
				type="time"
			/>
			<br />
			<Button
				variant="contained"
				onClick={() => {
					handle();
				}}
				disabled={totalPrice < supplier.min_order || time === '' || date === ''}
			>
				<h3>שלח</h3>
			</Button>
		</Box>
	);
}
