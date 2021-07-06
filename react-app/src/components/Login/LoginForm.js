import { useState, useContext } from 'react';
import styled from 'styled-components';
import { useHistory, withRouter } from 'react-router-dom';
import { UserContext } from '../../Contexts';
import { showErrors } from '../../config';

const LoginFormWrapper = styled.div`
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    flex-direction: column;
    margin-top: 15%;
    height: 50vh;
    width: 100%;

    * {
        width: 80%;
        font-size: 0.9rem;
        text-align: center;
    }

    .form-wrapper {
        display: flex;
        height: 70%;
        flex-flow: column;
        justify-content: space-between;
        align-items: center;
    }

    input {
        padding: 0 5px;
        height: 32px;
        border: #dfdfdf 1px solid;
        border-radius: 5px;

        text-align: left;
    }

    button {
        background-color: #0095f6;
        border: none;
        border-radius: 5px;
        height: 30px;
        color: white;
        font-weight: 700;
    }

    a {
        color: #0095f6;
        font-weight: 700;
    }

    a:hover {
        color: blue;
    }
`;

const LoginForm = () => {
    const { setCurrentUser } = useContext(UserContext);
    let history = useHistory();

    const [formData, setFormData] = useState({ username: '', password: '' });

    const handleSubmit = async (e, data = formData) => {
        e.preventDefault();

        const res = await fetch(`/api/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (res.status !== 200) {
            const { errors } = await res.json();
            showErrors(errors);
        } else {
            window.location.reload(false);
        }
    };

    const demoLogin = (e) => {
        e.preventDefault();
        handleSubmit(e, { username: 'DemoUser', password: 'Test@1234' });
    };

    return (
        <LoginFormWrapper>
            <form onSubmit={handleSubmit} className='form-wrapper'>
                <label style={{ display: 'none' }} htmlFor='username'>
                    Username
                </label>

                <input
                    placeholder='Username'
                    name='username'
                    id='username'
                    value={formData.username}
                    onChange={(e) =>
                        setFormData({ ...formData, username: e.target.value })
                    }
                />

                <label style={{ display: 'none' }} htmlFor='password'>
                    Password
                </label>

                <input
                    type='password'
                    placeholder='Password'
                    name='password'
                    id='password'
                    value={formData.password}
                    onChange={(e) =>
                        setFormData({ ...formData, password: e.target.value })
                    }
                />

                <button style={{ cursor: 'pointer' }} type='submit'>
                    Log In
                </button>
                <button style={{ cursor: 'pointer' }} onClick={demoLogin}>
                    Try Our Demo
                </button>

                <div>
                    Don't have an account?
                    <a href='/auth/register'> Sign up</a>
                </div>
            </form>
        </LoginFormWrapper>
    );
};

export default withRouter(LoginForm);
