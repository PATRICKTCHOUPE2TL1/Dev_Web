from flask import Flask , render_template,request,jsonify,make_response
from flask_sqlalchemy import SQLAlchemy
from flask_mysqldb import MySQL
import mysql.connector
from flask_socketio import SocketIO
from flask_cors import CORS
from flask_bcrypt import Bcrypt

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

app.config['SEND_FILE_MAX_AGE_DEFAULT'] = 2592000
app.config['SECRET_KEY'] = 'vnkdjnfjknfl1232#'
app.config['CORS_HEADERS'] = 'application/json'
socketio = SocketIO(app, cors_allowed_origins="*")
#socketio.set('origins', '*');
bcrypt = Bcrypt(app)
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
    
@app.route('/postdata' ,methods=["POST"])    
def enregistrement():
    if request.method == "POST":
        print("okok")
        connection = mysql.connector.connect(host='localhost',database='takecare',user='root',password='IloveMVC', auth_plugin='mysql_native_password')
        cur = connection.cursor()
        cur.execute("select MAX(userId) from utilisateur;")
        num = int(''.join(map(str,cur.fetchone())))+1
        userDetails = request.get_json(force = True)
        print(userDetails)
        nom = userDetails["nom"]
        prenom = userDetails.get("prenom")
        email = userDetails.get("email")
        tel = userDetails.get("tel")
        dateNaiss = userDetails.get("dateNaiss")
        password = userDetails.get("password")
        genre = userDetails.get("genre")
        
        #recherche d'intégrité
        #cur.execute("select MAX(userId) from utilisateur;")
        cur.execute("select email from utilisateur;")
        val = cur.fetchall();
        ret = '';
        for i in val :
            if i[0] == email : 
                print(i[0])
                ret = 'erreur, cet email est deja utilisé'
        if ret == '':
            cur.execute("INSERT INTO utilisateur VALUES (%s,%s, %s, %s, %s, %s,%s);", (num,nom, prenom,email,tel,dateNaiss,password))
            connection.commit()
            cur.close()
            if genre == "medecin" :
                rrps = userDetails.get("RRPS")
                specialite = userDetails.get("specialite")
                localisation = userDetails.get("localisation")
                cur.execute("INSERT INTO medecin VALUES (%s,%s, %s, %s);", (num,secialite, localisation,rrps))
                connection.commit()
                cur.close()
            elif genre == "patient" :
                poids = userDetails.get("poids")
                gp = userDetails.get("gp")
                localisation = userDetails.get("localisation")
                taille = userDetails.get("taille")
                cur.execute("INSERT INTO medecin VALUES (%s,%s, %s, %s);", (num,poids,gp, localisation,taille))
                connection.commit()
                cur.close()
            else : 
                return jsonify("choisissez un medecin ou patient")
            return userDetails
        else :
            print(jsonify(ret))
            return jsonify(ret)
        #return render_template("inscription.html",userDetails = userDetails,medecin = med)

@app.route('/ask/<email>' ,methods=["POST"])    
def demande(email):
    if request.method == "POST":
        connection = mysql.connector.connect(host='localhost',database='takecare',user='root',password='IloveMVC', auth_plugin='mysql_native_password')
        cur = connection.cursor()
        password = request.get_json(force = True)
        #print(password)
        cur.execute("SELECT password FROM utilisateur WHERE email= '%s';"%(email))
        vrai_password = cur.fetchall()
        vrai_password = vrai_password[0][0]
        print(vrai_password)
        #pw_hash = bcrypt.generate_password_hash(password)
        #candidate = request.get_json(force = True)["candidate"]
        ret = ''
        if bcrypt.check_password_hash(password, vrai_password) == True :
            #print(email)
            cur.execute("SELECT * FROM utilisateur WHERE email= '%s';"%(email))
            recherche = cur.fetchall();
            for i in recherche:
                print("------------------------------------------------------------------------------------")
                print(i)
                print("------------------------------------------------------------------------------------")
                ret += str(i)
            if ret=='' :
                ret = 'Pas de correspondance'
            cur.close()
            
            reponse = make_response()
            reponse.body = jsonify(ret)
            reponse.status_code = 200
            reponse.header = {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin' : '*',
                    "Access-Control-Allow-Credentials" : True 
                }
            print(reponse.body)
        else:
            ret = 'mot de passe incorrect'
        
        return jsonify(ret)
@app.route('/medecin' ,methods=["POST"]) 
def med():
    connection = mysql.connector.connect(host='localhost',database='takecare',user='root',password='IloveMVC', auth_plugin='mysql_native_password')
    cur = connection.cursor()
    cur.execute("select * from medecin join utilisateur on utilisateur.userId = medecin.idmedecin;")
    medDetails = cur.fetchall();
    cur.close()
    return jsonify(medDetails)
    
@app.route('/utilisateur/<nom>' ,methods=["POST"])
def util(nom):
    connection = mysql.connector.connect(host='localhost',database='takecare',user='root',password='IloveMVC', auth_plugin='mysql_native_password')
    cur = connection.cursor()
    cur.execute("select * from patient join utilisateur on utilisateur.userId = patient.idPatient where utilisateur.nom = '%s';"%nom)
    utilDetails = cur.fetchall();
    print(utilDetails)
    cur.close()
    return jsonify(utilDetails)
@app.route('/update/<email>' ,methods=["POST"]) 
def update(email):
    connection = mysql.connector.connect(host='localhost',database='takecare',user='root',password='IloveMVC', auth_plugin='mysql_native_password')
    cur = connection.cursor()
    userDetails = request.get_json(force = True)
    print(userDetails)
    nom = userDetails["Nom"]
    prenom = userDetails.get("Prenom")
    tel = userDetails.get("numTel")
    dateNaiss = userDetails.get("DateNaiss")
    gp = userDetails.get("gp")
    poids = userDetails.get("poids")
    localisation = userDetails.get("localisation")
    taille = userDetails.get("taille")
    password = userDetails.get("pw")
    ret = 'ok'
    
    cur.execute("UPDATE utilisateur SET nom = '%s' , prenom = '%s' , tel = '%s'  WHERE email = '%s' "%(nom,prenom,tel,email))
    connection.commit()
    cur.execute("select userId from utilisateur where email = '%s';"% email)
    num = int(''.join(map(str,cur.fetchone())))
    cur.execute("UPDATE patient SET poids = %s , groupe_sanguin = '%s' , localisation = '%s' , taille = '%s'  WHERE idPatient = %s "%(poids,gp,localisation,taille,num))
    connection.commit()
    
    cur.close()
    return jsonify(ret)
@socketio.on('connect')
def start ( methods=['GET', 'POST']):
    print('user connected')
    socketio.emit('my response', callback=messageReceived)
@socketio.on('my event')
def handle_my_custom_event(json, methods=['GET', 'POST']):
    print('received my event: '+ str(json))
    socketio.emit('message', json, callback=messageReceived)

    
if __name__ == "__main__":
        app.run(debug = True, host='0.0.0.0', port='5000')
        socketio.run(app)
        
