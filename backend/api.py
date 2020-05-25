from flask import Flask, request
from flask_mysqldb import MySQL
from flask import jsonify
from flask_cors import CORS
import yaml

app =Flask(__name__)


db = yaml.load(open('db.yaml'))
app.config['MYSQL_HOST']=db['mysql_host']
app.config['MYSQL_USER']=db['mysql_user']
app.config['MYSQL_PASSWORD']=db['mysql_password']
app.config['MYSQL_DB']=db['mysql_db']

mysql =MySQL(app)
CORS(app)

@app.route('/',methods = ['GET','POST'])
def getAll():
   return "Hello Flask"

@app.route('/<table>/',methods =['GET','POST'])
def getTable(table):
    try:
        query = "select * from %s" %table
        cur = mysql.connection.cursor()
        cur.execute(query)
        resultValue = cur.fetchall()
        resp = jsonify(resultValue)
        resp.status_code=200
        return resp
    except Exception as e:
        print(e)
    finally:
        cur.close()

@app.route('/<table>/search',methods =['GET'])
def getLine(table):
    args1 = request.args['args1']
    args2 = request.args['args2']

    value = "'%s'" %args2
    try:
        query2 = "select * from {} where {} = {}".format(table,args1,value)
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

@app.route('/<table>/<parm>')
def getList2(table,parm):
    try:
        query2 = "select {} from {}".format(parm,table)
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

@app.route('/<table>/<parm>/search')
def getValue(table,parm):
    args1 = request.args['args1']
    args2 = request.args['args2']

    value = "'%s'" %args2
    try:
        query2 = "select {} from {} where {} = {}".format(parm,table,args1,value)
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
    app.run(debug=True, port=5000)
