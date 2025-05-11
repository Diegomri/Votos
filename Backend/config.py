from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from dotenv import load_dotenv
from flask_jwt_extended import  JWTManager
import os
load_dotenv()

app = Flask(__name__)
CORS(app)
app.config["JWT_SECRET_KEY"] = os.getenv("SECRET_KEY")
jwt = JWTManager(app)

app.config["SQLALCHEMY_DATABASE_URI"] = os.getenv("DATABASE_URI")
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

db = SQLAlchemy(app)
