from flask import Flask , render_template,request,jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_mysqldb import MySQL
import mysql.connector
from flask_socketio import SocketIO
from flask_cors import CORS


app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

app.config['SEND_FILE_MAX_AGE_DEFAULT'] = 2592000
app.config['SECRET_KEY'] = 'vnkdjnfjknfl1232#'
app.config['CORS_HEADERS'] = 'application/json'
socketio = SocketIO(app)

db = SQLAlchemy(app)

def messageReceived(methods=['GET', 'POST']):
    print('message was received!!!')

class Test(db.Model):
    id=db.Column(db.Integer,primary_key = True)
    nom=db.Column(db.String(45))
    prenom=db.Column(db.String(45))
    password=db.Column(db.String(45))
    username =db.Column(db.String(45))
    age =db.Column(db.Integer)
    
    def __init__(self,nom,prenom,password,username,age):
        id=1
        self.nom = nom
        self.prenom = prenom
        self.password = password 
        self.username = username
        self.age = age 
      
@app.route('/' ,methods=["GET","POST"])

def index():
    print( app.get_send_file_max_age('static/index.css') )
    connection = mysql.connector.connect(host='localhost',database='medecine',user='root',password='IloveMVC', auth_plugin='mysql_native_password')
    cur = connection.cursor()
    cur.execute("SELECT * FROM patient;")
    res = cur.fetchall();
    for i in res:
        print("------------------------------------------------------------------------------------")
        print(i)
        print("------------------------------------------------------------------------------------")
    cur.close()
    #return render_template("index.html")
    return jsonify(res)
    
@app.route('/inscription' ,methods=["POST"])    
def enregistrement():
    if request.method == "POST":
        print("okok")
        connection = mysql.connector.connect(host='localhost',database='medecine',user='root',password='IloveMVC', auth_plugin='mysql_native_password')
        cur = connection.cursor()
        cur.execute("select MAX(id) from patient;")
        num = int(''.join(map(str,cur.fetchone())))+1
        userDetails = request.form
        print(userDetails)
        nom = userDetails["nom"]
        prenom = userDetails["prenom"]
        email = userDetails["email"]
        med = userDetails["medecin"]
        cur.execute("select idMed from medecins where nom = '%s';"%med)
        id_med = int(''.join(map(str,cur.fetchone())))
        cur.execute("INSERT INTO patient VALUES (%s,%s, %s, %s, %s, %s);", (num,nom, prenom,email,id_med,id_med))
        connection.commit()
        cur.close()
        return jsonify(userDetails)
        #return render_template("inscription.html",userDetails = userDetails,medecin = med)
@app.route('/inscription_m' ,methods=["POST"]) 
def rech_med ():
    if request.method == "POST":
        connection = mysql.connector.connect(host='localhost',database='medecine',user='root',password='IloveMVC', auth_plugin='mysql_native_password')
        cur = connection.cursor()
        cur.execute("select MAX(idMed) from medecins;")
        num = int(''.join(map(str,cur.fetchone())))+1
        userDetails = request.form
        nom = userDetails["nom_m"]
        prenom = userDetails["prenom_m"]
        specialite = userDetails["specialite"]
        cur.execute("INSERT INTO medecins VALUES (%s,%s, %s, %s);", (num,nom, prenom,specialite))
        connection.commit()
        cur.close()
        print(userDetails)
        return jsonify(userDetails)
        #return render_template("inscription_m.html",nom = nom,prenom = prenom,specialite = specialite)
@app.route('/ask' ,methods=["POST"])    
def demande():
    if request.method == "POST":
        connection = mysql.connector.connect(host='localhost',database='medecine',user='root',password='IloveMVC', auth_plugin='mysql_native_password')
        cur = connection.cursor()
        ret = 'reponse : '
        nom_demande = str(request.form.get("rech"))
        if nom_demande == None:
            ret= 'erreur interne'
            print("erreur")
            print("erreur")
            print("erreur")
            print("erreur")
        else:
            print(nom_demande)
            cur.execute("SELECT * FROM patient WHERE nom= '%s';"%(nom_demande))
            recherche = cur.fetchall();
            for i in recherche:
                print("------------------------------------------------------------------------------------")
                print(i)
                print("------------------------------------------------------------------------------------")
                ret += str(i)
        if ret=='reponse : ' :
            ret = 'Pas de correspondance'
        cur.close()
        return jsonify(ret)
        #return ret
@app.route('/ask_m' ,methods=["POST"]) 
def ask4med ():
    if request.method == "POST":
        connection = mysql.connector.connect(host='localhost',database='medecine',user='root',password='IloveMVC', auth_plugin='mysql_native_password')
        cur = connection.cursor()
        ret = 'reponse : '
        nom_demande = str(request.form.get("rech_m"))
        if nom_demande == None:
            ret= 'erreur interne'
            print("erreur")
            
        else:
            print(nom_demande)
            cur.execute("SELECT * FROM medecins WHERE nom= '%s';"%(nom_demande))
            recherche = cur.fetchall();
            for i in recherche:
                print("------------------------------------------------------------------------------------")
                print(i)
                print("------------------------------------------------------------------------------------")
                ret += str(i)
        if ret=='reponse : ' :
            ret = 'Pas de correspondance'
        cur.close()
        return jsonify(ret)
        #return ret
@app.route('/urgence' )
def urg():
    return render_template("urgence.html")
@app.route('/urgencep' )
def p2p():
    type_u="medecin"#a changer
    return render_template("urgence_p2p.html",type_u = type_u)  
@socketio.on('my event')
def handle_my_custom_event(json, methods=['GET', 'POST']):
    print('received my event: '+ str(json))
    socketio.emit('my response', json, callback=messageReceived)

    
if __name__ == "__main__":
        app.run(debug = True, host='0.0.0.0', port='3001')
        
