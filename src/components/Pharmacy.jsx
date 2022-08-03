import { Button } from '@mui/material'
import React, { useState } from 'react'
import FirstPageIcon from '@mui/icons-material/FirstPage';
import LastPageIcon from '@mui/icons-material/LastPage';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';



const Pharmacy = () => {

const [data, setData] = useState([])
  const [sort, setSort] = useState(null)
  const [page, setPage] = useState(1)
  const [filter, setFilter] = useState("")


  useEffect(() => {
    fetchData()
  }, [page, sort, filter])

  const fetchData = () => {
    if (sort || filter) {
      fetch(`http://localhost:8080/products?q=pharmacy&_page=${page}&_sort=price&_order=${sort}&rating_like<${filter + 1}&rating_like=${filter}`)
        .then((res) => res.json()).then(res => setData(res))
    }
    else {
      fetch(`http://localhost:8080/products?q=grocery&_page=${page}`).then((res) => res.json()).then(res => setData(res))
    }
  }

  const handleSort = (sortType) => {
    console.log("inside handlesort")
    if (sortType === "asc") {
      (!sort) ? setSort("asc") : setSort(null)
    }
    if (sortType === "desc") {
      (!sort) ? setSort("desc") : setSort(null)
    }
  }

  return (
    <div className='product_container'>
      <h1>Pharmacy</h1>
      <br />
      <div className='buttonsDiv'>
        <div className="sort">
          <h3>Sort</h3>
          <Button onClick={() => handleSort("desc")} variant="contained">high to low</Button>
          <Button onClick={() => handleSort("asc")} variant="contained">low to high</Button>
        </div>
        <div className="filter">
          <h3>Filter</h3>
          <Button variant="contained" onClick={() => setFilter(1)}>1 to 2</Button>
          <Button variant="contained" onClick={() => setFilter(2)}>2 to 3</Button>
          <Button variant="contained" onClick={() => setFilter(3)}>3 to 4</Button>
          <Button variant="contained" onClick={() => setFilter(4)}>4 to 5</Button>
        </div>
      </div>
      {
        data.map((el) => (
            <div key={el.id} className="product_card" style={{backgroundColor:(el.hex)}}>
            <img src={`${el.imageBase}`} alt="image1" />
            <h2 style={{ color: "wheat", backgroundColor: "grey", padding: "10px" }}>{el.title}</h2>
            <div className='priceTag'>
              <h3>Rs {el.price}</h3>
              <h3 style={{ color: "green", backgroundColor: "pink", padding: "10px" }}>{el.rating}</h3>
            </div>
            <Link to={`/${el.id}`} ><Button variant="contained">view</Button></Link>
          </div>
        ))
      }
      <div style={{display:"flex",gap:"40px",height:"50px",alignItems:"center"}}><button disabled={page===1} onClick={() => setPage(page-1)}> <FirstPageIcon/> </button><h1>{page}</h1><button onClick={() => setPage(page+1)}> <LastPageIcon/> </button></div>
    </div>
  )
}

export default Pharmacy;