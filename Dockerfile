FROM node:11.6.0-alpine AS builder
COPY . ./travel-diary-client
WORKDIR /travel-diary-client
RUN npm i
RUN $(npm bin)/ng build --prod

FROM nginx:1.15.8-alpine
COPY --from=builder /travel-diary-client/dist/travel-diary-client/ /usr/share/nginx/html