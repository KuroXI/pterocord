const { createCanvas, loadImage, GlobalFonts } = require('@napi-rs/canvas');
const Utils = require('../Utilities');

module.exports = async (details, resource) => {
    const canvas = createCanvas(585, 350);
    const ctx = canvas.getContext('2d');

    GlobalFonts.registerFromPath('./Source/Font/Inter-SemiBold.ttf', 'inter-semibold');
    GlobalFonts.registerFromPath('./Source/Font/Inter-Medium.ttf', 'inter-medium');

    ctx.fillStyle = '#1E1E1E';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    if (resource.current_state == 'offline') {
        ctx.font = '24px inter-medium';
        ctx.fillStyle = '#606060';
        ctx.textAlign = 'center';
        ctx.fillText('SERVER OFFLINE', 291, 174);

        return await canvas.encode('png');
    };

    const chart = await loadImage(await require('./chart')(details, resource));
    ctx.drawImage(chart, 26, 107);

    ctx.font = '32px inter-semibold';
    ctx.fillStyle = '#FFFFFF';
    ctx.fillText(details.name, 26, 41, 465);

    ctx.font = '15px inter-medium';
    ctx.fillStyle = '#C7C7C7';
    ctx.fillText(`Uptime: ${Utils.uptimeFormat(resource.resources.uptime)}`, 26, 67);
    ctx.fillText(`Download: ${Utils.networkFormat(resource.resources.network_rx_bytes)}`, 26, 85);
    ctx.fillText(`Upload: ${Utils.networkFormat(resource.resources.network_tx_bytes)}`, 26, 99);
    
    return await canvas.encode('png')
}