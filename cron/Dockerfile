
FROM python:2.7

RUN apt-get update -y
RUN apt-get install -y python-pip python-dev build-essential
RUN apt-get update && apt-get install -y cron

ADD cron_service.py /

ADD crontab.sh /

WORKDIR /

#RUN pip install requests

#CMD [ "python", "./cron_service.py" ]

