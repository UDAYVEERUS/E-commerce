import { Button } from '@mui/material'
import React, { useEffect, useState } from 'react'
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';


const CartData = () => {
    const [data, setData] = useState([])

    const navigate = useNavigate()
    useEffect(() => {
        handleFetch()
    }, [])
    const handleFetch = () => {
        fetch(`http://localhost:8080/cartData`)
            .then((res) => res.json())
            .then((res) => setData(res))
            .catch((err) => console.log(err))
    }
    const handleDelete = (id) => {
        fetch(`http://localhost:8080/cartData/${id}`, {
            method: "DELETE"
        })
            .then((res) => res.json())
            .then((res) => { handleFetch() })
            .catch((err) => console.log(err))
    }
    let totPrice = 0
    const totalPrice = () => {
        for (let i = 0; i < data.length; i++) {
            totPrice = totPrice + (data[i].data.price) * (data[i].count)
        }
        return totPrice
    }
    totalPrice()



    // handle checkout 
    const handleCheckout = (data) => {
        let currentDate = new Date();
        let cDay = currentDate.getDate();
        let cMonth = currentDate.getMonth() + 1;
        let cYear = currentDate.getFullYear();
        const date = cDay + "/" + cMonth + "/" + cYear
        const time = currentDate.getHours() + ":" + currentDate.getMinutes() + ":" + currentDate.getSeconds();
        let arr = []
        for (var i = 0; i < data.length; i++) {
           let  obj={
                date,
                time,
                title:data[i].data.title,
                count:data[i].count,
                price:data[i].data.price
            }
          arr.push(obj)
        }
        const newData = {
           data:arr
        }

        fetch(`http://localhost:8080/history`, {
            method: "POST",
            body: JSON.stringify(newData),
            headers: {
                "content-Type": "application/json"
            }
        }).then((res) => res.json())
            .then((res) => navigate('/success'))
            .catch((err) => console.log(err))


    }
    return (
        <div>
            <h1>Cart Items</h1>
            {
                data.map((el) => (
                    <div key={el.id} className='cartdata'>
                        <div>
                            <h2>{el.data.title}</h2>
                            <p>{el.data.price}</p>
                        </div>
                        <div>
                            <h4>{el.count}</h4>
                        </div>
                        <div>
                            <h3>Rs.{el.data.price * el.count}</h3>
                        </div>

                        <Button onClick={() => handleDelete(el.id)} ><DeleteIcon /></Button>
                    </div>
                ))
            }
            <h3>Total Price : Rs.{totPrice}</h3>
            <Button variant="contained" onClick={() => handleCheckout(data)}  >Checkout</Button>
        </div>
    )
}

export default CartData