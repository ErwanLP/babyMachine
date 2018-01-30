#!/bin/bash

echo "START DEPLOYMENT"
git pull
npm install
cd client/
npm install
npm run build
cd ../
pm2 restart 0