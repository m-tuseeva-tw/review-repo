export const invalidLoginData: any = [
    {
        ts: 'TS2.1.',
        name: 'Invalid password with valid email',
        email: 'test@example.com',
        password: 'wrongpassword',
        expectedError: 'Invalid email or password.'
    },
    {
        ts: 'TS2.2.',
        name: 'Valid password with invalid email',
        email: 'wrong@example.com',
        password: 'test123',
        expectedError: 'Invalid email or password.'
    },
    {
        ts: 'TS2.3.',
        name: 'Invalid email and password',
        email: 'wrong@example.com',
        password: 'wrongpassword',
        expectedError: 'Invalid email or password.'
    }
];