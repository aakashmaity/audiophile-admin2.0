"use client"

import Layout from "@/components/Layout";
import ProductForm from "@/components/ProductForm";
import { Loader } from "@/components/Reactspinner";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function EditProductPage({params}) {

    const [productInfo, setProductInfo] = useState(null);
    
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

    if(!productInfo){
        return <Loader/>
    }


    return (
        <Layout>
            <h2 className=" text-textWhite1 mb-4">Edit Product</h2>
            { productInfo && (
                <ProductForm {...productInfo}/>
            )}
        </Layout>
    )
}