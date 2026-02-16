#!/bin/bash

base_path=./static/pic/gallery

for file in "$base_path"/pics/*; do
    if [ -e "$file" ]; then

        filename=$(basename "$file")
        echo "create thumbnail for $filename"
        magick "$file" -resize 300x120 "$base_path"/thumbnail/"$filename"
    fi
done