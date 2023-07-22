# FROM python:3.8.0-slim as builder
FROM python:3.8.0-slim

RUN mkdir /app/
COPY ./generate_content/requirements.txt /app
RUN pip install --upgrade pip
RUN pip install -r /app/requirements.txt

# FROM builder
COPY ./generate_content/main.py /app
COPY ./generate_content/run.sh /app

RUN chmod a+x /app/run.sh

CMD [ "/app/run.sh" ]
