<!-- README.md -->

# Aplicacion de productividad

Bienvenido a mi aplicación de tareas, donde puedes gestionar y organizar tus tareas de manera efectiva.


## Descripcion 
Desarrollar una aplicación de productividad en la que los usuarios puedan gestionar y filtrar una lista de tareas, así como registrar el tiempo que les toma ejecutarlas. Para esto existe un temporizador, el cual se inicializa con la duración de la tarea en cuestión y cuenta hacia cero, desplegando en todo momento el tiempo restante. El usuario puede ver un histórico de las tareas que ha completado, así como una gráfica que represente su productividad en la última semana.


**Requerimientos del Usuario**
El usuario puede realizar las siguientes acciones:

- [x]  Crear una tarea
- [x]  Modificar una tarea (descripcion de la tarea y duracion)
- [x]  Eliminar una tarea
- [x]  Reordenar la lista de tareas
- [x]  Comenzar con la tarea en curso
- [x]  Pausar, Detener o reiniciar el temporizador
- [x]  Marcar la tarea en curso como finalizada
- [x]  Ver una grafica de sus historias de tareas en la ultima semana
- [x]  Ver historial de tareas completadas
- [x]  Filtrar la lista de tareas pendientes segun su duracion:
    ○ corto 30 min o menos
    ○ medio: de 30 min a 1h
    ○ largo: más de 1h

**Reglas de negocio**

- [x]  La tarea en curso es la tarea que esta en la lista
- [x]  Al marcar la tarea en curso como completada, debe registrarse el tiempo que tomó al usuario completar dicha tarea.
- [ ]  Al cerrar la aplicacion, el temporizador siempre se pausa.
- [x]  Se manejan tres duraciones predeterminadas para una tarea  ( corta: 30 min, media: 45
min, larga: 1h )
- [x]  El usuario tambien puede definir su propia duracion en minutos y segundos para una tarea, la cual no puede superar las dos horas.
- [x]  Al expirar el tiempo de la tarea en curso, ésta se marca como completada



## Informacion sobre la crecion de la aplicacion 

## Estado del Despliegue
La aplicación está alojada en [Netlify](https://www.netlify.com/), donde fue mas facil de alojar el servidor de la app

## Pasos para poder correr la aplicacionn en dado de descargarla en local

1. **Instalación de Dependencias**

   Ejecuta el siguiente comando para instalar todas las dependencias necesarias:

   ```bash
   npm install
   npm start
   ```

2. **Alogamiento de la API**
  La api que se utilizo para la poder obtener la informacion fue creada en node js, con el objetivo de automatizar el proceso y no hacer a la aplicacion mucho mas pesada con informacion estatica. `
  ```bash
  url de la api: https://productask-api-com.onrender.com/api/1
  alojada en servidores de: https://render.com
  ```
  Tambien se puede ver el codigo de la api en mi repositorio de github:https://github.com/Alexisvip739/api-productividad-task