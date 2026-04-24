const https = require('https');

const RAZORPAY_KEY_ID = 'rzp_test_SJdDboYozTtwFe';
const RAZORPAY_KEY_SECRET = 'Pk4kEQs1geexdd3cVW3O52TG';

// Test data
const orderData = {
  amount: 159900, // ₹1,599 in paise
  currency: 'INR',
  receipt: 'test_receipt_' + Date.now(),
  notes: {
    userId: 'test_user_123',
    tier: 'pro',
    plan: 'Pro',
    billingCycle: 'monthly'
  }
};

const options = {
  hostname: 'api.razorpay.com',
  path: '/v1/orders',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Basic ' + Buffer.from(RAZORPAY_KEY_ID + ':' + RAZORPAY_KEY_SECRET).toString('base64')
  }
};

console.log('Testing Razorpay API with:', JSON.stringify(orderData));

const req = https.request(options, (res) => {
  console.log('Status Code:', res.statusCode);
  console.log('Headers:', JSON.stringify(res.headers));
  
  let data = '';
  res.on('data', (chunk) => {
    data += chunk;
  });
  
  res.on('end', () => {
    console.log('Response Body:', data);
  });
});

req.on('error', (e) => {
  console.error('Error:', e);
});

req.write(JSON.stringify(orderData));
req.end();