const fetch = require('node-fetch');
const { PRETO_URI } = require('../config.json');

module.exports.serverList = async (api) => {
    const response = await fetch(`${PRETO_URI}/api/client`, {
        method: 'GET',
        headers: { 'Authorization': `Bearer ${api}` }
    });
    const json = await response.json();

    return json.data;
}

module.exports.serverDetails = async (api, serverID) => {
    const response = await fetch(`${PRETO_URI}/api/client/servers/${serverID}`, {
        method: 'GET',
        headers: { 'Authorization': `Bearer ${api}` }
    });
    const json = await response.json();

    return json.attributes;
}

module.exports.serverResource = async (api, serverID) => {
    const response = await fetch(`${PRETO_URI}/api/client/servers/${serverID}/resources`, {
        method: 'GET',
        headers: { 'Authorization': `Bearer ${api}` }
    });
    const json = await response.json();

    return json.attributes;
}

module.exports.powerState = async (api, serverID, state = 'start') => {
    await fetch(`${PRETO_URI}/api/client/servers/${serverID}/power`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${api}`
        },
        body: JSON.stringify({ signal: state })
    })
}

module.exports.sendCommand = async (api, serverID, command) => {
    await fetch(`${PRETO_URI}/api/client/servers/${serverID}/command`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${api}`
        },
        body: JSON.stringify({ command: command })
    })
}

module.exports.renameServer = async (api, serverID, name) => {
    await fetch(`${PRETO_URI}/api/client/servers/${serverID}/settings/rename`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${api}`
        },
        body: JSON.stringify({ name: name })
    })
}

module.exports.reinstallServer = async (api, serverID) => {
    await fetch(`${PRETO_URI}/api/client/servers/${serverID}/settings/reinstall`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${api}`
        },
        body: null
    })
}