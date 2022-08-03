import React, { useEffect, useState } from 'react'

const History = () => {
    const [data,setData] = useState([])
    useEffect(() => {
        handleFetch()
    },[])
    const handleFetch = () => {
        fetch(`http://localhost:8080/history`)
        .then(res => res.json())
        .then(res => setData(res))
    }
    if(data){
      console.log(data)
    }
  return (
    <div>
      {
        (data.length === 0)?<div><h1>No prior history</h1><br /><p>Buy Something</p></div>:data.map((el) => (
          el.data.map((e) => (
            <div key={e.id} className='cartdata'>
                        <div>
                            <h2>{e.title}</h2>
                            <p>{e.price}</p>
                        </div>
                        <div>
                            <h4>{e.count}</h4>
                        </div>
                        <div>
                            <h3>Rs.{e.price * e.count}</h3>
                        </div>

                        <h3>{e.date}</h3>
                        <h3>{e.time}</h3>
                    </div>
            ) )
        ))
     
        }
      
    </div>
  )
}

export default History