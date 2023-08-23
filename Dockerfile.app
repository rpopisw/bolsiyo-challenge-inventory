FROM --platform=linux/amd64 node:16.18.1 AS builder

WORKDIR /build
COPY package.json ./
COPY . .

RUN npm install
RUN npm run build

FROM --platform=linux/amd64 node:16.18.1

WORKDIR /opt

RUN apt-get update && apt-get -y install wget libaio1 unzip

WORKDIR /app
COPY --from=builder /build/dist ./dist
COPY --from=builder /build/package.json .
COPY --from=builder /build/node_modules ./node_modules

CMD ["npm","run", "start:prod"]
