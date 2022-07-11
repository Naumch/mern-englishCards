import React from "react";

function Navbar({ token, setToken }) {

  const logout = () => {
    setToken(null);
    localStorage.removeItem("userData")
  }

  return (
    <nav className="light-green lighten-2">
      <div className="nav-wrapper">
        <span className="brand-logo center teal-text text-darken-4">
          English words
        </span>
        {token 
          ? <div className="container">
              <ul id="nav-mobile" className="right">
                <li>
                  <button 
                    onClick={() => logout()}
                    className="waves-effect waves-light btn green"
                  >
                    Выйти
                  </button>
                </li>
              </ul> 
            </div>  
          : <></>
        }
      </div>
    </nav>
  )
}

export default Navbar;