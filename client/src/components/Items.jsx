import React, { useState } from "react";
import styled from "styled-components";

const FieldEdit = styled.div`
  display: ${props => props.editId === props.id ? "block" : "none"};
  border-left: 1px solid #e0e0e0; 
  padding-left: 20px;
`;

const FieldContent = styled.div`
  display: ${props => props.editId && props.editId === props.id ? "none" : "block"};
  border-left: 1px solid #e0e0e0; 
  padding-left: 20px;
`;

function Items({ cards, setCards, deleteCard, editCard, editCheckedCard }) {
  const [editId, setEditId] = useState(null);

  function getValue(prop) {
    return cards.reduce((res, card) => card._id === editId ? card[prop] : res, '');
  }

  function changeItem(prop, event) {
    setCards(cards.map(card =>
      card._id === editId ? {...card, [prop]: event.target.value} : card
    ));
  }
  
  const items = cards.map(card => {
    return (
      <li className="collection-item avatar valign-wrapper" key={card._id}>
        <i className="material-icons circle light-green lighten-1">grade</i>
        <FieldEdit editId={editId} id={card._id}>
          <input value={getValue("word")} onChange={event => changeItem('word', event)}/>
          <input value={getValue("translation")} onChange={event => changeItem('translation', event)}/>
          <a 
            style={{fontSize: ".8rem"}}
            href="/" 
            onClick={event => {
              event.preventDefault();
              editCard(editId);
              setEditId(null);
            }} 
          >
            Сохранить изменения...
          </a>
        </FieldEdit>
        <FieldContent editId={editId} id={card._id}>
          <label>
            <input 
              type="checkbox" 
              className="filled-in" 
              checked={card.checked}
              onChange={() => editCheckedCard(card._id, card.checked)}
            />
            <span 
              className="title teal-text text-darken-4" 
              style={{fontSize: "2rem"}}
            >
              {card.word}
            </span>
            <p style={{paddingLeft: "35px", fontSize: "1.2rem", color: "black"}}>
              {card.translation}<br />
              <a 
                style={{fontSize: ".8rem"}}
                href="/" 
                onClick={event => {
                  event.preventDefault();
                  setEditId(card._id);
                }} 
              >
                Редактировать...
              </a>
            </p>
          </label>
        </FieldContent>
        <a href="/" className="secondary-content" onClick={event => {
          event.preventDefault();
          deleteCard(card._id);
        }}>
          <i className="material-icons red-text">delete</i>
        </a>
      </li>
    )
  })

  return (
    [items]
  )
}

export default Items;