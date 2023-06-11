from .Queries import *
from .admin import *
from .admin import College

# college_id = read_key_from_json("MSI")
# if college_id == None:
#     MSI = College(
#         college_name="MSI",
#         )
#     MSI.save()

# # else:
# try:
MSI = retrieve_college_from_mongodb("MSI")
if not MSI:
    print("unable to extract college detail, creating new ones")
    MSI = College(
        college_name="MSI",
        )
    MSI.save()
    MSI.load_teachers()
    MSI.loadCourses()
else:
    MSI.load_teachers()
    MSI.loadCourses()
    print(MSI)
# except:
#     print("ran into error, creating new ones")
#     MSI = College(
#         college_name="MSI",
#         )
#     MSI.save()

