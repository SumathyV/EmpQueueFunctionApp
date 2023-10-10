module.exports = async function (context, myQueueItem) {
context.log('CRM integration starts JavaScript queue trigger function processed work item', myQueueItem);

    //#!/usr/bin/env node

// read in env settings
require("dotenv").config();

const axios = require("axios");
const auth = require("./auth");
const AAD_ENDPOINT = process.env.AAD_ENDPOINT;
const TENANT_ID = process.env.TENANT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const CLIENT_ID = process.env.CLIENT_ID;
const CRM_ENDPOINT = process.env.CRM_ENDPOINT;

async function main() {
  try {
    context.log(process.env.AAD_ENDPOINT + process.env.TENANT_ID + "/oauth2/token");
    const token = await getToken();
    //let token = authResponse.accessToken;
    context.log("********token**********", token);
   /* getContacts(token).then((contacts) => {
      // Do something with the contacts
      context.log("***********GET CONTACTS**********", contacts);
    });*/
    createContact(token).then((contacts) => {
      // Do something with the contacts
     // context.log("***********CONTACTS CREATED**********");
    });
    
  } catch (error) {
    context.log(error);
  }
}
const getToken = async () => {
  const authResponse = await auth.getToken(auth.tokenRequest);
  context.log("********here*********", authResponse.accessToken);
  return authResponse.accessToken;
};
const createContact = async (token) => {
 context.log(process.env.CRM_ENDPOINT + process.env.CONTACT_URL_BASE)
  let res = await axios.post(
    process.env.CRM_ENDPOINT + process.env.CONTACT_URL_BASE, {
      firstname: 'SumathyT1Oct10',
      lastname: 'p',
      emailaddress1: 'test@example.com'
    },
    {
      headers: {
         "Content-Type": "application/json; charset=utf-8",
          "Authorization": `Bearer ${token}`
      },
    }
  );
  context.log("res==>", res);
  return res
};
const getContacts = async (token) => {
  let res = await axios.get(
    process.env.CRM_ENDPOINT+process.env.CONTACT_URL_BASE+"?$select=fullname,contactid",
    {
      headers: {
        Authorization: `Bearer ${token}`,
        // Accept: "application/json",
        //"OData-MaxVersion": 4.0,
        //"OData-Version": 4.0,
        // "Content-Type": "application/json; charset=utf-8",
      },
    }
  );
  context.log("res==>", res.data);
};
main();

//module.exports = ;

};