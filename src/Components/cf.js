import React from 'react';

class cf extends React.Component {
    constructor(props) {
        super(props);
    }
    state = {  }
    render() { 
        return ( 
            <div className='containercf'>
                <div class="cf1">
                    <h1>1️⃣ Proposez ou recherchez un trajet</h1>
                    <p>Que vous soyez conducteur ou passager, inscrivez-vous gratuitement et indiquez vos trajets départ, -destination, horaires-. Notre algorithme vous suggère les meilleures correspondances.</p>
                </div>
                <div class="cf1">
                    <h1>2️⃣ Réservez en toute simplicité</h1>
                    <p>Choisissez le trajet qui vous convient, vérifiez les détails (prix, note du conducteur, options de confort) et validez votre réservation en quelques clics. Paiement sécurisé inclus !</p>

                </div>
                <div class="cf1">
                    <h1>3️⃣ Voyagez écolo et malin</h1>
                    <p>Rendez-vous au point de départ et profitez d’un trajet convivial. Après chaque voyage, notez votre expérience pour aider la communauté à grandir dans un esprit de transparence.</p>

                </div>
            </div>
         );
    }
}
 
export default cf;