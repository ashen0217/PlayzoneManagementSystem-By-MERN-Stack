import React from 'react'
import './loginSignup.css'

import user_icon from './assets/person.png'
import email_icon from './assets/email.png'
import password_icon from './assets/password.png'


const loginSignup = () => {
  return (
    <div className='container'>
      <div className='header'>
        <div className='text'>Sign Up</div>
        <div className='underline'>Sign Up</div>
      </div>
      <div className='inputs'>
        <div className='input'>
            <img src={user_icon} alt='user_icon' />
        </div>
      </div>
    </div>
  )
}

export default loginSignup
