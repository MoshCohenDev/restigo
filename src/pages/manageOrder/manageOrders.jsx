import React, { useEffect, useState } from 'react';
import {
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Paper,
	InputLabel,
	MenuItem,
	FormControl,
	Select,
	Box,
	TextField,
} from '@mui/material';
import './manageOrders.css';
import DialogOrder from '../../component/dialogOrder/dialogOrder';

const ManageOrders = ({ suppliers }) => {
	const [orders, setOrders] = useState([]);
	const [filterItems, setFilterItems] = useState([]);

	const searchOrder = (e) => {
		let filterOrder;
		if (e === '') {
			filterOrder = orders;
			setFilterItems(filterOrder);
		} else {
			filterOrder = orders.filter(({ orderNumber }) => {
				return orderNumber.toString().includes(e);
			});
			setFilterItems(filterOrder);
		}
	};

	const handleChange = (event) => {
		let filterData;
		if (event === '') {
			filterData = orders;
			setFilterItems(filterData);
		} else {
			filterData = orders.filter(({ supplierId }) => {
				return supplierId.toString().includes(event);
			});
		}
		setFilterItems(filterData);
	};

	const getData = async () => {
		const data = await JSON.parse(localStorage.getItem('orders'));
		setOrders(data);
		setFilterItems(data);
	};
	useEffect(() => {
		getData();
	}, []);
	const headers = ['מספר הזמנה ', 'תאריך', 'שעה', 'מחיר הזמנה', 'מספר לקוח', 'פרטי הזמנה'];
	return (
		<div className="manage_container">
			<h2 className="title">manage order</h2>
			<Box
				component="form"
				className="box"
				sx={{
					'& > :not(style)': { m: 1, width: '25ch' },
				}}
				autoComplete="on"
			>
				<FormControl fullWidth>
					<InputLabel id="demo-simple-select-label">ספק</InputLabel>
					<Select
						value={''}
						labelId="demo-simple-select-label"
						id="demo-simple-select"
						label="ספק"
						onChange={(e) => handleChange(e.target.value)}
					>
						{suppliers.map((supplier) => {
							return (
								<MenuItem key={supplier.name} value={supplier.id}>
									{supplier.name}
								</MenuItem>
							);
						})}
					</Select>
				</FormControl>
				<TextField
					onChange={(e) => searchOrder(e.target.value)}
					id="outlined-basic"
					label="מספר הזמנה"
					variant="outlined"
					type="number"
				/>
			</Box>
			<TableContainer component={Paper}>
				<Table sx={{ minWidth: 650 }} aria-label="simple table">
					<TableHead>
						<TableRow>
							{headers.map((header) => {
								return (
									<TableCell key={header} align="center">
										{header}
									</TableCell>
								);
							})}
						</TableRow>
					</TableHead>
					{filterItems &&
						filterItems.map((orderData) => {
							return (
								<TableBody key={orderData.orderNumber}>
									<TableRow sx={{ '&:last-child td, &:last-child th': { border: 1 } }}>
										<TableCell align="center">{orderData.orderNumber}</TableCell>
										<TableCell align="center">
											<div style={{ direction: 'rtl' }}>{orderData.date}</div>
										</TableCell>
										<TableCell align="center">{orderData.time || '--'}</TableCell>
										<TableCell align="center">₪{orderData.totalPrice}</TableCell>
										<TableCell align="center">{orderData.costumerNumber}</TableCell>
										<TableCell align="center">
											<DialogOrder totalPrice={orderData.totalPrice} items={orderData.items} />
										</TableCell>
									</TableRow>
								</TableBody>
							);
						})}
				</Table>
			</TableContainer>
		</div>
	);
};

export default ManageOrders;
