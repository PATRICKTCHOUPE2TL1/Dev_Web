from flask import Flask, request
from flask_mysqldb import MySQL
from flask import jsonify
from flask_cors import CORS
import yaml


app =Flask(__name__)

#configure db
#we load the file cotaining our database identifiers
db = yaml.load(open('db.yaml'))
app.config['MYSQL_HOST']=db['mysql_host']
app.config['MYSQL_USER']=db['mysql_user']
app.config['MYSQL_PASSWORD']=db['mysql_password']
app.config['MYSQL_DB']=db['mysql_db']

mysql =MySQL(app)
CORS(app)

@app.route('/', methods =['GET' ,'POST'])
def index():
    #we connect to our database
    cur = mysql.connection.cursor() 
    cur.execute("INSERT INTO utilisateur(userId, nom, prenom,email,tel,date_naissance) VALUES(%s,%s,%s,%s,%s,%s)",(1,"tekadam","tresor","tresortek7@gmail.com","0465429916","2019-03-01"))
    mysql.connection.commit()
    cur.close()
    return 'success'
@app.route('/postdata',methods =['GET','POST'])
def recieve():
    data = request.form
    print(data)
    return data

@app.route('/users', methods =['GET','POST'])
def users():
    #retrieve data from db
    try: 
        data = request.json
        print(data)
        cur =mysql.connection.cursor()
        cur.execute("SELECT * FROM utilisateur")
        resultValue = cur.fetchall()
        resp=jsonify(resultValue)
        resp.status_code=200
        return resp
    except Exception as e:
        print(e)
    finally:
        cur.close()

@app.route('/forms',methods =['GET'])

@app.errorhandler(404)
def not_found(error=None):
    #manage errors
    message = {
        'status' : 404,
        'message': 'Not found' + request.url,
    }
    resp = jsonify(message)
    resp.status_code =404
    return resp


if __name__ == '__main__':
    app.run(debug=True)