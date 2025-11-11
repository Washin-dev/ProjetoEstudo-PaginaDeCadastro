import React, { useState } from "react";
import "../style/RegistreStyle.css";

function Registration() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    birthdate: "",
    email: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (event) => {
    const { id, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [id]: value,
    }));

    if (errors[id]) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [id]: "",
      }));
    }
  };

  const validate = () => {
    let newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (formData.username.length < 3) {
      newErrors.username =
        "O nome de usuário deve ter pelo menos 3 caracteres.";
    }

    if (formData.password.length < 6) {
      newErrors.password = "A senha deve ter pelo menos 6 caracteres.";
    }

    if (!formData.birthdate.trim()) {
      newErrors.birthdate = "A data de nascimento é obrigatória.";
    }

    if (!formData.email || !emailRegex.test(formData.email)) {
      newErrors.email = "Insira um endereço de e-mail válido.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsSubmitted(true);

    if (validate()) {
      console.log("✅ Registro Efetuado com Sucesso! Dados:", formData);
      alert("Registro Efetuado com Sucesso!");
    } else {
      console.log("❌ Falha na Validação. Corrija os erros.");
    }
  };

  return (
    <div className="registration-page">
      <form className="card-cadastro" onSubmit={handleSubmit}>
        <div className="bolinha">
          <h3>Cadastro de Usuário</h3>
        </div>

        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={formData.username}
            onChange={handleChange}
            className={errors.username && isSubmitted ? "input-error" : ""}
          />
          {errors.username && isSubmitted && (
            <p className="error-message">{errors.username}</p>
          )}
        </div>

        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={formData.password}
            onChange={handleChange}
            className={errors.password && isSubmitted ? "input-error" : ""}
          />
          {errors.password && isSubmitted && (
            <p className="error-message">{errors.password}</p>
          )}
        </div>

        <div>
          <label htmlFor="birthdate">Data de nascimento:</label>
          <input
            type="text"
            id="birthdate"
            placeholder="DD/MM/AAAA"
            value={formData.birthdate}
            onChange={handleChange}
            className={errors.birthdate && isSubmitted ? "input-error" : ""}
          />
          {errors.birthdate && isSubmitted && (
            <p className="error-message">{errors.birthdate}</p>
          )}
        </div>

        <div className="input-group-submit">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={formData.email}
            onChange={handleChange}
            className={errors.email && isSubmitted ? "input-error" : ""}
          />
          {errors.email && isSubmitted && (
            <p className="error-message">{errors.email}</p>
          )}
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
}

export default Registration;
