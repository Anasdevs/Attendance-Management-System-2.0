from pymongo import MongoClient
from datetime import date, datetime,timedelta

# __________ save student's daily attendence ____________
def save_attendence(data_list, collection_name='attendence',Date="null", db_name = 'test'):
    try:   
        client = MongoClient('localhost:27017')
        db = client[db_name]
        collection = db[collection_name]
        if Date == "null":
            current_date = date.today().isoformat()
        else:
            current_date = Date

        document = {current_date: data_list}
        collection.insert_one(document)

        client.close()
        return True
    except:
        return False

# test
# data_list = [
#     {"eno": 1, "name": "John", "presence": True},
#     {"eno": 2, "name": "Jane", "presence": False},
#     {"eno": 3, "name": "Jake", "presence": False},
#     {"eno": 4, "name": "Jamie", "presence": False},
#     {"eno": 5, "name": "Jasmin", "presence": False},
#     # Add more objects to the list as needed
# ]
# save_attendence(data_list=data_list)

def get_attendence_by_date(year, month, collection_name='attendence', db_name='test'):
    client = MongoClient('localhost:27017')
    db = client[db_name]
    collection = db[collection_name]
    start_date = datetime(year, month, 1)
    end_date = start_date.replace(day=28) + timedelta(days=4)
    query = []
    current_date = start_date
    while current_date <= end_date:
        date_str = current_date.date().isoformat()
        query.append({date_str: {"$exists": True}})
        current_date += timedelta(days=1)
    result = collection.find({"$or": query})
    data_list = []
    for doc in result:
        for date in query:
            if list(date.keys())[0] in doc:
                data_list.extend(doc[list(date.keys())[0]])
    client.close()
    return data_list
# test
# print(get_attendence_by_date(2023, 5))

# ___________ to save college object id _____________
import json
def write_key_to_json(key, value, file_path= "data.json"):
    try:
        with open(file_path, 'r') as file:
            data = json.load(file)
    except FileNotFoundError:
        data = {}
    data[key] = value
    with open(file_path, 'w') as file:
        json.dump(data, file)

def read_key_from_json(key, file_path= "data.json"):
    try:
        with open(file_path, 'r') as file:
            data = json.load(file)
            if key in data:
                return data[key]
            else:
                return False
    except FileNotFoundError:
        return False
    
# _________ test _________-
# key_to_write = "msit"
# value_to_write = "efasdeofan231rn2312"
# file_path = "data.json"

# # Write the key-value pair to the JSON file
# write_key_to_json(key_to_write, value_to_write, file_path)

# # Read the key from the JSON file
# retrieved_value = read_key_from_json(key_to_write, file_path)

# if retrieved_value:
#     # Print the retrieved value
#     print(retrieved_value)
# else:
#     print("Key not found.")


# _____________ Retrive saved object, (here college) _____________________
# _____________ and create a new object instance of same stats ___________

from bson.objectid import ObjectId
def retrieve_college_from_mongodb(college_id):
    # MongoDB connection details
    host = 'localhost'
    database_name = 'test'
    collection_name = 'college_main'

    # Connect to the MongoDB server
    client = MongoClient(host)

    # Access the database and collection
    db = client[database_name]
    collection = db[collection_name]

    # Retrieve the College object from the collection
    college_data = collection.find_one({"_id": ObjectId(college_id)})

    # Close the MongoDB connection
    client.close()

    # Create a College object from the retrieved data
    if college_data:
        college = College(
            college_name=college_data['name'],
            college_id=college_data['id'],
            college_city=college_data['city'],
            college_state=college_data['state'],
            college_country=college_data['country'],
            college_zip=college_data['zip'],
            college_phone=college_data['phone'],
            college_email=college_data['email'],
            college_website=college_data['website'],
            college_description=college_data['description'],
            college_address=college_data['address']
        )

        return college
    else:
        return None

# ____________ save object as json in database _______________________
def save_college_to_mongodb(college):
    # MongoDB connection details
    host = 'localhost'
    database_name = 'test'
    collection_name = 'college_main'

    # Connect to the MongoDB server
    client = MongoClient(host)

    # Access the database and collection
    db = client[database_name]
    collection = db[collection_name]

    # Convert the College object to a dictionary
    college_dict = college.__dict__

    # Save the College object in the collection
    collection.insert_one(college_dict)

    # Close the MongoDB connection
    client.close()
    


# __________ admin function _________
def append_teacher_email(teacher_email):
    try:
        # Connect to MongoDB
        client = MongoClient('localhost', 27017)
        db = client['test']
        collection = db['ams_admin']

        # Append teacher's email to the "registered-teachers" array
        result = collection.update_one({}, {'$push': {'registered-teachers': teacher_email}})

        # Check if the update was successful
        if result.modified_count > 0:
            return {'success': True, 'message': 'Teacher email appended successfully'}
        else:
            return {'success': False, 'message': 'Failed to append teacher email'}

    except Exception as e:
        return {'success': False, 'message': str(e)}

    finally:
        # Close the MongoDB connection
        client.close()

# Usage example
# teacher_email = 'teacher@example.com'
# response = append_teacher_email(teacher_email)
# print(response)



# _____________ SAVE AND GET CLASSES FROM DB ____________
from .admin import *
def save_class_to_mongodb(class_name, class_obj, db_name='test', collection_name='classes'):
    host = 'localhost'
    client = MongoClient(host)
    db = client[db_name]
    collection = db[collection_name]
    class_dict ={class_name:class_obj.__dict__} 
    collection.insert_one(class_dict)
    client.close()

def get_class_from_mongodb(class_name, db_name='test', collection_name='classes'):
    host = 'localhost'

    client = MongoClient(host)

    db = client[db_name]
    collection = db[collection_name]

    result = collection.find_one({class_name: {"$exists": True}})

    client.close()

    if result:
        class_obj_data = result[class_name]

        class_obj = Class(class_obj_data['cource_name'], class_obj_data['sem'], class_obj_data['section'],
                          class_obj_data['sub'], class_obj_data['teacher_assigned'], class_obj_data['students'])

        return class_obj
    else:
        return None

# __________________ save and get teacher object _____________

def save_teacher_to_mongodb(teacher):
    # MongoDB connection details
    host = 'localhost'
    db_name = 'test'
    collection_name = 'teachers'

    # Connect to the MongoDB server
    client = MongoClient(host)

    # Access the database and collection
    db = client[db_name]
    collection = db[collection_name]

    # Convert the Teacher object to a dictionary
    teacher_dict = teacher.__dict__

    # Save the Teacher object in the collection using the username as the key
    collection.update_one({'username': teacher.username}, {"$set": teacher_dict}, upsert=True)

    # Close the MongoDB connection
    client.close()


def load_teacher_from_mongodb(username):
    # MongoDB connection details
    host = 'localhost'
    db_name = 'test'
    collection_name = 'teachers'

    # Connect to the MongoDB server
    client = MongoClient(host)

    # Access the database and collection
    db = client[db_name]
    collection = db[collection_name]

    # Retrieve the document with the provided username
    result = collection.find_one({'username': username})

    # Close the MongoDB connection
    client.close()

    if result:
        # Recreate the Teacher object from the retrieved data
        teacher = Teacher(result['username'], result['email'], result['password'],
                          result['name'], result['title'], result['special_subject'])
        teacher.Cources = result['Cources']
        return teacher
    else:
        return None

