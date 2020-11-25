import pika
import json
import time

connection = pika.BlockingConnection(
    pika.URLParameters('amqps://tbuyqjoy:NyvSxKcb3KBsSd4pNTHR1C0BCDWb8mIU@squid.rmq.cloudamqp.com/tbuyqjoy')
)
channel = connection.channel()
channel.queue_declare(queue = 'activities', durable=True)

with open("activity.txt", "r") as f:
    for line in f:
        parsed = [entry.strip() for entry in line.split(",")]
        print(parsed)
        obj = {}
        obj["start"] = parsed[0]
        obj["end"] = parsed[1]
        obj["activity"] = parsed[2]

        json_obj = json.dumps(obj)
        channel.basic_publish(exchange="", routing_key="activities", body=json_obj)
        time.sleep(0.5)
