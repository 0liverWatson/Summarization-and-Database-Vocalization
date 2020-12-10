import flask
import json
from db_scripts import *

app = flask.Flask("flask_server")
app.config["DEBUG"] = True

database = r"D:\DKE\DBSE Project\WikiSQL-master\data\train.db"
conn = create_connection(database)

@app.route("/" , methods=["GET"])
def home():
    return "Running Flask server"

@app.route("/tables", methods=["GET"])
def get_tables():
    conn = create_connection(database)

    
    with conn:
        
        tbl = list_tables(conn)
        print("Total Tables:", len(tbl))
        return json.dumps({"tables":tbl})



app.run()