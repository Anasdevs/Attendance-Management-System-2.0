from .Queries import *
from .admin import *
college_id = read_key_from_json("MSI")
if college_id == None:
    MSI = College(
        college_name="MSI",
        )
    MSI.save()

else:
    try:
        MSI = retrieve_college_from_mongodb(college_id=college_id)
        MSI.load_teachers()
        MSI.loadCourses()
    except:
        print("unable to extract college detail, creating new ones")
        MSI = College(
            college_name="MSI",
            )
        MSI.save()

