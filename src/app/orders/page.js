"use client";

import Layout from "@/components/Layout";
import axios from "axios";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);


  useEffect(() => {
    async function fetchOrders() {
      try {
        const res = await axios.get("/api/orders");
        setOrders(res.data?.orders);
      } catch (error) {
        toast.error(error.response?.data?.message);
        console.error(error);
      }
    }
    fetchOrders();
  }, []);

  return (
    <Layout>
    <div className="mx-0 space-y-4">
      <div className="flex justify-between items-center mx-4">
        <h1 className="p-0 m-0">Orders</h1>
      </div>

      <div className="overflow-scroll">
        <table className="basic">
          <thead>
            <tr>
              <th>Date</th>
              <th>Paid</th>
              <th>Recipient</th>
              <th>Products</th>
              {/* <th>Status</th> */}
            </tr>
          </thead>
          <tbody>
            {orders?.length > 0 &&
              orders.map((order) => (
                <tr key={order._id}>
                  <td>{new Date(order?.createdAt).toLocaleString()}</td>
                  <td
                    className={order.paid ? "text-green-600" : "text-red-600"}
                  >
                    {order.paid ? "YES" : "NO"}
                  </td>
                  <td>
                    {order?.name}
                    <br />
                    {order?.city} {order?.pincode}
                    <br />
                    {order?.country}
                    <br />
                    {order?.address}
                  </td>
                  <td>
                    {order.order_items.map((item) => (
                      <div key={item.product_data.name}>
                        {item?.product_data.name} X {item.quantity}
                        <br />
                      </div>
                    ))}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      <Toaster />
      </div>
    </Layout>
  );
}
