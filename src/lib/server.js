import React from 'react';

const server =async({params})=>{
        const {id} =await params 
        const res=await fetch(`${process.env.NEXT_PUBLIC_URL}/products/${id}`,{
            method:"GET",
            headers:{
                "Content-Type":"application/json"
            },
            cache:"no-store"
        }) 
        
       
    const data=res.json()
    return data

      }
    return (
        <div>
            
        </div>
    );

export default server; 
