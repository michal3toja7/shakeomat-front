FROM node:18.12.0 AS development

ENV NODE_ENV development
WORKDIR /bloodlab-edu-front

COPY package.json .
COPY package-lock.json .
RUN npm ci --silent
RUN npm install react-scripts@5.0.1 -g --silent
COPY . .

EXPOSE 3000
CMD ["npm", "run", "start"]