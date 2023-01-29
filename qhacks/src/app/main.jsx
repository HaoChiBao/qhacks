import React from 'react'

function Main() {
    window.onload = function () {
        const login = document.getElementById('login');
        const register = document.getElementById('register');
        login.addEventListener('click', () => {
            window.location.assign('/login')
        })
        register.addEventListener('click', () => {
            window.location.assign('/register')
        })
    }
    return (
        <section className = 'landing'>
            <div className="side">
                <button  id = 'login'>LOGIN</button>
            </div>
            <div className="side">
                <button id = 'register'>REGISTER</button>
            </div>
        </section>
    )
}

export default Main