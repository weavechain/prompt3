# FROM python:3.8.0-slim as builder
FROM python:3.8.0-slim

RUN mkdir /app/
COPY ./distil_prompt/requirements.txt /app
RUN pip install --upgrade pip
RUN pip install -r /app/requirements.txt

COPY ./distil_prompt/main.py /app
COPY ./distil_prompt/run.sh /app
COPY ./distil_prompt/distilation_prompt.txt /app

RUN chmod a+x /app/run.sh

CMD [ "/app/run.sh" ]
