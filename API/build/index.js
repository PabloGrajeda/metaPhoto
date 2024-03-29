"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const { PORT } = process.env;
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.get('/ping', (_req, res) => {
    console.log('ping received');
    res.send('pong');
});
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
