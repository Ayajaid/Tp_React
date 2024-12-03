import React from 'react';
import CompteList from './components/CompteList';
import CompteForm from './components/CompteForm';

function App() {
  return (
    <div>
      <h1>Gestion des Comptes</h1>
      <CompteForm />
      <CompteList />
    </div>
  );
}

export default App;