import React from "react";

function CheckboxAll({ checked, setChecked, editChecked }) {
  return (
    <label>
      <input 
        type="checkbox" 
        className="filled-in" 
        checked={checked}
        onChange={() => {
          setChecked(!checked);
          editChecked(checked);
        }}
      />
      <span>Отметить все слова</span>
    </label>
  )
}

export default CheckboxAll;