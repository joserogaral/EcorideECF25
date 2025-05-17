import React from 'react';
import UserHeader from './Headeruser';

class Addcovoi extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            v_d_d: "",
            v_d_a: "",
            h_d_d: "",
            h_d_a: "",
            d_d_d: "",
            d_d_a: "",
            description: "",
            prix: "",
            n_d_p: "",
            fum: false,
            ani: false,
            voy_eco: false,
            modele: "",
            immatriculation: "",
            energie: "",
            couleur: "",
            DPI: "",
            energies: [], // Opciones para el campo `energie`
            marques: [],  // Opciones para el campo `marque`
        };
    }

    componentDidMount() {
        const userID = localStorage.getItem('userID');
        if (!userID) {
            window.location.href = "/connexion"; // Redirigir si no está autenticado
        }
    
        this.fetchUserInfo(userID);
        this.fetchUserCar(userID);
        this.fetchRoles(); // Cargar roles
        this.fetchMarques(); // Cargar marcas
   }

    handleChange = (e) => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    };

    // Método para manejar los cambios en los campos del formulario
    changevalueco = (e) => {
        const { name, type, value, checked } = e.target;
        // Si el campo es un checkbox, usa `checked`, de lo contrario usa `value`
        this.setState({ [name]: type === "checkbox" ? checked : value });
    };


    fetchRoles = () => {
        fetch('http://localhost/ECF0624/ExampleECF0624/ejemplo/src/DB/Interactiondb.php/?getRoles=1')
            .then(response => response.json())
            .then(data => {
                if (Array.isArray(data)) {
                    this.setState({ roles: data }); // Asegúrate de que `data` sea un array
                } else {
                    console.error("Error: Los datos de roles no son un array");
                }
            })
            .catch(error => console.error("Error al cargar los roles:", error));
    };
    
    fetchMarques = () => {
        fetch('http://localhost/ECF0624/ExampleECF0624/ejemplo/src/DB/Interactiondb.php/?getMarques=1')
            .then(response => response.json())
            .then(data => {
                this.setState({ marques: data }); // Asigna los datos directamente
            })
            .catch(error => console.error("Error al cargar las marcas:", error));
    };

    

    handleUpdateUserInfo = (e) => {
        e.preventDefault();
        const { nom, prenom, email, telephone, adresse, role_u } = this.state;
        const userID = localStorage.getItem('userID');
    
        console.log({ user_id: userID, nom, prenom, email, telephone, adresse, role_u }); // Depuración
    
        fetch('http://localhost/ECF0624/ExampleECF0624/ejemplo/src/DB/Interactiondb.php/?updateUserInfo=1', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ user_id: userID, nom, prenom, email, telephone, adresse, role_u }),
        })
            .then(response => response.json())
            .then(data => {
                if (data.success) alert("Información personal actualizada");
            });
    };


    handleUpdateCar = (e) => {
        e.preventDefault();
        const { modele, immatriculation, energie, couleur, DPI } = this.state;
        const userID = localStorage.getItem('userID');
    
        fetch('http://localhost/ECF0624/ExampleECF0624/ejemplo/src/DB/Interactiondb.php/?updateCar=1', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ user_id: userID, modele, immatriculation, energie, couleur, DPI }),
        })
            .then(response => response.json())
            .then(data => {
                if (data.success) alert("Información del coche actualizada");
            });
    };


    fetchUserInfo = (userID) => {
        fetch(`http://localhost/ECF0624/ExampleECF0624/ejemplo/src/DB/Interactiondb.php/?getUserInfo=1&user_id=${userID}`)
            .then(response => response.json())
            .then(data => {
                if (data.success !== 0) {
                    this.setState({
                        nom: data.nom,
                        prenom: data.prenom,
                        email: data.email,
                        telephone: data.telephone,
                        adresse: data.adresse,
                        role_u: data.role_u, // Asegúrate de que el nombre coincida
                    });
                }
            })
            .catch(error => console.error("Error al cargar la información del usuario:", error));
    };
    
    fetchUserCar = (userID) => {
        fetch(`http://localhost/ECF0624/ExampleECF0624/ejemplo/src/DB/Interactiondb.php/?getUserCar=1&user_id=${userID}`)
            .then(response => response.json())
            .then(data => {
                if (data.hasCar) {
                    this.setState({
                        hasCar: true,
                        modele: data.car.modele,
                        immatriculation: data.car.immatriculation,
                        energie: data.car.energie,
                        couleur: data.car.couleur,
                        DPI: data.car.DPI,
                    });
                } else {
                    this.setState({ hasCar: false });
                }
            })
            .catch(error => console.error("Error al cargar la información del coche:", error));
    };

    // Método para manejar el envío del formulario
    uploaddata = (e) => {
        e.preventDefault();
        const { v_d_d, v_d_a, h_d_d, h_d_a, d_d_d, d_d_a, description, prix, n_d_p, fum, ani, voy_eco } = this.state;
        const { modele, immatriculation, energie, couleur, DPI } = this.state;

        // Obtener el ID y el pseudo del usuario desde localStorage
        const userID = localStorage.getItem('userID');
        const pseudo = localStorage.getItem('pseudo');
    
        const data = {
            ville_depart: v_d_d,
            ville_arrive: v_d_a,
            heure_depart: h_d_d,
            heure_arrive: h_d_a,
            date_depart: d_d_d,
            date_arrive: d_d_a,
            descrip: description,
            prix: prix,
            nb_place: n_d_p,
            fumeur: fum,
            animaux: ani,
            voyeco: voy_eco,
            user_id: userID,
            pseudo: pseudo,
        };
    
        fetch('http://localhost/ECF0624/ExampleECF0624/ejemplo/src/DB/Interactiondb.php/?addCovoiturage=1', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert("Trayecto agregado exitosamente");
                this.setState({
                    v_d_d: "",
                    v_d_a: "",
                    h_d_d: "",
                    h_d_a: "",
                    d_d_d: "",
                    d_d_a: "",
                    description: "",
                    prix: "",
                    n_d_p: "",
                    fum: false,
                    ani: false,
                    voy_eco: false,
                });
            } else {
                alert("Error al agregar el trayecto");
            }
        })
        .catch(error => console.error("Error:", error));

    };


    render() {
        const { v_d_d, v_d_a, h_d_d, h_d_a, d_d_d, d_d_a, description, prix, n_d_p, fum, ani, voy_eco } = this.state;
        const { modele, immatriculation, energie, couleur, DPI, energies, marques } = this.state;
        return (
            <div>
                <div className='headeruser'>
                    <UserHeader></UserHeader>
                </div>
                <div className='containeruser'>
                    <div className='containeraddcov'>
                        <h2>Ajouter un covoiturage</h2>
                        <form onSubmit={this.uploaddata} className='formaddcov'>
                            <div className="input-group">
                                <span className="input-group-text">Ville de depart</span>
                                <textarea
                                    className="form-control"
                                    name="v_d_d"
                                    value={v_d_d}
                                    onChange={this.changevalueco}
                                    placeholder="ville de depart"
                                ></textarea>
                            </div>
                            <div className="input-group">
                                <span className="input-group-text">Ville d'arrive</span>
                                <textarea
                                    className="form-control"
                                    name="v_d_a"
                                    value={v_d_a}
                                    onChange={this.changevalueco}
                                    placeholder="ville d'arrive"
                                ></textarea>
                            </div>
                            <div className="input-group">
                                <span className="input-group-text">Heure de depart</span>
                                <input
                                    className="form-control"
                                    type="time"
                                    name="h_d_d"
                                    value={h_d_d}
                                    onChange={this.changevalueco}
                                />
                            </div>
                            <div className="input-group">
                                <span className="input-group-text">Heure d'arrive</span>
                                <input
                                    className="form-control"
                                    type="time"
                                    name="h_d_a"
                                    value={h_d_a}
                                    onChange={this.changevalueco}
                                />
                            </div>
                            <div className="input-group">
                                <span className="input-group-text">Date de depart</span>
                                <input
                                    className="form-control"
                                    type="date"
                                    name="d_d_d"
                                    value={d_d_d}
                                    onChange={this.changevalueco}
                                />
                            </div>
                            <div className="input-group">
                                <span className="input-group-text">Date d'arrive</span>
                                <input
                                    className="form-control"
                                    type="date"
                                    name="d_d_a"
                                    value={d_d_a}
                                    onChange={this.changevalueco}
                                />
                            </div>
                            <div className="input-group">
                                <span className="input-group-text">Descrition</span>
                                <textarea
                                    className="form-control"
                                    name="description"
                                    value={description}
                                    onChange={this.changevalueco}
                                    placeholder="description"
                                ></textarea>
                            </div>
                            <div className="input-group">
                                <span className="input-group-text">Prix</span>
                                <textarea
                                    className="form-control"
                                    name="prix"
                                    value={prix}
                                    onChange={this.changevalueco}
                                    placeholder="prix"
                                ></textarea>
                            </div>
                            <div className="input-group">
                                <span className="input-group-text">Nombre de places disponibles</span>
                                <input
                                    className="form-control"
                                    type="number"
                                    min={0}
                                    max={4}
                                    name="n_d_p"
                                    value={n_d_p}
                                    onChange={this.changevalueco}
                                    placeholder="nombre de places disponibles"
                                />
                            </div>
                            <div className="form-check form-switch" id='contlabel'>
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    name="fum"
                                    checked={fum}
                                    onChange={this.changevalueco}
                                />
                                <label className="form-check-label">Fumeur</label>
                            </div>
                            <div className="form-check form-switch" id='contlabel'>
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    name="ani"
                                    checked={ani}
                                    onChange={this.changevalueco}
                                />
                                <label className="form-check-label">Animaux</label>
                            </div>
                            <div className="form-check form-switch" id='contlabel'>
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    name="voy_eco"
                                    checked={voy_eco}
                                    onChange={this.changevalueco}
                                />
                                <label className="form-check-label">Voyage eco</label>
                            </div>
                            <button type="submit" className="btn btn-primary">Add covoiturage</button>
                        </form>
                    </div>
                    <div className='containeraddvoi'>  
                        <h2>Ajouter une voiture</h2>
                        <form onSubmit={this.handleSubmit} className='formaddcov'>
                            <div className="input-group">
                                <span className="input-group-text">Modèle</span>
                                <select
                                    className="form-control"
                                    name="modele"
                                    value={this.state.modele}
                                    onChange={this.handleChange}
                                >
                                    <option value="">Seleccione un modèle</option>
                                    {this.state.marques.map((marque) => (
                                        <option key={marque.ID} value={marque.ID}>
                                            {marque.marquevoi}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="input-group">
                                <span className="input-group-text">Immatriculation</span>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="immatriculation"
                                    value={immatriculation}
                                    onChange={this.handleChange}
                                    placeholder="Immatriculation"
                                />
                            </div>
                            
                            <div className="input-group">
                                <span className="input-group-text">Couleur</span>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="couleur"
                                    value={couleur}
                                    onChange={this.handleChange}
                                    placeholder="Couleur"
                                />
                            </div>
                            <div className="input-group">
                                <span className="input-group-text">Date de mise en circulation</span>
                                <input
                                    type="date"
                                    className="form-control"
                                    name="DPI"
                                    value={DPI}
                                    onChange={this.handleChange}
                                />
                            </div>
                            <button type="submit" className="btn btn-warning">Modifier</button>
                        </form>
                        <h2>Information personnel</h2>
                        <form onSubmit={this.handleUpdateUserInfo} className='formaddcov'>
                            <div className="input-group">
                                <span className="input-group-text">Nom</span>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="nom"
                                    value={this.state.nom || ""}
                                    onChange={this.handleChange}
                                />
                            </div>
                            <div className="input-group">
                                <span className="input-group-text">Prénom</span>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="prenom"
                                    value={this.state.prenom || ""}
                                    onChange={this.handleChange}
                                />
                            </div>
                            <div className="input-group">
                                <span className="input-group-text">Email</span>
                                <input
                                    type="email"
                                    className="form-control"
                                    name="email"
                                    value={this.state.email || ""}
                                    onChange={this.handleChange}
                                />
                            </div>
                            <div className="input-group">
                                <span className="input-group-text">Téléphone</span>
                                <input
                                    type="tel"
                                    className="form-control"
                                    name="telephone"
                                    value={this.state.telephone || ""}
                                    onChange={this.handleChange}
                                />
                            </div>
                            <div className="input-group">
                                <span className="input-group-text">Adresse</span>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="adresse"
                                    value={this.state.adresse || ""}
                                    onChange={this.handleChange}
                                />
                            </div>
                            <div className="input-group">
                                <span className="input-group-text">Status</span>
                                <select
                                    className="form-control"
                                    name="role_u"
                                    value={this.state.role_u}
                                    onChange={this.handleChange}
                                >
                                    <option value="">Seleccione un status</option>
                                    {Array.isArray(this.state.roles) && this.state.roles.map((role) => (
                                        <option key={role.ID} value={role.ID}>
                                            {role.role_uti}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <button type="submit" className="btn btn-warning">Modifier</button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default Addcovoi;