# Frontend setup and run commands
FSetup:
		cd frontend && npm i --force
		@echo Setup Successfull

FRun:
		@echo running frontend at port 8000
		cd frontend && npm start --port 8000

# Backend setup and run commands
BSetup:
		cd backend && pip install -r REQUIREMENTS.txt
		@echo setup successfull

BRun:
		@echo "running backend at port 7000"
		cd backend && python manage.py runserver 

# Combined setup and run commands
setup: frontend-setup backend-setup
run: frontend-run backend-run

db-mig: 
		@echo Running migrations command
		cd backend && python manage.py makemigrations && python manage.py migrate
		@echo Success