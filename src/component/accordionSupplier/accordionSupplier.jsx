import { useState } from 'react';
import { Accordion, AccordionSummary, AccordionDetails, Typography, Paper } from '@mui/material/';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Items from '../items/items';
import Grid from '@mui/material/Grid';
import SideDraft from '../draftData/sideDraft';

const AccordionSupplier = ({ supplier, setOrder, order }) => {
	const [draftData, setDraftData] = useState([]);

	const addItem = (item) => {
		const checkToAdd = checkIfExits(item);
		if (!checkToAdd) {
			item.quantity += 1;
			setDraftData([...draftData, item]);
		} else {
			const newItem = [...draftData];
			newItem[item] = item.quantity += 1;
			setDraftData(newItem);
		}
	};
	const removeItem = (item) => {
		const checkRemove = checkIfExits(item);
		if (checkRemove.quantity > 1) {
			const newItemRemove = [...draftData];
			newItemRemove[item] = item.quantity -= 1;
			setDraftData(newItemRemove);
		} else {
			const newDraft = draftData.filter((t) => t !== item);
			setDraftData(newDraft);
		}
	};

	const checkIfExits = (item) => {
		const found = draftData.find((itemFind) => itemFind.catalog_number === item.catalog_number);
		return found;
	};

	return (
		<Grid container spacing={2}>
			<Grid item xs={draftData.length > 0 ? 8 : 12}>
				<Accordion component={Paper} key={supplier.id}>
					<AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
						<Typography sx={{ width: '20%', flexShrink: 0 }}>{supplier.id}</Typography>
						<Typography sx={{ width: '20%', flexShrink: 0 }}>
							<img src={supplier.logo} style={{ height: '2rem' }} />
						</Typography>
						<Typography sx={{ width: '30%', flexShrink: 0 }}>{supplier.name}</Typography>
						<Typography sx={{ width: '20%', flexShrink: 0 }}>{supplier.costumer_number}</Typography>
						<Typography sx={{ width: '20%', flexShrink: 0 }}>{supplier.min_order}</Typography>
					</AccordionSummary>
					<AccordionDetails>
						<Items removeItem={removeItem} addItem={addItem} id={supplier.id} />
					</AccordionDetails>
				</Accordion>
			</Grid>
			<Grid item xs={4}>
				<SideDraft supplier={supplier} draftData={draftData} setOrder={setOrder} order={order} />
			</Grid>
		</Grid>
	);
};
export default AccordionSupplier;
