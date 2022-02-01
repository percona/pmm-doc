PATH=$PATH:_resources/bin mike deploy 2.x -b preview
mike set-default 2.x -b preview
mike retitle 2.x "PMM2 (LATEST)" -b preview
