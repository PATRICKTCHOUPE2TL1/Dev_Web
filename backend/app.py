from flask import Flask, request,redirect
from flask_mysqldb import MySQL
from flask import jsonify
from flask_cors import CORS
from flask_bcrypt import Bcrypt
import yaml


app =Flask(__name__)

#configure db
#we load the file cotaining our database identifiers

db = yaml.load(open('db.yaml'))
app.config['CORS_HEADERS'] = 'Content-Type'
app.config['MYSQL_HOST']=db['mysql_host']
app.config['MYSQL_USER']=db['mysql_user']
app.config['MYSQL_PASSWORD']=db['mysql_password']
app.config['MYSQL_DB']=db['mysql_db']

mysql =MySQL(app)
CORS(app)
bcrypt = Bcrypt(app)


@app.route('/', methods =['GET' ,'POST'])
def index():
    try:
        query2 = "select email from utilisateur"
        cur2 = mysql.connection.cursor()
        cur2.execute(query2)
        resultValue = cur2.fetchall()
        resp = jsonify(resultValue)
        resp.status_code=200
        return resp
         
    except Exception as e:
        print(e)
    finally:
        cur2.close()




@app.route('/postdata',methods =['GET','POST'])
def recieve():
    if request.method =='POST' :
        json_data = request.get_json()
        pw_hash = bcrypt.generate_password_hash(json_data.get('motDepasse'),10)
        cur = mysql.connection.cursor() 
        cur.execute("select email from utilisateur")
        emails= cur.fetchall()
        notif =' '
        for i in emails :
            if json_data.get("email") == i[0]:
                notif = "cette utilisateur existe deja"
                print(notif)
                return(notif)
            
        if notif == ' ' :
            cur.execute("INSERT INTO utilisateur(nom, prenom,email,motdepasse,statut) VALUES(%s,%s,%s,%s,%s)",(json_data.get('nom'),json_data.get('prenom'),json_data.get('email'),pw_hash,json_data.get('status')))
            mysql.connection.commit()
            cur.close()
            return "success"


@app.route('/login', methods =['GET','POST'])
def connexion():
    if request.method =='POST' :
        json_data = request.get_json()
        value = "'%s'" %json_data.get('email')
        query ="select motdepasse from utilisateur where {} = {}".format("email",value)
        cur = mysql.connection.cursor() 
        cur.execute(query)
        pwd = cur.fetchall()
        pwd2 = pwd[0][0]
        if bcrypt.check_password_hash(pwd2,json_data.get('password')) :
            cur = mysql.connection.cursor() 
            query2 ="select statut from utilisateur where {} = {}".format("email",value)
            cur.execute(query2)
            state =cur.fetchall()
            state = jsonify(state)
            return state    
        else :
            return("une erreur est survenue")
       

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