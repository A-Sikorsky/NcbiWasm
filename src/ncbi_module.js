import Wasm from './ncbi';

let NcbiModule = null

function getModule() 
{
    return NcbiModule
}

async function fetchModule() 
{
    return await Wasm({locateFile(path) {return path}}).then((Module) => {
        NcbiModule = Module;
        return NcbiModule;
    });
}

function getData(url) {
    return fetch(url, {
        cache: 'no-cache',
        credentials: 'omit'
    }).then(function(rs) {
        if(rs.ok)
            return rs.arrayBuffer();
        throw new Error('HTTP Error ' + rs.status);
    }).then(function(data) {
        return data; 
    });
}

async function getObject(data)
{
    if (NcbiModule == null) {
        return fetchModule().then((Module) => {
            NcbiModule = Module;
            console.time('ASN deserialize');
            let o = new NcbiModule.asnObject(data);
            console.timeEnd('ASN deserialize');
            return o;
        });
    } 
    console.time('ASN deserialize');
    let o = new NcbiModule.asnObject(data);
    console.timeEnd('ASN deserialize');
    return o;
}


export { getObject, getModule };
