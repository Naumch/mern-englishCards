import React, { useState } from "react";
import axios from "axios";

function InputsSave({ token, setCards, cards }) {
  const [word, setWord] = useState("");
  const [translation, setTranslation] = useState("");

  const saveCard = async (word, translation) => {
    try {
      const response = await axios.post(`/words/add`, {word, translation}, {headers: {
        Authorization: `Bearer ${token}`}
      });

      setCards([...cards, response.data]);
      setWord("");
      setTranslation("");
    } catch (e) {
      window.M.toast({html: e.response.data.message});
    }
  }

  return (
    <div style={{marginTop: "20px"}}>
      <div className="row">
        <div className="input-field">
          <input
            id="word"
            type="text"
            name="word"
            className="validate"
            onChange={e => setWord(e.target.value)}
            value={word}
          />
          <label htmlFor="word">Введите слово на английском...</label>
        </div>
        <div className="input-field">
          <input 
            id="translation"
            type="text"
            name="translation"
            className="validate"
            onChange={e => setTranslation(e.target.value)}
            value={translation}
          />
          <label htmlFor="translation">Введите перевод...</label>
        </div>
        <button 
          onClick={() => saveCard(word, translation)}
          className="waves-effect waves-light btn green"
        >
          Добавить
        </button>
      </div>
    </div>
  )
}

export default InputsSave;