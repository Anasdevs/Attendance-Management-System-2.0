1. admin endpoints

    - POST create teacher cred 
        - req
            - username/id
            - email
            - password
            - name
            - title
            - branch
            - assigned classes (class code)
        - res:
            - true
    - GET delete-teacher/<username/id>
        - res
            - username/id


    - POST create class
        - request
            - cource name
            - semester
            - section
            - subject
            - teacher-assigned(teacher username)
            - students:
            ```
            {
                student name, eno
                student name
                student name
                student name
            }
            ````

    - POST change-class-teacher
        - request
            ```
            {   
                class id
                past teacher username
                present teacher username
            }
            ```

2. teacher endpoint
    - login   
      - request
        ```
        {
            username
            email
            password
        }   # create a local session saved in local storage
        ```
    
    - logout
        - delete local session

1. POST Attendence endpoint
      - request:-
        ```
        {
            id:5-digit class code,
            attendence:{
                {e_no:int, name:string, presence:bool},
                {e_no:int, name:string, presence:bool},
                {e_no:int, name:string, presence:bool},
            }
        }
        ```
    - response:
        - success

1. GET searchAttendence/\<class-id>
    - response:-
        ```
        {
            id:5-digit class code,
            attendence:{
                {eno:121, name:haefea, presence:ea3f},
                {eno:121, name:haefea, presence:ea3f},
                {eno:121, name:haefea, presence:ea3f},
                {eno:121, name:haefea, presence:ea3f},
                {eno:121, name:haefea, presence:ea3f},
            }
        }
        ```
