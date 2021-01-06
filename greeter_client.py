# Copyright 2015 gRPC authors.
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.
"""The Python implementation of the GRPC helloworld.Greeter client."""

from __future__ import print_function
from threading import Timer
import logging

import grpc

import helloworld_pb2
import helloworld_pb2_grpc
import datetime
from PyQt5.QtWidgets import QApplication, QWidget, QPushButton, QVBoxLayout, QLabel
from PyQt5.QtGui import *
from PyQt5.QtCore import *
import sys

class MyMedApp:


    medsToTake = {}
    layout = None
    refresh = pyqtSignal()
    
    def getTimeUntilGetMedications(self):
        a = datetime.datetime.now()
        b = datetime.datetime( a.year, a.month, a.day, 20, 2, 0, 0 )
        if b < a:
            b = b + datetime.timedelta(days=1)
        b = b - a
        return b.total_seconds()

    def getSecondsUntilTimestamp(self, timestamp):
        a = datetime.datetime.now()
        print(str(timestamp))
        b = datetime.datetime.fromtimestamp( timestamp / 1000000 )
        b = b - a
        return b.total_seconds()

    def addMedication(self, medicationId, medicationName, medicationIntakeTime):
        self.refresh.emit()
        
        print( "Added medication " + medicationName )

    def getMedications(self):
        with grpc.insecure_channel('localhost:50051') as channel:
            stub = helloworld_pb2_grpc.MedApplicationStub(channel)
            response = stub.GetMedications(helloworld_pb2.User(id=int(5)))
        for medication in response.meds:
            timeUntil = self.getSecondsUntilTimestamp(medication.intakeTime)
            print( medication.name + "  take in " + str(timeUntil) )
            #Timer( timeUntil, self.addMedication, (medication.id, medication.name, medication.intakeTime) ).start()
        # self.initGetMedications()

    def initGetMedications(self):
        timeUntil = self.getTimeUntilGetMedications()
        print( "Init get medications in " + str(timeUntil) )
        timeUntil = 1
        #Timer(timeUntil, self.getMedications).start()
        timer = QTimer(self)
        timer.timeout.connect(self.showTime)
        timer.start(1000 * timeUntil) # update every second

    def addMed(self):
        print("SALUUUUT")

    def run(self):
        app = QApplication([])
        window = QWidget()
        layout = QVBoxLayout()
        layout.addWidget(QPushButton('Top'))
        layout.addWidget(QPushButton('Bottom'))
        window.setLayout(layout)
        window.show()
        self.initGetMedications()
        self.refresh.connect( self.addMed )
        
        app.exec_()
        print( "SALUUT" )
        #Timer(0.01, initUI).start()
        #input()


if __name__ == '__main__':
    myMedApp = MyMedApp()
    myMedApp.run()
