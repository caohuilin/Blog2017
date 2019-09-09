"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = require("http");
const url_1 = require("url");
const next_1 = __importDefault(require("next"));
const port = parseInt(process.env.PORT || '3000', 10);
const dev = process.env.NODE_ENV !== 'production';
const app = next_1.default({ dev });
const handle = app.getRequestHandler();
app.prepare().then(() => {
    http_1.createServer((req, res) => {
        const parsedUrl = url_1.parse(req.url, true);
        const { pathname, query } = parsedUrl;
        if (pathname === '/article') {
            app.render(req, res, '/article/:id/:path', query);
        }
        else {
            handle(req, res, parsedUrl);
        }
    }).listen(port);
    // tslint:disable-next-line:no-console
    console.log(`> Server listening at http://localhost:${port} as ${dev ? 'development' : process.env.NODE_ENV}`);
});
