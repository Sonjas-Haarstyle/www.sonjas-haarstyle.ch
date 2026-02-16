#!/bin/bash

base_path=./static/pic/gallery

height=300
width=130

for file in "$base_path"/pics/*; do
    if [ -e "$file" ]; then
        filename=$(basename "$file")
        echo "create thumbnail for $filename"
        magick "$file" -resize "$height"x"$width" "$base_path"/thumbnail/"$filename"
    fi
done