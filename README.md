# How to run

## Backend

1. `cd backend `

2. `nano config.ini`

3. write in nano "config.ini": 
```
[openai]
api_key = sk-...
```

4. `pip install -r requirements.txt`

5. `uvicorn app.main:app --reload`

## Frontend

1. `cd frontend`

2. `npm install`

3. `npm start`