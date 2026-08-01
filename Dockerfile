# syntax=docker/dockerfile:1

# ---- Build every lesson into /out/<NN> ----
FROM node:22-alpine AS build

# Comma or space separated list of lesson folders to skip, e.g. "01,02,05".
# In Coolify, tick "Build Variable" on EXCLUDE_DIRS so excluded lessons are
# never built. Left unset, everything is built and the filtering happens at
# startup instead (see docker/40-lessons.sh).
ARG EXCLUDE_DIRS=""

WORKDIR /app
COPY . .

RUN --mount=type=cache,target=/root/.npm \
    EXCLUDE_DIRS="$EXCLUDE_DIRS" sh docker/build-lessons.sh

# ---- Serve them all from a single nginx ----
FROM nginx:1.27-alpine

COPY docker/nginx.conf /etc/nginx/conf.d/default.conf

# Drop the base image's index.html / 50x.html: 50x.html otherwise matches the
# [0-9][0-9]* lesson glob and shows up in the listing.
RUN rm -rf /usr/share/nginx/html/*
COPY --from=build /out /usr/share/nginx/html

# Runs before nginx starts (nginx image executes /docker-entrypoint.d/*.sh):
# drops the lessons listed in EXCLUDE_DIRS and (re)builds the root index.
COPY docker/40-lessons.sh /docker-entrypoint.d/40-lessons.sh
RUN chmod +x /docker-entrypoint.d/40-lessons.sh

# No ENV defaults for EXCLUDE_DIRS / SITE_TITLE on purpose: Coolify injects its
# own ARG lines at the top of each stage, so an ENV here would shadow whatever
# you set in the UI. The entrypoint script holds the fallback values.

EXPOSE 80
