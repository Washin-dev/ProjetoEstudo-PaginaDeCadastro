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
  const [isLoading, setIsLoading] = useState(false);

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
    const dateRegex = /^\d{2}\/\d{2}\/\d{4}$/;

    if (formData.username.length < 3) {
      newErrors.username =
        "O nome de usuário deve ter pelo menos 3 caracteres.";
    }
    if (formData.password.length < 6) {
      newErrors.password = "A senha deve ter pelo menos 6 caracteres.";
    }
    if (!formData.birthdate.trim()) {
      newErrors.birthdate = "A data de nascimento é obrigatória.";
    } else if (!dateRegex.test(formData.birthdate)) {
      newErrors.birthdate = "O formato deve ser DD/MM/AAAA.";
    }
    if (!formData.email) {
      newErrors.email = "O e-mail é obrigatório.";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Insira um endereço de e-mail válido.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitted(true);

    if (validate()) {
      setIsLoading(true);

      try {
        const response = await fetch("/api/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        const result = await response.json();

        if (response.ok) {
          alert("✅ Registro Efetuado com Sucesso!");
          setFormData({ username: "", password: "", birthdate: "", email: "" });
          setIsSubmitted(false);
        } else {
          throw new Error(result.error || "Erro desconhecido");
        }
      } catch (error) {
        alert(`❌ Falha no registro: ${error.message}`);
        console.error("Erro completo:", error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="registration-page">
      <form className="card-cadastro" onSubmit={handleSubmit}>
        <div className="bolinha">
          <h3>Cadastro de Usuário </h3>
        </div>

        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={formData.username}
            onChange={handleChange}
            className={errors.username && isSubmitted ? "input-error" : ""}
            disabled={isLoading}
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
            disabled={isLoading}
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
            disabled={isLoading}
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
            disabled={isLoading}
          />
          {errors.email && isSubmitted && (
            <p className="error-message">{errors.email}</p>
          )}

          <button type="submit" disabled={isLoading}>
            {isLoading ? "Enviando..." : "Submit"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default Registration;
