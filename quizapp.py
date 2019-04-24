#This program was created and written by Shaqueir Tardif

#   Team Leader: Shaqueir Tardif
#   Team Member: Egbunike Chamberlain
#   Date Submitted: April 24, 2019
#   ECE 369 - Project
#   Trivia Quiz Website

#*********   Received assistance from fellow peer, Aiden Gula, for development of the @app.route("/") routine   ***********

from flask import Flask, render_template, request
from flask_socketio import SocketIO
import json
x = None

app = Flask(__name__)
socketio = SocketIO(app)

@app.route("/")
def start():
    return render_template('index.html')



@app.route('/api',methods = ['POST'])
def get():
    print("Player 1's score is: ")
    print(request.json['Score'])
    return json.dumps({"OK":200})



# @app.route('/api',methods = ['POST'])
# def get():
#     print("Player 2's score is: ")
#     print(request.json['Score'])
#     return json.dumps({"OK":200})

# def messageReceived(methods=['GET', 'POST']):
# print('message was received!!!')

# @socketio.on('my event')
# def handle_my_custom_event(json, methods=['GET', 'POST']):
#     print('received my event: ' + str(json))
# socketio.emit('my response', json, callback=messageReceived)


if __name__== '__main__':
    app.run(host='0.0.0.0',port=5000,debug=True,threaded=True)