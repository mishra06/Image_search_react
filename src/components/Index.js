import React, { useState } from 'react'
import axios from 'axios';
import './Style.css'

const Index = () => {
    const [search,setSearch] = useState('');
    const [data,setData] = useState([]);
    const [page,setPage]=useState(18);
    const [display,setDisplay] = useState(true)


    async function SearchData(){
        try{
            const res = await axios.get(
                `https://api.unsplash.com/search/photos?page=${page}&query=${search}&client_id=gAkMPA_j3hqczVPCtI-ugjPWET8AzNXkcjb6pcH1tk4&per_page=${page}`
            );
            console.log(res.data.results);
            setData(res.data.results);
        }catch{}
        
    }
  return (
    <div>
      <div className="container">
        <h1>Image App</h1>
        <br />
        <input placeholder='Search Image.....!' type="text" onChange={(e)=>{
            setSearch(e.target.value);
        }}/>
        <button className='btn' onClick={SearchData}>Search</button>
        {display ? (
          <div className="cards">
            {data.map((e) => {
              return (
                <div className="card" key={e.id}>
                  <img src={e.urls.small} alt="" />
                </div>
              );
            })}
          </div>
        ) : (
          ""
        )}
        <button
          className='more_img'
          onClick={() => {
            setPage((prev) => prev + 10);
            SearchData();
            setDisplay(true);
          }}
        >
          Load More
        </button>
      </div>
    </div>
  )
}

export default Index
