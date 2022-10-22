module.exports.statusFormat = (status) => {
    if (status === 'starting') return { color: 'Orange', state: 'Starting' };
    if (status === 'running') return { color: 'Green', state: 'Online' };
    return { color: 'Red', state: 'Offline' };
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

module.exports.progressBar = (current, total) => {
    const frmt = new Intl.NumberFormat('en-US', { maximumFractionDigits: 2 })
    const divide = (current / total);

    if (current > total) return {
        bar: '▮'.repeat(20),
        percentage: Number(frmt.format((divide) * 100))
    };

    const filled = '▮'.repeat(Math.round(20 * divide));
    const empty = '▯'.repeat(20 - Math.round(20 * divide));

    return {
        bar: filled + empty,
        percentage: Number(frmt.format((divide) * 100))
    };
}

module.exports.textFormat = (text, format = 'yaml') => {
    return `\`\`\`${format}\n${text}\n\`\`\``
}