const { JSDOM } = require('jsdom');

const dom = new JSDOM(`
    <!DOCTYPE html>
    <html>
        <body>
            <div id="display">0</div>
        </body>
    </html>
`);

global.window = dom.window;
global.document = dom.window.document;