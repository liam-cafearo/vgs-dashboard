from flask import Flask
from flask import render_template
from pymongo import MongoClient
import json

app = Flask(__name__)

MONGODB_HOST = 'localhost'
MONGODB_PORT = 27017
DBS_NAME = 'videoGames'
COLLECTION_NAME = 'videoGameSales'


@app.route("/")
def dataDash():
    return render_template("dataDash.html")


@app.route("/vgsJson")
def vgsJson():
    FIELDS = {
        '_id': False, 'Platform': True, 'Year': True, 'Genre': True,
        'Publisher': True, 'NA_Sales': True, 'EU_Sales': True,
        'JP_Sales': True, 'Global_Sales': True
    }

    with MongoClient(MONGODB_HOST, MONGODB_PORT) as conn:
        collection = conn[DBS_NAME][COLLECTION_NAME]
        # didn't limit results as there are  only 16598 records in the dbs
        videoGameSales = collection.find(projection=FIELDS)
        return json.dumps(list(videoGameSales))

# Add code for dataTable here


@app.route("/vgsDataTable")
def vgsDataTable():
    return render_template("dataTable.html")


if __name__ == "__main__":
    app.run(debug=True)
