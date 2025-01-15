#!/bin/sh

# This script updates the GeoNetwork backend URL with the value passed in the GEONETWORK_URL environement variable

# Check if GEONETWORK_URL is defined and not empty
if [ -n "$GEONETWORK_URL" ]; then
    # Replace "http://localhost:9999" with the value of GEONETWORK_URL in main-*.js files
    for file in /usr/share/nginx/html/browser/main-*.js; do
        if [ -f "$file" ]; then
            sed "s|http://localhost:9999|$GEONETWORK_URL|g" "$file" > "$file.tmp" && mv "$file.tmp" "$file"
            echo "Updated $file with GEONETWORK_URL: $GEONETWORK_URL."
        fi
    done
else
    echo "GEONETWORK_URL is not set or is empty. Exiting without changes."
fi