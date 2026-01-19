# RecruiX API Configuration

This directory contains all API integrations with granular mock/real data switching.

## Configuration

Edit `/api/config.ts` to control which endpoints use mock data vs real API calls:

```typescript
export const API_CONFIG = {
  baseUrl: 'https://api.recruix.com/v1',
  
  candidates: {
    getAll: false,       // false = REAL API, true = MOCK
    search: false,       // Real candidate search API
    getById: true,       // Mock candidate details
    updateStatus: true,  // Mock status updates
  },
  
  jobs: {
    getAll: true,        // Mock jobs listing
    getById: true,       // Mock job details
    create: true,        // Mock job creation
    // ... etc
  }
}
```

## Usage Examples

### 1. Use Real API for Search, Mock for Details

```typescript
// In config.ts
candidates: {
  getAll: false,    // ✅ Real API - get list from server
  search: false,    // ✅ Real API - search from server
  getById: true,    // 📦 Mock - details from mock data
}
```

**Why?** You've integrated the listing API but candidate details API isn't ready yet.

### 2. Gradual Migration Strategy

**Week 1:**
```typescript
candidates: {
  getAll: false,    // ✅ Integrate list first
  getById: true,    // 📦 Mock details
}
```

**Week 2:**
```typescript
candidates: {
  getAll: false,    // ✅ Already working
  getById: false,   // ✅ Now integrate details
}
```

### 3. Development Mode

```typescript
// All mock for local development
candidates: { getAll: true, getById: true, search: true }
jobs: { getAll: true, create: true, update: true }
```

### 4. Production Mode

```typescript
// All real APIs for production
candidates: { getAll: false, getById: false, search: false }
jobs: { getAll: false, create: false, update: false }
```

## Console Logging

The API layer logs each call for easy debugging:

- `📦 [MOCK]` - Using mock data
- `🌐 [API]` - Calling real API

Example console output:
```
📦 [MOCK] Fetching candidate cand-001 from mock data
🌐 [API] Fetching all candidates from real API
```

## Authentication

Real API calls automatically include authentication headers:

```typescript
headers: {
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${localStorage.getItem('auth_token')}`
}
```

Update the auth logic in each API file as needed for your backend.

## Error Handling

All API methods throw errors with descriptive messages:

```typescript
try {
  const candidates = await candidatesApi.getAll();
} catch (error) {
  console.error('Failed to load candidates:', error.message);
}
```

## API Modules

- `candidates.api.ts` - Candidate CRUD operations
- `jobs.api.ts` - Job posting and management
- `interviews.api.ts` - Interview management (TODO)
- `analytics.api.ts` - Analytics and reports (TODO)
- `communication.api.ts` - Messaging (TODO)

## Adding New Endpoints

1. Add configuration in `config.ts`:
```typescript
candidates: {
  myNewEndpoint: true,  // Start with mock
}
```

2. Implement in the API file:
```typescript
async myNewMethod() {
  if (shouldUseMock('candidates', 'myNewEndpoint')) {
    // Mock implementation
    return mockData;
  }
  // Real API implementation
  return fetchFromAPI();
}
```

3. Use in components via hooks:
```typescript
const { myNewMethod } = useCandidates();
```
