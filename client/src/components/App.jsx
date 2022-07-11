import React, {useState, useEffect} from "react";
import Auth from "./Auth";
import Navbar from "./Navbar";
import Table from "./Table";
import axios from "axios";
import "../index.css";

function App() {
  const [token, setToken] = useState(localStorage.getItem("userData"));
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    const response = async () => {
      setLoading(true);
      const result = await axios.get(`/words`, {headers: {
        Authorization: `Bearer ${localStorage.getItem("userData")}`}}
      );

      setLoading(false);  
      setCards(result.data);
    };

    response();
  }, [token]);
  
  return (
    <>
      <Navbar token={token} setToken={setToken} />
      <div className="container">
        {token 
          ? <Table cards={cards} setCards={setCards} token={token} loading={loading}/> 
          : <Auth setToken={setToken} />}
      </div>
    </>
  );
}

export default App;
