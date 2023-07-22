FROM python:3.8.0-slim as build

RUN mkdir /app/
COPY ./approve_prompts/requirements.txt /app
COPY ./approve_prompts/run.sh /app

RUN pip install --upgrade pip
RUN pip install -r /app/requirements.txt

FROM build

COPY ./approve_prompts/main.py /app

RUN chmod a+x /app/run.sh

CMD [ "/app/run.sh" ]
