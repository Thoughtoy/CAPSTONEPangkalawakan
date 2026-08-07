function GraduateDashboard() {
  const user = JSON.parse(
    localStorage.getItem("user")
  );

  return (
    <div>
      <h1>Graduate Dashboard</h1>

      <p>
        Welcome, {user?.name}
      </p>
    </div>
  );
}

export default GraduateDashboard;