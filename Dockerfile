FROM node:7.10.0
MAINTAINER Trey Schneider

ENV APP_HOME /app
RUN mkdir $APP_HOME
WORKDIR $APP_HOME

RUN npm install -g bower
RUN npm install -g gulp

COPY package.json $APP_HOME/
COPY bower.json $APP_HOME/
COPY .bowerrc $APP_HOME/

# ENV NODE_ENV=production \
#   PATH=$APP_HOME/node_modules/.bin:$PATH

RUN npm install
RUN bower install --allow-root

ADD . $APP_HOME

# Write the bundle.js static asset file
# RUN npm run build
RUN gulp serve

# Boot the server
# CMD ["npm", "start"]
