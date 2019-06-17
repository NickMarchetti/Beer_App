# import necessary libraries
from sqlalchemy import func
import pandas as pd

from flask import (
    Flask,
    render_template,
    jsonify)

from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:///db/beer_brewery_db.sqlite"

db = SQLAlchemy(app)


class Beer(db.Model):
    __tablename__ = 'beer'

    index = db.Column(db.Integer, primary_key=True)
    beer = db.Column(db.String)
    Total_Votes = db.Column(db.Integer)
    rating = db.Column(db.Float)
    brewery = db.Column(db.String)
    Beer_Style = db.Column(db.String)
    ABV = db.Column(db.Float)
    Region = db.Column(db.String)
    Latitude = db.Column(db.Float)
    Longitude = db.Column(db.Float)
    City = db.Column(db.String)
    State = db.Column(db.String)

    def __repr__(self):
        return '<Beer %r>' % (self.name)


# Create database classes
@app.before_first_request
def setup():
    # Recreate database each time for demo
    # db.drop_all()
    db.create_all()


# Create a route that renders index.html template
@app.route("/")
def home():
    return render_template("index.html")


# Query the database and return the jsonified results
@app.route("/data")
def data():
    results = db.session.query(Beer.index,
                               Beer.beer,
                               Beer.Beer_Style,
                               Beer.rating,
                               Beer.Total_Votes,
                               Beer.ABV,
                               Beer.brewery,
                               Beer.Region,
                               Beer.Latitude,
                               Beer.Longitude,
                               Beer.City,
                               Beer.State).all()

    breweries = []
    for result in results:
        breweries.append({
            "beer_key": result[0],
            "beer_name": result[1],
            "beer_style": result[2],
            "beer_rating": result[3],
            "beer_rating_votes": result[4],
            "beer_abv": result[5],
            "brewery": result[6],
            "brewery_region": result[7],
            "brewery_latitude": result[8],
            "brewery_longitude": result[9],
            "brewery_city": result[10],
            "brewery_state": result[11]
        })
    return jsonify(breweries)


if __name__ == "__main__":
    app.run(debug=True)
