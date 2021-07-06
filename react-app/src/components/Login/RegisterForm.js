import { useContext, useState } from 'react';
import { UserContext } from '../../Contexts';
import styled from 'styled-components';
import { useHistory, withRouter } from 'react-router-dom';
import { showErrors } from '../../config';

const RegisterFormWrapper = styled.div`
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    flex-direction: column;
    height: 70vh;
    width: 100%;

    * {
        width: 80%;
        font-size: 0.9rem;
        text-align: center;
    }

    .form-wrapper {
        display: flex;
        flex-flow: column;
        justify-content: space-between;
        align-items: center;
        height: 60%;
    }

    input {
        padding: 0 5px;
        height: 32px;
        border: #dfdfdf 1px solid;
        border-radius: 5px;
        margin-bottom: 20px;
        text-align: left;
    }

    label {
        text-align: left;
        color: #262626;
        margin-bottom: 5px;
    }

    button {
        background-color: #0095f6;
        border: none;
        border-radius: 5px;
        height: 30px;
        margin-bottom: 10px;
        color: white;
    }

    a {
        color: #0095f6;
        font-weight: 700;
    }

    a:hover {
        color: blue;
    }
`;

const RegisterForm = () => {
    const { setCurrentUser } = useContext(UserContext);
    let history = useHistory();

    const [formData, setFormData] = useState({
        username: '',
        email: '',
        full_name: '',
        password: '',
        confirmPassword: '',
    });

    let updateState = ({ target: { name, value } }) =>
        setFormData({ ...formData, [name]: value });

    const handleSubmit = async (e, data = formData) => {
        e.preventDefault();

        const res = await fetch(`/api/auth/signup`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (res.status !== 200) {
            const { errors } = await res.json();
            console.log(errors);
            showErrors(errors);
        } else {
            window.location.reload(false);
        }
    };

    return (
        <RegisterFormWrapper>
            <form onSubmit={handleSubmit} className='form-wrapper'>
                <label style={{ display: 'none' }} htmlFor='username'>
                    Username
                </label>
                <input
                    name='username'
                    id='username'
                    placeholder='Username'
                    onChange={updateState}
                    value={formData.username}
                />

                <label style={{ display: 'none' }} htmlFor='email'>
                    Email
                </label>

                <input
                    name='email'
                    id='email'
                    placeholder='Email'
                    onChange={updateState}
                    value={formData.email}
                />

                <label style={{ display: 'none' }} htmlFor='full_name'>
                    Full Name
                </label>

                <input
                    name='full_name'
                    id='full_name'
                    placeholder='Full Name'
                    onChange={updateState}
                    value={formData.full_name}
                />

                <label style={{ display: 'none' }} htmlFor='password'>
                    Password
                </label>

                <input
                    name='password'
                    id='password'
                    type='password'
                    placeholder='Password'
                    onChange={updateState}
                    value={formData.password}
                />
                <label style={{ display: 'none' }} htmlFor='confirmPassword'>
                    Confirm Password
                </label>

                <input
                    name='confirmPassword'
                    id='confirmPassword'
                    type='password'
                    placeholder='Confirm Password'
                    onChange={updateState}
                    value={formData.confirmPassword}
                />

                <button type='submit'>Register</button>
                <div>
                    Have an account?
                    <a href='/auth/login'> Login</a>
                </div>
            </form>
        </RegisterFormWrapper>
    );
};

export default withRouter(RegisterForm);
