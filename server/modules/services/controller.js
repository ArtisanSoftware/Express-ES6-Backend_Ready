
import {
  errorHandler400,
  serverErrorHandler,
  successHandler
} from "../../utils";

var request = require('request');

const stripe = require('stripe')('sk_test_51HZ9FAJ6UKInkPrlkt2CZytqhfbLZjnuJOEztVdJ8HOClSAsVbXsMYTJN3BCZgtzCxUvTdCd8GVKQ5T5gq6MbVhK00K9Pr2wTx', {apiVersion: '2020-08-27',
});

var CLIENT =
  'AaUKXIRkUw2XgJZTgCsVeGg-obAG7LfomBXXGB23GR0PXTWszSJOkaWWw5zCNzLyGhcQzs2syLquDoQD';
var SECRET =
  'ELjgBQ4aDUZEBwTfYAGQnw7na8mXw9nklTXWuCqOag96MS_gkwcAsyVAhmLxYyhTqHlBJfBeoy8OYMPy';
var PAYPAL_API = 'https://api.sandbox.paypal.com';


exports.paypaltest = async (req, res) => {
  try{

  // 1. Set up a URL to handle requests from the PayPal button
  
    // 2. Call /v1/payments/payment to set up the payment
    request.post(PAYPAL_API + '/v1/payments/payment',
    {
      auth:
      {
        user: CLIENT,
        pass: SECRET
      },
      body:
      {
        intent: 'sale',
        payer:
        {
          payment_method: 'paypal'
        },
        transactions: [
        {
          amount:
          {
            total: '5.99',
            currency: 'USD'
          }
        }],
        redirect_urls:
        {
          return_url: 'http://localhost:3000',
          cancel_url: 'http://localhost:3000'
        }
      },
      json: true
    }, function(err, response)
    {
      if (err)
      {
        console.error(err);
        return res.sendStatus(500);
      }
      // 3. Return the payment ID to the client
      res.json(
      {
        id: response.body.id
      });
    });
  
  }
  catch(paypaltest)
  {
    serverErrorHandler(res, paypaltest);
  }
}

exports.paypaltestauth = async (req,res) => {
  try{
    // 2. Get the payment ID and the payer ID from the request body.
    var paymentID = req.body.paymentID;
    var payerID = req.body.payerID;
    // 3. Call /v1/payments/payment/PAY-XXX/execute to finalize the payment.
    request.post(PAYPAL_API + '/v1/payments/payment/' + paymentID +
      '/execute',
      {
        auth:
        {
          user: CLIENT,
          pass: SECRET
        },
        body:
        {
          payer_id: payerID,
          transactions: [
          {
            amount:
            {
              total: '10.99',
              currency: 'USD'
            }
          }]
        },
        json: true
      },
      function(err, response)
      {
        if (err)
        {
          console.error(err);
          return res.sendStatus(500);
        }
        // 4. Return a success response to the client
        res.json(
        {
          status: 'success'
        });
      });
// Run `node ./server.js` in your terminal
  }
  catch(paypaltestauth)
  {
    serverErrorHandler(res,paypaltestauth);
  }
}



exports.testpaymentintent = async (req, res) => {
  try{
  
    var charge = await stripe.charges.create({
      amount: req.body.amount,
      currency: 'eur',
      source: req.body.cardtoken,
      description: req.body.description,
      metadata: {
        
          'city': req.body.address_city,
          'country': req.body.address_country,
          'line1': req.body.address_line1,
          'line2': req.body.address_line2,
          'postal_code': req.body.address_postal_code,
          'state': req.body.state,
          'customer_email': req.body.customer_email,
          'customer_name': req.body.customer_name,
          'customer_phone': req.body.customer_phone
      },
    shipping:{
      address :{
          city: req.body.address_city,
          country: req.body.address_country,
          line1: req.body.address_line1,
          line2: req.body.address_line2,
          postal_code: req.body.address_postal_code,
          state: req.body.state
      },
      name: req.body.customer_name,
      phone: req.body.customer_phone
    }
      
    });
  
  res.status(201);
  return res.json(charge);
  }
  catch(testpayment)
  {
    serverErrorHandler(res, testpayment);
  }
}

exports.testpayment = async (req, res) => {
  try{
  
    var intent = await stripe.paymentIntents.create({
      
      amount: req.body.amount,
      currency: 'eur',
      payment_method_types: ['card'],
      payment_method_options: {
        card :{
          request_three_d_secure : 'any'
        }
      },
      payment_method_data: {
        type : 'card',
        card: {
            token: req.body.cardtoken
        },
    },
      description: 'Suaro Test Charge',
      metadata: {
        
          'city': req.body.address_city,
          'country': req.body.address_country,
          'line1': req.body.address_line1,
          'line2': req.body.address_line2,
          'postal_code': req.body.address_postal_code,
          'state': req.body.state,
          'customer_email': req.body.customer_email,
          'customer_name': req.body.customer_name,
          'customer_phone': req.body.customer_phone
      },
    shipping:{
      address :{
          city: req.body.address_city,
          country: req.body.address_country,
          line1: req.body.address_line1,
          line2: req.body.address_line2,
          postal_code: req.body.address_postal_code,
          state: req.body.state
      },
      name: req.body.customer_name,
      phone: req.body.customer_phone
    }
      
    });

    const paymentIntent = await stripe.paymentIntents.confirm(
      intent.id
    );
  
  res.status(201);
  return res.json(paymentIntent);
  }
  catch(testpayment)
  {
    serverErrorHandler(res, testpayment);
  }
}

