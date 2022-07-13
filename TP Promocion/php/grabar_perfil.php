<?php
header('Content-type: application/json; charset=utf-8');	// el JS recupera un JSON

/// LOS DATOS SE ENVÍAN CON FORMDATA Y SE GRABAN EN UN JSON ///

$jsondata = array();
$jsondata['exito'] = false;
$mensajes = "";
$jsondata['documento'] = "";

// se recupera el nombre
if (isset($_POST['nombre']) && !empty($_POST['nombre'])) {
	$jsondata['nombre'] = basename($_POST['nombre']);	
	
	// se recupera el documento
	if (isset($_POST['documento']) && !empty($_POST['documento'])) {
		$jsondata['documento'] = $_POST['documento'];
		
		// se recupera el apellido
		if (isset($_POST['apellido']) && !empty($_POST['apellido'])) {
			$jsondata['apellido'] = $_POST['apellido'];

		    // se recupera el mail
			if (isset($_POST['mail']) && !empty($_POST['mail'])) {
				$jsondata['mail'] = $_POST['mail'];
	
				// se recupera el tipo de documento
				if (isset($_POST['tipo_doc']) && !empty($_POST['tipo_doc'])) {
					$jsondata['tipo_doc'] = $_POST['tipo_doc'];

					// se recupera la fecha de nacimiento
					if (isset($_POST['fecha_nac']) && !empty($_POST['fecha_nac'])) {
						$jsondata['fecha_nac'] = $_POST['fecha_nac'];

						// se recupera el puesto
						if (isset($_POST['puesto']) && !empty($_POST['puesto'])) {
							$jsondata['puesto'] = $_POST['puesto'];

							// creo el archivo con los datos de la persona
		                    $archivo = fopen("../datos_inscriptos/".$jsondata['tipo_doc']."_".$jsondata['documento'].".json", "w");

		                    // paso los datos de formato array a json
		                    $datos = json_encode($jsondata);

		                    fwrite($archivo, $datos);	// grabo los datos en el archivo
		                    fclose($archivo);			// cierro el archivo

							if (isset($_FILES['foto']) && $_FILES['foto']['size']>0 && $_FILES['foto']['size']<512000)  {
								// se arma el nombre de la foto subida
								$f_nombre 		= 'foto_'.$jsondata['documento'].'.'.pathinfo($_FILES['foto']['name'], PATHINFO_EXTENSION);
								$f_tipo 		= $_FILES['foto']['type'];
								$f_nombre_temp 	= $_FILES['foto']['tmp_name'];
								$f_error 		= $_FILES['foto']['error'];
								$f_tamanio 		= $_FILES['foto']['size'];
								
								if ($f_error > 0) {
									if ($f_error == 4)
										$mensajes .= "No se subió ningún archivo<br>";	
									else
										$mensajes .= "Código de Error: " . $f_error . "<br>";
								} 
								else {
									$target_path = "../fotos/".$f_nombre; 
							
									if(move_uploaded_file($f_nombre_temp, $target_path)) {
										$jsondata['exito'] = true;	
									} 
									$jsondata['tamanio_img'] = (int)($f_tamanio/1024) . ' KB';
								}
							} else {
								$jsondata['exito'] = true;	
							}

							if (isset($_FILES['curriculum']) && $_FILES['curriculum']['size']>0)  {
								// se arma el nombre del curriculum subido
								$cv_nombre 		= 'cv_'.$jsondata['documento'].'.'.pathinfo($_FILES['curriculum']['name'], PATHINFO_EXTENSION);
								$cv_tipo 		= $_FILES['curriculum']['type'];
								$cv_nombre_temp = $_FILES['curriculum']['tmp_name'];
								$cv_error 		= $_FILES['curriculum']['error'];
								$cv_tamanio 	= $_FILES['curriculum']['size'];
								
								if ($cv_error > 0) {
									if ($cv_error == 4)
										$mensajes .= "No se subió ningún archivo<br>";	
									else
										$mensajes .= "Código de Error: " . $cv_error . "<br>";
								} 
								else {
									$target_path = "../cv/".$cv_nombre;
							
									if(move_uploaded_file($cv_nombre_temp, $target_path)) {
										$jsondata['exito'] = true;	
									} 
								
									$jsondata['tamanio_cv'] = (int)($cv_tamanio/1024) . ' KB';
								}
							} else {
								$jsondata['exito'] = true;	
							}
							
						}
			
						
					}
		
					
				}

			}

		}
		
	}
	
}


$jsondata['mensajes'] = $mensajes;

echo json_encode($jsondata);

exit();
?>