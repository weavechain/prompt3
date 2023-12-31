import { binary_to_base58 } from "base58-js"
import {
    weaveCheckBalance,
    weaveCheckInclusionWithMerkle,
    weaveWriteContent,
    weaveGenerateContent,
    weaveDistilPrompt,
    weaveReadContent,
    weaveApprovePrompts,
    writeLineage,
    weaveReadLineage,
    weaveUserStatistics
} from "../../helpers/weave"
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

export const generateContent = (persona, prompt) => {
    return dispatch => {
        return new Promise(resolve => {
            weaveGenerateContent(persona, prompt, AppConfig.SCOPE).then(response => {
                if (!response.data || response.res === 'err') {
                    console.log('Error during text generation: ' + JSON.stringify(response))
                    resolve(response.message)
                    return;
                }

                dispatch({type: ActionTypes.CONTENT_WRITTEN})
                resolve(response.data)
            })
        })
    }
}

export const distilPrompt = (persona, accepted) => {
    return dispatch => {
        return new Promise(resolve => {
            weaveApprovePrompts(persona, accepted).then(r =>{
                console.log(r)
                weaveDistilPrompt(persona, AppConfig.SCOPE).then(response => {
                    console.log(response)
                    if (!response.data || response.res === 'err') {
                        console.log('Error during prompt distillation: ' + JSON.stringify(response))
                        resolve(response.message)
                        return;
                    }

                    writeLineage(response, persona).then(response => {
                        if (response.res === 'err') {
                            console.log('Error during lineage write: ' + JSON.stringify(response))
                            resolve(response.message)
                            return;
                        }
                        resolve(response.message)
                    })

                    dispatch({type: ActionTypes.CONTENT_WRITTEN})
                    resolve(response.data)
                })
            })
        })
    }
}

export const readPrompts = async (persona, proposed = true) => {
    return await weaveReadContent(persona + (proposed ? "_proposals" : "_prompts"));
}

export const readSuperPrompt = async (persona) => {
    return await weaveReadContent(persona + "_superprompts");
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

export const readLineage = (persona) => {
    return dispatch => {
        return new Promise(resolve => {
            weaveReadLineage(persona).then(response => {
                if (!response.data || response.res === 'err') {
                    console.log('Error during weaveReadLineage(): ' + JSON.stringify(response))
                    resolve('error')
                    return;
                }

                dispatch({type: ActionTypes.CONTENT_WRITTEN})
                resolve(response.data)
            })
        })
    }
}

export const userStatistics = () => {
    return dispatch => {
        return new Promise(resolve => {
            weaveUserStatistics(AppConfig.SCOPE).then(response => {
                console.log(response)
                if (!response.data || response.res === 'err') {
                    console.log('Error during user statistics refresh: ' + JSON.stringify(response))
                    resolve(response.message)
                    return;
                }

                dispatch({type: ActionTypes.CONTENT_WRITTEN})
                resolve(response.data)
            })
        })
    }
}