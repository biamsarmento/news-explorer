import React from 'react';
import { useNavigate } from 'react-router-dom';

function PopupWithForm(props) {

  const navigate = useNavigate();

  return (
    <section className={`${props.name} ${props.isOpen ? `${props.name}_opened` : ''}`}  id={props.name}>
      <div className={`${props.name}__container`}>
          <button className={`${props.name}__close-button`} onClick={props.onClose}></button>
          <h2 className={`${props.name}__title`}>{props.title}</h2>
              {props.children}
          <p className={`${props.name}__text`}>
            ou 
            <button className={`${props.name}__link`} onClick={() => {
              props.onClose();
              props.navigate();
            }} 
            
            >{props.link}</button>
          </p>
      </div>
    </section>
  )
}

export default PopupWithForm;

