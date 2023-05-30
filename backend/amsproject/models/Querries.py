from pymongo import MongoClient
from datetime import date, datetime,timedelta

def save_attendence(data_list, collection_name='attendence',Date="null", db_name = 'test'):
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

data_list = [
    {"eno": 1, "name": "John", "presence": True},
    {"eno": 2, "name": "Jane", "presence": False},
    {"eno": 3, "name": "Jake", "presence": False},
    {"eno": 4, "name": "Jamie", "presence": False},
    {"eno": 5, "name": "Jasmin", "presence": False},
    # Add more objects to the list as needed
]

# save_attendence(data_list=data_list)

def get_entries_by_month(year, month, collection_name='attendence', database_name = 'test'):
    # MongoDB connection details
    host = 'localhost:27017'

    # Connect to the MongoDB server
    client = MongoClient(host)

    # Access the database and collection
    db = client[database_name]
    collection = db[collection_name]

    # Create the start and end date range for the specified month
    start_date = datetime(year, month, 1)
    if month == 12:
        end_date = datetime(year + 1, 1, 1)
    else:
        end_date = datetime(year, month + 1, 1)

    # Query the collection for entries within the date range
    query = {"date": {"$gte": start_date, "$lt": end_date}}
    entries = collection.find(query)

    # Close the MongoDB connection
    client.close()

    # Return the retrieved entries
    return list(entries)

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

def save_string_to_file(string, file_path):
    with open(file_path, 'w') as file:
        file.write(string)


def retrieve_string_from_file(file_path):
    with open(file_path, 'r') as file:
        string = file.read()
        return string

from pymongo import MongoClient
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
from pymongo import MongoClient

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

print(get_attendence_by_date(2023, 5))