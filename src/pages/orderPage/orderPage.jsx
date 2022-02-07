import AccordionSupplier from '../../component/accordionSupplier/accordionSupplier';
import './orderPage.css';

const OrderPage = ({ order, setOrder, suppliers }) => {
	return (
		<div className="order_container">
			<h2 className="title">Supplier</h2>
			{suppliers.map((supplier) => {
				return <AccordionSupplier order={order} setOrder={setOrder} key={supplier.id} supplier={supplier} />;
			})}
		</div>
	);
};
export default OrderPage;
