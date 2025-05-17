import './App.css';
import Contact from './Components/Contact'
import Connexion from './Components/Connexion'
import Covoiturage from './Components/Covoiturages'
import Registration from './Components/Registration';
import listsearch from './Components/listsearch';
import addcovoi from './Components/Addcovoi';
import EcoRide from './Images/Imageswebsite/EcoRide.png';
import Historique from './Components/Historique';
import qns from './Components/qns';
import cf from './Components/cf';

import { Route, BrowserRouter as Router, Routes, Link } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <div class="conteiner1">
            <nav class="navbar navbar-expand-lg bg-body-tertiary" id="bcn">
              <a href=""><img src={EcoRide} alt="Logo"></img></a>
              <div class="container-fluid">
                <Link class="navbar-brand" to={"/listsearch"}>HOME</Link>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                  <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" className="conteiner2" id="navbarNavDropdown">
                  <ul class="navbar-nav">
                    <li class="nav-item">
                      <Link class="nav-link active" aria-current="page" to={"/Covoiturage"}>COVOITURAGES</Link>
                    </li>
                    <li class="nav-item">
                      <Link class="nav-link" to={"/Connexion"}>CONNEXION</Link>
                    </li>
                    <li class="nav-item">
                      <Link class="nav-link" to={"/Contact"}>CONTACT</Link>
                    </li>
                    <li class="nav-item dropdown">
                      <Link class="nav-link dropdown-toggle" to={"#"} role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        À PROPOS DE NOUS
                      </Link>
                      <ul class="dropdown-menu">
                        <li><Link class="dropdown-item" to={"/qns"}>QUI SOMMES-NOUS ?</Link></li>
                        <li><Link class="dropdown-item" to={"/cf"}>COMMENT FONCTIONNE EcoRide ?</Link></li>
                      </ul>
                    </li>
                  </ul>
                </div>
              </div>
            </nav>
            <Routes>
              <Route path='/Contact' Component={Contact}></Route>
              <Route path='/Connexion' Component={Connexion}></Route>
              <Route path='/Covoiturage' Component={Covoiturage}></Route>
              <Route path='/Registration' Component={Registration}></Route>
              <Route path='/listsearch' Component={listsearch}></Route>
              <Route path='/Addcovoi' Component={addcovoi}></Route>
              <Route path='/Historique' Component={Historique}></Route>
              <Route path='/qns' Component={qns}></Route>
              <Route path='/cf' Component={cf}></Route>
            </Routes>
        </div>  
      </Router>
    </div>
  );
}
export default App;
