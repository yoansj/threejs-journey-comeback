# syntax=docker/dockerfile:1

# ---- Build every lesson into /out/<NN> ----
FROM node:22-alpine AS build

WORKDIR /app
COPY . .

RUN --mount=type=cache,target=/root/.npm \
    sh docker/build-lessons.sh

# ---- Serve them all from a single nginx ----
FROM nginx:1.27-alpine

COPY docker/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /out /usr/share/nginx/html

# Runs before nginx starts (nginx image executes /docker-entrypoint.d/*.sh):
# drops the lessons listed in EXCLUDE_DIRS and (re)builds the root index.
COPY docker/40-lessons.sh /docker-entrypoint.d/40-lessons.sh
RUN chmod +x /docker-entrypoint.d/40-lessons.sh

# Comma or space separated list of lesson folders to hide, e.g. "01,02,05"
ENV EXCLUDE_DIRS=""
ENV SITE_TITLE="Three.js Journey"

EXPOSE 80
