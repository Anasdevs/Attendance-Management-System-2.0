from .Queries import *

class College:
    def __init__(self, college_name, classes = {}, instructors = {},instructor_class = {}):
        self.name = college_name
        self.classes = classes
        # self.instructors_mail = []
        self.instructors = instructors
        self.instructor_class = instructor_class

    def __str__(self) -> str:
        print("name:",self.name)
        print("instructors:",self.instructors)
        print("classes:",self.classes)
        return self.name

    # ___________ teachers _____________________
    def add_new_class(self,email:str, course_name:str, sem:int, section:str, sub:str, students:dict):

        new_class = Class(course_name,sem,section, sub, teacher_assigned=email, students=students)
        course_id = (course_name.replace(' ', '_')+"-"+sub+"-"+str(sem)+"-"+section)
        if course_id in self.classes.keys():
            cource_id+="#"
        new_class.setClassID(course_id)
        new_class.save()

        # add class to teacher's classes
        if email in self.instructor_class.keys():
            self.instructor_class[email].append(course_id)
        else:
            self.instructor_class[email] = [course_id]
        # add class to college's classes
        self.classes[course_id] = new_class
        self.save()
        return ["succsss", course_id]

    def get_all_class(self):
        return self.classes.keys()

    # def add_teacher_email(self,email):
    #     self.instructors_mail.append(email)
    #     return True

    # def verify_registered_email(self, email):
    #     if email in self.instructors_mail:
    #         return True
    #     return False

    # def check_teacher_user(self, email):
        if email in (self.instructors).keys():
            return self.instructors[email].password
        return False

    def teacherLogin(self, email,password):
        if email in (self.instructors).keys():
            if password == self.instructors[email].password:
                return {"status":True}
            else:
                return {"status":False,"desc":"password incorrect"}
        return {"status":False,"desc":"email not found"}

    def loadCourses(self):
        for i in self.classes.keys():
            Course = get_class_from_mongodb(i)
            self.classes[i] = Course
        return True

    # __________ teachers ____________
    def add_new_teacher(self,email, name, title):
        if email in self.instructors.keys():
            return [False, "already exist"]
        password = generate_random_password()
        # generate a password and send it on mail
        message = f"Password for your MSI Attendence Management System Account is \n {password} \n \nPlease save this password and delete this email\nUse {email} email along with given passowrd to login"
        # send_contact_email(name="MSI janakpuri", email="care@msijanakpuri.com", message=message, to = email)
        print(password)
        new_teacher = Teacher(email, password, name, title)
        # save to db
        new_teacher.save()

        # save to main
        self.instructors[email] = new_teacher
        self.save()

        return {"status":True, "email":email}

    def load_teachers(self):
        for i in self.instructors.keys():
            teacher = load_teacher_from_mongodb(i)
            self.instructors[i] = teacher
        return True


    # ___________ WHOLE SERVER ____________
    def save(self):
        result = save_college_to_mongodb(self, self.name)
        return True

class Teacher:
    def __init__(self,email, password, name, title):
        self.email = email
        self.password = password
        self.name = name
        self.title = title

    def login(self, password):
        if password == self.password:
            return ["succsss", self.email]
        return ["fail", "wrong username or password"]
    
    def save(self):
        save_teacher_to_mongodb(self,self.email)

    def __str__(self) -> str:
        return str(self.name+" "+self.email+" "+ self.title)
class Class:
    def __init__(self, cource_name, sem, section, sub, teacher_assigned, students):
        self.classId=""
        self.cource_name = cource_name
        self.sem = sem
        self.section = section
        self.sub = sub
        self.teacher_assigned = teacher_assigned
        self.students = students

    def setClassID(self,id):
        self.classId = id

    def take_Attendence(self):
        # make object {student_name: "present"/"absent"} and feed it to mongodb database with today's date
        pass

    def save(self):
        save_class_to_mongodb(class_name=self.classId, class_obj=self)

    def __str__(self) -> str:
        return str(self.cource_name.replace(' ', '_')+"-"+self.sub+"-"+str(self.sem)+"-"+self.section)


class admin:
    def __init__(self):
        self.username = "test_admin"
        self.password = "test_admin"

    def create_teacher(self,id, email, password, name, title, branch, assigned_classs):
        if id in self.instructors.keys():
            return [False, "already exist"]

        new_teacher = Teacher(id, email, password, name, title, branch, assigned_classs)
        self.instructors[id] = new_teacher
        return ["succsss", id]

    def __str__(self) -> str:
        return self.username