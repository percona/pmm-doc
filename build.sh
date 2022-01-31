echo "Starting the build process..."

# mkdir -p dist
wget -O ./themed.zip https://storage.googleapis.com/doc-builds/main/themed.zip

unzip ./themed.zip

rm ./themed.zip
echo "End of the build process."
