export const invalidLoginData: any = [
    {
        name: 'Invalid password with valid email',
        email: 'test@example.com',
        password: 'wrongpassword',
        expectedError: 'Invalid email or password.'
    },
    {
        name: 'Valid password with invalid email',
        email: 'wrong@example.com',
        password: 'test123',
        expectedError: 'Invalid email or password.'
    },
    {
        name: 'Invalid email and password',
        email: 'wrong@example.com',
        password: 'wrongpassword',
        expectedError: 'Invalid email or password.'
    }
];