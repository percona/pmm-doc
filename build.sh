@echo "Starting the build process..."

mkdir -p dist
wget -O ./themed.zip https://console.cloud.google.com/storage/browser/doc-builds/main/themed.zip

cd dist
unzip ../themed.zip
@echo "End of the build process."
