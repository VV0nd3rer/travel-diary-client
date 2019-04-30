## Angular client for java web application 'Travel diary'
### Used technologies:
* Angular 7.x
* Angular Material 7.x
* Node.js 10.x

### How to deploy on your local machine
1. Install [Node.js and an npm package manager](https://nodejs.org/en/download/)
2. Clone or download [Travel diary client project](https://github.com/kverchi/travel-diary-client.git)
3. Open project's directory and install packages `npm install`
4. Build your local project `ng serve --watch` and open it on http://localhost:4200/

### How to deploy Docker container
> To get started with Docker read [Docker guide](https://docs.docker.com/get-started/)
1. You can *build Docker image* from a source code or *download image* from a [Docker Hub](https://hub.docker.com)
   
   To *build Docker image*:
   * Clone or download [Travel diary client project](https://github.com/kverchi/travel-diary-client.git)
   * Go to your project directory and build a project 
     `ng build --prod`
   * Build a Docker Image
     `docker build -t travel-diary-client .`
   
   To *download image* from Docker Hub:
     `docker pull flyingmind/travel-diary-client`
 2. Start a container
   `docker run --name <container-name> -d -p 90:80/tcp travel-diary-client:latest`
   
 ## Make sure you have Travel diary server started and connected to the application database
   1. See [here](https://github.com/kverchi/travel-diary-server) how to start Travel diary server
   2. See [here](https://github.com/kverchi/diary-db-backup/tree/master) how to prepeare your local database
   
