import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import StarIcon from '@mui/icons-material/Star';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { Button } from '@mui/material'


const ProductDetail = () => {
  const [count, setCount] = useState(1)
  const [data, setData] = useState([])
  const param = useParams();
  const id = param.id;


  useEffect(() => {
    handleFetch()
  }, [handleFetch])

  // fetch data
  const handleFetch = () => {
    fetch(`http://localhost:8080/products?id=${id}`)
      .then((res) => res.json())
      .then((res) => setData(res))
      .catch((err) => console.log(err))
  }

  // handle cart 
  const handleAddToCart = (data,count) => {
    ``
    const newData = {
      data:data[0],
      count
    }
    fetch(`http://localhost:8080/cartData`, {
      method: "POST",
      body: JSON.stringify(newData),
      headers: {
        "content-Type": "application/json"
      }
    }).then((res) => res.json())
      .then((res) => alert("added successfully"))
      .catch((err) => console.log(err))
  }
  return (
    <div className='product_container' style={{ marginTop: "20px" }}>
      {
        data.map((el) => (

          <div key={el.id} className="product_card" style={{ backgroundColor: (el.hex), color: "lightBlue", textAlign: "left" }}>

            <h2 style={{ color: "wheat", backgroundColor: "grey", padding: "10px" }}>{el.title}</h2>
            <div className='priceTag'>
              <h3>Rs {el.price}</h3>
              <h3 style={{ color: "green", backgroundColor: "pink", padding: "10px" }}>{el.rating}<StarIcon /></h3>
            </div>
            <p ><b style={{ color: "black" }}>Description:</b> {el.description}</p>
            <p ><b style={{ color: "black" }}>Category:</b> {el.category}</p>
            <Button variant="contained"  onClick={() => handleAddToCart(data,count)}>Add to cart</Button>
            <div style={{ display: "flex", gap: "40px", height: "50px", alignItems: "center" }}><button disabled={(count === 0)} onClick={() => setCount(count - 1)}> <RemoveIcon /> </button><h1>{count}</h1><button onClick={() => setCount(count + 1)}> <AddIcon /> </button></div>
          </div>

        ))
      }
    </div>
  )
}

export default ProductDetail