from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()
class WaterData(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    waterLevel = db.Column(db.Float)
    status = db.Column(db.String(50))
    location = db.Column(db.String(100))
    lastUpdated = db.Column(db.String(50))