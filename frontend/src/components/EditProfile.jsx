import { useState, useContext, useEffect } from 'react'; 
import CurrentUserContext from '../contexts/CurrentUserContext'; 

export default function EditProfile(props) {
  const { currentUser, handleUpdateUser } = useContext(CurrentUserContext);
  const [name, setName] = useState(''); 
  const [description, setDescription] = useState(''); 

  useEffect(() => {
    if (currentUser) {
      setName(currentUser.name); 
      setDescription(currentUser.about); 
    }
  }, [currentUser]); 

  const handleNameChange = (event) => {
    setName(event.target.value); 
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value); 
  };

  async function handleSubmit(event) {
    event.preventDefault(); 

    await handleUpdateUser({ name, about: description }); 
    props.onClose();
  };

  return (
    <form 
    className="profile-popup__form form" 
    name="formPopup"
    id="profile-popup__form" 
    onSubmit={handleSubmit}
    >
        <fieldset
        className="form__fieldset">
            <label className='form__input-label' for='email'>E-mail</label>
            <input 
            type="email" 
            placeholder='Insira e-mail'
            className="form__input form__input_type_email" 
            id="email" 
            name="email"
            minLength="2" 
            maxLength="40" 
            value={name} 
            onChange={handleNameChange} 
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
            value={description} 
            onChange={handleDescriptionChange} 
            required />
            <span className="form__input-error atividade-error"></span>
            <button type="submit" className="form__submit-button">Entrar</button>
        </fieldset>
    </form>
  );
}