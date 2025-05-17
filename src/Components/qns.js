import React from 'react';
import energy from '../Images/Imageswebsite/energy.png';
import group from '../Images/Imageswebsite/group.png';
import nocrash from '../Images/Imageswebsite/nocrash.png';

class qns extends React.Component {
    constructor(props) {
        super(props);
    }
    state = {  }
    render() { 
        return ( 
            <div className='containerqns'>
                <div className='qns1'>
                    <h1>🌱Notre mission</h1>
                    <p>EcoRide est une startup française née de la volonté de réduire l-impact 
                        environnemental des déplacements. Nous croyons que le covoiturage est une 
                        solution simple et efficace pour limiter les émissions de CO₂ tout en 
                        créant du lien entre les voyageurs. Notre objectif ? Devenir la 
                        plateforme de référence pour les trajets écologiques et économiques en voiture.</p>
                </div>
                <div className='qns1'>
                    <h1>🚗 Notre engagement</h1>
                    <p>Fondée par une équipe passionnée par l-innovation verte, 
                        EcoRide met tout en œuvre pour promouvoir une mobilité responsable. 
                        Chaque trajet partagé sur notre plateforme contribue à diminuer 
                        le nombre de voitures sur les routes, réduisant ainsi la pollution 
                        et les embouteillages.</p>
                </div>
                <div className='qns1'>
                    <h1>👥 La force de la communauté</h1>
                    <p>Chez EcoRide, nous valorisons la confiance et la convivialité. 
                        Notre plateforme sécurisée et intuitive permet aux conducteurs et 
                        passagers de voyager ensemble en toute sérénité, pour des trajets plus verts… 
                        et plus sociaux !</p>
                </div>
            </div>
         );
    }
}
 
export default qns;