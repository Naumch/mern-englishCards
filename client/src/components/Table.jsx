import React, {useState} from "react";
import InputsSave from "./InputsSave";
import CheckboxAll from "./CheckboxAll";
import Items from "./Items";
import axios from "axios";

function Table({ cards, setCards, token, loading }) {
  const [checked, setChecked] = useState(false);

  const deleteCard = async (_id) => {
    try {
      const response = await axios.delete(`/words/delete/${_id}`, {headers: {
        Authorization: `Bearer ${token}`}
      });
      setCards(cards.filter(card => card._id !== response.data._id));
    } catch (e) {
      window.M.toast({html: e.response.data.message});
    }
  }

  const editCard = async (_id) => {
    try {
      const result = cards.filter(card => card._id === _id);
      const word = result[0].word;
      const translation = result[0].translation;

      const response = await axios.post(`/words/edit/${_id}`, {word, translation}, {headers: {
        Authorization: `Bearer ${token}`}
      });
      setCards(cards.map(card => card._id === response.data._id ? response.data : card));
    } catch (e) {
      window.M.toast({html: e.response.data.message});
    }
  }

  const editCheckedCard = async (_id, checked) => {
    try {
      const response = await axios.post(`/words/edit/checked/${_id}`, {checked}, {headers: {
        Authorization: `Bearer ${token}`}
      });

      setCards(cards.map(card => card._id === response.data._id ? response.data : card));
    } catch (e) {
      window.M.toast({html: e.response.data.message});
    }
  }

  const editChecked = async (checked) => {
    try {
      const response = await axios.post(`/words/edit/checked/`, {checked}, {headers: {
        Authorization: `Bearer ${token}`}
      });

      const cards = response.data;
      setCards(cards);
    } catch (e) {
      window.M.toast({html: e.response.data.message});
    }
  }

  return (
    <>
      {loading 
        ? <div className="progress">
            <div className="indeterminate"></div>
          </div>
        : <>
          <InputsSave token={token} setCards={setCards} cards={cards}/>
          <CheckboxAll checked={checked} setChecked={setChecked} editChecked={editChecked}/>
          <ul className="collection">
            <Items 
              cards={cards}
              setCards={setCards}
              deleteCard={deleteCard}
              editCard={editCard}
              editCheckedCard={editCheckedCard}
            />
          </ul>
        </>
      }
    </>
  )
}

export default Table;