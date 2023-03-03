# Install PMM server with Docker container

How to run PMM Server with Docker based on our [Docker image].

!!! note alert alert-primary ""
    The tags used here are for the current release. Other [tags] are available.

!!! seealso alert alert-info "See also"
    [Easy-install script]

## Before you start

- Install [Docker] 1.12.6 or higher.

## Run

!!! summary alert alert-info "Summary"
    - Pull the Docker image.
    - Copy it to create a persistent data container.
    - Run the image.
    - Open the PMM UI in a browser.

---

You can store data from your PMM in:

1. Docker volume (Preffered method)
2. Data container
3. Host directory

