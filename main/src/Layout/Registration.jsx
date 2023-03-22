import React, {useState} from 'react'
import './Registration.css'

const handleSubmit = (e) => {
    e.preventDefault()

    const isValid = validation()
    if (isValid) {
        console.log('Form Submitted')
    } 
}

// let res = await fetch('http://localhost:3002', {
//     method: 'POST',
// });

const validation = () => {
    const name = document.getElementById('name').value
    const email = document.getElementById('email').value
    const password = document.getElementById('password').value
    const password2 = document.getElementById('password2').value

    if (name === '') {
        alert('Name is required')
        return false
    }

    if (email === '') {
        alert('Email is required')
        return false
    }

    if (password === '') {
        alert('Password is required')
        return false
    }

    if (password2 === '') {
        alert('Confirm Password is required')
        return false
    }

    if (password !== password2) {
        alert('Passwords do not match')
        return false
    }
    return true
}

const Registration = () => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');

    // if(res.status = 200) {
    //     setName(name);
    //     setEmail(email);
    //     setPassword(password);
    //     console.log('success');
    // } else {
    //     console.log('error');
    // }

  return (
    <div>
        <div>
            <h1>Registration</h1>

            <div className='form-container'>
                <form action="" onSubmit={handleSubmit}>
                    <div className='form-group'>
                        <label htmlFor='name'>Name</label>
                        <input 
                        type='text' 
                        name='name' 
                        id='name' 
                        onChange={(e) => setName(e.target.value)} />
                    </div>
                    <div className='form-group'>
                        <label htmlFor='email'>Email</label>
                        <input 
                        type='email' 
                        name='email' 
                        id='email'
                        onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className='form-group'>
                        <label htmlFor='password'>Password</label>
                        <input 
                        type='password' 
                        name='password' 
                        id='password' 
                        onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <div className='form-group'>
                        <label htmlFor='password2'>Confirm Password</label>
                        <input 
                        type='password' 
                        name='password2' 
                        id='password2'
                        onChange={(e) => setPassword2(e.target.value)} />
                    </div>

                    <input className="submit-button" onClick={console.log('clicked')} type='submit' value='Register' />
                </form>
                
            </div>
        </div>
    </div>
  )
}

export default Registration