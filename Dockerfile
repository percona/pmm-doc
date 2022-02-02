FROM docker.io/atymchuk/pmm-doc-md:1.0 as build

RUN PATH=$PATH:_resources/bin mike deploy 2.x -b preview
RUN mike set-default 2.x -b preview
RUN mike retitle 2.x "PMM2 (LATEST)" -b preview
RUN ls -lah .
RUN pwd

# copy assets to nginx and server the site
FROM nginx:latest

COPY --from=build ./site /usr/share/nginx/html
RUN ls -la /usr/share/nginx/html
