FROM node:alpine

#set working directory
WORKDIR /apps

# install pm2 global
RUN npm install -g pm2

#Copy package.json and package-lock.json before other files
# Utilise Docker cashe to save re-installing dependencies if unchanged
COPY ./package*.json ./

# Install dependencies
RUN npm install --omit=prod

#Copy all files
COPY ./ ./

# Build app 
RUN npm run build

EXPOSE 3000

# Run container as non-root (unprivileged) user
# The node user is provided in the Node.js Alpine base image
USER node

# Run npm start script with PM@ when container starts
CMD [ "pm2-runtime","npm","--","start" ]