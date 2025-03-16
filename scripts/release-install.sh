#!/bin/bash

# Define the URL for the latest release of the repository
repo_url="https://github.com/Gr3gorywolf/multi-devices-monitor/releases/latest/download/multi-devices-monitor.zip"
zip_file="multi-devices-monitor.zip"
extract_dir="multi-devices-monitor"
config_file="$extract_dir/config.json"

# Download the zip file
echo "Downloading the latest release from the repository..."
curl -L -o $zip_file $repo_url

# Extract the zip file
echo "Extracting the file..."
unzip -o $zip_file -d $extract_dir

rm $zip_file

cd $extract_dir

if [ ! -f "$config_file" ]; then
    echo "Setting up configuration file..."

    read -p "Enter appKey (server authentication key): " appKey
    read -p "Use frontend CDN for assets? (true/false): " useFrontendcdn

    # Create JSON config file
    echo "{\n  \"appKey\": \"$appKey\",\n  \"useFrontendcdn\": $useFrontendcdn\n}" > $config_file

    echo "Configuration saved to $config_file."
else
    echo "Configuration file already exists. Skipping setup."
fi


# Ask if you want to run docker-compose or npm
echo "Do you want to run docker-compose up -d? (y/n)"
read docker_choice

if [[ $docker_choice == "y" || $docker_choice == "Y" ]]; then
    # If the user chooses Docker, run docker-compose up
    echo "Running docker-compose up -d..."
    docker-compose up -d
else
    # Otherwise, run npm install && node index.js
    echo "Running npm install && node index.js..."
    npm install && node index.js
fi
