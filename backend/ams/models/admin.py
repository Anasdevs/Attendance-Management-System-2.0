from Queries import *

class College:
    def __init__(self, college_name):
        self.name = college_name
        self.classes = {}
        self.instructors = {}

    # ___________ teachers _____________________
    def add_new_class(self, cource_name:str, sem:int, section:str, sub:str, teacher_assigned:int, students:dict):
        new_class = Class(cource_name,sem,section, sub, teacher_assigned, students)
        cource_id = (cource_name.replace(' ', '_')+"-"+sub+"-"+str(sem)+"-"+section)
        if cource_id in self.classes.keys():
            cource_id+="#"
        new_class.setClassID(cource_id)
        save_class_to_mongodb(class_name=cource_id, class_obj=new_class)
        self.classes[cource_id] = new_class
        return ["succsss", cource_id]

    def get_all_class(self):
        return self.classes.keys()

    def loadCourses(self):
        for i in self.classes.keys():
            Cource = get_class_from_mongodb(i)
            self.classes[i] = Cource
        return True

    # __________ teachers ____________
    def add_new_teacher(self, username,email,password,
                        name:str = "__blank__", title:str="__blank__", special_subject:str = "__blank__"):
        if username in self.instructors.keys():
            return [False, "already exist"]
        new_teacher = Teacher(username, email, password, name, title, special_subject)
        save_teacher_to_mongodb(new_teacher)        
        self.instructors[username] = new_teacher
        return ["succsss", username]

    def load_teachers(self):
        for i in self.instructors.keys():
            teacher = load_teacher_from_mongodb(i)
            self.instructors[i] = teacher
        return True


    # ___________ WHOLE SERVER ____________
    def save(self):
        result = save_college_to_mongodb(self)
        return write_key_to_json(key=self.name, value=result)

class Teacher:
    def __init__(self, username, email, password, name, title, special_subject):
        self.username = username
        self.email = email
        self.password = password
        self.name = name
        self.title = title
        self.special_subject = special_subject
        self.Courses = []
        
    def login(self, username, password):
        if username == self.username and password == self.password:
            return ["succsss", self.username]
        return ["fail", "wrong username or password"]
    def __str__(self) -> str:
        return [self.username, self.name, self.email]

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

    def __str__(self) -> str:
        return (self.cource_name.replace(' ', '_')+"-"+self.sub+"-"+str(self.sem)+"-"+self.section)


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