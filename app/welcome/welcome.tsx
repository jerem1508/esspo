import { Link } from "react-router";

export function Welcome() {
  return (
    <main style={{ padding: "40px 20px" }}>
      <div className="container">
        <h1 style={{ textAlign: "center", marginBottom: "40px" }}>Gestion de Compétition d'Athlétisme</h1>

        <div className="row">
          <div className="col s12 m6 offset-m3">
            <div className="card">
              <div className="card-content">
                <span className="card-title">Bienvenue</span>
                <p>
                  Cette application vous permet de gérer une compétition d'athlétisme avec 4 épreuves (vitesse, haies, pentabond, lancé) pour
                  différentes catégories d'âge.
                </p>

                <h5 style={{ marginTop: "30px" }}>Fonctionnalités :</h5>
                <ul style={{ marginLeft: "20px" }}>
                  <li>✓ Gestion des clubs</li>
                  <li>✓ Gestion des participants</li>
                  <li>✓ Définition des barèmes de points</li>
                  <li>✓ Saisie des résultats</li>
                  <li>✓ Classements individuels par catégorie</li>
                  <li>✓ Classements par club</li>
                  <li>✓ Export/Import des données</li>
                </ul>

                <div style={{ marginTop: "30px", textAlign: "center" }}>
                  <Link to="/competition">
                    <button className="btn waves-effect waves-light blue">Accéder à la gestion 🚀</button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
