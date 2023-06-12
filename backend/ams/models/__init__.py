from .Queries import *
from .admin import *
from .admin import College

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

