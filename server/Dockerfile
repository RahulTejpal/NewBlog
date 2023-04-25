#node version

FROM node:19.1.0-alpine 

#The WORKDIR instruction sets the working directory for any subsequent instructions in the Dockerfile to /usr/src/app.

WORKDIR /usr/src/app

#The COPY instruction copies the package.json and package-lock.json files to the working directory of the Docker image.
#The next COPY instruction copies the entire contents of the current directory to the working directory of the Docker image.
COPY package*.json ./ 


#The RUN instruction runs the npm install command inside the Docker container to install the dependencies specified in the package.json file.


#The second RUN instruction runs npm install cors command inside the container to install the cors dependency for the application.
RUN npm install
RUN npm install cors
RUN mkdir logs && chown -R node:node logs

COPY . .

EXPOSE 5000

CMD ["npm", "start"]