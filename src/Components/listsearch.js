import React from 'react';
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { Link } from "react-router-dom";
class listsearch extends React.Component {
   constructor(props) {
       super(props);
       this.state = {
           data: [], // Almacena los datos combinados
           loading: true, // Indica si los datos están cargando
           error: null, // Almacena errores
           OpenModal: false, // Controla si el modal está abierto
           selectedTrip: null, // Almacena los datos del viaje seleccionado
           filters: {
           voyeco: false,
           max_price: "",
           max_duration: "",
           },
       };
   }


   componentDidMount() {
       const queryParams = new URLSearchParams(window.location.search);
       const ville_depart = queryParams.get("ville_depart");
       const ville_arrive = queryParams.get("ville_arrive");
       const date_depart = queryParams.get("date_depart");
       const nb_place = queryParams.get("nb_place");


       this.fetchTrips({ ville_depart, ville_arrive, date_depart, nb_place });
   }


   fetchTrips = (filters) => {
       const queryParams = new URLSearchParams(filters).toString();
       fetch(`http://localhost/ECF0624/ExampleECF0624/ejemplo/src/DB/Interactiondb.php/?getCombinedData=1&${queryParams}`)
           .then(response => response.json())
           .then(data => {
               if (data.success === 0) {
                   this.setState({ error: data.message, loading: false });
               } else {
                   this.setState({ data, loading: false });
               }
           })
           .catch(error => {
               this.setState({ error: "Error al cargar los datos", loading: false });
           });
   };


   getTripDetails = (tripId) => {
       fetch('http://localhost/ECF0624/ExampleECF0624/ejemplo/src/DB/Interactiondb.php/?getTripDetails=1', {
           method: 'POST',
           headers: { 'Content-Type': 'application/json' },
           body: JSON.stringify({ covoiturage_id: tripId }),
       })
       .then(response => response.json())
       .then(data => {
           if (data.success === 0) {
               alert(data.message);
           } else {
               this.setState({ selectedTrip: data[0], OpenModal: true });
           }
       })
       .catch(error => console.error("Error fetching trip details:", error));
   };


   applyFilters = () => {
       const { filters } = this.state;
  
       // Obtener los parámetros de búsqueda inicial de la URL
       const queryParams = new URLSearchParams(window.location.search);
       const ville_depart = queryParams.get("ville_depart");
       const ville_arrive = queryParams.get("ville_arrive");
       const date_depart = queryParams.get("date_depart");
       const nb_place = queryParams.get("nb_place");
  
       // Construir el objeto de filtros
       const validFilters = {
           voyeco: filters.voyeco,
           max_price: filters.max_price ? parseFloat(filters.max_price) : null,
           max_duration: filters.max_duration ? parseFloat(filters.max_duration) : null,
           ville_depart,
           ville_arrive,
           date_depart,
           nb_place,
       };
  
       // Enviar los filtros al backend
       fetch('http://localhost/ECF0624/ExampleECF0624/ejemplo/src/DB/Interactiondb.php/?filterTrips=1', {
           method: 'POST',
           headers: { 'Content-Type': 'application/json' },
           body: JSON.stringify(validFilters),
       })
           .then(response => response.json())
           .then(data => {
               if (data.success === 0) {
                   this.setState({ error: data.message, loading: false });
               } else {
                   this.setState({ data, loading: false });
               }
           })
           .catch(error => {
               this.setState({ error: "Error al aplicar los filtros", loading: false });
           });
   };


   handleFilterChange = (e) => {
       const { name, value, type, checked } = e.target;
       this.setState((prevState) => ({
           filters: {
               ...prevState.filters,
               [name]: type === "checkbox" ? checked : value,
           },
       }));
   };


   handleReservation = (tripId) => {
       const userID = localStorage.getItem('userID');
  
       // Verificar si el usuario está autenticado
       if (!userID) {
           alert("Vous devez vous connecter pour réserver une place. Vous serez redirigé vers le formulaire de conection.");
           window.location.href = "/Connexion";
           return;
       }
  
       // Enviar la solicitud de reserva al backend
       fetch('http://localhost/ECF0624/ExampleECF0624/ejemplo/src/DB/Interactiondb.php/?reserveSeat=1', {
           method: 'POST',
           headers: { 'Content-Type': 'application/json' },
           body: JSON.stringify({ user_id: userID, covoiturage_id: tripId }),
       })
       .then(response => response.json())
       .then(data => {
           if (data.success) {
               alert(data.message);
               // Actualizar la lista de viajes para reflejar los cambios en los asientos disponibles
               this.fetchTrips();
           } else {
               alert(data.message);
           }
       })
       .catch(error => console.error("Error al reservar el asiento:", error));
   };


   handleOpenModal = (trip) => {
       this.setState({ OpenModal: !this.state.OpenModal, selectedTrip: trip });
   };


   render() {
       const { data, loading, error, OpenModal, selectedTrip, filters } = this.state;


       if (loading) {
           return <p>Cargando datos...</p>;
       }


       if (error) {
           return <p style={{ color: "red" }}>{error}</p>;
       }


       return (
           <div>
               {/* Filtros */}
               <div className='contfilters'>
                    <h5>Filters</h5>
                    <div className="filters">
                       <div className="form-check">
                           <input
                               type="checkbox"
                               className="form-check-input"
                               name="voyeco"
                               checked={filters.voyeco}
                               onChange={this.handleFilterChange}
                           />
                           <label className="form-check-label">Voyage ecologique (voiture electrique)</label>
                       </div>
                       <div className="input-group">
                           <span>Precio máximo</span>
                           <input
                               type="range"
                               name="max_price"
                               min="0"
                               max="100"
                               step="10"
                               value={filters.max_price}
                               onChange={this.handleFilterChange}
                           />
                           <span>{filters.max_price || 0} €</span>
                       </div>
                       <div className="input-group">
                           <span>Duración máxima (horas)</span>
                           <input
                               type="range"
                               name="max_duration"
                               min="0"
                               max="16"
                               step="1"
                               value={filters.max_duration}
                               onChange={this.handleFilterChange}
                           />
                           <span>{filters.max_duration || 0} h</span>
                       </div>
                       <button className="btn btn-primary" onClick={this.applyFilters}>Aplicar filtros</button>
                   </div>
                   {/* Lista de viajes */}
                   <div className='contlistsearch'>
                   {data.map((item, index) => (
                       <div className="card" id='contcard' key={index}>
                           <div className="card-body">
                               <h5 className="card-title">{item.pse}</h5>
                               <p className="card-text">
                                   Ville de départ: {item.ville_depart} <br />
                                   Ville d'arrivée: {item.ville_arrive} <br />
                                   Date de départ: {item.date_depart} <br />
                                   Heure de départ: {item.heure_depart} <br />
                                   Prix: {item.prix} € <br />
                                   Nombre de places: {item.nb_place} <br />
                               </p>
                               <Button onClick={() => this.getTripDetails(item.ID)} variant="primary">Details</Button>
                           </div>
                       </div>
                   ))}
                   </div>
               </div>
                  
               {/* Modal */}
               <Modal isOpen={this.state.OpenModal} toggle={() => this.handleOpenModal(null)}>
                   <ModalHeader>
                       Plus d'information sur le covoiturage
                   </ModalHeader>
                   <ModalBody>
                       {this.state.selectedTrip && (
                           <div className="card" id='contcard'>
                               <div className="card-body">
                                   <h5 className="card-title">Informations sur le conducteur</h5>
                                   <p className="card-text">
                                       Heure d'arrivée: {this.state.selectedTrip.heure_arrive} <br />
                                       Date d'arrivée: {this.state.selectedTrip.date_arrive} <br />
                                       Description: {this.state.selectedTrip.descrip} <br />
                                       Nombre de places: {this.state.selectedTrip.nb_place} <br />
                                       Fumeur: {this.state.selectedTrip.fumeur ? "Oui" : "Non"} <br />
                                       Animaux: {this.state.selectedTrip.animaux ? "Oui" : "Non"} <br />
                                       Voyage éco: {this.state.selectedTrip.voyeco ? "Oui" : "Non"} <br />
                                   </p>
                                   <h5 className="card-title">Informations sur le véhicule</h5>
                                   <p className="card-text">
                                       Modèle: {this.state.selectedTrip.voiture_modele || "Non disponible"} <br />
                                       Marque: {this.state.selectedTrip.voiture_marque || "Non disponible"} <br />
                                       Type d'énergie: {this.state.selectedTrip.voiture_energie || "Non disponible"} <br />
                                       Couleur: {this.state.selectedTrip.voiture_couleur || "Non disponible"} <br />
                                   </p>
                               </div>
                           </div>
                       )}
                   </ModalBody>
                   <ModalFooter>
                       <Button color="secondary" onClick={() => this.handleOpenModal(null)}>
                           Fermer
                       </Button>
                       <Link to="/listsearch">
                           <Button color="primary" onClick={() => this.handleReservation(this.state.selectedTrip.ID)} variant="success">
                               Réserver
                           </Button>
                       </Link>
                   </ModalFooter>
               </Modal>
           </div>
       );
   }
}


export default listsearch;