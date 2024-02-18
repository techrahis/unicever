import Link from "next/link";
async function Dashboard() {
  return (
    <main>
      <ol className="space-y-10">
        <li>
          1. Fill the details of your organization{" "}
          <Link
            className="font-bold text-primary underline"
            href="/app/organization"
          >
            Organization Form
          </Link>
        </li>
        <li>
          2. Apply for verification. Usually it takes 24hrs to complete the
          verification.
        </li>
        <li>
          3. Once verified, you can start creating new events.{" "}
          <Link className="font-bold text-primary underline" href="app/event">
            Create Event
          </Link>
        </li>
        <li>
          4. Create new event and wait till the event certification gets live.
          Usually this step takes 2hr to complete.
        </li>
      </ol>
    </main>
  );
}

export default Dashboard;
