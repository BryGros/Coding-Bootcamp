import { Link } from 'react-router-dom';

function Unauthorized() {
  return (
    <div className="text-center">
      <h1>Access Denied</h1>
      <p className="mt-2 mb-4">
        You do not have permission to access this page.
      </p>

      <div className="card" style={{ maxWidth: '600px', margin: '0 auto' }}>
        <h2>Admin Access Required</h2>
        <p className="mb-3">
          This page is restricted to users with administrator privileges.
          If you believe you should have access, please contact support.
        </p>
        <Link to="/dashboard" className="btn btn-primary">
          Return to Dashboard
        </Link>
      </div>
    </div>
  );
}

export default Unauthorized;
