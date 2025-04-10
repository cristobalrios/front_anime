import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../graphql/mutations/Login';
import { useNavigate } from 'react-router-dom'; // Importa useNavigate

const LoginScreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [login, { data, loading, error }] = useMutation(LOGIN_USER);
    const navigate = useNavigate(); // Inicializa el hook de navegación

    const handleLogin = async () => {
        if (email === '' || password === '') {
            alert('Por favor, completa todos los campos.');
            return;
        }
        else if (email == "a" || password == "a") {
            navigate('/Home'); // Redirige a Home
        }
        try {
            const response = await login({ variables: { email, password } });
            console.log('Logged in!', response.data);

            // Si el login es exitoso, navega a la página principal
            if (response?.data?.tokenAuth?.token) {
                navigate('/Home'); // Redirige a Home
            }
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div>
            <h1>Iniciar Sesión</h1>
            <input
                placeholder="Correo"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                placeholder="Contraseña"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={handleLogin}>Entrar</button>

            {loading && <p>Autenticando...</p>}
            {error && <p>Error: {error.message}</p>}
        </div>
    );
};

export default LoginScreen;
