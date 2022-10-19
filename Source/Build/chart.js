const { ChartJSNodeCanvas } = require('chartjs-node-canvas');
const Utils = require('../Utilities');

module.exports = async (details, resource) => {
    const cpu = (resource.resources.cpu_absolute / details.limits.cpu) * 100;
    const ram = ((resource.resources.memory_bytes / 1024 / 1024 / 1024) / (details.limits.memory / 1024)) * 100;
    const disk = ((resource.resources.disk_bytes / 1024 / 1024 / 1024) / (details.limits.disk / 1024)) * 100;

    const buffer = new ChartJSNodeCanvas({ height: 242, width: 533, backgroundColour: '#1E1E1E' }).renderToBuffer({
        type: 'bar',
        data: {
            labels: [
                `CPU | ${resource.resources.cpu_absolute}% / ${details.limits.cpu}%`,
                `RAM | ${Utils.sizeFormat(resource.resources.memory_bytes)} / ${Utils.sizeFormat(details.limits.memory, 'MB')}`,
                `DISK | ${Utils.sizeFormat(resource.resources.disk_bytes)} / ${Utils.sizeFormat(details.limits.disk, 'MB')}`
            ],
            datasets: [{
                label: 'Percentage Base ( % )',
                maxBarThickness: 60,
                color: '#FFFFFF',
                data: [cpu, ram, disk],
                backgroundColor: [
                    'rgba(181, 218, 39, 1)',
                    'rgba(132, 72, 212, 1)',
                    'rgba(68, 175, 250, 1)'
                ]
            }],
            backgroundColor: '#FFFFFF'
        },
        options: { color: '#FFFFFF' }
    })

    return buffer;
}