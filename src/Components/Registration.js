import React from 'react';

class Registration extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            nom: "",
            prenom: "",
            pseudo: "",
            email: "",
            password: "",
            telephone: "",
            adresse: "",
            datenaissance: "",
            modele: "",
            immatriculation: "",
            energie: "",
            couleur: "",
            DPI: "",
            errorMessage: "",
            marques: [], // Opciones de modelo
            energies: [], // Opciones de energía
        };
    }

    componentDidMount() {
        // Obtener las opciones de modelo
        fetch('http://localhost/ECF0624/ExampleECF0624/ejemplo/src/DB/Interactiondb.php/?getMarques=1')
            .then((response) => response.json())
            .then((data) => {
                if (data.success !== 0) {
                    this.setState({ marques: data });
                }
            })
            .catch((error) => console.error("Error al obtener las marcas:", error));

        // Obtener las opciones de energía
        fetch('http://localhost/ECF0624/ExampleECF0624/ejemplo/src/DB/Interactiondb.php/?getEnergies=1')
            .then((response) => response.json())
            .then((data) => {
                if (data.success !== 0) {
                    this.setState({ energies: data });
                }
            })
            .catch((error) => console.error("Error al obtener las energías:", error));
    }

    handleChange = (e) => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    };

    handleSubmit = async (e) => {
        e.preventDefault();
        const { nom, prenom, pseudo, email, password, telephone, adresse, datenaissance, modele, immatriculation, energie, couleur, DPI } = this.state;
        console.log(nom, prenom, pseudo, email, password, telephone, adresse, datenaissance, modele, immatriculation, energie, couleur, DPI);
    
        if (!nom || !prenom || !pseudo || !email || !password || !telephone || !adresse || !datenaissance || !modele || !immatriculation || !energie || !couleur || !DPI) {
            this.setState({ errorMessage: "Todos los campos son obligatorios" });
            return;
        }
    
        const userData = {
            nom,
            prenom,
            pseudo,
            email,
            password_id: password,
            telephone,
            adresse,
            date_naissance: datenaissance,
        };
    
        const carData = {
            modele,
            immatriculation,
            energie,
            couleur,
            DPI,
        };
    
        try {
            // Enviar datos del usuario
            const userResponse = await fetch('http://localhost/ECF0624/ExampleECF0624/ejemplo/src/DB/Interactiondb.php/?adduser=1', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(userData),
            });
        
            const userResult = await userResponse.json();
            console.log("Respuesta del backend (adduser):", userResult); // Depuración
        
            if (userResult.success) {
                // Enviar datos del auto
                const carResponse = await fetch('http://localhost/ECF0624/ExampleECF0624/ejemplo/src/DB/Interactiondb.php/?addCar=1', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ ...carData, user_id: userResult.userID }),
                });
        
                const carResult = await carResponse.json();
                console.log("Respuesta del backend (addCar):", carResult); // Depuración
        
                if (carResult.success) {
                    alert("Usuario y auto registrados exitosamente");
                    window.location.href = "/Connexion"; // Redirigir al login
                } else {
                    this.setState({ errorMessage: carResult.message || "Error al registrar el auto" });
                }
            } else {
                this.setState({ errorMessage: userResult.message || "Error al registrar el usuario" });
            }
        } catch (error) {
            this.setState({ errorMessage: "Error al registrar el usuario o el auto. Inténtalo de nuevo." });
        }
    };

    render() {
        const { nom, prenom, pseudo, email, password, telephone, adresse, datenaissance, modele, immatriculation, energie, couleur, DPI, errorMessage, marques, energies } = this.state;

        return (
            <div>
                <form className='contregistration' onSubmit={this.handleSubmit}>
                    <div className='contregistration1'>
                        <div>
                            <h1>Formulaire d'inscription</h1>
                            <h3>Informations utilisateur</h3>
                        </div>
                        {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
                        <div className='registrationuti'>
                            <div className="mb-3">
                                <label htmlFor="nom" className="form-label">Nom</label>
                                <input type="text" className="form-control" name='nom' value={nom} onChange={this.handleChange} required />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="prenom" className="form-label">Prenom</label>
                                <input type="text" className="form-control" name='prenom' value={prenom} onChange={this.handleChange} required />
                            </div>
                        </div>
                        <div className='registrationuti'>
                            <div className="mb-3">
                                <label htmlFor="pseudo" className="form-label">Pseudo</label>
                                <input type="text" className="form-control" name='pseudo' value={pseudo} onChange={this.handleChange} required />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="email" className="form-label">Email</label>
                                <input type="email" className="form-control" name='email' value={email} onChange={this.handleChange} required />
                            </div>
                        </div>
                        <div className='registrationuti'>
                            <div className="mb-3">
                                <label htmlFor="password" className="form-label">Password</label>
                                <input type="password" className="form-control" name='password' value={password} onChange={this.handleChange} required />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="telephone" className="form-label">Telephone</label>
                                <input type="tel" className="form-control" name='telephone' value={telephone} onChange={this.handleChange} required />
                            </div>
                        </div>
                        <div className='registrationuti'>
                            <div className="mb-3">
                                <label htmlFor="adresse" className="form-label">Adresse</label>
                                <input type="text" className="form-control" name='adresse' value={adresse} onChange={this.handleChange} required />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="datenaissance" className="form-label">Date de naissance</label>
                                <input type="date" className="form-control" name='datenaissance' value={datenaissance} onChange={this.handleChange} required />
                            </div>
                        </div>
                        <h2>Ajouter une voiture</h2>
                        <div className='registrationuti'>
                            <div className="mb-3">
                                <label htmlFor="modele" className="form-label">Modele</label>
                                <select className="form-control" name='modele' value={modele} onChange={this.handleChange} required>
                                    <option value="">Seleccione un modelo</option>
                                    {marques.map((marque) => (
                                        <option key={marque.ID} value={marque.ID}>{marque.marquevoi}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="energie" className="form-label">Energie</label>
                                <select className="form-control" name='energie' value={energie} onChange={this.handleChange} required>
                                    <option value="">Seleccione un tipo de energía</option>
                                    {energies.map((energy) => (
                                        <option key={energy.ID} value={energy.ID}>{energy.energievoi}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className='registrationuti'>
                            <div className="mb-3">
                                <label htmlFor="immatriculation" className="form-label">Immatriculation</label>
                                <input type="text" className="form-control" name='immatriculation' value={immatriculation} onChange={this.handleChange} required />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="couleur" className="form-label">Couleur</label>
                                <input type="text" className="form-control" name='couleur' value={couleur} onChange={this.handleChange} required />
                            </div>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="DPI" className="form-label">Date de mise en circulation</label>
                            <input type="date" className="form-control" name='DPI' value={DPI} onChange={this.handleChange} required />
                        </div>
                        <button type="submit" className="btn btn-success">Submit</button>
                    </div>
                </form>
            </div>
        );
    }
}

export default Registration;