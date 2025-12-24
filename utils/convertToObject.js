
export function convertToSerializableObject({leanDocument}){
    for (const key of Object.keys(leanDocument)){
        leanDocument[key] = leanDocument[key].toString()
    }
    return leanDocument
}