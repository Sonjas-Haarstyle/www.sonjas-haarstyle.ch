from PIL import Image
import os

def create_thumbnail(input_image_path, output_image_path, size=(128, 128)):
    """
    Create a thumbnail of an image.

    :param input_image_path: Path to the input image.
    :param output_image_path: Path to save the thumbnail.
    :param size: Tuple (width, height) of the thumbnail size.
    """
    try:
        with Image.open(input_image_path) as img:
            img.thumbnail(size)
            img.save(output_image_path)

        print(f"Thumbnail created and saved to {output_image_path}")
    except Exception as e:
        print(f"An error occurred: {e}")

def batch_create_thumbnails(input_folder, output_folder, size=(128, 128)):
    """
    Create thumbnails for all images in a folder.

    :param input_folder: Path to the folder containing images.
    :param output_folder: Path to save the thumbnails.
    :param size: Tuple (width, height) of the thumbnail size.
    """
    # Ensure the output folder exists
    if not os.path.exists(output_folder):
        os.makedirs(output_folder)

    # Iterate over all files in the input folder
    for filename in os.listdir(input_folder):
        input_image_path = os.path.join(input_folder, filename)
        output_image_path = os.path.join(output_folder, filename)

        # Check if the file is an image
        if filename.lower().endswith(('.png', '.jpg', '.jpeg', '.bmp', '.gif', '.tiff')):
            create_thumbnail(input_image_path, output_image_path, size)
        else:
            print(f"Skipping non-image file: {filename}")

if __name__ == "__main__":
    # Example usage
    input_image_path = "input_image.jpg"  # Path to your input image
    output_image_path = "thumbnail.jpg"  # Path to save the thumbnail
    thumbnail_size = (128, 128)  # Desired thumbnail size

    # Create a single thumbnail
    create_thumbnail(input_image_path, output_image_path, thumbnail_size)

    # Example for batch processing
    input_folder = "/home/jku/proj/shs/www.sonjas-haarstyle.ch/static/pic/gallery/pics/"  # Folder containing images
    output_folder = "/home/jku/proj/shs/www.sonjas-haarstyle.ch/static/pic/gallery/thumbnail/"  # Folder to save thumbnails

    # Create thumbnails for all images in the folder
    batch_create_thumbnails(input_folder, output_folder, thumbnail_size)