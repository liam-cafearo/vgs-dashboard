import os
from flask import Flask
from flask import render_template
from pymongo import MongoClient
import json

app = Flask(__name__)

MONGO_URI = os.getenv('MONGODB_URI', 'mongodb://localhost:27017')
DBS_NAME = os.getenv('MONGO_DB_NAME', 'videoGames')
COLLECTION_NAME = 'videoGameSales'


@app.route("/")
def dataDash():
    return render_template("dataDash.html")


@app.route("/dataTable")
def dataTable():
    return render_template("dataTable.html")


@app.route("/vgsJson")
def vgsJson():
    FIELDS = {
        '_id': False, 'Rank': True, 'Name': True,
        'Platform': True, 'Year': True, 'Genre': True,
        'Publisher': True, 'NA_Sales': True, 'EU_Sales': True,
        'JP_Sales': True, 'Other_Sales': True, 'Global_Sales': True
    }

    with MongoClient(MONGO_URI) as conn:
        collection = conn[DBS_NAME][COLLECTION_NAME]
        # didn't limit results as there are  only 16598 records in the dbs
        videoGameSales = collection.find(projection=FIELDS)
        return json.dumps(list(videoGameSales))


@app.route("/vgsDataTable")
def vgsDataTable():
    return render_template("dataTable.html")


if __name__ == "__main__":
    app.run(debug=True)
