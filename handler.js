require("dotenv").config();
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const nodemailerSendgrid = require("nodemailer-sendgrid");

module.exports.notifier = (event, context, callback) => {
  let verifiedEvent;

  try {
    verifiedEvent = jwt.verify(event.payload, process.env.JWT_SECRET);
  } catch (e) {
    return sendResponse({ statusCode: 401, callback });
  }

  sendEmail(verifiedEvent)
    .then(info => {
      sendResponse({ statusCode: 200, body: info, callback });
    })
    .catch(error => {
      return sendResponse({ statusCode: 422, body: error, callback });
    });
};

const sendResponse = ({ statusCode, body, callback }) => {
  const response = {
    statusCode,
    headers: { "Access-Control-Allow-Origin": "*" },
    body
  };
  return callback(null, response);
};

const _smtpConnect = () => {
  return new Promise(resolve => {
    const transporter = nodemailer.createTransport(
      nodemailerSendgrid({
        apiKey: process.env.API_KEY
      })
    );
    resolve(transporter);
  });
};

const sendEmail = payload => {
  return _smtpConnect().then(transporter => {
    return new Promise((resolve, reject) => {
      const mailOptions = {
        ...payload,
        text: payload.body,
        html: payload.body
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log(error);
          reject(error);
        }
        resolve(info);
      });
    });
  });
};

// THIS IS THE CLIENT SIGNATURE FUNCTION
const token = item =>
  jwt
    .sign(
      item,
      "3F19cAcB85f8E06CD0ab4c9d17E782EdE7D77C022A4dF5b0688d526Dd6C9eF87"
    )
    .toString();
