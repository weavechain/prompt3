# FROM python:3.8.0-slim as builder
FROM python:3.8.0-slim

RUN mkdir /app/
COPY ./user_statistics/requirements.txt /app
RUN pip install --upgrade pip
RUN pip install -r /app/requirements.txt

COPY ./user_statistics/main.py /app
COPY ./user_statistics/run.sh /app

RUN chmod a+x /app/run.sh

CMD [ "/app/run.sh" ]
