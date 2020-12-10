import flask
import json
from db_scripts import *

app = flask.Flask("flask_server")
app.config["DEBUG"] = True

database = r"D:\DKE\DBSE Project\WikiSQL-master\data\train.db"
conn = create_connection(database)

@app.route("/" , methods=["GET"])
def home():
    return "Running FLask server"

@app.route("/tables", methods=["GET"])
def get_tables():
    conn = create_connection(database)

    
    with conn:
        print("Tables:")
        tbl = list_tables(conn)
    
    
        return json.dumps(tbl)



app.run()