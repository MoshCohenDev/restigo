import React from 'react';
import { useState } from 'react';
import './item.css';
import { Button } from '@mui/material';
import { TableRow, TableCell, TableBody } from '@mui/material';
import RemoveOutlinedIcon from '@mui/icons-material/RemoveOutlined';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';

const Item = ({ dataItem, addItem, removeItem }) => {
	const [quantity, setQuantity] = useState(0);
	const addQuantity = (data) => {
		data.quantity = quantity;
		addItem(data);
		setQuantity(quantity + 1);
	};
	const removeQuantity = (data) => {
		if (quantity === 0) return;
		removeItem(data);
		setQuantity(quantity - 1);
	};

	return (
		<TableBody>
			<TableRow sx={{ '&:last-child td': { border: 2 } }}>
				<TableCell align="center" component="th">
					<Button onClick={() => removeQuantity(dataItem)}>
						<RemoveOutlinedIcon></RemoveOutlinedIcon>
					</Button>
				</TableCell>
				<TableCell align="center" component="th" scope="row">
					{quantity}
				</TableCell>
				<TableCell align="center" component="th">
					<Button onClick={() => addQuantity(dataItem)}>
						<AddCircleOutlineOutlinedIcon></AddCircleOutlineOutlinedIcon>
					</Button>
				</TableCell>
				<TableCell align="center" component="th">
					{dataItem.catalog_number}
				</TableCell>
				<TableCell align="center" component="th">
					{dataItem.name}
				</TableCell>
				<TableCell align="center" component="th" scope="row">
					{dataItem.deposit}
				</TableCell>
				<TableCell align="center" component="th" scope="row">
					{dataItem.price}
				</TableCell>
				<TableCell align="center" component="th" scope="row">
					{dataItem.scale}
				</TableCell>
			</TableRow>
		</TableBody>
	);
};

export default Item;
