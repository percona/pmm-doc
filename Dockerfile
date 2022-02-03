FROM docker.io/perconalab/pmm-doc-md:1.0 as build

COPY . ./
RUN export PATH=$PATH:/docs/_resources/bin 
RUN pwd
RUN ls -lah /
RUN whoami
RUN mkdocs build
RUN ls -lah .

# copy assets to nginx and server the site
FROM nginx:latest

COPY --from=build /docs/site /usr/share/nginx/html
RUN ls -la /usr/share/nginx/html
