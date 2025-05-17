import React from 'react';

class Historique extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            history: [],
            loading: true,
            error: null,
        };
    }

    componentDidMount() {
        const userID = localStorage.getItem('userID');
        fetch(`http://localhost/ECF0624/ExampleECF0624/ejemplo/src/DB/Interactiondb.php/?getUserHistory=1&user_id=${userID}`)
            .then(response => response.json())
            .then(data => {
                if (data.success === 0) {
                    this.setState({ error: data.message, loading: false });
                } else {
                    this.setState({ history: data, loading: false });
                }
            })
            .catch(error => this.setState({ error: "Error al cargar el historial", loading: false }));
    }

    render() {
        const { history, loading, error } = this.state;

        if (loading) return <p>Cargando historial...</p>;
        if (error) return <p style={{ color: "red" }}>{error}</p>;

        return (
            <div>
                <h2>Historique de covoiturage</h2>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Ville de départ</th>
                            <th>Ville d'arrivée</th>
                            <th>Date de départ</th>
                            <th>Prix</th>
                            <th>Nombre de places</th>
                        </tr>
                    </thead>
                    <tbody>
                        {history.map((item, index) => (
                            <tr key={index}>
                                <td>{item.ville_depart}</td>
                                <td>{item.ville_arrive}</td>
                                <td>{item.date_depart}</td>
                                <td>{item.prix} €</td>
                                <td>{item.nb_place}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default Historique;