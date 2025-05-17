import React from 'react';
import Image1 from '../Images/Imageswebsite/image1.png'
import Seguridad from '../Images/Imageswebsite/Seguridad.png'

class Covoiturage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ville_depart: "",
            ville_arrive: "",
            date_depart: "",
            nb_place: "",
        };
    }

    handleChange = (e) => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    };

    handleSearch = (e) => {
        e.preventDefault();
        const { ville_depart, ville_arrive, date_depart, nb_place } = this.state;

        // Redirigir a listsearch con los parámetros de búsqueda
        const queryParams = new URLSearchParams({
            ville_depart,
            ville_arrive,
            date_depart, 
            nb_place,
        }).toString();

        window.location.href = `/listsearch?${queryParams}`;
    };
    render() {
        const { ville_depart, ville_arrive, date_depart, nb_place } = this.state;

        return (
            <div className='contcovoi'>
                <div className='contcovoi1'>
                    <div className='covimage'>
                        <img src={Image1} alt="iconlogin"></img>
                    </div>
                    <div className='contsearch'>
                        <form onSubmit={this.handleSearch} className='contsearch1'>
                            <div className="input-group mb-3" id='contbts'>
                                <span className="input-group-text">Ville de départ</span>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="ville_depart"
                                    value={ville_depart}
                                    onChange={this.handleChange}
                                    required
                                />
                            </div>
                            <div className="input-group mb-3" id='contbts'>
                                <span className="input-group-text">Ville de destination</span>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="ville_arrive"
                                    value={ville_arrive}
                                    onChange={this.handleChange}
                                    required
                                />
                            </div>
                            <div className="input-group mb-3" id='contbts'>
                                <span className="input-group-text">Date de départ</span>
                                <input
                                    type="date"
                                    className="form-control"
                                    name="date_depart"
                                    value={date_depart}
                                    onChange={this.handleChange}
                                />
                            </div>
                            <div className="input-group mb-3" id='contbts'>
                                <span className="input-group-text">Nombre de personnes</span>
                                <input
                                    type="number"
                                    className="form-control"
                                    name="nb_place"
                                    value={nb_place}
                                    onChange={this.handleChange}
                                    min="1"
                                    max="5"
                                />
                            </div>
                            <button type="submit" className="btn btn-success">Rechercher</button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default Covoiturage;