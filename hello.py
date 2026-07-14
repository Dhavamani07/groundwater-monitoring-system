from flask import Flask, jsonify, request
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
CORS(app)

app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///water.db"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

db = SQLAlchemy(app)
class WaterData(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    waterLevel = db.Column(db.Float)
    status = db.Column(db.String(50))
    location = db.Column(db.String(100))
    lastUpdated = db.Column(db.String(50))

@app.route("/water-data")
def water_data():
    data = WaterData.query.first()

    if not data:
        data = WaterData(
            waterLevel=16.8,
            status="Danger",
            location="Karur",
            lastUpdated="03-07-2026"
        )
        db.session.add(data)
        db.session.commit()

    return jsonify({
        "waterLevel": data.waterLevel,
        "status": data.status,
        "location": data.location,
        "lastUpdated": data.lastUpdated
    })


@app.route("/update-data", methods=["POST"])
def update_data():
    data = request.json

    record = WaterData.query.first()

    if record:
        record.waterLevel = data["waterLevel"]
        record.status = data["status"]
        record.location = data["location"]
        record.lastUpdated = data["lastUpdated"]
    else:
        record = WaterData(
            waterLevel=data["waterLevel"],
            status=data["status"],
            location=data["location"],
            lastUpdated=data["lastUpdated"]
        )
        db.session.add(record)

    db.session.commit()

    return jsonify({"message": "Data Updated Successfully"})


with app.app_context():
    db.create_all()

if __name__ == "__main__":
    app.run(debug=True)