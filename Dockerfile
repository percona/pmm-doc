FROM docker.io/atymchuk/pmm-doc-md:1.0 as build

COPY . ./
RUN export PATH=$PATH:/docs/_resources/bin 
RUN pwd
RUN ls -lah .
RUN mike deploy 2.x -b preview
RUN mike set-default 2.x -b preview
RUN mike retitle 2.x "PMM2 (LATEST)" -b preview
RUN ls -lah .

# copy assets to nginx and server the site
FROM nginx:latest

COPY --from=build ./site /usr/share/nginx/html
RUN ls -la /usr/share/nginx/html
