import React from 'react';

class UserHeader extends React.Component {
    handleLogout = () => {
        // Eliminar los datos del usuario de localStorage
        localStorage.removeItem('userID');
        localStorage.removeItem('pseudo');
        // Redirigir al usuario a la página de inicio de sesión
        window.location.href = "/connexion";
    };

    render() {
        const pseudo = localStorage.getItem('pseudo'); // Obtener el pseudo del usuario

        return (
               <header className="user-header">
                    <div className="user-info">
                        <h2>Bienvenue, {pseudo}</h2>
                    </div>
                    <div className='user-header-nav'>
                        <div>
                            <nav class="nav justify-content-center">
                            <a className="nav-link active" href="/historique">Historique de covoiturage</a>
                            </nav>  
                        </div>
                        <div>
                        <button className="btn btn-danger" onClick={this.handleLogout}>
                            Se déconnecter
                            </button> 
                        </div>
                    </div>
                </header> 
        );
    }
}

export default UserHeader;