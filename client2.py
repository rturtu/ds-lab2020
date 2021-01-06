import sys 
from PyQt5.QtWidgets import QApplication, QWidget 
from PyQt5.QtWidgets import QVBoxLayout, QLabel, QGridLayout, QPushButton
from PyQt5.QtGui import QFont 
from PyQt5.QtCore import QTimer, QTime, Qt 
import grpc
import helloworld_pb2
import helloworld_pb2_grpc
import datetime
import threading
  
class Window(QWidget):

    userId = 5
    expireTime = 10
    meds = []
    medLock = threading.Lock()
    myGrpc = None

    def getSecondsUntilGetMedications(self):
        a = datetime.datetime.now()
        b = datetime.datetime( a.year, a.month, a.day, 20, 2, 0, 0 )
        if b < a:
            b = b + datetime.timedelta(days=1)
        b = b - a
        return b.total_seconds()    
    
    def getSecondsUntilTimestamp(self, timestamp):
        a = datetime.datetime.now()
        b = datetime.datetime.fromtimestamp( timestamp / 1000000 )
        b = b - a
        return b.total_seconds()

    def clearWidgets(self):
        while self.layout.count() > 1:
            self.layout.itemAt(1).widget().setParent(None)

    def takeMedicine(self, medId):
        response = self.myGrpc.MarkMedicationTaken(helloworld_pb2.UserMedication(medId=medId, userId=self.userId))
        self.medLock.acquire()
        print("Took medicine " + str(medId))
        def _filterMed(med):
            print( str(med["id"]) + " " + str(medId) )
            if med["id"] == medId:
                return False
            return True
        newMeds = []
        for med in filter(_filterMed, self.meds):
            newMeds.append(med)
        self.meds = newMeds
        self.medLock.release()
        self.refreshMedication()

    def refreshMedication(self):
        self.medLock.acquire()
        newMeds = []
        for med in self.meds:
            timeUntil = self.getSecondsUntilTimestamp(med["intakeTime"])
            if timeUntil <= -self.expireTime + 0.1 :
                self.myGrpc.MarkMedicationNotTaken(helloworld_pb2.UserMedication(medId=med["id"], userId=self.userId))
            else:
                newMeds.append(med)
        self.meds = newMeds
        def _filterMed(med):
            timeUntil = self.getSecondsUntilTimestamp(med["intakeTime"])
            print(med["name"] + " " + str(timeUntil))
            if timeUntil <= 0.1:
                return True
            return False

        myMeds = []
        i = 0
        self.clearWidgets()
        for med in filter( _filterMed, self.meds ):
            i = i + 1
            myMeds.append(med)
            label = QLabel( med["name"] )
            self.layout.addWidget(label, i, 0)
            button = QPushButton( "I took " + med["name"] )
            button.clicked.connect(lambda t,a=self.takeMedicine, b=med["id"]: a(b))
            self.layout.addWidget(button, i, 1)
        
        print("My meds: " + str(myMeds))
        self.medLock.release()
    
    def getMedications(self):
        self.myGrpc = helloworld_pb2_grpc.MedApplicationStub(grpc.insecure_channel('localhost:50051'))
        response = self.myGrpc.GetMedications(helloworld_pb2.User(id=self.userId))
        self.medLock.acquire()
        self.meds = []
        for medication in response.meds:
            self.meds.append( {"name": medication.name, "id": medication.id, "intakeTime": medication.intakeTime} )
            timeUntil = self.getSecondsUntilTimestamp(medication.intakeTime)
            print( medication.name + "  take in " + str(timeUntil) )
            # Add the medication
            timer = QTimer(self, singleShot=True)
            timer.timeout.connect(self.refreshMedication)
            timer.start(int(1000*timeUntil))

            # Remove the medication
            timer = QTimer(self, singleShot=True)
            timer.timeout.connect(self.refreshMedication)
            timer.start(int(1000*(timeUntil + self.expireTime)))
            #Timer( timeUntil, self.addMedication, (medication.id, medication.name, medication.intakeTime) ).start()
        self.medLock.release()
        self.initGetMedications()

    def initGetMedications(self, forceUntil = None):
        timer = QTimer(self, singleShot=True) 
        timer.timeout.connect(self.getMedications)
        timeUntil = self.getSecondsUntilGetMedications()
        if forceUntil is not None:
            timeUntil = forceUntil
        print( "Init get medications in " + str(timeUntil) )
        timer.start(int(1000 * timeUntil))
  
    def __init__(self): 
        super().__init__() 
  
        # setting geometry of main window 
        self.setGeometry(10, 10, 800, 400) 
  
        # creating a vertical layout 
        self.layout = QGridLayout() 
  
        # creating font object 
        font = QFont('Arial', 20, QFont.Bold) 
  
        # creating a label object 
        self.label = QLabel() 
  
        # setting centre alignment to the label 
        self.label.setAlignment(Qt.AlignCenter) 
  
        # setting font to the label 
        self.label.setFont(font) 
  
        # adding label to the layout 
        self.layout.addWidget(self.label, 0, 0, 1, 2) 
  
        # setting the layout to main window 
        self.setLayout(self.layout) 
  
        # creating a timer object 
        timer = QTimer(self) 
  
        # adding action to timer 
        timer.timeout.connect(self.showTime) 
  
        # update the timer every second 
        timer.start(1000)
        self.initGetMedications(1)
  
    # method called by timer 
    def showTime(self): 
  
        # getting current time 
        current_time = QTime.currentTime() 
  
        # converting QTime object to string 
        label_time = current_time.toString('hh:mm:ss') 
  
        # showing it to the label 
        self.label.setText(label_time) 
  
  
# create pyqt5 app 
App = QApplication(sys.argv) 
  
# create the instance of our Window 
window = Window() 
  
# showing all the widgets 
window.show() 
  
# start the app 
App.exit(App.exec_())
