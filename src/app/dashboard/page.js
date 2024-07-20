"use client";

import Layout from "@/components/Layout";;
import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";


export default function DashboardPage() {
  const [orders, setOrders] = useState(null);
  const [products, setProducts] = useState(null);
  const [categories, setCategories] = useState(null);
  const [admin , setAdmin] = useState(null);


  useEffect(() => {
    axios.get("/api/orders").then((response) => {
      setOrders(response.data?.orders);
    });
    axios.get("/api/products").then((response) => {
      setProducts(response.data?.productList);
    });
    axios.get("/api/categories").then((response) => {
      setCategories(response.data?.categories);
    });

    // get admin details
    axios.get("/api/admin/adminDetails").then((response) => {
      setAdmin(response.data?.admin);
    });

  }, []);


  return (
    <Layout>
      <div className="mx-4 space-y-8 mt-3">
        <div className="flex justify-between">
          <div>
            Hello, <span>{admin?.name}</span>
          </div>
          <div>
            <Image src={admin?.image} alt="image" />
          </div>
        </div>

        <div className="flex flex-col space-y-3 md:flex-row md:space-x-3 md:space-y-0">
          <div className="flex justify-between p-3 bg-blue-500 h-[80px] w-[100%] rounded-md ">
            <span className="text-xl font-semibold text-gray-800">Orders</span>
            <div className="flex items-end font-bold text-3xl text-sky-200">
              {orders?.length}
            </div>
          </div>
          <div className="flex justify-between p-3 bg-red-300 h-[80px] w-[100%] rounded-md ">
            <span className="text-xl font-semibold text-gray-800">
              Products
            </span>
            <div className="flex items-end font-bold text-3xl text-sky-800">
              {products?.length}
            </div>
          </div>
          <div className="flex justify-between p-3 bg-gray-500 h-[80px] w-[100%] rounded-md ">
            <span className="text-xl font-semibold text-gray-200">
              Categories
            </span>
            <div className="flex items-end font-bold text-3xl text-sky-100">
              {categories?.length}
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <span className="">Last 5 Orders</span>
          <div className="overflow-scroll">
            <table className="basic ">
              <thead>
                <tr>
                  <th>Ordered by</th>
                  <th>Date</th>
                  <th>Total</th>
                  <th>Paid</th>
                </tr>
              </thead>
              <tbody className="space-y-4">
                {orders &&
                  orders.map((order, idx) =>
                    idx < 5 ? (
                      <tr key={order._id}>
                        <td>{order?.name}</td>
                        <td>
                          {new Date(order?.createdAt).toLocaleDateString()}
                        </td>
                        <td>
                          {order.order_items.reduce(
                            (sum, item) =>
                              sum +
                              item.quantity * item["price_data"].unit_amount,
                            0
                          )}
                        </td>
                        <td>{ order.paid ? (
                          <span className=" text-green-900">Yes</span>
                        ):(
                          <span className=" text-red-900">No</span>
                        )}</td>
                      </tr>
                    ) : null
                  )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Layout>
  );
}
