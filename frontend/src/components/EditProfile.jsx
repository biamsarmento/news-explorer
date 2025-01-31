import { useState, useContext, useEffect } from 'react'; 
import CurrentUserContext from '../contexts/CurrentUserContext'; 

export default function EditProfile(props) {
  const [isValid, setIsValid] = useState(false);
  const { currentUser, handleUpdateUser } = useContext(CurrentUserContext);
  const [name, setName] = useState(''); 
  const [description, setDescription] = useState(''); 

  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const validateForm = () => {
    const emailIsValid = data.email.includes('@') && data.email !== '';
    const passwordIsValid = data.password.length >= 5;
    setIsValid(emailIsValid && passwordIsValid);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
        ...prevData,
        [name]: value,
    }));
    validateForm();
  };

  // useEffect(() => {
  //   if (currentUser) {
  //     setName(currentUser.name); 
  //     setDescription(currentUser.about); 
  //   }
  // }, [currentUser]); 

  // const handleNameChange = (event) => {
  //   setName(event.target.value); 
  // };

  // const handleDescriptionChange = (event) => {
  //   setDescription(event.target.value); 
  // };

  const handleSubmit = (e) => {
        e.preventDefault();
        props.handleLogin(data);
        props.onClose();
    };

  // async function handleSubmit(event) {
  //   event.preventDefault(); 

  //   await handleUpdateUser({ name, about: description }); 
  //   props.onClose();
  // };

  return (
    <form 
    className="profile-popup__form form" 
    name="formPopup"
    id="profile-popup__form" 
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
            <span className="form__input-error nome-error"></span>
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
            <span className="form__input-error atividade-error"></span>
            <button 
            style={{
              backgroundColor: isValid ? '#2F71E5' : '#E6E8EB',
              color: isValid ? 'white' : '#B6BCBF'  // Cor do texto alterada com base na validade
            }}
            type="submit" disabled={!isValid} 
            className="form__submit-button">Entrar</button>
        </fieldset>
    </form>
  );
}