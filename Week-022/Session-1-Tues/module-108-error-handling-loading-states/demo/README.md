# Error Handling & Loading States Demo

A comprehensive demonstration of handling async operations in React with loading states, error handling, and user feedback patterns.

## What This Demo Shows

- Three-state pattern (loading, error, success)
- Reusable LoadingSpinner and ErrorMessage components
- Inline loading indicators vs full-page loading
- Form submission with loading and validation feedback
- Different error types (4xx, 5xx, network, timeout)
- Skeleton loading UI
- Retry logic for failed requests
- User-friendly error messages

## Quick Start

### 1. Install Dependencies

**Backend:**
```bash
cd server
npm install
```

**Frontend:**
```bash
cd client
npm install
```

### 2. Start the Backend

```bash
cd server
npm start
```

Server runs on http://localhost:3001

**Available test endpoints:**
- /api/fast - 500ms delay, always succeeds
- /api/slow - 3s delay, always succeeds
- /api/users - 1.5s delay, returns user list
- /api/posts - 1.2s delay, returns posts
- /api/random - Randomly succeeds or fails (50%)
- /api/error - Always returns 500 error
- /api/notfound - Always returns 404 error
- /api/timeout - Never responds (simulates timeout)

### 3. Start the Frontend (new terminal)

```bash
cd client
npm run dev
```

Frontend runs on http://localhost:5173

### 4. Explore the Examples

Visit http://localhost:5173 and click through the tabs:

1. **Basic Pattern** - See the fundamental three-state pattern
2. **Inline Loading** - Loading indicators alongside content
3. **Form Submission** - Handle form errors and success feedback
4. **Error Types** - Test different error scenarios

## How to Inspect Each Pattern

### Tab 1: Basic Three-State Pattern

**File:** client/src/examples/BasicExample.jsx

**What it demonstrates:**
- useState for data, loading, and error
- useEffect to fetch on mount
- try/catch/finally for error handling
- Conditional rendering based on state

**Test it:**
1. Watch the loading spinner appear
2. See user cards load after 1.5 seconds
3. Click "Refresh Data" to see loading again

**Open DevTools > Network:**
- See GET request to /api/users
- Watch 1.5s delay before response
- Check the response data

### Tab 2: Inline Loading Pattern

**File:** client/src/examples/InlineLoadingExample.jsx

**What it demonstrates:**
- Skeleton UI while loading
- Button disabled state during loading
- Inline error messages (not replacing entire content)
- Loading indicator in button text

**Test it:**
1. Notice skeleton loading animation
2. Click "Refresh Posts" - button shows "Loading..."
3. Button is disabled while loading
4. Content doesn't disappear during refresh

**Why this pattern:**
- Better UX - users see context while loading
- Useful for refreshing existing data
- Less jarring than full-page loaders

### Tab 3: Form Submission

**File:** client/src/examples/FormSubmissionExample.jsx

**What it demonstrates:**
- Loading state during submission
- Input validation errors
- Success messages with auto-dismiss
- Error clearing when user types

**Test these scenarios:**
1. **Short name:** Type "A" → Submit → See validation error
2. **Invalid email:** Type "test" → Submit → See validation error
3. **Duplicate email:** Type "alice@example.com" → Submit → See conflict error
4. **Success:** Type valid data → Submit → See success message

**Watch the UX:**
- Inputs disabled while submitting
- Button shows spinner and "Creating..."
- Error clears when you start typing
- Success message auto-hides after 3 seconds

### Tab 4: Error Types

**File:** client/src/examples/ErrorTypesExample.jsx

**What it demonstrates:**
- Handling different HTTP status codes
- Network errors vs server errors
- Timeout handling
- User-friendly error messages

**Test each button:**

1. **Success (fast)** - 500ms, always works
2. **Success (slow)** - 3s delay, test patience!
3. **Random (50% fail)** - Click multiple times, see it succeed and fail
4. **500 Server Error** - See server error message
5. **404 Not Found** - See not found error
6. **Timeout (10s)** - Wait for timeout error (axios configured with 10s timeout)

**Open DevTools > Network:**
- Watch different status codes (200, 404, 500)
- See timeout requests get cancelled

## Reusable Components

### LoadingSpinner

**File:** client/src/components/LoadingSpinner.jsx

```javascript
<LoadingSpinner message="Loading users..." />
```

**Features:**
- Spinning animation
- Customizable message
- Centered layout
- Reusable across entire app

### ErrorMessage

**File:** client/src/components/ErrorMessage.jsx

```javascript
<ErrorMessage
  error="Failed to load data"
  onRetry={fetchData}
/>
```

**Features:**
- Error icon
- Clear message
- Optional retry button
- Consistent styling

## Architecture

### The Three-State Pattern

Every async operation needs:

```javascript
const [data, setData] = useState([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);

// 1. Start loading
setLoading(true);
setError(null);

try {
  // 2. Fetch data
  const response = await api.get('/endpoint');
  setData(response.data);
} catch (err) {
  // 3. Handle error
  setError(err.message);
} finally {
  // 4. Stop loading (always runs)
  setLoading(false);
}
```

### Error Object Structure

```javascript
// Network error (no response)
{
  code: 'ERR_NETWORK',
  message: 'Network Error',
  request: {...}
}

// Timeout error
{
  code: 'ECONNABORTED',
  message: 'timeout of 10000ms exceeded'
}

// Server error (has response)
{
  response: {
    status: 500,
    data: { message: 'Internal server error' }
  }
}
```

## Common Patterns

### Pattern 1: Full Page Loading

Use when: Initial data load, nothing to show while loading

```javascript
if (loading) return <LoadingSpinner />;
if (error) return <ErrorMessage error={error} onRetry={refetch} />;
return <DataDisplay data={data} />;
```

### Pattern 2: Inline Loading

Use when: Refreshing existing data, partial page updates

```javascript
return (
  <div>
    <button disabled={loading}>
      {loading ? 'Loading...' : 'Refresh'}
    </button>
    {error && <ErrorInline error={error} />}
    {data.length > 0 && <DataDisplay data={data} />}
  </div>
);
```

### Pattern 3: Skeleton Loading

Use when: Known layout structure, better perceived performance

```javascript
{loading && data.length === 0 ? (
  <SkeletonList count={3} />
) : (
  <DataList data={data} />
)}
```

## Testing Scenarios

### Scenario 1: Fast network
- Click Success (fast)
- Loading appears briefly (500ms)
- Data loads smoothly

### Scenario 2: Slow network
- Click Success (slow)
- Loading shows for 3 seconds
- Users aren't confused - they see loading state

### Scenario 3: Network failure
- Disconnect internet
- Click any button
- See network error message
- Reconnect and click "Try Again"

### Scenario 4: Server error
- Click "500 Server Error"
- See clear error message
- No app crash!

### Scenario 5: Form validation
- Submit form with invalid data
- See validation errors
- Start typing - errors clear
- Fix issues and resubmit

## Best Practices Demonstrated

1. **Always use try/catch/finally** - Never let errors crash the app
2. **Clear, specific error messages** - "Failed to load users" not "Error"
3. **Disable inputs during loading** - Prevent duplicate submissions
4. **Provide retry functionality** - Let users fix transient errors
5. **Clear previous errors** - When user takes action, reset error state
6. **Show progress indicators** - Loading states, button spinners
7. **Timeout long requests** - Don't let users wait forever
8. **Auto-dismiss success messages** - Don't require user action for success

## Common Modifications

**Add toast notifications:**
1. Install react-toastify or build custom toast
2. Show toasts for success/error instead of inline messages
3. Non-blocking, auto-dismiss notifications

**Add global error boundary:**
1. Create ErrorBoundary component
2. Wrap app with error boundary
3. Catch React errors, not just async errors

**Add retry with backoff:**
1. Track retry count in state
2. Exponentially increase delay between retries
3. Max retries before giving up

**Add offline detection:**
1. Listen to window.online/offline events
2. Show offline banner
3. Queue requests for when back online

## Troubleshooting

**Timeout errors happening too fast:** Increase timeout in client/src/api/axios.js (currently 10s)

**Skeleton loading never shows:** Data loading too fast, increase backend delay for testing

**Success message doesn't auto-hide:** Check setTimeout in FormSubmissionExample (3000ms)

**Random endpoint always fails:** Just bad luck! Try clicking multiple times

**Styles not loading:** Make sure CSS files are imported in components
