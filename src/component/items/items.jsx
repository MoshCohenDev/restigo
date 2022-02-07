import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Item from '../item/item';
import { TableRow, Table, TableHead, TableContainer, TableCell } from '@mui/material';
import './items.css';

const Items = ({ id, addItem, removeItem }) => {
	const [items, setItems] = useState([]);
	const getItems = async () => {
		const results = await axios('../data/items.json');
		let itemsData = results.data.filter((itemFilter) => itemFilter.supplier_id === id);
		setItems(itemsData);
	};
	useEffect(() => {
		getItems();
	}, []);

	return (
		<div className="items_container">
			<TableContainer>
				<Table>
					<TableHead>
						<TableRow>
							<TableCell></TableCell>
							<TableCell></TableCell>
							<TableCell></TableCell>
							<TableCell className="title" align="center">
								מספר סידורי
							</TableCell>
							<TableCell className="title" align="center">
								שם המוצר
							</TableCell>
							<TableCell className="title" align="center">
								הפקדה
							</TableCell>
							<TableCell className="title" align="center">
								מחיר
							</TableCell>
							<TableCell className="title" align="center">
								יחידה
							</TableCell>
							<TableCell className="title" align="center"></TableCell>
						</TableRow>
					</TableHead>
					{!items
						? 'item not exits'
						: items.map((item) => {
								return <Item removeItem={removeItem} addItem={addItem} key={item.name} dataItem={item} />;
						  })}
				</Table>
			</TableContainer>
		</div>
	);
};

export default Items;
