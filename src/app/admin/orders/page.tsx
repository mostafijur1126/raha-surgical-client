import { getOrders } from "@/lib/api/orders";

const OrdersPage = async () => {
  const data = await getOrders();
  console.log(data.data);
  return <div>OrdersPage</div>;
};

export default OrdersPage;
