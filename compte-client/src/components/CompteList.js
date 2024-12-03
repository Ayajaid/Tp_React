import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import API_BASE_URL from '../config';

function CompteList() {
  const [comptes, setComptes] = useState([]);
  const [editingCompte, setEditingCompte] = useState(null); // Compte à modifier
  const [formData, setFormData] = useState({ solde: '', type: '' });

  useEffect(() => {
    fetchComptes();
  }, []);

  const fetchComptes = () => {
    axios
      .get(`${API_BASE_URL}/comptes`)
      .then((response) => setComptes(response.data))
      .catch((error) => console.error(error));
  };

  const deleteCompte = (id) => {
    axios
      .delete(`${API_BASE_URL}/comptes/${id}`)
      .then(() => {
        alert('Compte supprimé avec succès !');
        fetchComptes();
      })
      .catch((error) => console.error(error));
  };

  const editCompte = (compte) => {
    setEditingCompte(compte);
    setFormData({ solde: compte.solde, type: compte.type });
  };

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    axios
      .put(`${API_BASE_URL}/comptes/${editingCompte.id}`, formData)
      .then(() => {
        alert('Compte modifié avec succès !');
        setEditingCompte(null); // Fermer le formulaire
        fetchComptes(); // Rafraîchir la liste
      })
      .catch((error) => console.error(error));
  };

  return (
    <div className="container mt-4">
      <h2>Liste des Comptes</h2>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>ID</th>
            <th>Solde</th>
            <th>Date de Création</th>
            <th>Type</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {comptes.map((compte) => (
            <tr key={compte.id}>
              <td>{compte.id}</td>
              <td>{compte.solde}</td>
              <td>{compte.dateCreation}</td>
              <td>{compte.type}</td>
              <td>
                <button
                  className="btn btn-primary btn-sm me-2"
                  onClick={() => editCompte(compte)}
                >
                  <FontAwesomeIcon icon={faEdit} /> Modifier
                </button>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => deleteCompte(compte.id)}
                >
                  <FontAwesomeIcon icon={faTrash} /> Supprimer
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {editingCompte && (
        <div className="mt-4">
          <h3>Modifier le Compte</h3>
          <form onSubmit={handleFormSubmit}>
            <div className="mb-3">
              <label htmlFor="solde" className="form-label">Solde</label>
              <input
                type="number"
                id="solde"
                name="solde"
                className="form-control"
                value={formData.solde}
                onChange={handleFormChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="type" className="form-label">Type</label>
              <input
                type="text"
                id="type"
                name="type"
                className="form-control"
                value={formData.type}
                onChange={handleFormChange}
                required
              />
            </div>
            <button type="submit" className="btn btn-success">Enregistrer</button>
            <button
              type="button"
              className="btn btn-secondary ms-2"
              onClick={() => setEditingCompte(null)}
            >
              Annuler
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default CompteList;
