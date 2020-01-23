# educArg
##  Funcionalidades

- Loguearse: ✔

- Registrarse:  ✔

- Cargar Post: ✔ (Podemos recomendar la resolucion y/o Medida proporcional)

- Perfil: Editar info ✔ | Cambiar contraseña ✔ -> redireccionar a login y probar su nueva contraseña ✔ 
- Perfil 2.0 : Validar y mostrar error de contraseña incorrecta 🔘🔘🔘 {ayuda: si viene con unn array vacio mostrar informacion invalida, podriamos preguntar por el mail primero y luego por la coincidencia total}

- Se le debe presentar Dos Botones abajo => Uno  con el ejercicios que compro 🔘 
- |-> Deberia cargar todos los IDs de las soluciones que compro en botones ue redirigen al post ✔ 
- El otro Publicados |-> Debe aparecer el estado pendiente/OK/Denegado ✔ 

- Comprar Salvavidas:5 ,10 y 100  ✔

- El usuario debe poder comprar la solucion de un ejercicio | Solo si tiene salvavidas disponibles(Pendiente creo que falta cuando tenga 0 ponner un aviso de saldo insuficiente ✔

- El usuario no debe comprar dos veces el mismo ejercicio si lo compro desabiliar el botom de comprar y cargar la solucion: Posible solucion:: Si estoy logueado en el onInit() del componte postejercicio if(loguado){cargar de la tabla intermedia si tengo el ejercicio(req.id, req.param.id_post)} ✔✔

- Al momento de comprar> pedir a la base info del usuario JWT me traigo su cant de salvavidas y lo comparo: ✔
if( saldo < Precio){
    le boto un alert sweet de no tiene suficiente/Mensaje del saldo actual = 0 : 🔘  
}else{ : ✔
    el procedimiento habitual de comprar
    redireccionar al perfil
}


- |---> Un Buscador por ID del ejercicio en el Navbar: ✔ / [curiosidad] al pasar de una vista a otra desde el navbar no recarga la pagina si no el componente y eso no trae de nuevo 🔘 `AYUDA`:Probar el recargar la pagina despues de la redireccion con la sentencia `location.reload(); que se uso en el componente pendientes`



## |--------------> Implementaciones secundarias
- El usuario deberia cargar una solucion al ejercicio si no tiene solucion: ✔
- Se deberia quitar el botom de (comprar solucion/cambiarlo por uno que diga Subir Solucion:-> Esto desOculta El input file {solucion} de un formulario) ✔

- Se debe crear una tabla intermedia usuario_soluciones: ✔
id_solucion int incremental
id_user_solucion int(unique)
id_post int (unique , con lo de arriba)//Esto lo podemos validar al hacer una llamada al back :preguntando si continuan
estado inicial [0:pendiente/1:Aprobado/2:Rechazado]
respuesta [Por defecto: Revision Pendiente] ✔

- Cuando un Usuario Carga una solucion a un determinado post y/o un usuario sube un problema con solucion se inserta un elemento a la tabla de arriba: ✔


- Añadir un Botom al usuario que diga resueltos igual que comprados ✔


### EL ADMIN
##### PENDIENTES >  posts Otro botom Soluciones Solo que le muestre la foto de la solucion y el id del post
- Le debe mostrar pendientes osea los de estado 0 y los pendientes de las solucione: ✔
- El admi debe poder modificar el post / en este caso modificar la solucion y/o el enunciado solamente: ✔
- Ademas del estado/No se podra eliminar porque queda el registro para los usuarios que fueron rechazados: ✔


__________________________________________________________________________________________________
## Algunos bugs 
Pueden suceder por la `expiracion del JWT`  => Solucion desloguear y volver a  `loguearse`
__________________________________________________________________________________________________
### Visual Studio Code
#### Localizar e ir a cualquier cosa de manera inmediata
En Visual Studio Code:      `Ctrl + T`

#### Comentarios
Comentar : Seleccionar   +     `Ctrl + K + C`
<br>
Descomentar : Seleccionar   +     `Ctrl + K + U`


#### Actualizar el .apib
aglio -i documentation.apib -o documentation.html

#### Config del env
- DB_HOST = "localhost" 
- DB_USER ="root" 
- DATABADE_PORT = "3306" 
- DB_PASSWORD = ""
- DB_DATABASE = "tpelearning"

<br>

- TABLA_CURSOS = "cursos" 
- TABLA_POST = "posts" 
- TABLA_USUARIOS = "usuarios" 
- TABLA_SOLUCION_COMPRADAS = "soluciones_compradas"

<br>

- URL="localhost:3000/"

