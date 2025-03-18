import React from 'react'
import Header from './components/Header'
import About from './components/About'
import Services from './components/Services'
import loginSignup from './components/Login-Signup/loginSignup'


const App = () => {
  return (
    <div className='w-full overflow-hidden'>
      <Header/>
      <About/>
      <Services/>
      <loginSignup/>
    </div>
  )
}

export default App
