from flask import Flask, request,redirect,session
from flask_socketio import SocketIO,send,join_room,leave_room,emit

from flask_mysqldb import MySQL
from flask import jsonify
from flask_cors import CORS, cross_origin
from flask_bcrypt import Bcrypt
import secrets
import yaml

app =Flask(__name__)
SESSION_TYPE = 'redis' 
app.config.from_object(__name__)


#configure db
#we load the file cotaining our database identifiers
secretKey = secrets.token_urlsafe(18)
app.config["SECRET_KEY"]=secretKey

db = yaml.load(open('db.yaml'))
app.config['CORS_HEADERS'] = 'Content-Type'
app.config['MYSQL_HOST']=db['mysql_host']
app.config['MYSQL_USER']=db['mysql_user']
app.config['MYSQL_PASSWORD']=db['mysql_password']
app.config['MYSQL_DB']=db['mysql_db']
SESSION_TYPE = 'redis'


mysql =MySQL(app)
CORS(app, supports_credentials=True)
bcrypt = Bcrypt(app)

SocketIO = SocketIO(app,cors_allowed_origins='*')
app.host='localhost'



@app.route('/', methods =['GET' ,'POST'])
@cross_origin(supports_credentials=True)
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
@cross_origin(supports_credentials=True)
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
            
            email = "'%s'" %json_data.get('email')
            cur.execute("select userId from utilisateur where email = {}".format(email))
            userId = cur.fetchall()
            userId = userId[0][0]
            if(json_data.get('status') =="patient") :
                cur.execute("insert into patient(userId) VALUES({})".format(userId))
                mysql.connection.commit()
                cur.close()
                return "successPat"
            else:
                cur.execute("insert into medecin(userId) VALUES({})".format(userId))
                mysql.connection.commit()
                cur.close()
                return "successMed"
                          


@app.route('/login', methods =['GET','POST'])
@cross_origin(supports_credentials=True)
def login():
    if request.method =='POST' :
        json_data = request.get_json()
        
        value = json_data.get('email')
        cur = mysql.connection.cursor() 
        cur.execute("select motdepasse from utilisateur where email = %s", [json_data.get('email')])
        pwd = cur.fetchall()
        pwd2 = pwd[0][0]
        if bcrypt.check_password_hash(pwd2,json_data.get('password')) :
            cur = mysql.connection.cursor() 
            cur.execute("select userId from utilisateur where email = %s",[json_data.get('email')])
            userId = cur.fetchall()
            userId2 = userId[0][0]
            
                
            session['loggedin'] = True
            session['id']= userId2
           
            session['username'] = value
            cur.execute("select statut from utilisateur where email = %s",[json_data.get('email')])
            state = cur.fetchall()
            state = jsonify(state)
           
            return state
        else :
            return("L'utilisateur n'xiste pas veuillez verifier votre email ou motdepasse")

@app.route('/logout', methods =['GET','POST'])
@cross_origin(supports_credentials=True)
def logout():
    session.pop('loggedin')
    session.pop('id')
    session.pop("username")
    session['loggedin'] =False
    
   

    return 'success'

@app.route('/profil', methods =['GET','POST'])
@cross_origin(supports_credentials=True)
def profil():
    if 'username' in session:
        resultValue = session['id']
        userID="'%s'" %resultValue
        cur =mysql.connection.cursor()
        cur.execute("select statut from utilisateur where userId = {}".format(userID))
        resultReq = cur.fetchall()
        resultReq =resultReq[0][0]
        reponseReq =[resultValue,resultReq]
        resp2=jsonify(reponseReq)
        resp2.status_code=200
        return resp2
    else:
        return 'notIn'
               

@app.route('/fetchPatient', methods =['GET','POST'])
@cross_origin(supports_credentials=True)
def fetchPatient():
    if request.method =='GET' :
        cur =mysql.connection.cursor()
        userId=session['id']
       
        cur.execute("select * from patient join utilisateur where utilisateur.userId = {}".format(userId))
        patientData = cur.fetchall()
        patientData=jsonify(patientData)
        patientData.status_code=200
        return patientData

@app.route('/fetchMed', methods =['GET','POST'])
@cross_origin(supports_credentials=True)
def fetchPMed():
    if request.method =='GET' :
        cur =mysql.connection.cursor()
        userIdMed=session['id']
        userNameMed = session['username']
        userNameMed ="'%s'"%userNameMed
       
        
        cur.execute("select * from medecin join utilisateur where medecin.userId = {} and utilisateur.email ={} ".format(userIdMed,userNameMed))
        MedData = cur.fetchall()
        MedData=jsonify(MedData)
        MedData.status_code=200
        return MedData


#-----------------------------------------------------------Web Socket---------------------------------

users ={}
backupMess =[]
@SocketIO.on("username", namespace ='/private')
def recieve_username(username):
    users[username] = request.sid

@SocketIO.on("message")
def handleMessage(msg):
    destination_id = users["tresortek7@gmail.com"]
    #destination_id = users[msg['username']]
    message = msg['message']
    if len(backupMess) <8 :
        backupMess.append(message)
    elif len(backupMess) >= 8 :
        backupMess.pop(0)
        backupMess.append(message)
    print('****************************************dfsdfs***********')
    print(backupMess)
    emit('message',message, room=destination_id)

    return None





        
@app.route('/savedata',methods =['GET','POST'])
@cross_origin(supports_credentials=True)
def save():
    if request.method =='POST' :
        json_data = request.get_json()
        cur = mysql.connection.cursor() 
        userIdt=json_data.get('userIdt')
        Genre= json_data.get('Genre')
        DateNaiss=json_data.get('DateNaiss')
        NumeroRue=json_data.get('NumeroRue')
        NumeroRue2=json_data.get('noNumeroRue2m')
        cite=json_data.get('cite')
        Region=json_data.get('Region')
        codePostal=json_data.get('codePostal')
        Pays=json_data.get('Pays')
        Phone=json_data.get('Phone')
        Poids=json_data.get('Poids')
        Taille=json_data.get('Taille')
        GroupeSanguin=json_data.get('GroupeSanguin')
        allergies=json_data.get('allergies')
        autreAllergie=json_data.get('autreAllergie')
        Autre=json_data.get('Autre')
        imageUrl =json_data.get('imageUrl')
        #queryUpdate ="UPDATE patient SET genre =%s,dateNaiss=%s,numeroRue=%s,numeroRue2=%s,cite=%s,region=%s,codePostal=%s,pays=%s WHERE userId =%s"[Genre,DateNaiss,NumeroRue,NumeroRue2,cite,Region,codePostal,Pays,userIdt]
        cur.execute("UPDATE patient SET genre =%s,dateNaiss=%s,numeroRue=%s,numeroRue2=%s,cite=%s,region=%s,codePostal=%s,pays=%s WHERE userId =%s",[Genre,DateNaiss,NumeroRue,NumeroRue2,cite,Region,codePostal,Pays,userIdt])
        #queryUpdate2 ="UPDATE patient SET phone=%s,poids=%s,taille=%s,groupeSanguin=%s,allergies=%s,autreAllergie=%s,autre=%s,imageUrl =%s WHERE userId =%s",[Phone,Poids,Taille,GroupeSanguin,allergies,autreAllergie,Autre,imageUrl,userIdt]
        cur.execute("UPDATE patient SET phone=%s,poids=%s,taille=%s,groupeSanguin=%s,allergies=%s,autreAllergie=%s,autre=%s,imageUrl =%s WHERE userId =%s",[Phone,Poids,Taille,GroupeSanguin,allergies,autreAllergie,Autre,imageUrl,userIdt])
        mysql.connection.commit()
        cur.close()    
        return "update success"

@app.route('/savedataMed',methods =['GET','POST'])
@cross_origin(supports_credentials=True)
def savedataMed():
        if request.method =='POST' :
            json_data = request.get_json()
            cur = mysql.connection.cursor() 
            userIdtMed="'%s'" %json_data.get('userIdtMed')
            Civilite= "'%s'" %json_data.get('Civilite')
            DateNaiss= "'%s'" %json_data.get('DateNaiss')
            NumeroRue="'%s'" %json_data.get('NumeroRue')
            NumeroRue2="'%s'" %json_data.get('noNumeroRue2m')
            Convention="'%s'" %json_data.get('Convention')
            specialite="'%s'" %json_data.get('specialite')
            cite="'%s'" %json_data.get('cite')
            Region="'%s'" %json_data.get('Region')
            codePostal="'%s'" %json_data.get('codePostal')
            Pays="'%s'" %json_data.get('Pays')
            Phone="'%s'" %json_data.get('Phone')
            Autre="'%s'" %json_data.get('Autre')
            queryUpdate3 ="UPDATE medecin SET civilite ={},dateNaiss={},numeroRue={},numeroRue2={},cite={},region={},codePostal={},pays={} WHERE userId ={}".format(Civilite,DateNaiss,NumeroRue,NumeroRue2,cite,Region,codePostal,Pays,userIdtMed)
            cur.execute(queryUpdate3)
            queryUpdate4 ="UPDATE medecin SET phone={},autre={},specialite={},convention={} WHERE userId ={}".format(Phone,Autre,specialite,Convention, userIdtMed)
            cur.execute(queryUpdate4)
            mysql.connection.commit()
            cur.close()    
            return "update Med success"



@app.route('/get_Med',methods=['GET','POST'])
def get_Med():
    try:
        query2 = "select utilisateur.userId,nom,prenom,specialite,autre from utilisateur join medecin where medecin.userId =utilisateur.userId"
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

@app.route('/addCons', methods =['GET','POST'])
@cross_origin(supports_credentials=True)
def addCons():
    print('ooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo')
    print(session['id'])
    if request.method =='POST' :
        json_data = request.get_json()
        idMed =json_data.get("id")
        idPat =session['id']
        test =int(idMed)
        print(type(idMed))
        print(type (idPat))
        print(type(test))
        
        cur =mysql.connection.cursor() 
        cur.execute("insert into consultation(patId,medId) VALUES(%s,%s)",(idPat,idMed))
        mysql.connection.commit()
        cur.close()
        return "insert success"


@app.route('/profilMed', methods =['GET','POST'])
@cross_origin(supports_credentials=True)
def profPMed():
    if request.method =='POST' :
        json_data = request.get_json()
        value4 ="'%s'" %json_data.get("userIdtMed")
        print("hahahahahaaaaaaaaaaaaaaahhhhhhhhhhhhhhhhhh")
        print(value4)
        cur =mysql.connection.cursor() 
        cur.execute("select * from medecin join utilisateur where medecin.userId = {} and utilisateur.userId ={} ".format(value4,value4))
        MedData2 = cur.fetchall()
        MedData2=jsonify(MedData2)
        MedData2.status_code=200
        return MedData2

@app.route('/getConsMed', methods =['GET','POST'])
@cross_origin(supports_credentials=True)
def consMed():
    idPat = session['id']
    cur =mysql.connection.cursor()
    cur.execute("select medId from consultation where consultation.patId ={} ".format(idPat))
    medId = cur.fetchall()
    medId = medId[0][0]
    medId2 = int(medId)
    print('**********************************************************')
    print(medId2)
    cur.execute("select * from medecin join utilisateur where medecin.userId = {} and utilisateur.userId = {}".format(medId2,medId2))
    myDocInfos = cur.fetchall()
    myDocInfos = jsonify(myDocInfos)
    myDocInfos.status_code =200
    return myDocInfos


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