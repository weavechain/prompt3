import os
import socket
import time

from weaveapi import weaveapi
from weaveapi.session import Session
from weaveapi.records import *
from weaveapi.options import *

from weaveapi.weaveh import *

params = {
    "persona": "paris_guide",
    "accept": [ 1, 3],
    "reject": [ 2 ]
}

LOCAL_CONFIG = "local.config"
#LOCAL_CONFIG = None

scope = "vault"
in_table = persona + '_proposals'
out_table = persona + '_prompts'

def main():
    nodeApi, session = connect_weave_api(LOCAL_CONFIG)

    order = {"id" : "DESC"}
    filter = Filter(FilterOp.in("id", params.accept), None, None, None)
    reply = nodeApi.read(session, scope, in_table, filter, READ_DEFAULT_NO_CHAIN).get()
    print(reply)

    count = len(reply["data"])
    print(count)

    #records = Records(out_table, [ ... ])
    #res = nodeApi.write(session, scope, records, WRITE_DEFAULT).get()
    #print(res)

    records = Records(os.environ['WEAVE_TASKID'], [ Record("OUTPUT", count, None) ])
    res = nodeApi.write(session, ".internal_task_params", records, WRITE_DEFAULT).get()
    print(res)

    nodeApi.close()

    print("Done.")

if __name__ == '__main__':
    main()
