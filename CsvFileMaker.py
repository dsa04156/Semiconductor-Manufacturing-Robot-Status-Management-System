import csv
import time
import schedule
import datetime




def read_csv():
    with open('G_TEST.csv', 'r') as file:
        reader = csv.reader(file)
        data = list(reader)
    return data

def write_csv(data,filename):
    with open('test/'+filename+'.csv', 'w', newline='') as file:
        writer = csv.writer(file)
        writer.writerows(data)

def job():
    data = read_csv()
    now = datetime.datetime.now()
    date = now.strftime('%Y.%m.%d-')  # '%Y-%m-%d': 년-월-일
    times = now.strftime('%H.%M.%S')  # '%H:%M:%S': 시:분:초
    print(date+times)
    write_csv(data,date+times)

schedule.every(1).seconds.do(job)

while True:
    schedule.run_pending()
    time.sleep(10)