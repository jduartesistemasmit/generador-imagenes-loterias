# generador-imagenes-loterias

Este repositorio contiene una aplicación de Node.js que genera imágenes con los resultados de distintas loterías. La aplicación consume una API para obtener los datos actualizados de los sorteos y utiliza técnicas de manipulación de imágenes para generar un archivo visualmente atractivo.

### Características principales
Conexión con una API para obtener datos de los sorteos de diferentes loterías.
Generación automática de imágenes con los resultados de los sorteos.
Descarga de imágenes a través de rutas accesibles.
Requisitos previos
Antes de utilizar esta aplicación, asegúrate de tener instalado:

- Node.js (versión 12 o superior)
- NPM (Node Package Manager)
## Instalación
Sigue los pasos a continuación para instalar y configurar el generador de imágenes de loterías en tu entorno local:

Clona este repositorio en tu máquina:

```sh
git clone https://github.com/tu-usuario/generador-imagenes-loterias.git
```
### Navega hasta el directorio del repositorio:
```sh
cd generador-imagenes-loterias
```
### Instala las dependencias necesarias:
```sh
npm install
```
Inicia la aplicación:
```sh
node src/index.js
```
Accede a la aplicación desde tu navegador web utilizando la dirección http://localhost:3000.
### Uso
Una vez que la aplicación esté en funcionamiento, podrás acceder a las siguientes rutas:

- /loterias: Muestra una lista de las loterías disponibles.
- /loterias/{nombre-loteria}: Genera una imagen con los resultados del último sorteo de la lotería especificada.
Para descargar una imagen generada, simplemente haz clic derecho en la imagen y selecciona "Guardar imagen como..." (o la opción equivalente en tu navegador).