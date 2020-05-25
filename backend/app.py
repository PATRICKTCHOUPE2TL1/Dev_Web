from flask import Flask, request,redirect,session
from flask_socketio import SocketIO,send,join_room,leave_room,emit

from flask_mysqldb import MySQL
from flask import jsonify
from flask_cors import CORS, cross_origin
from flask_bcrypt import Bcrypt
import secrets
import yaml

app =Flask(__name__)
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
                mysql.connection.commit()
                return jsonify(["successMed",userId])
                        
@app.route('/AddMed',methods =['GET','POST']) 
def addMed():
    json_data = request.get_json()
    userId = json_data.get('userId')
    carteId= json_data.get("MedCarteId")
    preuvemed = json_data.get("preuveMed")
    emailPrive =json_data.get("email")
    userId = json_data.get("userId")
    cur = mysql.connection.cursor() 
    cur.execute("insert into attente(carteIdt,preuveMed,emailPrive,userId,statut)values(%s,%s,%s,%s,%s)",[carteId,preuvemed,emailPrive,userId,'true'])
    mysql.connection.commit()
    cur.close()
    return ("insert success")

@app.route('/validerStatus', methods =['GET','POST'])
def confirmMed():
    json_data = request.get_json()
    userId = json_data.get('userId')
    cur = mysql.connection.cursor()
    cur.execute('update utilisateur set statut = "medecin" where userId =%s',[userId])
    cur.execute('update attente set statut = "false" where userId =%s',[userId])
    mysql.connection.commit()
    cur.close()
    return 'updateSuccess'

@app.route('/validerRefus', methods =['GET','POST'])
def validerRefus():
    json_data = request.get_json()
    userId = json_data.get('userId')
    cur = mysql.connection.cursor()
    cur.execute('update utilisateur set statut = "refus" where userId =%s',[userId])
    mysql.connection.commit()
    cur.close()
    return 'refusSuccess'

@app.route('/validerMed',methods =['GET','POST'])
def validerMed():
    json_data = request.get_json()
    userId = json_data.get('userId')
    cur=mysql.connection.cursor()
    cur.execute("insert into medecin(userId) VALUES(%s)",[userId])
    mysql.connection.commit()
    cur.close()
    return "successPat"


@app.route('/login', methods =['GET','POST'])
@cross_origin(supports_credentials=True)
def login():
    if request.method =='POST' :
        json_data = request.get_json()      
        value = json_data.get('email')
        value2 = json_data.get('password')
        if len(session) >0 and not session['username'] ==value :
            return "error"
        else :
            if value == "Admin@gmail.com" and value2 =="Admin" :
                session['loggedin'] = True
                session['id']= 85550
                session['username'] = value
                print('-----------------------***********')
                print(session)
                res =["Admin",85550]
                return jsonify(res)
                
            
            else :

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
                    state = state[0][0]
                    state2 =[state,userId2]
                    state = jsonify(state2)
                    print(session)

           
                    return state
                else :
                    return("L'utilisateur n'xiste pas veuillez verifier votre email ou motdepasse")

@app.route('/logout', methods =['GET','POST'])
@cross_origin(supports_credentials=True)
def logout():
    session.pop('loggedin')
    session.pop('id')
    session.pop("username")
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
               


@app.route('/getMedAttente',methods =['GET'])
def getTable():
    
    cur = mysql.connection.cursor()
    cur.execute('select nom,prenom,utilisateur.userId,carteIdt,preuveMed,emailPrive from attente join utilisateur where attente.statut ="true" and utilisateur.userId = attente.userId')
    resultValue = cur.fetchall()
    resp = jsonify(resultValue)
    resp.status_code=200
    return resp
  


@app.route('/<table1>/<table2>/<parm1>/search')
def listMed(table1,table2,parm1) :
    args1 = request.args['args1']
    args2 = request.args['args2']
    args3 = request.args['args3']
    args4 = request.args['args4']
    value = "'%s'" %args2
    value2 = "'%s'" %args4
    try:
        query2 = "select *,{} from {} join {} where {} = {} and {} ={}".format(parm1,table1,table2,args1,value,args3,value2)
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



#-----------------------------------------------------------Web Socket---------------------------------

users ={} 
room =0
backupMess = {room : []}

@SocketIO.on('refresh')
def handleRefresh():
    emit("refresh", "test")
    return None

@SocketIO.on("username", namespace ='/private')
def recieve_username(username):
    i=0

    username1 = username['uerSessionName']
    if  username1 in users :
        return "already here"
    else :
        cur =mysql.connection.cursor()
        cur.execute("select room from consultation where patId = %s",[username1])
        roomSql =cur.fetchall()
        roomSql =roomSql[0][0]
        while roomSql == " " :
            i+=1
            if i>=2000:
                break        
        users[username1] =roomSql
        return "success"

@SocketIO.on("message")
def handleMessage(msg):
    room =users[msg['userId']]
    messages = msg['message']
    messageList =[messages]
    join_room(room)

    if messages == ' ':
        if len(backupMess) ==1 :
            backupMess[room] =messageList
            emit('message',{"messageRecieve" : messages, "recId" : msg['recId'] } ,room=room)
        else :            
            emit('message',backupMess[room] ,room=room)  
    else :
        if len(backupMess[room]) <16  :
            backupMess[room].append({"messageRecieve" : messages,"recId" : msg['recId']})
            emit('message',{"messageRecieve":messages, 'recId' :msg['recId']} ,room=room)  
        elif len(backupMess[room]) >= 16 :
            backupMess[room].pop(0)
            backupMess[room].append({"messageRecieve" : messages,"recId" : msg['recId']})
            emit('message',{"messageRecieve":messages, 'recId' :msg['recId']} ,room=room)  

    return None
        
@app.route('/savedata',methods =['GET','POST'])
def savedata():
    if request.method =='POST' :
        json_data = request.get_json()
        cur = mysql.connection.cursor() 
        userIdt=session['id']
        Genre= json_data.get('Genre')
        DateNaiss=json_data.get('DateNaiss')
        NumeroRue=json_data.get('NumeroRue')
        NumeroRue2=json_data.get('NumeroRue2')
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
        cur.execute("UPDATE patient SET genre =%s,dateNaiss=%s,numeroRue=%s,numeroRue2=%s,cite=%s,region=%s,codePostal=%s,pays=%s, phone=%s,poids=%s,taille=%s,groupeSanguin=%s,allergies=%s,autreAllergie=%s,autre=%s,imageUrl =%s WHERE userId =%s",[Genre,DateNaiss,NumeroRue,NumeroRue2,cite,Region,codePostal,Pays,Phone,Poids,Taille,GroupeSanguin,allergies,autreAllergie,Autre,imageUrl,userIdt])
        mysql.connection.commit()
        cur.close()    
        return "update success"

@app.route('/fetchPatCons',methods =['GET','POST'])
def fetchPatCons():
    if request.method == 'POST':
        json_data = request.get_json()
        id = json_data.get('userIdt')
        cur = mysql.connection.cursor()
        cur.execute("select * from patient join utilisateur where patient.userId =%s and utilisateur.userId =%s",[id,id])
        patCons = cur.fetchall()
        patCons =jsonify(patCons)
        return patCons

@app.route('/savedataMed',methods =['GET','POST'])
@cross_origin(supports_credentials=True)
def savedataMed():
        if request.method =='POST' :
            json_data = request.get_json()
            cur = mysql.connection.cursor() 
            userIdtMed=json_data.get('userIdtMed')
            Civilite= json_data.get('Civilite')
            DateNaiss= json_data.get('DateNaiss')
            NumeroRue=json_data.get('NumeroRue')
            NumeroRue2=json_data.get('noNumeroRue2m')
            Convention=json_data.get('Convention')
            specialite=json_data.get('specialite')
            cite=json_data.get('cite')
            Region=json_data.get('Region')
            codePostal=json_data.get('codePostal')
            Pays=json_data.get('Pays')
            Phone=json_data.get('Phone')
            Autre=json_data.get('Autre')
            imageUrl =json_data.get('imageUrl')
            cur.execute("UPDATE medecin SET civilite =%s,dateNaiss=%s,numeroRue=%s,numeroRue2=%s,cite=%s,region=%s,codePostal=%s,pays=%s WHERE userId =%s",[Civilite,DateNaiss,NumeroRue,NumeroRue2,cite,Region,codePostal,Pays,userIdtMed])
            cur.execute("UPDATE medecin SET phone=%s,autre=%s,specialite=%s,convention=%s,imageUrl =%s WHERE userId =%s",[Phone,Autre,specialite,Convention, imageUrl,userIdtMed])
            mysql.connection.commit()
            cur.close()    
            return "update Med success"

@app.route('/get_MedList',methods=['GET','POST'])
def get_Med():
    try:
        query2 = "select utilisateur.userId,nom,prenom,specialite,autre,imageUrl from utilisateur join medecin where medecin.userId =utilisateur.userId"
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
    if request.method =='POST' :
        json_data = request.get_json()
        idMed =json_data.get("id")
        idPat =session['id']
        room = json_data.get("room")
        cur =mysql.connection.cursor() 
        etat = "attente"
        cur.execute("insert into consultation(patId,medId,room,etat) VALUES(%s,%s,%s,%s)",[idPat,idMed,room,etat])
        mysql.connection.commit()
        cur.close()
        return "insert success"

@app.route('/verifCons', methods =['GET','POST'])
def verifCons() :
    if request.method =='POST' :
        idPat = session['id']
        cur = mysql.connection.cursor()
        cur.execute("select medId from consultation where patId = %s",[idPat])
        medId = cur.fetchall()
        cur.close()
        if(len(medId) == 0) :
            return "noMed"
        else :
            return "medExist"

@app.route('/getSession', methods =['Get','Post'])
@cross_origin(supports_credentials=True)
def getSessionUserName() :
    username = session['id']
    print(username)
    username =jsonify(username)
    return username
        
@app.route('/getConsMed', methods =['GET','POST'])
def consMed():
    json_data = request.get_json()
    idPat =json_data.get("userId")
    cur =mysql.connection.cursor()
    cur.execute("select medId,etat from consultation where consultation.patId ={} ".format(idPat))
    medId = cur.fetchall()
    if((len(medId)==0) or (medId[0][1] == "attente")):
        return "attente"
    else :
        medId = medId[0][0]
        medId2 = int(medId)
        cur.execute("select * from medecin join utilisateur where medecin.userId = {} and utilisateur.userId = {}".format(medId2,medId2))
        myDocInfos = cur.fetchall()
        myDocInfos = jsonify(myDocInfos)
        myDocInfos.status_code =200
        return myDocInfos
   
        
@app.route('/getConsPat',methods= ['GET','POST'])
def getConsPat():
    json_data = request.get_json()
    idMet =json_data.get("userId")
    cur = mysql.connection.cursor()
    etat ="ok"
    cur.execute("select * from consultation  join utilisateur join patient where consultation.medId =%s and consultation.etat =%s and utilisateur.userId =consultation.patId and patient.userId =consultation.patId",[idMet,etat])
    consPat = cur.fetchall()
    consPat =jsonify(consPat)
    return consPat
        
@app.route('/get_Pat',methods =['GET','POST'])
def get_Pat():
    json_data = request.get_json()
    userId =json_data.get("id")
    etat="attente"
    cur = mysql.connection.cursor()
    cur.execute("select patId,nom,prenom,imageUrl from consultation join utilisateur join patient where consultation.medId =%s and consultation.etat =%s and utilisateur.userId =patId and patient.userId =patId",[userId,etat])
    pat_Attende =cur.fetchall()
    pat_Attende = jsonify(pat_Attende)
    return pat_Attende

@app.route('/confCons',methods =['GET','POST'])
def confCons():
    json_data = request.get_json()
    patId = json_data.get('id')
    etat ="ok"
    cur = mysql.connection.cursor()
    cur.execute("update consultation set etat = %s where patId =%s",[etat,patId])
    mysql.connection.commit()
    cur.close()  
    return "confirmation success"
        


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