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
### Consumo
Podrás acceder a la siguiente ruta y a sus diferentes endpoints para descargar los resultaos:

https://generador-imagenes-loterias.onrender.com

endpoints 

- /triple-tachira-piramide: Loteria Triple Tachira, piramide.
- /triple-tachira-zod: Loteria Triple Tachira, zodiacal
- /triplegana-supergana-zod: Loteria TripleGana y SuperGana, zodiacal
