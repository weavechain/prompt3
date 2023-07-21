import WeaveHelper from "../weaveapi/helper";
import options from "../weaveapi/options";
import Records from "../weaveapi/records";
import WeaveAPI from "../weaveapi/weaveapi";
import AppConfig from "../AppConfig";
import LOCAL_STORAGE from "./localStorage";
import { base58_to_binary, binary_to_base58 } from "base58-js";

const { createHash } = require('crypto');

export const weaveWriteContent = async (table, contentText, title) => {
    const nodeApi = await getNodeApi()
    if (!nodeApi) {
        console.log('Error creating node api')
        return 'Error creating node api'
    }
    const session = await getSession(nodeApi, AppConfig.ORGANIZATION)

    const { pub } = getOrCreateKey()
    let contentItems = [
        [
            null, // id
            null, // ts
            null, // pub
            null, // sig
            null, // ip
            '*',  // roles
            '',   // link
            title, // title
            pub, // author
            contentText // content
        ]
    ]
    let contentRecord = new Records(table, contentItems)
    return await nodeApi.write(session, AppConfig.SCOPE, contentRecord, options.WRITE_DEFAULT)
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

const getSession = async (nodeApi, organization) => {
	const account = nodeApi.getClientPublicKey()
	return await nodeApi.login(organization, account, AppConfig.SCOPE)
}