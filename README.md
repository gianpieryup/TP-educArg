# educArg
##  Funcionalidades

- Loguearse: ✔

- Registrarse:  ✔

- Cargar Post: ✔ (Podemos recomendar la resolucion y/o Medida proporcional)

- Perfil: Editar info ✔ | Cambiar contraseña ❌

Se le debe presentar Dos Botones abajo
Uno precargado(y presionado) con el ejercicios que compro
|-> Deberia cargar todos los IDs de las soluciones que compro | Copiar las vistas del componente Ejercicios (Pen)
El otro Publicados
|-> Debe aparecer el estado pendiente/OK/Denegado

- Comprar Salvavidas:  ✔

- El usuario debe poder comprar la solucion de un ejercicio (Revisar) | Solo si tiene salvavidas disponibles(Pendiente creo que falta cuando tenga 0 ponner un aviso de saldo insuficiente ✔

- El usuario no debe comprar dos veces el mismo ejercicio si lo compro desabiliar el botom de comprar y cargar la solucion: Posible solucion:: Si estoy logueado en el onInit() del componte postejercicio if(loguado){cargar de la tabla intermedia si tengo el ejercicio(req.id, req.param.id_post)} ❌

- Al momento de comprar> pedir a la base info del usuario JWT me traigo su cant de salvavidas y lo comparo: ✔
if( saldo < Precio){
    le boto un alert sweet de no tiene suficiente/Mensaje del saldo actual = 0 : 🔘  
}else{ : ✔
    el procedimiento habitual de comprar
    redireccionar al perfil
}


- |---> Un Buscador por ID del ejercicio en el Navbar: ✔ / [curiosidad] al pasar de una vista a otra desde el navbar no recarga la pagina si no el componente y eso no trae de nuevo 🔘 



## |--------------> Implementaciones secundarias
- El usuario deberia cargar una solucion al ejercicio si no tiene solucion: ❌
- Se deberia quitar el botom de (comprar solucion/cambiarlo por uno que diga Subir Solucion:-> Esto desOculta El input file {solucion} de un formulario) ❌

- Se debe crear una tabla intermedia usuario_soluciones: ✔
id_solucion int incremental
id_user_solucion int(unique)
id_post int (unique , con lo de arriba)//Esto lo podemos validar al hacer una llamada al back :preguntando si continuan
estado inicial [0:pendiente/1:Aprobado/2:Rechazado]
respuesta [Por defecto: Revision Pendiente] ✔

- Cuando un Usuario Carga una solucion a un determinado post y/o un usuario sube un problema con solucion se inserta un elemento a la tabla de arriba: ✔


- Añadir un Botom al usuario que diga resueltos: ❌
|-- Este debe cargar soluciones

### EL ADMIN
##### PENDIENTES >  posts Otro botom Soluciones Solo que le muestre la foto de la solucion y el id del post
- Le debe quedar dos botones uno presionado [autodeterminado] pendientes ose los de estado 0 y los pendientes de las solucione: ❌
- El admi debe poder modificar el post / en este caso modificar la solucion y/o el enunciado solamente: ❌
- Ademas del estado/No se podra eliminar porque queda el registro para los usuarios que fueron rechazados: ❌


__________________________________________________________________________________________________

Actualizar el .apib
aglio -i documentation.apib -o documentation.html

Config del env
DB_HOST = "localhost" DB_USER ="root" DATABADE_PORT = "3307" // "3306" DB_PASSWORD = "root123123" // "" DB_DATABASE = "tpelearning"

TABLA_CURSOS = "cursos" TABLA_POST = "posts" TABLA_USUARIOS = "usuarios" TABLA_SOLUCION_COMPRADAS = "soluciones_compradas"

URL="localhost:3000/"
