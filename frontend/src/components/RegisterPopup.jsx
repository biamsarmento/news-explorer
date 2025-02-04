import { useState, useContext, useEffect } from 'react'; 
import CurrentUserContext from '../contexts/CurrentUserContext'; 

export default function RegisterPopup(props) {
  const [isValid, setIsValid] = useState(false);
  const [isButtonValid, setIsButtonValid] = useState(false);
  const [errors, setErrors] = useState({});

  const [data, setData] = useState({
    email: "",
    password: "",
    username: "",
  });

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /^.{6,15}$/;
  const usernameRegex = /^[a-zA-Z0-9_]{3,10}$/;

  const validateForm = (name, value) => {
    let errorMsg = "";

    if (name === "email") {
      if (!emailRegex.test(value)) {
        errorMsg = "E-mail inválido";
      }
    } else if (name === "password") {
      if (!passwordRegex.test(value)) {
        errorMsg = "A senha deve ter pelo menos 6 caracteres";
      }
    } else if (name === "username") {
      if (value.length < 3) {
        errorMsg = "O nome de usuário deve ter pelo menos 3 caracteres";
      } else if (/\s/.test(value)) {  
        errorMsg = "O nome de usuário não pode conter espaços";
      } else if (!usernameRegex.test(value)) {
        errorMsg = "O nome de usuário pode conter apenas letras, números e underscores";
      }
    }

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: errorMsg,
    }));

    // Atualiza a validade geral do formulário
    setIsValid(
      emailRegex.test(data.email) &&
      passwordRegex.test(data.password) &&
      usernameRegex.test(data.username)
    );

    console.log("isValid: ", isValid);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
        ...prevData,
        [name]: value,
    }));
    validateForm(name, value);
  };

  useEffect(() => {
    if (!props.isOpen) {
      setData({ email: "", password: "", username: "" });
      setErrors({});
      setIsValid(false);
    }
  }, [props.isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("isValid? ", isValid);
    if (isValid) {
      props.handleRegistration(data);
      props.onClose();
    }
  };

  return (
    <form 
    className="register-popup__form form" 
    name="formPopup"
    id="register-popup__form" 
    onSubmit={handleSubmit}
    >
        <fieldset
        className="form__fieldset">
            <label className='form__input-label'>E-mail</label>
            <input 
            type="email" 
            placeholder='Insira e-mail'
            className="form__input form__input_type_email" 
            id="email" 
            name="email"
            minLength="2" 
            maxLength="40" 
            value={data.email}
            onChange={handleChange}
            required />
            <span className={`form__input-error ${errors.email ? "form__input-error_active" : ""}`}>
              {errors.email}
            </span>
            <label className='form__input-label'>Senha</label>
            <input 
            type="password" 
            placeholder='Insira a senha'
            className="form__input form__input_type_password" 
            id="password" 
            name="password" 
            minLength="2" 
            maxLength="18"
            value={data.password} 
            onChange={handleChange}
            required />
            <span className={`form__input-error ${errors.password ? "form__input-error_active" : ""}`}>
              {errors.password}
            </span>
            <label className='form__input-label'>Nome de usuário</label>
            <input 
            type="text" 
            placeholder='Insira seu nome de usuário'
            className="form__input form__input_type_password" 
            id="username" 
            name="username" 
            minLength="2" 
            maxLength="15"
            value={data.username} 
            onChange={handleChange}
            required />
            <span className={`form__input-error ${errors.username ? "form__input-error_active" : ""}`}>
              {errors.username}
            </span>
            <button 
            style={{
              backgroundColor: isValid ? '#2F71E5' : '#E6E8EB',
              color: isValid ? 'white' : '#B6BCBF'  // Cor do texto alterada com base na validade
            }}
            type="submit" disabled={!isValid} 
            className="form__submit-button">Inscrever-se</button>
        </fieldset>
    </form>
  );
}