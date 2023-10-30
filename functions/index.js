/* eslint-disable no-unused-vars */
const functions = require("firebase-functions");
const express = require("express");

const cors = require("cors");
// eslint-disable-next-line max-len
const stripe = require("stripe")("sk_test_51N21YYKMl3kfoJMxR6ZTETq2yt4X41CTguIeP9hvq4eqwWXW2qxGpkZMUXxSQ6DrpODtYE9HCpV8lYSLJelJ6Y8T00lyBvh37A");


// -API

// -APP CONFIG

const app = express();

// -Middlewares

app.use(cors({origin: true}));
app.use(express.json());

// -API routes

app.get("/", (request, response) => response.status(200).send("hello world"));
app.post("/payments/create", async (request, response) => {
  const total = request.query.total;

  console.log("Payment Request Recived ! for this amount =".total);
  const paymentIntent = await stripe.paymentIntents.create({
    amount: total, // subunits of the currency
    currency: "usd",
  });
    // OK - created
  response.status(201).send({
    clientSecret: paymentIntent.clientSecret,
  });
});


// -lISTEN COMMAND

exports.api = functions.https.onRequest(app);

// example endpoint
// http://127.0.0.1:5001/clone-7def1/us-central1/api
