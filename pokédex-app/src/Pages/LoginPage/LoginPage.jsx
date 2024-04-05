import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './LoginPage.css';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    // Ajoutez ici la logique de connexion avec votre backend
    console.log('Connexion avec :', email, password);
  };

  return (
    <div className="login-container">
      <h2 className="login-title">Page de Connexion</h2>
      <form onSubmit={handleLogin}>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div className="form-group">
          <label htmlFor="password">Mot de passe:</label>
          <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <div className="form-group">
          <button type="submit">Se connecter</button>
        </div>
      </form>
      <p className="link-to-signup">Vous n'avez pas de compte ? <Link to="/signup">Inscrivez-vous ici</Link></p>
    </div>
  );
}

export default LoginPage;