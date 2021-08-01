# Aplicación meteorológica
<img src = "https://i.ibb.co/bz62v6X/app.png" alt = "Aplicación del clima React" style = "width: 500px; margin: 10px auto" />

Aplicación meteorológica creada con ReactJS. Reconoce automáticamente la ubicación del usuario, según la configuración del navegador. Tambien se puede seleccionar 6 ubicaciones mas para ver su clima.
Se utilizo de React Hooks (useState, useEffect) y Redux con Ducks para el manejo del estado (Ducks es una forma de modularizar partes de una aplicación de Redux juntando reducers, acciones y constantes juntos de una forma fácil de entender y portar.).

### Versión
* 0.1.0

### Uso:

```sh
$ git clone https://github.com/Pablo-DiazTassara/Weather-Forecast.git
$ cd Weather-Forecas
$ npm install
}
```

* Obtener KEY para la APIs de pronostico en https://openweathermap.org/api

* Crear el archivo .env en el directorio raíz del proyecto con el siguiente contenido:
```sh
{
> REACT_APP_PATHNAME=YOUR_PATH_SERVER (ej: http://localhost:3000) <br>
> REACT_APP_API_KEY=YOUR_OPENWEATHERMAP_API_KEY <br>
> REACT_APP_URL_WEATHER=https://api.openweathermap.org/data/2.5/ <br>
> REACT_APP_LANG=es <br>
> REACT_APP_UNIT=metric
}
```

 ### Ejecuta tu aplicación:
 
```sh
 $ npm run start (O $ yarn run start)
```
Se podrá acceder a la aplicación en `http://localhost:3000`

### Crea tu aplicación:

```sh
$ npm run build: prod (O $ yarn run build: prod)
```
* Se generará el compilado en la carpeta build.
