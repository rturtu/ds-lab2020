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
"""The Python implementation of the GRPC helloworld.Greeter server."""

from concurrent import futures
import logging

import grpc

import helloworld_pb2
import helloworld_pb2_grpc
import datetime

def getIntakeTime(secondsDelta):
    return int(1000000 * datetime.datetime.timestamp(datetime.datetime.now() + datetime.timedelta(seconds=secondsDelta)))

def getMeds():
    return [
        helloworld_pb2.Medication(id=1,name= 'Paracetamol',intakeTime= getIntakeTime(2)),
        helloworld_pb2.Medication(id=2,name= 'Augmentin',intakeTime= getIntakeTime(5)),
        #helloworld_pb2.Medication(id=3,name= 'Spirt',intakeTime= getIntakeTime(20)),
        #helloworld_pb2.Medication(id=4,name= 'Aspirina',intakeTime= getIntakeTime(30)),
        #helloworld_pb2.Medication(id=5,name= 'Ibuprofen',intakeTime= getIntakeTime(60)),
        ]

class MedApplication(helloworld_pb2_grpc.MedApplicationServicer):

    def GetMedications(self, request, context):
        print( "User " + str(request.id) + " requests medication plan" )
        return helloworld_pb2.Medications(meds=getMeds())

    def MarkMedicationTaken(self, request, context):
        print( "Medication taken: User " + str(request.userId) + " took medicine " + str(request.medId) + " at " + datetime.datetime.now().strftime("%H:%M:%S") )
        return helloworld_pb2.Empty()

    def MarkMedicationNotTaken(self, request, context):
        print( "Medication NOT taken: User " + str(request.userId) + " FORGOT to take medicine " + str(request.medId) )
        return helloworld_pb2.Empty()
        


def serve():
    server = grpc.server(futures.ThreadPoolExecutor(max_workers=10))
    helloworld_pb2_grpc.add_MedApplicationServicer_to_server(MedApplication(), server)
    server.add_insecure_port('[::]:50051')
    server.start()
    server.wait_for_termination()


if __name__ == '__main__':
    logging.basicConfig()
    serve()
