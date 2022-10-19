const fetch = require('node-fetch');
const { PRETO_URI } = require('../config.json');

module.exports.serverList = async (client, memberID) => {
    const response = await fetch(`${PRETO_URI}/api/client`, {
        method: 'GET',
        headers: { 'Authorization': `Bearer ${client.accounts.get(memberID)}` }
    });
    const json = await response.json();

    return json.data;
}

module.exports.serverDetails = async (client, serverID, memberID) => {
    const response = await fetch(`${PRETO_URI}/api/client/servers/${serverID}`, {
        method: 'GET',
        headers: { 'Authorization': `Bearer ${client.accounts.get(memberID)}` }
    });
    const json = await response.json();

    return json.attributes;
}

module.exports.serverResource = async (client, serverID, memberID) => {
    const response = await fetch(`${PRETO_URI}/api/client/servers/${serverID}/resources`, {
        method: 'GET',
        headers: { 'Authorization': `Bearer ${client.accounts.get(memberID)}` }
    });
    const json = await response.json();

    return json.attributes;
}

module.exports.powerState = async (client, serverID, memberID, state = 'start') => {
    await fetch(`${PRETO_URI}/api/client/servers/${serverID}/power`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${client.accounts.get(memberID)}`
        },
        body: JSON.stringify({ "signal": state })
    })
}
