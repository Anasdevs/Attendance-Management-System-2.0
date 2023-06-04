from pymongo import MongoClient
from gridfs import GridFS
from bson import ObjectId
from PIL import Image
# Connect to MongoDB
client = MongoClient("mongodb://localhost:27017")
db = client["test"]

# GridFS controls large files like images and videos, 
# it creates 2 collections in database 'fs.files', 'fs.chunks'
# fs.files - metadata like name id etc
# fs.chunks - chunks of data
fs = GridFS(db)

# Function to upload an image to MongoDB
def upload_image_to_mongodb(file_path, filename):
    with open(file_path, "rb") as f:
        image_data = f.read()

    image_id = fs.put(image_data, filename=filename)
    return image_id

# Example usage
image_path = "portfolio_backend/assets/image.png"
image_filename = "image.png"

uploaded_image_id = upload_image_to_mongodb(image_path, image_filename)
print("Image uploaded with ID:", uploaded_image_id)

image = fs.find_one({"_id": ObjectId(uploaded_image_id)})

image_object = Image.open(image)
image_object.show()