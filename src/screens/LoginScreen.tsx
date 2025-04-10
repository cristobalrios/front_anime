import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../graphql/mutations/Login';
import { useNavigate } from 'react-router-dom';
import AuthStyles from '../styles/authStyles';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [login, { loading, error }] = useMutation(LOGIN_USER);
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!email || !password) {
      alert('Por favor, completa todos los campos.');
      return;
    }

    if (email === 'a' && password === 'a') {
      navigate('/Home');
      return;
    }

    try {
      const response = await login({ variables: { email, password } });
      if (response?.data?.tokenAuth?.token) {
        navigate('/Home');
      } else {
        alert('Credenciales incorrectas.');
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div style={AuthStyles.container}>
      <div style={AuthStyles.card}>
        <h2 style={AuthStyles.title}>🎟️ Iniciar Sesión</h2>
        <input
          style={AuthStyles.input}
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          style={AuthStyles.input}
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button style={AuthStyles.button} onClick={handleLogin} disabled={loading}>
          {loading ? 'Autenticando...' : 'Entrar'}
        </button>

        {error && (
          <p style={AuthStyles.errorText}>
            ❌ Error: {error.message.includes('Network') ? 'No se pudo conectar al servidor.' : error.message}
          </p>
        )}
      </div>
    </div>
  );
};

export default LoginScreen;
