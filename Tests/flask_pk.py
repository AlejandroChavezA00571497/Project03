import numpy as np

import sqlalchemy
import os
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func

from flask import Flask, jsonify
from flask_cors import CORS

DB_PATH = "sqlite:///top20_pk.sqlite"

print(os.getcwd())
# python -m http.server [PORT]

#################################################
# Database Setup 
#################################################
#engine = create_engine("sqlite:///top20.sqlite")
engine = create_engine(DB_PATH)


# reflect an existing database into a new model
Base = automap_base()
# reflect the tables
Base.prepare(autoload_with = engine)

# Save reference to the table
#print(f"The keys are: {Base.classes.keys()}")

top_20_companies = Base.classes.top20

#################################################
# Flask Setup
#################################################
app = Flask(__name__)
#CORS(app, resources={r"/api/*": {"origins": "http://127.0.0.1:8001"}})

#################################################
# Flask Routes
#################################################

@app.route("/")
def welcome():
    """List all available api routes."""
    return (
        f"Available Routes:<br/>"
        f"/api/v1.0/id<br/>"
        f"/api/v1.0/timestamp<br/>"
        f"/api/v1.0/company<br/>"
        f"/api/v1.0/level<br/>"
        f"/api/v1.0/title<br/>"
        f"/api/v1.0/totalyearlycompensation<br/>"
        f"/api/v1.0/location<br/>"
        f"/api/v1.0/yearsofexperience<br/>"
        f"/api/v1.0/yearsatcompany<br/>"
        f"/api/v1.0/tag<br/>"
        f"/api/v1.0/gender<br/>"
        f"/api/v1.0/cityid<br/>"
        f"/api/v1.0/dmaid<br/>"
        f"/api/v1.0/rownumber<br/>"
        f"/api/v1.0/mastersdegree<br/>"
        f"/api/v1.0/bachelorsdegree<br/>"
        f"/api/v1.0/doctoratedegree<br/>"
        f"/api/v1.0/raceasian<br/>"
        f"/api/v1.0/racewhite<br/>"
        f"/api/v1.0/racetwoormore<br/>"
        f"/api/v1.0/raceblack<br/>"
        f"/api/v1.0/racehispanic"

    )


@app.route("/api/v1.0/id")
def id():
    # Create our session (link) from Python to the DB
    session = Session(engine)

    # Query all companies
    results = session.query(top_20_companies.id).all()

    session.close()

    # Convert list of tuples into normal list
    all_ids = [int(x) for x in np.ravel(results)]

    return jsonify(all_ids)

@app.route("/api/v1.0/timestamp")
def timestamp():
    # Create our session (link) from Python to the DB
    session = Session(engine)

    # Query all timestamps
    results = session.query(top_20_companies.timestamp).all()

    session.close()

    # Convert list of tuples into normal list
    all_timestamps = list(np.ravel(results))

    return jsonify(all_timestamps)

@app.route("/api/v1.0/company")
def company():
    # Create our session (link) from Python to the DB
    session = Session(engine)

    # Query all companies
    results = session.query(top_20_companies.company).all()

    session.close()

    # Convert list of tuples into normal list
    all_companies = list(np.ravel(results))

    return jsonify(all_companies)

@app.route("/api/v1.0/level")
def level():
    # Create our session (link) from Python to the DB
    session = Session(engine)

    # Query all company level
    results = session.query(top_20_companies.level).all()

    session.close()

    # Convert list of tuples into normal list
    all_levels = list(np.ravel(results))

    return jsonify(all_levels)

@app.route("/api/v1.0/title")
def title():
    # Create our session (link) from Python to the DB
    session = Session(engine)

    # Query all passengers
    results = session.query(top_20_companies.title).all()

    session.close()

    # Convert list of tuples into normal list
    all_titles = list(np.ravel(results))

    return jsonify(all_titles)

@app.route("/api/v1.0/totalyearlycompensation")
def totalyearlycompensation():
    # Create our session (link) from Python to the DB
    session = Session(engine)

    # Query total yearly compensation
    results = session.query(top_20_companies.totalyearlycompensation).all()

    session.close()

    # Convert list of tuples into normal list
    all_totalyearlycompensations = [float(x) for x in np.ravel(results)]
    #all_totalyearlycompensations = list(np.ravel(results))

    return jsonify(all_totalyearlycompensations)

@app.route("/api/v1.0/location")
def location():
    # Create our session (link) from Python to the DB
    session = Session(engine)

    # Query all companies location
    results = session.query(top_20_companies.location).all()

    session.close()

    # Convert list of tuples into normal list
    all_locations = list(np.ravel(results))

    return jsonify(all_locations)

@app.route("/api/v1.0/yearsofexperience")
def yearsofexperience():
    # Create our session (link) from Python to the DB
    session = Session(engine)

    # Query years of experience 
    results = session.query(top_20_companies.yearsofexperience).all()

    session.close()

    # Convert list of tuples into normal list
    all_yearsofexperience = list(np.ravel(results))
    
    return jsonify(all_yearsofexperience)

@app.route("/api/v1.0/yearsatcompany")
def yearsatcompany():
    # Create our session (link) from Python to the DB
    session = Session(engine)

    """Return a list of all passenger names"""
    # Query all passengers
    results = session.query(top_20_companies.yearsatcompany).all()

    session.close()

    # Convert list of tuples into normal list
    all_yearsatcompany = list(np.ravel(results))

    return jsonify(all_yearsatcompany)

@app.route("/api/v1.0/tag")
def tag():
    # Create our session (link) from Python to the DB
    session = Session(engine)

    """Return a list of all passenger names"""
    # Query all passengers
    results = session.query(top_20_companies.tag).all()

    session.close()

    # Convert list of tuples into normal list
    all_tags = list(np.ravel(results))

    return jsonify(all_tags)

@app.route("/api/v1.0/gender")
def gender():
    # Create our session (link) from Python to the DB
    session = Session(engine)

    """Return a list of all passenger names"""
    # Query all passengers
    results = session.query(top_20_companies.gender).all()

    session.close()

    # Convert list of tuples into normal list
    all_genders = list(np.ravel(results))

    return jsonify(all_genders)

@app.route("/api/v1.0/cityid")
def cityid():
    # Create our session (link) from Python to the DB
    session = Session(engine)

    """Return a list of all passenger names"""
    # Query all passengers
    results = session.query(top_20_companies.cityid).all()

    session.close()

    # Convert list of tuples into normal list
    all_cityids = [int(x) for x in np.ravel(results)]
    #all_cityids = list(np.ravel(results))

    return jsonify(all_cityids)

@app.route("/api/v1.0/dmaid")
def dmaid():
    # Create our session (link) from Python to the DB
    session = Session(engine)

    """Return a list of all passenger names"""
    # Query all passengers
    results = session.query(top_20_companies.dmaid).all()

    session.close()

    # Convert list of tuples into normal list
    all_dmaids = list(np.ravel(results))

    return jsonify(all_dmaids)

@app.route("/api/v1.0/rownumber")
def rownumber():
    # Create our session (link) from Python to the DB
    session = Session(engine)

    """Return a list of all passenger names"""
    # Query all passengers
    results = session.query(top_20_companies.rownumber).all()

    session.close()

    # Convert list of tuples into normal list
    all_rownumbers = [int(x) for x in np.ravel(results)]
    #all_rownumbers = list(np.ravel(results))

    return jsonify(all_rownumbers)

@app.route("/api/v1.0/mastersdegree")
def mastersdegree():
    # Create our session (link) from Python to the DB
    session = Session(engine)

    """Return a list of all passenger names"""
    # Query all passengers
    results = session.query(top_20_companies.mastersdegree).all()

    session.close()

    # Convert list of tuples into normal list
    all_mastersdegrees = [bool(x) for x in np.ravel(results)]
    #all_mastersdegrees = list(np.ravel(results))

    return jsonify(all_mastersdegrees)

@app.route("/api/v1.0/bachelorsdegree")
def bachelorsdegree():
    # Create our session (link) from Python to the DB
    session = Session(engine)

    """Return a list of all passenger names"""
    # Query all passengers
    results = session.query(top_20_companies.bachelorsdegree).all()

    session.close()

    # Convert list of tuples into normal list
    all_bachelorsdegrees = [bool(x) for x in np.ravel(results)]

    return jsonify(all_bachelorsdegrees)

@app.route("/api/v1.0/doctoratedegree")
def doctoratedegree():
    # Create our session (link) from Python to the DB
    session = Session(engine)

    """Return a list of all passenger names"""
    # Query all passengers
    results = session.query(top_20_companies.doctoratedegree).all()

    session.close()

    # Convert list of tuples into normal list
    all_doctoratedegrees = [bool(x) for x in np.ravel(results)]

    return jsonify(all_doctoratedegrees)

@app.route("/api/v1.0/raceasian")
def raceasian():
    # Create our session (link) from Python to the DB
    session = Session(engine)

    """Return a list of all passenger names"""
    # Query all passengers
    results = session.query(top_20_companies.raceasian).all()

    session.close()

    # Convert list of tuples into normal list
    all_raceasians = [bool(x) for x in np.ravel(results)]

    return jsonify(all_raceasians)

@app.route("/api/v1.0/racewhite")
def racewhite():
    # Create our session (link) from Python to the DB
    session = Session(engine)

    """Return a list of all passenger names"""
    # Query all passengers
    results = session.query(top_20_companies.racewhite).all()

    session.close()

    # Convert list of tuples into normal list
    all_racewhites = [bool(x) for x in np.ravel(results)]

    return jsonify(all_racewhites)

@app.route("/api/v1.0/racetwoormore")
def racetwoormore():
    # Create our session (link) from Python to the DB
    session = Session(engine)

    """Return a list of all passenger names"""
    # Query all passengers
    results = session.query(top_20_companies.racetwoormore).all()

    session.close()

    # Convert list of tuples into normal list
    all_racetwoormores = [bool(x) for x in np.ravel(results)]

    return jsonify(all_racetwoormores)

@app.route("/api/v1.0/raceblack")
def raceblack():
    # Create our session (link) from Python to the DB
    session = Session(engine)

    """Return a list of all passenger names"""
    # Query all passengers
    results = session.query(top_20_companies.raceblack).all()

    session.close()

    # Convert list of tuples into normal list
    all_raceblacks = [bool(x) for x in np.ravel(results)]

    return jsonify(all_raceblacks)

@app.route("/api/v1.0/racehispanic")
def racehispanic():
    # Create our session (link) from Python to the DB
    session = Session(engine)

    """Return a list of all passenger names"""
    # Query all passengers
    results = session.query(top_20_companies.racehispanic).all()

    session.close()

    # Convert list of tuples into normal list
    all_racehispanics = [bool(x) for x in np.ravel(results)]

    return jsonify(all_racehispanics)



"""
@app.route("/api/v1.0/passengers")
def passengers():
    # Create our session (link) from Python to the DB
    session = Session(engine)

    '''Return a list of passenger data including the name, age, and sex of each passenger'''
    # Query all passengers
    results = session.query(top_20_companies.name, top_20_companies.age, top_20_companies.sex).all()

    session.close()

    # Create a dictionary from the row data and append to a list of all_passengers
    all_passengers = []
    for name, age, sex in results:
        passenger_dict = {}
        passenger_dict["name"] = name
        passenger_dict["age"] = age
        passenger_dict["sex"] = sex
        all_passengers.append(passenger_dict)

    return jsonify(all_passengers)
"""


if __name__ == '__main__':
    app.run(debug=True)
