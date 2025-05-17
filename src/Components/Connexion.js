import React from 'react';

class Connexion extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            errorMessage: "",
        };
    }

    handleChange = (e) => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    };

    handleSubmit = async (e) => {
        e.preventDefault();
        const { email, password } = this.state;
        console.log(email, password);

        try {
            const response = await fetch('http://localhost/ECF0624/ExampleECF0624/ejemplo/src/DB/Interactiondb.php?login=1', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (data.success) {
                localStorage.setItem('userID', data.userID);
                localStorage.setItem('pseudo', data.pseudo);
                alert(data.message);
                window.location.href = "/addcovoi"; // Redirigir al usuario
            } else {
                this.setState({ errorMessage: data.message });
            }
        } catch (error) {
            this.setState({ errorMessage: "Error al iniciar sesión. Inténtalo de nuevo." });
        }
    };

    render() {
        const { email, password, errorMessage } = this.state;

        return (
            <div className='contconnexion'>
                <form className='formconnexion' onSubmit={this.handleSubmit}>
                    <div className='logoconnexion'>
                        <strong><label htmlFor="email" className="form-label">Se connecter</label></strong>
                    </div>
                    {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input
                            type="email"
                            className="form-control"
                            id="email"
                            name="email"
                            value={email}
                            onChange={this.handleChange}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input
                            type="password"
                            className="form-control"
                            id="password"
                            name="password"
                            value={password}
                            onChange={this.handleChange}
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-success">Connecter</button>
                    <a href="/Registration">Vous n'avez pas encore de compte ? S'inscrire</a>
                </form>
            </div>
        );
    }
}

export default Connexion;