import "../style/BackgroundRegistre.css";

function Registration() {
  return (
    <>
      <body>
        <div>
          <form action="" className="card-cadastro">
            <div className="bolinha">
              <h3>Cadastro de Usuário</h3>
            </div>
            <div>
              <label for="username">Username:</label>
              <input type="text" id="username" value="Bryan Brasileiro"></input>
            </div>
            <div>
              <label for="password">Password:</label>
              <input type="password" id="password" value="***********"></input>
            </div>
            <div>
              <label for="birthdate">Data de nascimento:</label>
              <input type="text" id="birthdate" placeholder="DD/MM/YY"></input>
            </div>
            <div>
              <label for="email">Email:</label>
              <input
                type="email"
                id="email"
                value="bryanarrombado666@gmail.com"
              />
              <button type="submit">Submit</button>
            </div>
          </form>
        </div>
      </body>
    </>
  );
}

export default Registration;
