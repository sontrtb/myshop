import { useState } from 'react';
import '../styles/login.css';
import Login from '../component/Login';
import Register from '../component/Register';

function Account() {

    const [displayRegister, setDisplayRegister] = useState(false);
    
    return(
        <div className="login-register-container">
            <div className='container'>
                <div className='login-register-content'>
                    <div>
                        <div className='logo_login' />
                    </div>
                    <div>
                        {
                            displayRegister ?
                            <Register setDisplayRegister={setDisplayRegister} /> : 
                            <Login setDisplayRegister={setDisplayRegister}/> 
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Account;