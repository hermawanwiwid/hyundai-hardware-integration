FROM node:18-alpine 
RUN apk add dumb-init
ENV NODE_ENV production
WORKDIR /app

COPY ./package*.json ./
RUN npm ci --only=production

COPY . ./

EXPOSE 5000

CMD ["dumb-init", "npm", "start"]