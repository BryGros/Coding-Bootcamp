# Security Demo - Helmet Headers & Rate Limiting

Test security middleware features using Postman to view Helmet's security headers and rate limiting in action.

## Quick Start

**1. Install and Start Server**

```bash
npm install
npm start
```

Server runs on `http://localhost:3000`

**Troubleshooting:** If port 3000 is in use, run `PORT=3001 npm start`

**2. Import Postman Collection**

1. Open Postman (download from [postman.com](https://www.postman.com/downloads/))
2. Click **Import** button (top left)
3. Drag and drop `Helmet-Demo.postman_collection.json` or click **Upload Files**
4. Click **Import**

**3. Run the Collection**

Click **Run** button on the collection to execute all tests automatically.

---

## Using Postman to View Headers

### Request 1: View Helmet Security Headers

**What it tests:** Helmet's default security headers

**How to view headers in Postman:**

1. Click **"View All Helmet Headers"** request
2. Click **Send**
3. Click the **Headers** tab in the response (below the response body)
4. Scroll through to see all security headers

**Headers you'll see:**

| Header | Value | Purpose |
|--------|-------|---------|
| X-Content-Type-Options | nosniff | Prevents MIME-sniffing attacks |
| X-Frame-Options | SAMEORIGIN | Prevents clickjacking attacks |
| X-DNS-Prefetch-Control | off | Controls DNS prefetching |
| X-Download-Options | noopen | Prevents file download attacks (IE8+) |
| X-Permitted-Cross-Domain-Policies | none | Controls Adobe products access |
| Referrer-Policy | no-referrer | Controls referrer information |
| Strict-Transport-Security | max-age=31536000 | Forces HTTPS connections |
| Content-Security-Policy | default-src 'self'... | Prevents XSS and injection |
| X-XSS-Protection | 0 | Disabled (modern browsers use CSP) |

**View automated test results:**
- Click the **Test Results** tab to see all assertions passed
- Open **Postman Console** (View → Show Postman Console) to see detailed header logs

### Request 2: Test Strict Rate Limiting (1 req/min)

**What it tests:** Rate limiting that allows only 1 request per minute

**Steps:**

1. Click **"First Request - Should Succeed"**
2. Click **Send** → ✅ Status: 200 OK
3. Click **"Second Request - Should Fail"**
4. Click **Send** immediately → ❌ Status: 429 Too Many Requests

**How to view rate limit info:**

1. After each request, check the **Headers** tab
2. Look for **X-RateLimit-*** headers:
   - `X-RateLimit-Limit: 1` - Maximum requests allowed
   - `X-RateLimit-Remaining: 0` - Requests left in current window
   - `X-RateLimit-Reset: [timestamp]` - When limit resets

**Response body shows:**
```json
{
  "message": "Success! This endpoint allows only 1 request per minute.",
  "timestamp": "2025-10-27T05:10:47.297Z",
  "note": "Try hitting this endpoint again immediately - you will be rate limited"
}
```

**After rate limit:**
```
Rate limit exceeded: Only 1 request per minute allowed for this endpoint.
```

### Request 3: Test Standard Rate Limiting (100 req/12hr)

**What it tests:** Default API rate limiting for all /api routes

**Steps:**

1. Click **"Test Standard Rate Limit"**
2. Click **Send**
3. Check the **Headers** tab

**Rate limit headers:**
- `X-RateLimit-Limit: 100` - Maximum requests per 12 hours
- `X-RateLimit-Remaining: 99` - Requests left (decrements each time)
- `X-RateLimit-Reset: [timestamp]` - Unix timestamp of reset time

**Watch it decrement:**
- Send the request multiple times
- Watch `X-RateLimit-Remaining` decrease: 99 → 98 → 97...

---

## Understanding the Tests

### Automated Test Scripts

Each request includes automated tests that check:
- ✅ Response status codes (200, 429, etc.)
- ✅ Security headers are present
- ✅ Rate limit headers exist and are valid
- ✅ Response body contains expected messages

**To view test code:**
1. Click any request
2. Click the **Tests** tab
3. See JavaScript assertions

**Example test:**
```javascript
pm.test('X-Content-Type-Options prevents MIME sniffing', function() {
    pm.expect(pm.response.headers.get('X-Content-Type-Options')).to.equal('nosniff');
});
```

### Postman Console for Detailed Logs

The collection logs all headers to the console for easy viewing.

**Open Postman Console:**
1. Click **View** menu → **Show Postman Console**
2. Keep it open while running requests
3. See detailed output like:

```
=== HELMET SECURITY HEADERS ===
X-DNS-Prefetch-Control: off
X-Frame-Options: SAMEORIGIN
X-Content-Type-Options: nosniff
X-Download-Options: noopen
Referrer-Policy: no-referrer
Strict-Transport-Security: max-age=31536000; includeSubDomains
Content-Security-Policy: default-src 'self';base-uri 'self'...
================================
```

---

## What You're Learning

**1. Helmet Security Headers**
- Helmet automatically adds 12+ security headers
- Protects against common attacks (XSS, clickjacking, MIME-sniffing)
- Production-ready security with one line of code: `app.use(helmet())`

**2. Rate Limiting**
- Prevents brute force attacks and API abuse
- Different limits for different endpoint types:
  - Standard: 100 req/12hr for general API
  - Auth: 3 req/15min for login attempts
  - Strict: 1 req/min for sensitive operations

**3. Observable Security**
- Headers tab shows all security headers
- Rate limit headers show real-time quota
- Test results validate security is working

---

## Testing Tips

**View Headers:** Always check the **Headers** tab after sending a request

**View Tests:** Click **Test Results** tab to see assertions passed/failed

**Console Logs:** Use Postman Console for detailed header information

**Reset Rate Limits:** Restart the server to reset all rate limit counters

**Run All Tests:** Click **Run** on the collection to execute everything at once

---

## Troubleshooting

**Port 3000 in use:**
```bash
PORT=3001 npm start
```
Then update Postman's `baseUrl` variable: Click collection → Variables → Change to `http://localhost:3001`

**Rate limit not resetting:** Restart the server

**Headers not showing:** Make sure you're looking at the **Headers** tab, not the Body tab

---

## What's Configured

The server demonstrates three rate limiters:

| Endpoint | Window | Max Requests | Purpose |
|----------|--------|--------------|---------|
| /api/* | 12 hours | 100 | General API protection |
| /api/auth/* | 15 minutes | 3 | Login attempt protection |
| /api/strict-limit | 1 minute | 1 | Sensitive operations |

All configured in `server.js` using Helmet and express-rate-limit middleware.
