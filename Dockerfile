FROM docker.io/atymchuk/pmm-doc-md:1.0

RUN PATH=$PATH:_resources/bin mike deploy 2.x -b preview
RUN mike set-default 2.x -b preview
RUN mike retitle 2.x "PMM2 (LATEST)" -b preview

CMD [ "/bin/true" ]