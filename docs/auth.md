# Authentication

## What I Built

Today I worked on the user registration and email verification flow.

## What I Learned

I learned how to:

- Check whether a user already exists
- Hash passwords using bcrypt
- Generate OTPs
- Set OTP expiration times
- Send OTPs through email
- Verify user-provided OTPs
- Issue an authentication token after verification
- Automatically authenticate the user after successful verification

## Authentication Flow

Register
↓
Hash Password
↓
Generate OTP
↓
Send OTP
↓
Verify Email
↓
Issue Authentication Token
↓
User is Logged In

## Reflection

One thing I learned from building this feature is that authentication involves several connected steps rather than just creating a login endpoint.

I am building each part myself so I can understand how the pieces of the system work together.