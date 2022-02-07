import { useState } from 'react';
import { Button, Dialog, Grid, DialogContent, DialogTitle, Typography } from '@mui/material';
import { makeStyles } from '@material-ui/core';
import InfoIcon from '@mui/icons-material/Info';
import './dialogOrder.css';
const useStyles = makeStyles({
	rootDialog: {
		overflow: 'hidden',
		textAlign: 'center',
		width: '40%',
	},
	button: {
		minWidth: '22px',
	},
});
function DialogOrder({ totalPrice, items }) {
	const classes = useStyles();

	const [open, setOpen] = useState(false);
	const handleClose = () => {
		setOpen(false);
	};
	return (
		<div>
			<Button className={classes.button} onClick={() => setOpen(true)}>
				<Grid item xs={8}>
					<InfoIcon fontSize="medium" />
				</Grid>
			</Button>
			<Dialog classes={{ paper: classes.rootDialog }} open={open} onClose={handleClose}>
				<DialogTitle>פרטי הזמנה</DialogTitle>
				<DialogContent>
					{items.length > 0 &&
						items.map((itemDraft) => {
							return (
								<div key={itemDraft.name} className="order_summary">
									<span className="order_quantity">כמות: {itemDraft.quantity}</span>
									<span>שם:{itemDraft.name}</span>
									<span>מחיר:{itemDraft.price}</span>
								</div>
							);
						})}
				</DialogContent>
				<Typography>{totalPrice}₪</Typography>
			</Dialog>
		</div>
	);
}

export default DialogOrder;
