FROM node:20-alpine

WORKDIR /app

COPY package.json ./
COPY server.js ./
COPY public ./public
COPY data ./data

ENV NODE_ENV=production
ENV PORT=8080
ENV ADMIN_LDAP=mokshazna
ENV ADMIN_PASSWORD=wroclaw2026

EXPOSE 8080

CMD ["node", "server.js"]
