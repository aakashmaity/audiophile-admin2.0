"use client"

import Layout from "@/components/Layout";
import ProductForm from "@/components/ProductForm";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function EditProductPage({params}) {

    const [productInfo, setProductInfo] = useState(null)
    const router = useRouter()
    
    async function getProductDetails (){
        try {
            const id = params.id
            const response = await axios.get(`/api/products/${id}`)
            setProductInfo(response.data?.product)
        } catch (error) {
            console.error(error)
        }
    }
    
    useEffect(() => {
        getProductDetails();
    },[])


    return (
        <Layout>
            <h2>Edit Product Page</h2>
            { productInfo && (
                <ProductForm {...productInfo}/>
            )}
        </Layout>
    )
}