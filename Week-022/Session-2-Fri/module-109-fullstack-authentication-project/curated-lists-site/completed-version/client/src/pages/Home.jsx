function Home() {
  return (
    <div className="text-center">
      <h1>Welcome to Curated Lists</h1>
      <p className="mt-2 mb-4">
        Discover and share amazing curated lists of websites across different categories.
      </p>

      <div className="card" style={{ maxWidth: '600px', margin: '0 auto' }}>
        <h2>Get Started</h2>
        <p>
          Register for an account to access our full collection of curated website lists.
          Admins can create and manage lists to share with the community.
        </p>
      </div>
    </div>
  );
}

export default Home;
