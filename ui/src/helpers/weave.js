import WeaveHelper from "../weaveapi/helper";
import options from "../weaveapi/options";
import Records from "../weaveapi/records";
import WeaveAPI from "../weaveapi/weaveapi";
import AppConfig from "../AppConfig";
import Web3 from "web3";
import LOCAL_STORAGE from "./localStorage";
import { base58_to_binary, binary_to_base58 } from "base58-js";
import _ from "lodash";

const { createHash } = require('crypto');

const chain = "gnosis";
const signWallet = false;

export const weaveGenerateContent = async (persona, prompt, scope) => {
    const nodeApi = await getNodeApi()
    if (!nodeApi) {
        console.log('Error creating node api')
        return 'Error creating node api'
    }
    const session = await getSession(nodeApi, AppConfig.ORGANIZATION)

    // eslint-disable-next-line no-unused-vars
    const { pub } = getOrCreateKey()

    const params = {
        persona,
        prompt,
        scope
    }
    let options = new WeaveHelper.Options.ComputeOptions(true, 300, 0, null, params);
    return await nodeApi.compute(session, "gcr.io/weavechain/generate_content", options)
}

export const weaveDistilPrompt = async (persona, scope) => {
    const nodeApi = await getNodeApi()
    if (!nodeApi) {
        console.log('Error creating node api')
        return 'Error creating node api'
    }
    const session = await getSession(nodeApi, AppConfig.ORGANIZATION)

    // eslint-disable-next-line no-unused-vars
    const { pub } = getOrCreateKey()

    const params = {
        persona,
        scope
    }
    let options = new WeaveHelper.Options.ComputeOptions(true, 300, 0, null, params);
    return await nodeApi.compute(session, "gcr.io/weavechain/distil_prompt", options)
}

export const weaveApprovePrompts = async (persona, prompts) => {
    const nodeApi = await getNodeApi()
    if (!nodeApi) {
        console.log('Error creating node api')
        return 'Error creating node api'
    }
    const session = await getSession(nodeApi, AppConfig.ORGANIZATION)

    // eslint-disable-next-line no-unused-vars
    const { pub } = getOrCreateKey()

    const params = {
        persona,
        accept: prompts
    }
    let options = new WeaveHelper.Options.ComputeOptions(true, 300, 0, null, params);
    return await nodeApi.compute(session, "gcr.io/weavechain/approve_prompts", options)
}

export const weaveWriteContent = async (table, contentText, title) => {
    const nodeApi = await getNodeApi()
    if (!nodeApi) {
        console.log('Error creating node api')
        return 'Error creating node api'
    }
    const session = await getSession(nodeApi, AppConfig.ORGANIZATION)

    // eslint-disable-next-line no-unused-vars
    const { pub } = getOrCreateKey()
    console.log(table)
    let contentItems = [
        [
            null, // id
            null, // ts
            null, // pub
            null, // sig
            null, // ip
            '*',  // roles
            contentText // content
        ]
    ]
    let contentRecord = new Records(table, contentItems)
    return await nodeApi.write(session, AppConfig.SCOPE, contentRecord, options.WRITE_DEFAULT)
}

export const weaveReadContent = async (table, filter = null) => {
    const nodeApi = await getNodeApi()
    if (!nodeApi) {
        console.log('Error creating node api')
        return 'Error creating node api'
    }
    const session = await getSession(nodeApi, AppConfig.ORGANIZATION)

    return await nodeApi.read(session, AppConfig.SCOPE, table, filter, WeaveHelper.Options.READ_DEFAULT_NO_CHAIN);
}

export const weaveCheckInclusionWithMerkle = async (table, hash) => {
    const nodeApi = await getNodeApi()
    if (!nodeApi) {
        console.log('Error creating node api')
        return 'Error creating node api'
    }

    const session = await getSession(nodeApi, AppConfig.ORGANIZATION)
    console.log(hash)
    let tree = (await nodeApi.merkleTree(session, AppConfig.SCOPE, table, new WeaveHelper.Filter(null, null, null, null, ['text']), AppConfig.SALT, AppConfig.DIGEST, options.READ_DEFAULT_NO_CHAIN)).data.tree

    let data = tree.split(';')
    //console.log(data)
    let treeHashes = []
    for (let i = 0; i < data.length; i++) {
        let row = data[i].split(',')
        treeHashes.push(row)
    }

    let hashRawData = false
    if (treeHashes.length <= (hashRawData ? 1 : 0)) {
        console.log('Empty tree')
        return { match: false, rootHash: treeHashes[0][0], tree: tree }
    }

    const searchHash = (element) => element === hash;
    let idx = treeHashes[treeHashes.length - 1 - (hashRawData ? 1 : 0)].findIndex(searchHash)
    if (idx < 0) {
        console.log('Object not found')
        return { match: false, rootHash: treeHashes[0][0], tree: tree }
    }

    let h1 = hash
    for (let i = treeHashes.length - 1 - (hashRawData ? 1 : 0); i > 0; i--) {
        let level = treeHashes[i]
        if (!h1 === level[idx]) {
            return { match: false, rootHash: treeHashes[0][0], tree: tree }
        }
        let p = idx + 1 - 2 * (idx % 2)
        if (p < level.length) {
            let h2 = level[p]
            let h = hash2(base58_to_binary(idx % 2 === 0 ? h1 : h2), base58_to_binary(idx % 2 === 0 ? h2 : h1), AppConfig.DIGEST)
            h1 = binary_to_base58(h)
        }
        idx = (idx - (idx % 2)) / 2
    }
    return { match: h1 === treeHashes[0][0], rootHash: h1, tree: tree }
}

const hash2 = (data1, data2, digest) => {
    let data = new Uint8Array(data1.length + data2.length)
    for (let i = 0; i < data1.length; i++) {
        data[i] = data1[i]
    }
    for (let i = 0; i < data2.length; i++) {
        data[data1.length + i] = data2[i]
    }
    return hash(data, digest)
}

const hash = (data, digest) => {
    return createHash('sha256').update(data).digest()
}

export const weaveCheckBalance = async () => {
    const nodeApi = await getNodeApi()
    if (!nodeApi) {
        console.log('Error creating node api')
        return 'Error creating node api'
    }

    const session = await getSession(nodeApi, AppConfig.ORGANIZATION)

    const { pub } = getOrCreateKey();
    return await nodeApi.balance(session, pub, '', AppConfig.CURRENCY)
}

function getOrCreateKey() {
    let stateData = LOCAL_STORAGE.loadState() || {};

    const keys = WeaveHelper.generateKeys();
    const pub = stateData.pub || keys[0];
    const pvk = stateData.pvk || keys[1];
    LOCAL_STORAGE.saveState({
        ...stateData,
        pub,
        pvk,
    });
    return { pub, pvk };
}

const getNodeApi = async () => {
    const { pub, pvk } = getOrCreateKey();

	const apiConfig = {
		publicKey: pub,
		privateKey: pvk,
		seed: AppConfig.NODE_SEED,
		http: {
            host: AppConfig.NODE_HOST,
            port: AppConfig.NODE_PORT,
            useHttps: AppConfig.NODE_PORT === 443
        }
	}
    
	const nodeApi = new WeaveAPI().create(apiConfig)
	if (nodeApi == null) return null

	await nodeApi.init()
	const pong = await nodeApi.ping()
	console.log(pong)
	return nodeApi
}

function toHex(arr) {
    let res = "";
    for (var i = 0; i < arr.length; ++i) {
        const x = arr[i];
        const v = (x < 0 ? 256 + x : x).toString(16);
        if (v.length === 1) res += "0";
        res += v;
    }
    return res;
}

function getMessageToSign(wallet, pub, signWalletOnly = false) {
    return signWalletOnly
        ? wallet
        : "Please sign this message to confirm you own this wallet\nThere will be no blockchain transaction or any gas fees." +
        "\n\nWallet: " +
        wallet +
        "\nKey: " +
        pub;
}

export async function getMetamaskWallet() {
    if (window.ethereum) {
        window.web3 = new Web3(window.ethereum);
        window.ethereum.enable();

        let accounts = await window.ethereum.request({
            method: "eth_requestAccounts",
        });
        if (!accounts || accounts.length === 0) {
            accounts = await window.ethereum.request({
                method: "eth_requestAccounts",
            });
        }
        return Web3.utils.toChecksumAddress(accounts[0]);
    } else {
        return null;
    }
}

const getSession = async (nodeApi, organization) => {
    let stateData = LOCAL_STORAGE.loadState() || {};

    let credentials = null;
    if (signWallet) {
        const needsWallet = true;
        let wallet = needsWallet ? await getMetamaskWallet() : "";
        const address = wallet;

        const keys = WeaveHelper.generateKeys();
        const pub = (address ? stateData["pub" + address] : stateData.pub) || keys[0];
        const pvk = (address ? stateData["pvk" + address] : stateData.pvk) || keys[1];

        let {signatures} = stateData;

        const signWalletOnly = false;
        let key = null;
        let sig = null;

        key = "eth:" + wallet + ":" + (signWalletOnly ? "wallet" : pub);
        if (!signatures || !signatures[key]) {
            if (!signatures) signatures = {};

            let msg = getMessageToSign(wallet, pub, signWalletOnly);

            sig = await window.ethereum.request({
                method: "personal_sign",
                params: [wallet, signWalletOnly ? toHex(msg) : msg],
            });
            signatures[key] = sig;
        } else {
            sig = signatures[key];
        }

       credentials = sig
            ? {
                account: chain + ":" + wallet,
                sig: sig,
                template: "*",
                role: "*",
            }
            : null;

        const newState = {
            ...stateData,
            signatures: signatures,
        }
        if (address) {
            newState["pub" + address] = pub;
            newState["pvk" + address] = pvk;
        } else {
            newState.pub = pub;
            newState.pvk = pvk;
        }
        LOCAL_STORAGE.saveState(newState);

        console.log(credentials)
    }

	const account = nodeApi.getClientPublicKey();
	const session = await nodeApi.login(organization, account, AppConfig.SCOPE, credentials);

    if (stateData.faucetTried !== account) {
        LOCAL_STORAGE.saveState({
            ...stateData,
            faucetTried: account
        });

        console.log("Trying faucet");
        const res = await nodeApi.compute(session, "gcr.io/weavechain/faucet_once", WeaveHelper.Options.COMPUTE_DEFAULT);
        console.log(res);
    }

    return session;
}

export const writeLineage = async (response, persona) => {
    const nodeApi = await getNodeApi()
    if (!nodeApi) {
        console.log('Error creating node api')
        return 'Error creating node api'
    }
    const session = await getSession(nodeApi, AppConfig.ORGANIZATION)

    const table = "personas_lineage"
    let rootHash = ''
    if (response.data.rootHashes) {
        rootHash = response.data.rootHashes.split('=')[2].slice(0, -3);
    }
    console.log(response.data)
    let lineage = {
        "rootHash": rootHash,
        "inputHash": response.data.inputHash,
        "computeHash": response.data.computeHash,
        "outputHash": response.data.outputHash,
        "writesSignature": response.data.writesSignature
    }
    console.log(lineage)
    let contentItems = [
        [
            null, // id
            null, // ts
            null, // pub
            null, // sig
            null, // ip
            '*',  // roles
            persona, //model
            JSON.stringify(lineage) // content
        ]
    ]
    let contentRecord = new Records(table, contentItems)
    return await nodeApi.write(session, AppConfig.SCOPE, contentRecord, options.WRITE_DEFAULT)
}

export const weaveReadLineage = async (persona) => {
    const nodeApi = await getNodeApi()
    if (!nodeApi) {
        console.log('Error creating node api')
        return 'Error creating node api'
    }
    const session = await getSession(nodeApi, AppConfig.ORGANIZATION)

    const table = "personas_lineage"
    let filter = new WeaveHelper.Filter(WeaveHelper.FilterOp.eq("persona", persona), {"id": "ASC"}, null, [ "persona" ])
    console.log("Fetching personas lineage for persona ", persona)
   
    return await nodeApi.read(session, AppConfig.SCOPE, table, filter, WeaveHelper.Options.READ_DEFAULT_NO_CHAIN);
}

export const weaveUserStatistics = async (scope) => {
    const nodeApi = await getNodeApi()
    if (!nodeApi) {
        console.log('Error creating node api')
        return 'Error creating node api'
    }
    const session = await getSession(nodeApi, AppConfig.ORGANIZATION)

    // eslint-disable-next-line no-unused-vars
    const { pub } = getOrCreateKey()

    const params = {
        scope
    }
    let options = new WeaveHelper.Options.ComputeOptions(true, 300, 0, null, params);
    return await nodeApi.compute(session, "gcr.io/weavechain/user_statistics", options)
}