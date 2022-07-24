"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const nodemailer_1 = __importDefault(require("nodemailer"));
module.exports = (email, url) => __awaiter(void 0, void 0, void 0, function* () {
    let testAccount = yield nodemailer_1.default.createTestAccount();
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer_1.default.createTransport({
        service: "gmail",
        host: "smtp.gmail.com",
        auth: {
            user: "batuhankir1163@gmail.com",
            pass: "eqrwhuzjzhphrqro",
        },
    });
    // send mail with defined transport object
    let info = yield transporter.sendMail({
        from: "batuhankir1163@gmail.com",
        to: email,
        subject: "Hello ✔",
        text: "Hello world?",
        html: `<a target='_blank' href=${url}>change password</a>`, // html body
    });
    console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer_1.default.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
});
