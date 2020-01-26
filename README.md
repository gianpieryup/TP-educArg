# educArg
##  Funcionalidades

- **Loguearse**  ✔

- **Registrarse**  ✔

- **Cargar Post :** Un usuario puede cargar un ejercicio y una solucion o solo el ejercicio ✔ 

- El Post estara `disponible en la vista` de los ejercicios solo si fue validado por un Admin anteriormente.

- **Perfil :** Editar info ✔ | Cambiar contraseña ✔ -> redireccionar a login y probar su nueva contraseña ✔. 
 Se le debe presentar Dos Botones abajo => Uno  con el ejercios que compro y otro con los ejercicios que resolvio (subio su solucion propia).
- Se cargar todos los IDs de las soluciones que compro en botones que redirigen al post, Analogo con las soluciones ✔  

- **Comprar Salvavidas :** 5 ,10 y 100 soluciones de ejercicios ✔

- El usuario debe poder **comprar la solucion** de un ejercicio | Solo si tiene salvavidas disponibles (De lo contrario sale un aviso de saldo insuficiente ✔

- El usuario no debe `comprar` dos veces el mismo ejercicio si lo compro desabiliar el botom de comprar y cargar la solucion:  ✔✔

- Al momento de comprar> pedir a la base info del usuario JWT me traigo su cant de salvavidas y lo comparo: ✔

- Un Buscador por ID del ejercicio en el Navbar: ✔ 

- El usuario deberia cargar una solucion al ejercicio si no tiene solucion propuesta por el anteriormente ✔
- Se deberia quitar el botom de `comprar solucion` si ya lo compro anteriormente. Ademas de mostrar la solucion.

- Existe la tabla intermedia usuario_soluciones: ✔
id_solucion int incremental / 
id_user_solucion int(unique) / 
id_post int (unique , con lo de arriba) /
estado inicial [0:pendiente/1:Aprobado/2:Rechazado] /
respuesta [Por defecto: Revision Pendiente] ✔

- Cuando un Usuario Carga una solucion a un determinado post y/o un usuario sube un problema con solucion se inserta un elemento a la tabla de arriba: ✔

- Añadir un Botom al usuario que diga resueltos igual que comprados ✔


### EL ADMIN

- Le debe mostrar los Post pendientes osea los de estado 0 y los pendientes de las solucion: ✔
- El admi debe poder y ser el unico que pueda cargar la solucion oficial del post ✔
- Ademas del estado/No se podra eliminar porque queda el registro para los usuarios que fueron rechazado sus post y/o soluciones: ✔


### Usuarios
- username: juacito@gmail.com
- pass: 1234
- username: admin@gmail.com
- pass: 1234


__________________________________________________________________________________________________
## Algunos bugs 
Pueden suceder por la `expiracion del JWT`  => Solucion desloguear y volver a  `loguearse`
__________________________________________________________________________________________________

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

__________________________________________________________________________________________________
### Funcionalidades Opcionales
- Perfil 2.0 : Validar y mostrar error de contraseña incorrecta 🔘 {ayuda: si viene con unn array vacio mostrar informacion invalida, podriamos preguntar por el mail primero y luego por la coincidencia total}

- Al momento de comprar> pedir a la base info del usuario JWT me traigo su cant de salvavidas y lo comparo: ✔
if( saldo < Precio){
    le boto un alert sweet de no tiene suficiente/Mensaje del saldo actual = 0 : 🔘  
}else{ : ✔
    el procedimiento habitual de comprar
    redireccionar al perfil
}
- Un Buscador por ID del ejercicio en el Navbar: ✔ / [curiosidad] al pasar de una vista a otra desde el navbar no recarga la pagina si no el componente y eso no trae de nuevo 🔘 `AYUDA`:Probar el recargar la pagina despues de la redireccion con la sentencia `location.reload(); que se uso en el componente pendientes`

#### Actualizar el .apib
aglio -i documentation.apib -o documentation.html

### Visual Studio Code
#### Localizar e ir a cualquier cosa de manera inmediata
En Visual Studio Code:      `Ctrl + T`

#### Comentarios
Comentar : Seleccionar   +     `Ctrl + K + C`
<br>
Descomentar : Seleccionar   +     `Ctrl + K + U`
