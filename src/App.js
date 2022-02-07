import { useState, useEffect } from 'react';
import axios from 'axios';
import ManageOrders from './pages/manageOrder/manageOrders';
import OrderPage from './pages/orderPage/orderPage';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

function App() {
	const [suppliers, setSuppliers] = useState([]);
	const [order, setOrder] = useState([]);

	const getSuppliers = async () => {
		const result = await axios('../data/suppliers.json');
		const supplierData = result.data;
		setSuppliers(supplierData);
	};
	useEffect(() => {
		getSuppliers();
	}, []);
	return (
		<div className="App">
			<Router>
				<Switch>
					<Route path="/manage-order">
						<ManageOrders suppliers={suppliers} />
					</Route>
					<Route path="/">
						<OrderPage suppliers={suppliers} order={order} setOrder={setOrder} />
					</Route>
				</Switch>
			</Router>
		</div>
	);
}

export default App;
