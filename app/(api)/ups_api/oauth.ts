import fetch from 'node-fetch';

const client_id = 'PideuJgSmGvAyj5gffCmviGArkXRL8tS3T8Ec6bRLp4h1gwd';
const client_secret = 'NvROilwfopWTD8V6O0SYTZpzCce70jeoxV2jDmDM6iUEHcqxfnSI4LeIrxINGAAO';
const shipping_number = 'H6A563';
const shipping_speed = '12'; 

async function run() {
  const formData = {
    grant_type: 'authorization_code',
    code: shipping_number,
    redirect_uri: 'http://localhost:3000',
  };

  const resp = await fetch(`https://wwwcie.ups.com/security/v1/oauth/token`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization:
        'Basic ' + Buffer.from(`${client_id}:${client_secret}`).toString('base64'),
    },
    body: new URLSearchParams(formData).toString(),
  });

  const data = await resp.text();
  console.log(data);
}

run();
