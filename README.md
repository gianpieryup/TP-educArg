# educArg

### Pendientes
- Loguearse (OK)
- Registrarse  (OK)
- Perfil: Editar info (OK) | Cambiar contraseña (Pendiente)
- Comprar Salvavidas (OK)
- El usuario debe poder comprar la solucion de un ejercicio (Revisar) | Solo si tiene salvavidas disponibles(Pendiente creo que falta cuando tenga 0 ponner un aviso de saldo insuficiente @Como hagarro el error 404@)
- El usuario no debe comprar dos veces el mismo ejercicio si lo compro desabiliar el botom de comprar y cargar la solucion:
Posible solucion:: Si estoy logueado en el onInit() del componte postejercicio 
if(loguado){cargar de la tabla intermedia si tengo el ejercicio(req.id, req.param.id_post)}



### Actualizar el `.apib`
aglio -i documentation.apib -o documentation.html


### Config del env
DB_HOST = "localhost"
DB_USER ="root"
DATABADE_PORT = "3307" // "3306"
DB_PASSWORD = "root123123" // ""
DB_DATABASE = "tpelearning"

TABLA_CURSOS = "cursos"
TABLA_POST = "posts"
TABLA_USUARIOS = "usuarios"
TABLA_SOLUCION_COMPRADAS = "soluciones_compradas"


URL="localhost:3000/"


