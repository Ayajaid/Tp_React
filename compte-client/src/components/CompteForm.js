import React, { useState } from 'react';
import axios from 'axios';
import API_BASE_URL from '../config'; // Assurez-vous que le chemin est correct

function CompteForm() {
  const [compte, setCompte] = useState({
    solde: '',
    dateCreation: '',
    type: 'compte_courant' // Valeur par défaut pour le type
  });

  const handleChange = (e) => {
    setCompte({ ...compte, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_BASE_URL}/comptes`, compte); // Correction ici
      alert('Compte ajouté avec succès !');
      // Réinitialiser le formulaire après la soumission (optionnel)
      setCompte({ solde: '', dateCreation: '', type: 'compte_courant' });
    } catch (error) {
      console.error('Erreur lors de l\'ajout du compte :', error);
      alert('Une erreur s\'est produite. Veuillez réessayer.');
    }
  };

  return (
    <div className="container mt-4">
      <h2>Ajouter un Compte</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="solde">Solde</label>
          <input
            type="number"
            id="solde"
            name="solde"
            className="form-control"
            value={compte.solde}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="dateCreation">Date de Création</label>
          <input
            type="date"
            id="dateCreation"
            name="dateCreation"
            className="form-control"
            value={compte.dateCreation}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="type">Type</label>
          <select
            id="type"
            name="type"
            className="form-select"
            value={compte.type}
            onChange={handleChange}
          >
            <option value="COURANT">Courant</option>
            <option value="EPARGNE">Épargne</option>
          </select>
        </div>

        <button type="submit" className="btn btn-primary">Ajouter</button>
      </form>
    </div>
  );
}

export default CompteForm;


