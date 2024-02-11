import PrivateRoute from "@/components/shared/private-route";

async function Dashboard() {
  return (
    <div>
      <h1 className="text-accent">Dashboard content</h1>
      <p>This is the dashboard page</p>
    </div>
  );
}

export default PrivateRoute(Dashboard);
