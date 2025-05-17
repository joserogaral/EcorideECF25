CREATE DATABASE ecoride;
use ecoride;
    CREATE TABLE `voiture` (
    ID INT(11) NOT NULL AUTO_INCREMENT,
    modele INT(11),
    immatriculation VARCHAR(50),
    energie INT(50),
    couleur VARCHAR(50),
    DPI DATE,
    ID_utilisateur INT(11),
    FOREIGN KEY (modele) REFERENCES marque(ID),
    FOREIGN KEY (energie) REFERENCES energiev(ID),
    PRIMARY KEY (ID)
    )

    ALTER TABLE voiture
    ADD CONSTRAINT fk_utilisateur
    FOREIGN KEY (ID_utilisateur) REFERENCES utilisateur12(ID);

INSERT INTO `voiture` (modele, immatriculation, energie, couleur, DPI) VALUES ('2020', 'F00235', 'B', 'Rouge', '2020-02-02');

use ecoride;
    CREATE TABLE `marque`(
        ID INT(11) NOT NULL AUTO_INCREMENT,
        marquevoi VARCHAR(50),
        PRIMARY KEY(`ID`)
    )

use ecoride;
    CREATE TABLE `energiev`(
        ID INT(11) NOT NULL AUTO_INCREMENT,
        energievoi VARCHAR(50),
        PRIMARY KEY(`ID`)
    )

use ecoride;
    CREATE TABLE `covoiturage`(
    ID INT(11) NOT NULL AUTO_INCREMENT,
    date_depart DATE,
    heure_depart TIME,
    ville_depart VARCHAR(50),
    date_arrive DATE,
    heure_arrive TIME,
    ville_arrive VARCHAR(50),
    nb_place INT(50),
    prix DECIMAL(10, 2), -- Cambié el tipo de dato aquí directamente
    fumeur BOOLEAN,
    animaux BOOLEAN,
    descrip VARCHAR(50),
    voyeco BOOLEAN,
    pse VARCHAR(50),
    ID_codb INT(11),
    PRIMARY KEY(`ID`)
);

ALTER TABLE covoiturage
MODIFY COLUMN heure_depart TIME NOT NULL;

ALTER TABLE covoiturage
MODIFY COLUMN heure_arrive TIME NOT NULL;

ALTER TABLE covoiturage
MODIFY COLUMN prix DECIMAL(10, 2) NOT NULL;

use ecoride;
    CREATE TABLE `utilisateur1`(
        ID INT(11) NOT NULL AUTO_INCREMENT,
        nom VARCHAR(50),
        prenom VARCHAR(50),
        pseudo VARCHAR(50),
        email VARCHAR(50),
        telephone VARCHAR(50),
        password_id VARCHAR(50),
        adresse VARCHAR(50),
        date_naissance DATE,
        photo VARCHAR(50),
        role_u INT(11),
        n_places INT(11),
        FOREIGN KEY (role_u) REFERENCES role_uti(ID),
        PRIMARY KEY(`ID`)
    )

use ecoride;
    CREATE TABLE `utilisateur12`(
        ID INT(11) NOT NULL AUTO_INCREMENT,
        nom VARCHAR(50),
        prenom VARCHAR(50),
        pseudo VARCHAR(50),
        email VARCHAR(50),
        telephone VARCHAR(50),
        password_id VARCHAR(50),
        adresse VARCHAR(50),
        date_naissance DATE,
        photo VARCHAR(50),
        PRIMARY KEY(`ID`)
    )

use ecoride;
    ALTER TABLE utilisateur12
    ADD role_u INT(11);
    ALTER TABLE utilisateur12
    ADD CONSTRAINT fk_role_u FOREIGN KEY (role_u) REFERENCES role_uti(ID);

use ecoride;
    CREATE TABLE `role_uti`(
        ID INT(11) NOT NULL AUTO_INCREMENT,
        role_uti VARCHAR(50),
        PRIMARY KEY(`ID`)
    )

INSERT INTO `role_uti` (role_uti) VALUES ('Chofeur');
INSERT INTO `role_uti` (role_uti) VALUES ('Passager');
INSERT INTO `role_uti` (role_uti) VALUES ('Les deux');

use ecoride;
    CREATE TABLE `role`(
        ID INT(11) NOT NULL AUTO_INCREMENT,
        role_adem VARCHAR(50),
        PRIMARY KEY(`ID`)
    )

INSERT INTO `role` (role_adem) VALUES ('Administrateur');
INSERT INTO `role` (role_adem) VALUES ('Utilisateur');
INSERT INTO `role` (role_adem) VALUES ('Employée');

use ecoride;
    CREATE TABLE `reservation`(
    ID INT(11) NOT NULL AUTO_INCREMENT,
    date_reservation DATE,
    heure_reservation TIME,
    statut VARCHAR(50),
    utilisateur_id INT(11),
    covoiturage_id INT(11),
    PRIMARY KEY(`ID`),
    FOREIGN KEY (utilisateur_id) REFERENCES utilisateur12(ID),
    FOREIGN KEY (covoiturage_id) REFERENCES covoiturage(ID)
);

use ecoride;
    CREATE TABLE `avis`(
        ID INT(11) NOT NULL AUTO_INCREMENT,
        date_paiement DATE,
        avi VARCHAR(50),
        note VARCHAR(50),
        statut VARCHAR(50),
        utilisateur_id INT(11),
        covoiturage_id INT(11),
        PRIMARY KEY(`ID`)
    )

use ecoride;
    CREATE TABLE `parametre`(
        ID INT(11) NOT NULL AUTO_INCREMENT,
        propriete VARCHAR(50),
        valeur VARCHAR(50),
        PRIMARY KEY(`ID`)
    )

use ecoride;
    CREATE TABLE `configuration`(
        ID INT(11) NOT NULL AUTO_INCREMENT,
        PRIMARY KEY(`ID`)
    )

use ecoride;
    CREATE TABLE `message`(
        ID INT(11) NOT NULL AUTO_INCREMENT,
        date_envoi DATE,
        heure_envoi TIME,
        messagec VARCHAR(50),
        email VARCHAR(50),
        PRIMARY KEY(`ID`)
    )
        