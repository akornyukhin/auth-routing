import logging
logging.basicConfig(level=logging.DEBUG)
import secrets
from flask import Flask, jsonify, request, render_template
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
import hashlib

app = Flask(__name__)
app.config.from_pyfile('settings.py')
CORS(app)

# ORM
db = SQLAlchemy(app)
class Users(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    password_hash = db.Column(db.String(64), unique=True, nullable=False)

    def __repr__(self):
        return '<User %r>' % self.username


@app.route('/get_token', methods = ['POST'])
def get_token():
    data = request.get_json()
    username = data['username']
    password = data['password']

    encoder = hashlib.sha256()
    encoder.update(password.encode('utf-8'))
    password_hashed = encoder.hexdigest()

    user = Users.query.filter_by(username=username).first()
    password_check = user.password_hash

    app.logger.info(password_hashed)
    app.logger.info(password_check)

    if (password_hashed == password_check):
        code = secrets.token_urlsafe(20)

    return jsonify({"data": code}), 200


@app.route('/create_user', methods = ['POST'])
def create_user():
    data = request.get_json()
    username = data['username']
    password = data['password']

    encoder = hashlib.sha256()
    encoder.update(password.encode('utf-8'))
    password_hash = encoder.hexdigest()

    user = Users(username=username, password_hash=password_hash)

    db.session.add(user)
    db.session.commit()
    
    return 'Done', 200