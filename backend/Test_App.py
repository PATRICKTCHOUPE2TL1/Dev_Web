import pytest
import requests
from flask import jsonify,request

url ='http://127.0.0.1:5000'


def test_index():
    r= requests.get(url+'/')
    assert r.status_code ==200
    response_body =r.json()
    email =response_body[0][0]
    assert email =="tresortek7@gmail.com"
    assert r.headers['content-Length'] == '222'

def test_profil():
    r=requests.get(url+'/profil')
    assert r.status_code == 200
    assert r.headers['content-Type'] == "text/html; charset=utf-8"
    assert len(r.links) == 0
    


def test_get_Med():
    r=requests.get(url+'/get_Med')
    response_body =r.json()
    userId = response_body[0][2]
    assert userId== 'cyriane'
    assert len(response_body) == 5
    assert len(response_body[0]) == 5
 

   



