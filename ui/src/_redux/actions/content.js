import { binary_to_base58 } from "base58-js"
import { weaveCheckBalance, weaveCheckInclusionWithMerkle, weaveWriteContent } from "../../helpers/weave"
import keys from "../../weaveapi/keys"
import { ActionTypes } from "../constants"
import AppConfig from "../../AppConfig";

export const writeContent = (table, contentText, title) => {
    return dispatch => {
        return new Promise(resolve => {
            weaveWriteContent(table, contentText, title).then(response => {
                if (!response.data || response.res === 'err') {
                    console.log('Error during weaveWriteContent(): ' + JSON.stringify(response))
                    resolve('error')
                    return;
                }

                dispatch({type: ActionTypes.CONTENT_WRITTEN})
                resolve('success')
            })
        })
    }
}

export const checkInclusionWithMerkle = async (table, contentText) => {
    const toCheck = JSON.stringify([contentText]);
    let hmacSHA256 = new keys.KeyExchange().signRequest(AppConfig.SALT, toCheck);
    let hash = binary_to_base58(Buffer.from(hmacSHA256, "base64"))
    console.log('Computed hash: ' + hash)

    const result = await weaveCheckInclusionWithMerkle(table, hash);
    return { hash, result };
}

export const checkBalance = async () => {
    return await weaveCheckBalance()
}