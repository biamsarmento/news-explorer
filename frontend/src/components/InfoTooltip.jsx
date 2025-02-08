import React from 'react';

function InfoTooltip({isRegistrationSuccessfulPopupOpen, onClose, navigate}) {

    return (
        <section className={`success-popup ${isRegistrationSuccessfulPopupOpen ? 'success-popup_opened' : ''}`} id='success-popup'>
            <div className='success-popup__container'>
                <button className='success-popup__close-button' onClick={onClose}></button>
                <h2 className='success-popup__title'>Registration Successful!</h2>
                <button className="success-popup_signin" onClick={() => {
                    onClose();
                    navigate();
                    }} 
                    
                >Sign in</button>                    
            </div>
        </section>
    )
}

export default InfoTooltip;

