import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
    stages: [
        { duration: '30s', target: 20 }, // Ramp up to 20 users
        { duration: '1m', target: 20 },  // Stay at 20 users
        { duration: '30s', target: 0 },  // Ramp down to 0 users
    ],
    thresholds: {
        http_req_duration: ['p(95)<500'], // 95% of requests should be below 500ms
        http_req_failed: ['rate<0.01'],   // Less than 1% of requests should fail
    },
};

const BASE_URL = 'http://localhost:3000';

export default function () {
    // Test transaction creation
    const createTransaction = http.post(`${BASE_URL}/api/transactions`, {
        buyerId: 'user123',
        sellerId: 'user456',
        amount: 100.00
    });
    
    check(createTransaction, {
        'transaction created successfully': (r) => r.status === 200,
        'response time OK': (r) => r.timings.duration < 500,
    });
    
    sleep(1);
    
    // Test transaction status check
    const transactionId = JSON.parse(createTransaction.body).id;
    const getStatus = http.get(`${BASE_URL}/api/transactions/${transactionId}`);
    
    check(getStatus, {
        'status check successful': (r) => r.status === 200,
        'response contains status': (r) => JSON.parse(r.body).status !== undefined,
    });
    
    sleep(1);
} 