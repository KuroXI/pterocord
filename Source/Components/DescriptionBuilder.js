const Utils = require('../Utilities');

module.exports = async (details, resource) => {
    const frmt = new Intl.NumberFormat('en-US', { maximumFractionDigits: 2 });

    const cpu = Utils.progressBar(resource.resources.cpu_absolute, details.limits.cpu);
    const ram = Utils.progressBar(resource.resources.memory_bytes / 1024 / 1024 / 1024, details.limits.memory / 1024);
    const disk = Utils.progressBar(resource.resources.disk_bytes / 1024 / 1024 / 1024, details.limits.disk / 1024);

    return [
        `UPTIME: ${Utils.uptimeFormat(resource.resources.uptime)}`,
        ``,
        `CPU : ${frmt.format(resource.resources.cpu_absolute)}% / ${details.limits.cpu}%`,
        ` ⤷ ${cpu.bar} ${cpu.percentage}%`,
        ``,
        `RAM : ${Utils.sizeFormat(resource.resources.memory_bytes)} / ${Utils.sizeFormat(details.limits.memory, 'MB')}`,
        ` ⤷ ${ram.bar} ${ram.percentage}%`,
        ``,
        `DISK: ${Utils.sizeFormat(resource.resources.disk_bytes)} / ${Utils.sizeFormat(details.limits.disk, 'MB')}`,
        ` ⤷ ${disk.bar} ${disk.percentage}%`,
        ``,
        `NETWORK DOWNLOAD: ${Utils.networkFormat(resource.resources.network_rx_bytes)}`,
        `NETWORK UPLOAD  : ${Utils.networkFormat(resource.resources.network_tx_bytes)}`
    ];
}