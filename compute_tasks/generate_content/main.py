import os
import json

import openai

from weaveapi import weaveapi
from weaveapi.records import *
from weaveapi.options import *
from weaveapi.filter import *
from weaveapi.weaveh import *

LOCAL_CONFIG = None

def fetch_api_key(file):
    of = open(file, mode='r')
    openai.api_key = of.read()
    of.close()
    
def connect_node():
    nodeApi, session = connect_weave_api(LOCAL_CONFIG)
    return nodeApi, session

def get_params(nodeApi, session):
    reply = nodeApi.read(
        session,
        ".internal_task_params",
        os.environ["WEAVE_TASKID"],
        None,
        READ_DEFAULT_NO_CHAIN,
    ).get()
    params = reply["data"]

    return params

def get_scope(params):
    return params["scope"]

def get_persona(params):
    return params["persona"]

def get_user_prompt(params):
    return params["prompt"]

def get_max_tokens(params):
    return 3072 if params.get("max_tokens") is None or len(str(params["max_tokens"])) == 0 else int(params["max_tokens"])
    
def get_superprompt(persona, scope):
    table = persona + "_superprompts"

    reply = nodeApi.read(session, scope, table, None, READ_DEFAULT_NO_CHAIN).get()
    
    if reply["data"] is not None and reply["data"][-1] is not None:
        return reply["data"][-1]["text"]
    
    return None

def get_chat_completion(params):
    return False if params.get("chat_completion") is None else json.loads(params["chat_completion"])

def choose_engine(use_chat_completion):
    if use_chat_completion:
        model_engine = "gpt-3.5-turbo" if params.get("model_engine") is None else params["model_engine"]
    else:
        model_engine = "text-davinci-003" if params.get("model_engine") is None else params["model_engine"]
    return model_engine

def get_response(use_chat_completion, model_engine, max_tokens, superprompt, prompt):
    if use_chat_completion:
        completion = openai.ChatCompletion.create(model=model_engine, messages=[
            {"role": "system", "content": superprompt},
            {"role": "user", "content": prompt}
        ], max_tokens=int(max_tokens), n=1, stop=None, temperature=0.5)
        chatgpt_response = completion.choices[0]["message"]["content"]
    else:
        completion = openai.Completion.create(engine=model_engine, prompt=prompt, max_tokens=int(max_tokens), n=1, stop=None, temperature=0.5)
        chatgpt_response = completion.choices[0].text
    return chatgpt_response

def send_results(nodeApi, session, result):
    weave_task_output(nodeApi, session, result)

if __name__ == "__main__":
    print("Connecting to node...")
    nodeApi, session = connect_node()
    
    fetch_api_key("/app/api_key/openai.key")
    
    params = get_params(nodeApi, session)
    print(f"Fetched params: {params}")
    
    scope = get_scope(params)
    print(f"Fetched scope: {scope}")
    
    persona = get_persona(params)
    print(f"Fetched persona: {persona}")
    
    prompt = get_user_prompt(params)
    print(f"Fetching prompt: {prompt}")
    
    superprompt = get_superprompt(persona, scope)
    print(f"Fetching superprompt: {superprompt}")
    
    if superprompt is not None:
        max_tokens = get_max_tokens(params)
        print(f"Fetching max_tokens: {max_tokens}")
        
        use_chat_completion = get_chat_completion(params)
        print(f"Fetched chat completion flag: {use_chat_completion}")
        
        model_engine = choose_engine(use_chat_completion)
        print(f"Fetched model endine: {model_engine}")
        
        chatgpt_response = get_response(use_chat_completion, model_engine, max_tokens, superprompt, prompt)
        print(f"Got chatgpt response: {chatgpt_response}")
        
        print("Sending results...")
        send_results(nodeApi, session, chatgpt_response)
    else:
        send_results(nodeApi, session, None)