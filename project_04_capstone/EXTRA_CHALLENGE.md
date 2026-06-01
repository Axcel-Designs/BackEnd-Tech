# Extra Challenge Questions

1. Question 1

    Why is storing plain passwords dangerous even in small applications?

- Database breaches expose everything — If your database is hacked, attackers immediately have all user credentials
- Passwords are reused — Users often use the same password across multiple services, compromising their other accounts
- No recovery mechanism — You can't "verify" a password without comparing it directly, which shouldn't happen
- Compliance violations — GDPR, PCI-DSS, and other regulations explicitly require password hashing
- Insider threats — Even employees with database access could see passwords

2. Question 2

    What is the difference between: authentication and authorization

**Authentication**: Verifying who you are

- Example: Logging into your email with username/password or Face ID
- "Are you really John?"

**Authorization**: Verifying what you're allowed to do

- Example: A regular user can't delete posts, but an admin can
- "John, you can view this file but not edit it"

    Give real-world examples.

**Authentication**: Showing your ID and PIN at the ATM proves you're the account holder
**Authorization**: Your account only shows your transactions, not someone else's

3. Question 3

    Why is JWT expiration important?

    What could happen if tokens never expire?

**Importance of expiration:**

- **Limited damage from stolen tokens** — If a token is compromised, it's only valid for a short window (15-60 minutes)
- **User permission changes** — If a user is demoted/banned, old tokens should stop working
- **Force re-authentication** — Users must periodically verify their identity

**Without expiration:**

- A stolen token works forever
- Revoked users can still access the system indefinitely
- No way to enforce permission updates
- Security breach impact multiplies over time

**Best practice:** Short-lived access tokens (15 min) + longer refresh tokens (7 days)

4. Question 4

    A hacker gets access to a valid JWT token.

    What are 3 things you can implement to reduce damage?

**Three defensive strategies:**

1. **Token Blacklist/Revocation**
   - Maintain a database of invalidated tokens
   - Check every request against this list
   - Useful for logout or emergency security responses

2. **IP Address Binding**
   - Store the IP address where token was issued
   - Reject tokens used from different IPs
   - Reduces usefulness of stolen tokens on different networks

3. **Device Fingerprinting / Rate Limiting**
   - Track device info (User-Agent, OS, browser)
   - Flag unusual access patterns (e.g., token used from 2 countries in 1 minute)
   - Implement rate limiting to detect brute force/unusual activity

**Bonus:** Short expiration times, refresh token rotation, 2FA requirement for sensitive actions

5. Question 5

    Why should logging systems be treated as sensitive infrastructure?

Logging systems can reveal:

- **Passwords/tokens** — If improperly logged during errors (e.g., request bodies)
- **Personal data** — User emails, phone numbers, addresses
- **Security patterns** — Logs reveal system architecture, which functions fail, etc.
- **Audit trails** — Who did what when (critical for compliance)

**Security requirements:**

- **Restrict access** — Only authorized admins can view logs
- **Sanitize sensitive data** — Never log passwords, tokens, PII
- **Secure storage** — Encrypt logs at rest and in transit
- **Tamper-proof** — Logs should be immutable (prevent attackers from covering their tracks)
- **Monitor log access** — Track who's reading the logs
- **Retention policies** — Delete old logs safely (compliance + security)
