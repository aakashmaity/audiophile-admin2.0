"use client"

import Layout from "@/components/Layout";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function DeleteProductPage ({params}) {
    
    const [productInfo,setProductInfo] = useState()
    const router = useRouter()
    const id = params.id

    useEffect(() => {
        if(!id){
            return
        }
        axios.get('/api/products/'+id).then(res => {
            setProductInfo(res.data?.product)
        })

    },[id])
    async function deleteProduct(){
        await axios.delete('/api/products/'+id)
        goback();
    }
    function goback(){
        router.push('/products')
    }
    return(
        <Layout>
            <h2 className=" text-center my-2">Do you really want to delete : {productInfo?.title}</h2>
            <div className=" flex gap-2 justify-center">
                <button onClick={deleteProduct} className="btn-red">Yes</button>
                <button onClick={goback} className=" btn-default">No</button>
            </div>
        </Layout>
    )
}