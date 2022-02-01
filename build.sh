echo "Starting the build process..."

# mkdir -p dist
# wget -O ./themed.zip https://storage.googleapis.com/doc-builds/main/themed.zip

# unzip ./themed.zip

docker pull docker.io/atymchuk/pmm-doc-md:1.0

docker run --rm -v $(pwd):/doc docker.io/atymchuk/pmm-doc-md:1.0 bash docker-build.sh -xe

# rm ./themed.zip
echo "End of the build process."
