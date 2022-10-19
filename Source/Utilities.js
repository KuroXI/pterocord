module.exports.statusColor = (status) => {
    if (status === 'starting') return 'Orange';
    if (status === 'running') return 'Green';
    return 'Red';
}

module.exports.networkFormat = (network, type = 'bps') => {
    const fr = new Intl.NumberFormat('en-US', { maximumFractionDigits: 2 });

    if (type === 'bps') { network /= 1024; type = 'kbps'; }
    if (type === 'kbps' && network / 1024 >= 1) { network /= 1024; type = 'mbps'; }
    if (type === 'mbps' && network / 1024 >= 1) { network /= 1024; type = 'gbps'; }

    return `${fr.format(network)} ${type}`
}

module.exports.sizeFormat = (byte, type = 'B') => {
    const fr = new Intl.NumberFormat('en-US', { maximumFractionDigits: 2 });

    if (type === 'B') { byte /= 1024; type = 'KB'; }
    if (type === 'KB' && byte / 1024 >= 1) { byte /= 1024; type = 'MB'; }
    if (type === 'MB' && byte / 1024 >= 1) { byte /= 1024; type = 'GB'; }

    return `${fr.format(byte)}${type}`
}

module.exports.uptimeFormat = (uptime) => {
    const days = Math.floor(uptime / 1000 / 60 / 60 / 24);
    uptime -= days * 1000 * 60 * 60 * 24;
    const hours = Math.floor(uptime / 1000 / 60 / 60);
    uptime -= hours * 1000 * 60 * 60;
    const minutes = Math.floor(uptime / 1000 / 60);
    uptime -= minutes * 1000 * 60;
    const seconds = Math.floor(uptime / 1000);
    let time = '';

    if (days >= 1) time += `${days} day${days > 1 ? 's': ''} `;
    if (hours >= 1) time += `${hours} hr${hours > 1 ? 's': ''} `;
    if (minutes >= 1) time += `${minutes} min${minutes > 1 ? 's': ''} `;
    if (seconds >= 1) time += `${seconds} sec${seconds > 1 ? 's': ''}`;

    return time;
}

module.exports.textFormat = (text) => { return `\`\`\`yaml\n${text}\n\`\`\`` };