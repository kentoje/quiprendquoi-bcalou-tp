#!/bin/bash

touch .env \
&& printf '%s\n' 'NODE_ENV=development' 'PORT=3000' 'API_URL=http://bastiencalou.fr:3000' 'FRONT_URL=http://localhost' >> .env \
&& npm install \
&& echo 'RUN npm run start to launch the server!'

