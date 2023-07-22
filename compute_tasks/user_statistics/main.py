import os
import json

from weaveapi import weaveapi
from weaveapi.records import *
from weaveapi.options import *
from weaveapi.filter import *
from weaveapi.weaveh import *

LOCAL_CONFIG = None

personas = [
    "solidity_engineer",
    "paris_guide",
    "pregnancy_nurse",
    "startup_advisor",
    "crypto_trader",
    "ethical_data_consultant"
]

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

def get_pubkey(params):
    return params["WEAVE_CALLER_PUBKEY"]

def read_proposals(pubkey):
    total_porposals = {}
    nr_of_proposals = 0
    for persona in personas:
        proposals_per_persona = []
        table = persona + "_proposals"
        filter = Filter(FilterOp.eq("pubkey", pubkey), None, None, ["text"], None, None)
        
        reply = nodeApi.read(session, scope, table, filter, READ_DEFAULT_NO_CHAIN).get()
        for data in reply["data"]:
            proposals_per_persona.append(data)

        nr_of_proposals += len(reply["data"])
        total_porposals[table] = proposals_per_persona
    
    return total_porposals, nr_of_proposals
    
def read_prompts(pubkey):
    total_prompts = {}
    nr_of_prompts = 0
    for persona in personas:
        prompts_per_persona = []
        table = persona + "_prompts"
        filter = Filter(FilterOp.eq("source", pubkey), None, None, ["text"], None, None)
        
        reply = nodeApi.read(session, scope, table, filter, READ_DEFAULT_NO_CHAIN).get()
        for data in reply["data"]:
            prompts_per_persona.append(data)
            
        nr_of_prompts += len(reply["data"])
        total_prompts[table] = prompts_per_persona
        
    return total_prompts, nr_of_prompts
    
def send_results(nodeApi, session, result):
    weave_task_output(nodeApi, session, result)

if __name__ == "__main__":
    print("Connecting to node...")
    nodeApi, session = connect_node()
    
    params = get_params(nodeApi, session)
    
    scope = get_scope(params)
    
    pubkey = get_pubkey(params)
    
    proposals, nr_of_proposals = read_proposals(pubkey)
    
    prompts, nr_of_prompts = read_prompts(pubkey)
    
    result = {
        "submitted": nr_of_proposals,
        "active": nr_of_prompts,
        "proposals": proposals,
        "prompts": prompts
    }
    
    print(f"Sending results: {result}")
    send_results(nodeApi, session, json.dumps(result))