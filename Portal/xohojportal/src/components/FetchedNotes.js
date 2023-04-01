import axios from 'axios';
import { useEffect, useInsertionEffect, useState } from "react";

function FetchedNotes() {
  const [data, setData] = useState([]);

  useEffect(() => {

  //   fetch("http://192.168.247.28:8002/api/notes")
  // .then((response) => response.json())
  // .then((data) => console.log(data));

    const getData = async () => {
      const response =await axios.get('http://192.168.247.28:8002/api/notes/')
      console.log(response.data);
    }

   getData()
   
   

  }, []);



  return (
    <>
    <ul>
      {data.map(item => (
        <li key={item.id}>{item.name}</li>
      ))}
    </ul>
    </>
  );
}

export default FetchedNotes;
