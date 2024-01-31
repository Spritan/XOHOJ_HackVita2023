from mongoengine import Document, StringField, ListField, IntField, EmailField, BooleanField, ObjectIdField, DateTimeField

class User(Document):
    fname= StringField(required=True)
    lname= StringField(required=True)
    email = StringField(required=True, unique=True)
    phone_number = StringField(required=True, unique=True)
    password = StringField(required=True)
    user_type = StringField(default="user")