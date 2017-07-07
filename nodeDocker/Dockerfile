FROM node:boron

# Create app directory
RUN mkdir -p /home/winpc/test/nodeApp/app
WORKDIR /home/winpc/test/nodeApp/app

# Install app dependencies
COPY package.json /home/winpc/test/nodeApp/app
RUN npm install

# Bundle app source
COPY . /home/winpc/test/nodeApp/app

EXPOSE 8080
CMD [ "npm", "start" ]

