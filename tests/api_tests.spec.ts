import {test, expect} from '@playwright/test';

const baseUrl = 'https://reqres.in/api';

// Test Group: Users
test.describe('User API Tests', () => {
    // List users
    test('List users', async ({request}) => {
        const response = await request.get(`${baseUrl}/users?page=2`);
        expect(response.ok()).toBeTruthy();
        expect(response.status()).toBe(200);
        
        const json = await response.json();
        expect(json.page).toBe(2);
        expect(json.data).toBeInstanceOf(Array);
        expect(json.data.length).toBeGreaterThan(0);
    });

    // Single user
    test('Get single user details', async ({request}) => {
        const response = await request.get(`${baseUrl}/users/2`);
        expect(response.ok()).toBeTruthy();
        expect(response.status()).toBe(200);
        
        const json = await response.json();
        expect(json.data.id).toBe(2);
        expect(json.data.first_name).toBe('Janet');
        expect(json.data.last_name).toBe('Weaver');
        expect(json.data.email).toBeTruthy();
    });

    // Single user not found
    test('Get non-existent user returns 404', async ({request}) => {
        const response = await request.get(`${baseUrl}/users/23`);
        expect(response.ok()).toBeFalsy();
        expect(response.status()).toBe(404);
        
        const json = await response.json();
        expect(json).toEqual({});
    });
});

// Test Group: Resources
test.describe('Resource API Tests', () => {
    // List <resource>
    test('List resources', async ({request}) => {
        const response = await request.get(`${baseUrl}/unknown`);
        expect(response.ok()).toBeTruthy();
        expect(response.status()).toBe(200);
        
        const json = await response.json();
        expect(json.data).toBeInstanceOf(Array);
        expect(json.data.length).toBeGreaterThan(0);
    });

    // Single <resource>
    test('Get single resource details', async ({request}) => {
        const response = await request.get(`${baseUrl}/unknown/2`);
        expect(response.ok()).toBeTruthy();
        expect(response.status()).toBe(200);
        
        const json = await response.json();
        expect(json.data.id).toBe(2);
        expect(json.data.name).toBeTruthy();
        expect(json.data.color).toBeTruthy();
    });

    // Single <resource> not found
    test('Get non-existent resource returns 404', async ({request}) => {
        const response = await request.get(`${baseUrl}/unknown/23`);
        expect(response.ok()).toBeFalsy();
        expect(response.status()).toBe(404);
        
        const json = await response.json();
        expect(json).toEqual({});
    });
});

// Test Group: CRUD Operations
test.describe('CRUD Operations', () => {
    // Create
    test('Create a new user', async ({request}) => {
        const userData = {
            name: 'Sergey',
            job: 'QA Engineer'
        };
        
        const response = await request.post(`${baseUrl}/users`, { data: userData });
        expect(response.ok()).toBeTruthy();
        expect(response.status()).toBe(201);
        
        const json = await response.json();
        expect(json.name).toBe(userData.name);
        expect(json.job).toBe(userData.job);
        expect(json.id).toBeTruthy();
        expect(json.createdAt).toBeTruthy();
    });

    // Update (PUT)
    test('Update user with PUT', async ({request}) => {
        const userData = {
            name: 'Sergey',
            job: 'Automation Engineer'
        };
        
        const response = await request.put(`${baseUrl}/users/2`, { data: userData });
        expect(response.ok()).toBeTruthy();
        expect(response.status()).toBe(200);
        
        const json = await response.json();
        expect(json.name).toBe(userData.name);
        expect(json.job).toBe(userData.job);
        expect(json.updatedAt).toBeTruthy();
    });

    // Update (PATCH)
    test('Update user with PATCH', async ({request}) => {
        const userData = {
            name: 'Sergey',
            job: 'Lead QA'
        };
        
        const response = await request.patch(`${baseUrl}/users/2`, { data: userData });
        expect(response.ok()).toBeTruthy();
        expect(response.status()).toBe(200);
        
        const json = await response.json();
        expect(json.name).toBe(userData.name);
        expect(json.job).toBe(userData.job);
        expect(json.updatedAt).toBeTruthy();
    });

    // Delete
    test('Delete user', async ({request}) => {
        const response = await request.delete(`${baseUrl}/users/2`);
        expect(response.status()).toBe(204);
    });
});

// Test Group: Authentication
test.describe('Authentication', () => {
    // Register - successful
    test('Register successfully', async ({request}) => {
        const userData = {
            email: 'eve.holt@reqres.in',
            password: 'pistol'
        };
        
        const response = await request.post(`${baseUrl}/register`, { data: userData });
        expect(response.ok()).toBeTruthy();
        expect(response.status()).toBe(200);
        
        const json = await response.json();
        expect(json.id).toBeTruthy();
        expect(json.token).toBeTruthy();
    });

    // Register - unsuccessful
    test('Register unsuccessfully with missing password', async ({request}) => {
        const userData = {
            email: 'sydney@fife'
        };
        
        const response = await request.post(`${baseUrl}/register`, { data: userData });
        expect(response.ok()).toBeFalsy();
        expect(response.status()).toBe(400);
        
        const json = await response.json();
        expect(json.error).toBeTruthy();
    });

    // Login - successful
    test('Login successfully', async ({request}) => {
        const userData = {
            email: 'eve.holt@reqres.in',
            password: 'cityslicka'
        };
        
        const response = await request.post(`${baseUrl}/login`, { data: userData });
        expect(response.ok()).toBeTruthy();
        expect(response.status()).toBe(200);
        
        const json = await response.json();
        expect(json.token).toBeTruthy();
    });

    // Login - unsuccessful
    test('Login unsuccessfully with missing password', async ({request}) => {
        const userData = {
            email: 'peter@klaven'
        };
        
        const response = await request.post(`${baseUrl}/login`, { data: userData });
        expect(response.ok()).toBeFalsy();
        expect(response.status()).toBe(400);
        
        const json = await response.json();
        expect(json.error).toBeTruthy();
    });
});

// Test Group: Special Cases
test.describe('Special cases', () => {
    // Delayed response
    test('Delayed response', async ({request}) => {
        // Set a longer timeout for this test as we expect a delay
        test.slow();
        
        const response = await request.get(`${baseUrl}/users?delay=3`);
        expect(response.ok()).toBeTruthy();
        expect(response.status()).toBe(200);
        
        const json = await response.json();
        expect(json.data).toBeInstanceOf(Array);
    });
});