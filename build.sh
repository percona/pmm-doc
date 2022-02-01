echo "Starting the build process..."

# mkdir -p dist
# wget -O ./themed.zip https://storage.googleapis.com/doc-builds/main/themed.zip

# unzip ./themed.zip

git fetch origin preview

git checkout preview

# rm ./themed.zip
echo "End of the build process."
