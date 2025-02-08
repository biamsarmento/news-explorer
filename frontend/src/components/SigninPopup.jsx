import { useState, useEffect } from 'react'; 

export default function SigninPopup(props) {
  const [isValid, setIsValid] = useState(false);
  const [errors, setErrors] = useState({});
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /^.{6,15}$/;

  const validateForm = (name, value) => {
      let errorMsg = "";

      if (name === "email") {
        if (!emailRegex.test(value)) {
          errorMsg = "invalid e-mail";
        }
      } else if (name === "password") {
        if (!passwordRegex.test(value)) {
          errorMsg = "Password must be at least 6 characters long";
        }
      }

      setErrors((prevErrors) => ({
          ...prevErrors,
          [name]: errorMsg,
      }));

      setIsValid(emailRegex.test(data.email) && passwordRegex.test(data.password));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
        ...prevData,
        [name]: value,
    }), validateForm(name, value));
    validateForm(name, value);
  };

  useEffect(() => {
    if (!props.isOpen) {
      setData({ email: "", password: "" });
      setErrors({});
      setIsValid(false);
    }
  }, [props.isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isValid) {
      props.handleLogin(data);
      props.onClose();
    }
  };

  return (
    <form 
    className="signin-popup__form form" 
    name="formPopup"
    id="signin-popup__form" 
    onSubmit={handleSubmit}
    >
        <fieldset
        className="form__fieldset">
            <label className='form__input-label'>E-mail</label>
            <input 
            type="email" 
            placeholder='Insert e-mail'
            className="form__input form__input_type_email" 
            id="email" 
            name="email"
            minLength="4" 
            maxLength="25" 
            value={data.email}
            onChange={handleChange}
            required />
            <span className={`form__input-error ${errors.email ? "form__input-error_active" : ""}`}>
              {errors.email}
            </span>
            <label className='form__input-label'>Password</label>
            <input 
            type="password" 
            placeholder='Insert password'
            className="form__input form__input_type_password" 
            id="password" 
            name="password" 
            minLength="6" 
            maxLength="15"
            value={data.password} 
            onChange={handleChange}
            required />
            <span className={`form__input-error ${errors.password ? "form__input-error_active" : ""}`}>
              {errors.password}
            </span>
            <button 
            style={{
              backgroundColor: isValid ? '#2F71E5' : '#E6E8EB',
              color: isValid ? 'white' : '#B6BCBF'  
            }}
            type="submit" disabled={!isValid} 
            className="form__submit-button">Sign in</button>
        </fieldset>
    </form>
  );
}