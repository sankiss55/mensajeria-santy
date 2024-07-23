<?php
session_start();
$usuario = isset($_SESSION['usuario']) ?  $_SESSION['usuario'] : "";
$sesion = isset($_SESSION['telefono']) ? "existe" : "no_existe";
?>
<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Chats santy</title>
    <link rel="stylesheet" href="styles/estiloindex.css">
    <script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400..900;1,400..900&family=Poppins:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet">
    <!-- Include CSS -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/alertifyjs/build/css/alertify.min.css" />
    <!-- Include JS -->
    <script src="https://cdn.jsdelivr.net/npm/alertifyjs/build/alertify.min.js"></script>
    <script src="https://cdn.tailwindcss.com"></script>
    <script>
        // Pasar variables PHP a JavaScript a través del DOM
        window.usuario = <?php echo json_encode($usuario); ?>;
        window.sesion = <?php echo json_encode($sesion); ?>;
    </script>
    <script src="js/index.js" defer ></script>
</head>



<body>
    <div id="divprincipal">
        <div id="divini">
            <nav>
                <button title="ve mas informacion del usuario"><img src="img/image.png" alt="usaurio"></button><br>
                <button title="cerrar sesion" onclick="cerrarsesion()"><img src="img/power_off_24dp_E8EAED_FILL0_wght400_GRAD0_opsz24.png" alt="salir"></button>
                <!-- perfiles a salir-->

            </nav>
            <section>
                <?php echo isset($_SESSION['telefono']) ? "<i> hola que tal biemvenido " . $_SESSION['nombre'] . "</i>" : ""; ?>
                <div class="div_busqueda">
                    <button>
                        <svg width="17" height="16" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="search">
                            <path d="M7.667 12.667A5.333 5.333 0 107.667 2a5.333 5.333 0 000 10.667zM14.334 14l-2.9-2.9" stroke="currentColor" stroke-width="1.333" stroke-linecap="round" stroke-linejoin="round"></path>
                        </svg>
                    </button>
                    <input id="busqueda" class="input" placeholder="Busca a mas usuario..." required="" type="text">
                    <button class="reset" type="reset">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                    </button>
                </div>
                <div id="divperfil">

                </div>
            </section>
            <main id="mainprincipal">
                <h3>HOLA, BIENVENIDO A NUESTRO PROGRAMA DE MENSAJERÍA S@NPROGR@MERVES</h3>
                <br>
                <p><i>ESPERAMOS QUE LES GUSTE Y LO PUEDAN DISFRUTAR Y USAR DE BUENA MANERA.</i></p>
                <i>ESTA ES UNA VERSIÓN BETA CON ALGUNOS ERRORES E INSUFICIENCIAS.</i>
            </main>
            <main id="mainsecundario">
                <header id="header"></header>
                <div id="divformmensajes">

                </div>
                <div id="partedelmesaje">
                    <textarea name="enviar msj" id="mensaje" placeholder="Ingresa tu mensaje aqui... "></textarea>
                    <button id="enviar_el_mensaje"><img src="img/send_24dp_000000_FILL0_wght400_GRAD0_opsz24.png" alt="enviar  mensaje"></button>
                </div>
            </main>
        </div>
    </div>

</body>

</html>