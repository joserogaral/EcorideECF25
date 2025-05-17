<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: GET,POST");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");


// Conecta a la base de datos  con usuario, contraseña y nombre de la BD
$server = "localhost"; 
$user = "root";  
$passworddb = ""; 
$database = "ecoride";
$conectionBD = new mysqli($server, $user, $passworddb, $database);



//Inserta un nuevo registro y recepciona en método post los datos de nombre y correo
if (isset($_GET["adduser"])) {
    $dataadduser = json_decode(file_get_contents("php://input"));
    $name = $dataadduser->nom;
    $lastname = $dataadduser->prenom;
    $email = $dataadduser->email;
    $pseudo = $dataadduser->pseudo;
    $phone = $dataadduser->telephone;
    $pass = $dataadduser->password_id;
    $adresse = $dataadduser->adresse;
    $birthdate = $dataadduser->date_naissance;

    if (!empty($name) && !empty($lastname) && !empty($email)) {
        $sql = "INSERT INTO utilisateur12 (nom, prenom, pseudo, email, password_id, telephone, adresse, date_naissance) 
                VALUES ('$name', '$lastname', '$pseudo', '$email', '$pass', '$phone', '$adresse', '$birthdate')";

        if (mysqli_query($conectionBD, $sql)) {
            $userID = mysqli_insert_id($conectionBD); // Obtén el último ID insertado
            echo json_encode(["success" => true, "userID" => $userID]);
        } else {
            echo json_encode(["success" => false, "message" => "Error al insertar el usuario: " . mysqli_error($conectionBD)]);
        }
    } else {
        echo json_encode(["success" => false, "message" => "Todos los campos son obligatorios"]);
    }
    exit();
}

if (isset($_GET['addCar'])) {
    $input = json_decode(file_get_contents("php://input"), true);
    error_log(print_r($input, true)); // Depuración: Verifica los datos recibidos

    $modele = trim($input['modele'] ?? '');
    $immatriculation = trim($input['immatriculation'] ?? '');
    $energie = trim($input['energie'] ?? '');
    $couleur = trim($input['couleur'] ?? '');
    $DPI = trim($input['DPI'] ?? '');
    $user_id = trim($input['user_id'] ?? '');

    if (!empty($modele) && !empty($immatriculation) && !empty($energie) && !empty($couleur) && !empty($DPI) && !empty($user_id)) {
        $sqladdc = "INSERT INTO voiture (modele, immatriculation, energie, couleur, DPI, ID_utilisateur) 
                    VALUES ('$modele', '$immatriculation', '$energie', '$couleur', '$DPI', '$user_id')";

        if (mysqli_query($conectionBD, $sqladdc)) {
            echo json_encode(["success" => 1, "message" => "Auto agregado exitosamente"]);
        } else {
            echo json_encode(["success" => 0, "message" => "Error al agregar el auto: " . mysqli_error($conectionBD)]);
        }
    } else {
        echo json_encode(["success" => 0, "message" => "Todos los campos son obligatorios"]);
    }
    exit();
}



// Verifica slas credenciales log-in
if(isset($_GET["login"])){
    $data = json_decode(file_get_contents("php://input"));
    $email = $data->email;
    $password = $data->password;
    
    $sql = "SELECT ID, pseudo FROM utilisateur12 WHERE email = '$email' AND password_id = '$password'";
    $result = mysqli_query($conectionBD, $sql);
    
    if(mysqli_num_rows($result) > 0){
        $user = mysqli_fetch_assoc($result);
        echo json_encode([
            "success" => 1,
            "message" => "Login exitoso",
            "userID" => $user['ID'],
            "pseudo" => $user['pseudo']
        ]);
    } else {
        echo json_encode(["success" => 0, "message" => "Email o contraseña incorrectos"]);
    }
    exit();
}
  

if (isset($_GET["getCombinedData"])) {
    $ville_depart = isset($_GET["ville_depart"]) ? $_GET["ville_depart"] : null;
    $ville_arrive = isset($_GET["ville_arrive"]) ? $_GET["ville_arrive"] : null;
    $date_depart = isset($_GET["date_depart"]) ? $_GET["date_depart"] : null;
    $nb_place = isset($_GET["nb_place"]) ? $_GET["nb_place"] : null;

    $sql = "SELECT 
                c.*, 
                v.modele AS voiture_modele, 
                m.marquevoi AS voiture_marque, 
                e.energievoi AS voiture_energie, 
                v.couleur AS voiture_couleur
            FROM covoiturage c
            LEFT JOIN voiture v ON c.ID_codb = v.ID_utilisateur
            LEFT JOIN marque m ON v.modele = m.ID
            LEFT JOIN energiev e ON v.energie = e.ID
            WHERE 1=1";

    // Agregar filtros dinámicamente
    if (!empty($ville_depart)) {
        $sql .= " AND c.ville_depart LIKE '%$ville_depart%'";
    }
    if (!empty($ville_arrive)) {
        $sql .= " AND c.ville_arrive LIKE '%$ville_arrive%'";
    }
    if (!empty($date_depart)) {
        $sql .= " AND c.date_depart = '$date_depart'";
    }
    if (!empty($nb_place)) {
        $sql .= " AND c.nb_place >= '$nb_place'";
    }

    $result = mysqli_query($conectionBD, $sql);

    if (mysqli_num_rows($result) > 0) {
        $data = mysqli_fetch_all($result, MYSQLI_ASSOC);
        echo json_encode($data);
    } else {
        echo json_encode([
            "success" => 0,
            "message" => "Nous ne trouvons actuellement aucun voyage présentant ces caractéristiques. Essayez de modifier la date pour trouver plus d'options."
        ]);
    }
    exit();
}

if (isset($_GET["getTripDetails"])) {
    $datagtd = json_decode(file_get_contents("php://input"));
    $covoiturage_id = $datagtd->covoiturage_id;

    $sqlgtd = "SELECT 
                c.*, 
                a.avi, 
                a.note, 
                a.statut AS avis_statut, 
                v.modele AS voiture_modele, 
                m.marquevoi AS voiture_marque, 
                e.energievoi AS voiture_energie, 
                v.couleur AS voiture_couleur
            FROM covoiturage c
            LEFT JOIN voiture v ON c.ID_codb = v.ID_utilisateur
            LEFT JOIN marque m ON v.modele = m.ID
            LEFT JOIN energiev e ON v.energie = e.ID
            LEFT JOIN avis a ON c.ID = a.covoiturage_id
            WHERE c.ID = '$covoiturage_id'";

    $resultgtd = mysqli_query($conectionBD, $sqlgtd);

    if (mysqli_num_rows($resultgtd) > 0) {
        $datagtd = mysqli_fetch_all($resultgtd, MYSQLI_ASSOC);
        echo json_encode($datagtd);
    } else {
        echo json_encode(["success" => 0, "message" => "No se encontraron datos para el viaje seleccionado"]);
    }
    exit();
}


// Obtener los datos de la tabla `marque`
if (isset($_GET["getMarques"])) {
    $sql = "SELECT ID, marquevoi FROM marque";
    $result = mysqli_query($conectionBD, $sql);

    if (mysqli_num_rows($result) > 0) {
        $data = mysqli_fetch_all($result, MYSQLI_ASSOC);
        echo json_encode($data);
    } else {
        echo json_encode(["success" => 0, "message" => "No se encontraron marcas"]);
    }
    exit();
}

if (isset($_GET["getEnergies"])) {
    $sql = "SELECT ID, energievoi FROM energiev";
    $result = mysqli_query($conectionBD, $sql);

    if (mysqli_num_rows($result) > 0) {
        $data = mysqli_fetch_all($result, MYSQLI_ASSOC);
        echo json_encode($data);
    } else {
        echo json_encode(["success" => 0, "message" => "No se encontraron tipos de energía"]);
    }
    exit();
}

if(isset($_GET["addCovoiturage"])){
    $data = json_decode(file_get_contents("php://input"));
    $ville_depart = $data->ville_depart;
    $ville_arrive = $data->ville_arrive;
    $heure_depart = $data->heure_depart;
    $heure_arrive = $data->heure_arrive;
    $date_depart = $data->date_depart;
    $date_arrive = $data->date_arrive;
    $descrip = $data->descrip;
    $prix = $data->prix;
    $nb_place = $data->nb_place;
    $fumeur = $data->fumeur ? 1 : 0;
    $animaux = $data->animaux ? 1 : 0;
    $voyeco = $data->voyeco ? 1 : 0;
    $user_id = $data->user_id;
    $pseudo = $data->pseudo;

    if(($ville_depart != "") && ($ville_arrive != "")){
        $sql = "INSERT INTO covoiturage (ville_depart, ville_arrive, heure_depart, heure_arrive, date_depart, date_arrive, descrip, prix, nb_place, fumeur, animaux, voyeco, ID_codb, pse) 
                VALUES ('$ville_depart', '$ville_arrive', '$heure_depart', '$heure_arrive', '$date_depart', '$date_arrive', '$descrip', '$prix', '$nb_place', '$fumeur', '$animaux', '$voyeco', '$user_id', '$pseudo')";
        mysqli_query($conectionBD, $sql);
        echo json_encode(["success" => 1]);
    } else {
        echo json_encode(["success" => 0, "message" => "Error al agregar el trayecto"]);
    }
    exit();
}

if (isset($_GET["filterTrips"])) {
    $data = json_decode(file_get_contents("php://input"));
    $voyeco = isset($data->voyeco) ? $data->voyeco : null; // Filtro de viaje ecológico
    $max_price = isset($data->max_price) ? $data->max_price : null; // Precio máximo
    $max_duration = isset($data->max_duration) ? $data->max_duration : null; // Duración máxima en horas
    $ville_depart = isset($data->ville_depart) ? $data->ville_depart : null;
    $ville_arrive = isset($data->ville_arrive) ? $data->ville_arrive : null;
    $date_depart = isset($data->date_depart) ? $data->date_depart : null;
    $nb_place = isset($data->nb_place) ? $data->nb_place : null;

    // Construir la consulta SQL dinámicamente
    $sql = "SELECT 
                c.*, 
                v.modele AS voiture_modele, 
                m.marquevoi AS voiture_marque, 
                e.energievoi AS voiture_energie, 
                v.couleur AS voiture_couleur
            FROM covoiturage c
            LEFT JOIN voiture v ON c.ID_codb = v.ID_utilisateur
            LEFT JOIN marque m ON v.modele = m.ID
            LEFT JOIN energiev e ON v.energie = e.ID
            WHERE 1=1";

    // Agregar filtros de búsqueda inicial
    if (!empty($ville_depart)) {
        $sql .= " AND c.ville_depart LIKE '%$ville_depart%'";
    }
    if (!empty($ville_arrive)) {
        $sql .= " AND c.ville_arrive LIKE '%$ville_arrive%'";
    }
    if (!empty($date_depart)) {
        $sql .= " AND c.date_depart = '$date_depart'";
    }
    if (!empty($nb_place)) {
        $sql .= " AND c.nb_place >= '$nb_place'";
    }

    // Agregar filtros adicionales
    if ($voyeco !== null && $voyeco) {
        $sql .= " AND c.voyeco = 1 AND e.energievoi = 'Electrique'";
    }
    if ($max_price !== null && is_numeric($max_price)) {
        $sql .= " AND c.prix <= '$max_price'";
    }
    if ($max_duration !== null && is_numeric($max_duration)) {
        $sql .= " AND TIMESTAMPDIFF(HOUR, c.heure_depart, c.heure_arrive) <= '$max_duration'";
    }

    $result = mysqli_query($conectionBD, $sql);

    if (mysqli_num_rows($result) > 0) {
        $data = mysqli_fetch_all($result, MYSQLI_ASSOC);
        echo json_encode($data);
    } else {
        echo json_encode(["success" => 0, "message" => "No se encontraron viajes que coincidan con los filtros"]);
    }
    exit();
}

if (isset($_GET["reserveSeat"])) {
    $datarev = json_decode(file_get_contents("php://input"));
    $user_id = $datarev->user_id;
    $covoiturage_id = $datarev->covoiturage_id;

    // Verificar si el usuario está autenticado
    if (empty($user_id)) {
        echo json_encode(["success" => 0, "message" => "Debe iniciar sesión para reservar un asiento."]);
        exit();
    }

    // Verificar si hay asientos disponibles
    $sqlCheckSeats = "SELECT nb_place FROM covoiturage WHERE ID = '$covoiturage_id'";
    $result = mysqli_query($conectionBD, $sqlCheckSeats);
    if (mysqli_num_rows($result) > 0) {
        $row = mysqli_fetch_assoc($result);
        if ($row['nb_place'] > 0) {
            // Reducir el número de asientos disponibles
            $sqlReserve = "UPDATE covoiturage SET nb_place = nb_place - 1 WHERE ID = '$covoiturage_id'";
            mysqli_query($conectionBD, $sqlReserve);

            // Registrar la reserva en la tabla `reservation`
            $sqlInsertReservation = "INSERT INTO reservation (date_reservation, heure_reservation, statut, utilisateur_id, covoiturage_id) 
                                      VALUES (NOW(), NOW(), 'Confirmée', '$user_id', '$covoiturage_id')";
            mysqli_query($conectionBD, $sqlInsertReservation);

            echo json_encode(["success" => 1, "message" => "Reserva realizada con éxito."]);
        } else {
            echo json_encode(["success" => 0, "message" => "No hay asientos disponibles para este viaje."]);
        }
    } else {
        echo json_encode(["success" => 0, "message" => "El viaje no existe."]);
    }
    exit();
}

if (isset($_GET["getUserHistory"])) {
    $user_id = $_GET["user_id"];

    $sql = "SELECT c.*, 
                   v.modele AS voiture_modele, 
                   m.marquevoi AS voiture_marque, 
                   e.energievoi AS voiture_energie, 
                   v.couleur AS voiture_couleur
            FROM covoiturage c
            LEFT JOIN voiture v ON c.ID_codb = v.ID_utilisateur
            LEFT JOIN marque m ON v.modele = m.ID
            LEFT JOIN energiev e ON v.energie = e.ID
            WHERE c.ID_codb = '$user_id' OR c.ID IN (
                SELECT covoiturage_id FROM reservation WHERE utilisateur_id = '$user_id'
            )";

    $result = mysqli_query($conectionBD, $sql);

    if (mysqli_num_rows($result) > 0) {
        $datahis = mysqli_fetch_all($result, MYSQLI_ASSOC);
        echo json_encode($datahis);
    } else {
        echo json_encode(["success" => 0, "message" => "No se encontraron covoiturages"]);
    }
    exit();
}

if (isset($_GET["getRoles"])) {
    $sql = "SELECT ID, role_uti FROM role_uti";
    $result = mysqli_query($conectionBD, $sql);

    if (mysqli_num_rows($result) > 0) {
        $data = mysqli_fetch_all($result, MYSQLI_ASSOC);
        echo json_encode($data);
    } else {
        echo json_encode(["success" => 0, "message" => "No se encontraron roles"]);
    }
    exit();
}

if (isset($_GET["getMarques"])) {
    $sql = "SELECT ID, marquevoi FROM marque";
    $result = mysqli_query($conectionBD, $sql);

    if (mysqli_num_rows($result) > 0) {
        $data = mysqli_fetch_all($result, MYSQLI_ASSOC);
        echo json_encode($data);
    } else {
        echo json_encode(["success" => 0, "message" => "No se encontraron marcas"]);
    }
    exit();
}

if (isset($_GET["getUserInfo"])) {
    $user_id = $_GET["user_id"];
    $sqlinfo = "SELECT * FROM utilisateur12 WHERE ID = '$user_id'";
    $resultinfo = mysqli_query($conectionBD, $sqlinfo);

    if (mysqli_num_rows($resultinfo) > 0) {
        $datainfo = mysqli_fetch_assoc($resultinfo);
        echo json_encode($datainfo);
    } else {
        echo json_encode(["success" => 0, "message" => "Usuario no encontrado"]);
    }
    exit();
}

if (isset($_GET["updateUserInfo"])) {
    $dataupfo = json_decode(file_get_contents("php://input"));
    $user_id = $dataupfo->user_id;
    $nom = $dataupfo->nom;
    $prenom = $dataupfo->prenom;
    $email = $dataupfo->email;
    $telephone = $dataupfo->telephone;
    $adresse = $dataupfo->adresse;
    $status = $dataupfo->role_u;

    $sqlupfo = "UPDATE utilisateur12 SET nom='$nom', prenom='$prenom', email='$email', telephone='$telephone', adresse='$adresse', role_u='$status'  WHERE ID='$user_id'";
    if (mysqli_query($conectionBD, $sqlupfo)) {
        echo json_encode(["success" => 1, "message" => "Información actualizada"]);
    } else {
        echo json_encode(["success" => 0, "message" => "Error al actualizar la información"]);
    }
    exit();
}

if (isset($_GET["getUserCar"])) {
    $user_id = $_GET["user_id"];
    $sql = "SELECT * FROM voiture WHERE ID_utilisateur = '$user_id'";
    $result = mysqli_query($conectionBD, $sql);

    if (mysqli_num_rows($result) > 0) {
        $data = mysqli_fetch_assoc($result);
        echo json_encode(["hasCar" => true, "car" => $data]);
    } else {
        echo json_encode(["hasCar" => false, "message" => "No se encontró un coche registrado"]);
    }
    exit();
}

if (isset($_GET["updateCar"])) {
    $data = json_decode(file_get_contents("php://input"));
    $user_id = $data->user_id;
    $modele = $data->modele;
    $immatriculation = $data->immatriculation;
    $energie = $data->energie;
    $couleur = $data->couleur;
    $DPI = $data->DPI;

    $sql = "UPDATE voiture SET modele='$modele', immatriculation='$immatriculation', energie='$energie', couleur='$couleur', DPI='$DPI' WHERE ID_utilisateur='$user_id'";
    if (mysqli_query($conectionBD, $sql)) {
        echo json_encode(["success" => 1, "message" => "Información del coche actualizada"]);
    } else {
        echo json_encode(["success" => 0, "message" => "Error al actualizar la información del coche"]);
    }
    exit();
}

if (isset($_GET["addContactMessage"])) {
    $datam = json_decode(file_get_contents("php://input"));
    $message = $datam->message;
    $daym = date("Y-m-d");
    $timem = date("H:i:s");
    $email = $datam->email;


    if (!empty($email) && !empty($message)) {
        $sqlm = "INSERT INTO message (email, messagec, heure_envoi, date_envoi) VALUES ('$email', '$message', '$timem', '$daym')";
        if (mysqli_query($conectionBD, $sqlm)) {
            echo json_encode(["success" => 1, "message" => "Mensaje enviado con éxito"]);
        } else {
            echo json_encode(["success" => 0, "message" => "Error al guardar el mensaje: " . mysqli_error($conectionBD)]);
        }
    } else {
        echo json_encode(["success" => 0, "message" => "Todos los campos son obligatorios"]);
    }
    exit();
}


//$sqluser3 = mysqli_query($conectionBD,"//SELECT * FROM utilisateur12");
//if(mysqli_num_rows($sqluser3) > 0){
    $newuser = mysqli_fetch_all($sqluser3,MYSQLI_ASSOC);
    echo json_encode($newuser);
//}
//else{ echo json_encode([["success"=>0]]); }

?>