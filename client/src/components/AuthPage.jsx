import React from "react";

function AuthPage({ email, setEmail, password, setPassword, setToken, login, registration }) {
  
  return (
    <div>
      <h4 style={{marginBottom: "20px"}}>Авторизация</h4>
      <div>
        <div className="input-field" style={{marginBottom: "20px"}}>
          <input
            id="email"
            type="text"
            name="email"
            className="validate"
            onChange={e => setEmail(e.target.value)}
            value={email}
          />
          <label htmlFor="email">Введите email...</label>
        </div>
        <div className="input-field">
          <input 
            id="password"
            type="password"
            name="password"
            className="validate"
            onChange={e => setPassword(e.target.value)}
            value={password}
          />
          <label htmlFor="password">Введите пароль...</label>
        </div>
      </div>
      <div>
        <button 
          onClick={() => login(email, password, setToken)}
          className="waves-effect waves-light btn green lighten-1"
          style={{marginRight: "20px"}}
        >
          Войти
        </button>
        <button 
          onClick={() => registration(email, password)}
          className="waves-effect waves-light btn green"
        >
          Регистрация
        </button>
      </div>
    </div>
  )
}

export default AuthPage;