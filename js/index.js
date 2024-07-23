
var id_persona_remitente = null;

        var divformmensajes = document.getElementById("divformmensajes");
        var usuario = window.usuario;
        var sesion = window.sesion;
        alertify.set('notifier', 'position', 'bottom-center');

        document.addEventListener("DOMContentLoaded", function(evento) {
            traer_amgos();

            var body = document.getElementsByTagName("body")[0];
            var section = document.createElement("section");
            section.id = "iniciarsesion";
            if (sesion == "no_existe") {
                body.appendChild(section);
                var divprincipal = document.getElementById('divprincipal');
                divprincipal.style.pointerEvents = "none";
                iniciosesion();
            } else {
                var divprincipal = document.getElementById("divprincipal");
                divprincipal.style.opacity = "1";
            }

            function iniciosesion() {
                section.innerHTML = `
                    <p>Inicia sesión para mandar mensajes</p>
                    <br>
                     <label class="text-gray-600 text-sm">
                Ingresa tu numero de celular
            </label>
            <div  class="relative mt-2 max-w-xs text-gray-500">
                <input type="number" id="telefono" placeholder="+1 (555) 000-000" class="w-full pl-[4.5rem] pr-3 py-2 appearance-none bg-transparent outline-none border focus:border-slate-600 shadow-sm rounded-lg  bg-white">
            </div>
                    <br>
                    <label class="text-gray-600 text-sm">
                Ingresa tu contraseña
            </label>
                    <input type='password' id='contrasena' placeholder='Ingresa tu contraseña'>
                    <br>
                    <button id="ingresar">
  <span class="text">Ingresar</span>
  <svg class="arrow" viewBox="0 0 448 512" height="1em" xmlns="http://www.w3.org/2000/svg"><path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z"></path></svg>
</button>
                    <div id='divregis'><p><hr>o<hr></p></div>
                    <button id='Registrate'>Regístrate ahora</button>
                `;
                document.getElementById("ingresar").addEventListener("click", iniciarprograma);
                document.getElementById("Registrate").addEventListener("click", registrarse);
                document.getElementById("telefono").addEventListener("input", solo10);
            }

            function registrarse() {
                section.innerHTML = `
                    <p>Ingresa tu información</p>
                    <br>
                     <label class="text-gray-600 text-sm">
                Ingresa tu usuario
            </label>
                    <input type='text' id='nombre' placeholder='Ingresa tu usuario'>
                    <br>
                     <label class="text-gray-600 text-sm">
                Ingresa tu numero de celular
            </label>
                    <input type='number' id='telefono' placeholder='Ingresa tu número de celular'>
                    <br>
                     <label class="text-gray-600 text-sm">
                Ingresa tu contraseña
            </label>
                    <input type='password' id='contrasena' placeholder='Ingresa tu contraseña'>
                    <br>
                    <button id="registro">
  <span class="text">Registrate</span>
  <svg class="arrow" viewBox="0 0 448 512" height="1em" xmlns="http://www.w3.org/2000/svg"><path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z"></path></svg>
</button>
                    <div id='divregis'><p><hr>o<hr></p></div>
                    <button id='volverInicio'>Inicia sesión</button>
  `;
                document.getElementById("volverInicio").addEventListener("click", iniciosesion);
                document.getElementById("registro").addEventListener("click", registro);
                document.getElementById("telefono").addEventListener("keydown", solo10);
            }

            function iniciarprograma() {
                var telefono = document.getElementById("telefono").value;
                var contrasena = document.getElementById("contrasena").value;

                if (!telefono.trim() || !contrasena.trim()) {
                    alertify.error("Ingresa los datos para ingresar a tu sesión");
                    return;
                }
                axios.post("../php/acionesaxio.php", {
                    accion: "iniciarsesion",
                    telefono: telefono,
                    contrasena: contrasena
                }).then(function(respuesta) {
                   
                    console.log(respuesta.data);
                    window.location.reload();
                    var divprincipal = document.getElementById('divprincipal');
                    divprincipal.style.pointerEvents = "all";
                }).catch(function(error) {
                    console.log(error);
                    alertify.warning("Lo sentimos tuvimos problemas al buscar al usaurio intentelo mas tarde");
                });
            }

            function registro() {
                var telefono = document.getElementById("telefono").value;
                var contrasena = document.getElementById("contrasena").value;
                var nombre = document.getElementById("nombre").value;
                var telefono2 = document.getElementById("telefono");
                telefono2.value.length < 10 ? (telefono2.style.backgroundColor = "red", telefono2.style.color = "white"): (telefono2.style.backgroundColor = "white", telefono2.style.color = "black");
                if (!telefono.trim() || telefono2.value.length<10|| !contrasena.trim() || !nombre.trim()) {
                    alertify.error('Compreta los campos para poder registrarse ');
                    return;
                }
                axios.post("../php/acionesaxio.php", {
                    accion: "crearusuario",
                    telefono: telefono,
                    contrasena: contrasena,
                    usuario: nombre
                }).then(function(respuesta) {
                    console.log(respuesta.data);
                    iniciosesion();
                }).catch(function(error) {
                    console.log(error);
                });
            }
        });
        document.getElementById("busqueda").addEventListener("keyup", function() {
            if (this.value.length == 0) {
                traer_amgos();
                return;
            }
            axios.post("../php/acionesaxio.php", {
                accion: "busquedacontacto",
                busqueda: this.value
            }).then(function(respuesta) {
                console.log(respuesta.data);
                var perfiles = document.getElementById("divperfil");

                perfiles.innerHTML = "";

                for (const respuesta_dos of respuesta.data) {
                    var mensajes_no_leido = document.createElement("p");

                    mensajes_no_leido.value = 0;
                    mensajes_no_leido.id = "parrafo_" + respuesta_dos.id_usuario;
                    var boton = document.createElement("button");
                    boton.innerHTML = `<I>${respuesta_dos.nombre}</i><br><b>${respuesta_dos.telefono} </b>`;
                    Object.assign(boton, {
                        id: `${respuesta_dos.id_usuario}`,
                        className: "boton_amigos"
                    });

                    boton.addEventListener("click", function() {
                        accion_boton_perfiles(respuesta_dos, mensajes_no_leido);
                    });
                    boton.appendChild(mensajes_no_leido);
                    perfiles.appendChild(boton);

                }
            }).catch(function(error) {
                console.log(error);
            });

        });

        document.getElementById("enviar_el_mensaje").addEventListener("click", function() {
            var mensaje = document.getElementById("mensaje").value;
            var header = document.getElementsByTagName("header")[0];
            axios.post("../php/acionesaxio.php", {
                accion: "mandarmensajes",
                mensaje: mensaje,
                enviado_por: usuario,
                leido_o_no: false,
                remitente: id_persona_remitente
            }).then(function(respuesta) {
                console.log(respuesta.data);
                enviodemensajes(mensaje);
            }).catch(function(error) {
                console.log(error);
            });
        });

        function enviodemensajes(mensaje) {
            var borbuja_mensaje = document.createElement("div");
            borbuja_mensaje.className = "mensaje";
            borbuja_mensaje.innerHTML = "<p>" + mensaje + "</p>";
            divformmensajes.appendChild(borbuja_mensaje);
            divformmensajes.scrollTop = divformmensajes.scrollHeight;
        }

        function accion_boton_perfiles(respuesta_dos, mensajes_no_leido) {

            var mainsecundario = document.getElementById("mainsecundario");
            mainsecundario.style.display = "block";
            var mainprincipal = document.getElementById("mainprincipal");
            mainprincipal.style.display = "none";
            header.innerHTML = `<button>imagen del usuario</button><p>${respuesta_dos.nombre}</p>`;
            divformmensajes.innerHTML = "";
            id_persona_remitente = `${respuesta_dos.id_usuario}`;
            var mensajes_perfil = document.getElementById("divformmensajes");
            var nuevos_mensajes = document.getElementById("parrafo_" + respuesta_dos.id_usuario);

            mensajes_no_leido.textContent = "";
            var barranotificacion = document.createElement("p");
            barranotificacion.id = "barra_de_notificacion";
            barranotificacion.textContent = "TIENES " + nuevos_mensajes.value + " mensajes sin leer";
            let notificacionMostrada = false;
            axios.post("../php/acionesaxio.php", {
                accion: "traermensajes",
                usuario: usuario,
                remitente: id_persona_remitente
            }).then(function(respuesta) {
                console.log(respuesta.data);
                if (respuesta.data != 0) {
                    for (const mensajes_traidos of respuesta.data) {
                        if (mensajes_traidos.enviado_por == usuario) {

                            enviodemensajes(`<I>${mensajes_traidos.mensaje}</i>`);
                        } else {
                            if (!notificacionMostrada && nuevos_mensajes.value > 0 && mensajes_traidos.leido_o_no == 0) {
                                divformmensajes.appendChild(barranotificacion);
                                notificacionMostrada = true;
                            }
                            var borbuja_mensaje = document.createElement("div");
                            borbuja_mensaje.className = "mensaje_remitente";
                            borbuja_mensaje.innerHTML = `<I>${mensajes_traidos.mensaje}</i>`;


                            divformmensajes.appendChild(borbuja_mensaje);

                            console.log(borbuja_mensaje.scrollHeight);
                            if (!notificacionMostrada) {

                                divformmensajes.scrollTop = divformmensajes.scrollHeight;
                            }
                        }
                    }
                }
            }).catch(function(error) {
                console.log(error);
            });
        }
        document.getElementById("mensaje").addEventListener("input", function(evento) {
            const entrada = evento.target;

            if (entrada.value.length > 223) {
                entrada.value = entrada.value.slice(0, 223);

                alertify.error('EL MENSAJE YA TIENE MAS DE 225 CARACTERES');
                evento.stopPropagation();
            }
        });

        function traer_amgos() {
            axios.post("../php/acionesaxio.php", {
                accion: "traer_amgos",
                usuario: usuario,

            }).then(function(respuesta) {

                console.log(respuesta.data);
                var perfiles = document.getElementById("divperfil");
                perfiles.innerHTML = "";
                for (const respuesta_dos of respuesta.data) {


                    var mensajes_no_leido = document.createElement("p");

                    mensajes_no_leido.value = 0;
                    mensajes_no_leido.id = "parrafo_" + respuesta_dos.id_usuario;
                    var boton = document.createElement("button");
                    boton.innerHTML = `<I>${respuesta_dos.nombre}</i><br><b>telefono:${respuesta_dos.telefono} </b>`;
                    Object.assign(boton, {
                        id: `${respuesta_dos.id_usuario}`,
                        className: "boton_amigos"
                    });

                    boton.addEventListener("click", function() {
                        accion_boton_perfiles(respuesta_dos, mensajes_no_leido);
                    });
                    boton.appendChild(mensajes_no_leido);
                    perfiles.appendChild(boton);

                }

            }).catch(function(error) {

            });
        }
        setInterval(() => {
            axios.post("../php/acionesaxio.php", {
                accion: "buscar_mensajes",
                usuario: usuario
            }).then(function(respusta) {
                console.log(respusta.data);
                if (respusta.data != 0) {
                    for (const resultados of respusta.data) {

                        let boton = document.getElementById(resultados.enviado_por);
                        let mensaje_no_leidos = document.getElementById("parrafo_" + resultados.enviado_por);
                        mensaje_no_leidos.innerHTML = "mensajes no leidos:" + resultados.cantidad_no_leidos;
                        mensaje_no_leidos.value = resultados.cantidad_no_leidos;
                    }
                }

            }).catch(function(error) {
                console.log(error);
            });
        }, 1000);

        function cerrarsesion() {
            window.location.href = "php/cerrarsesion.php";

        }

        function solo10(evento) {
            const entrada = evento.target;
    if (entrada.value.length > 10) {
        entrada.value = entrada.value.slice(0, 10);
    }
        }