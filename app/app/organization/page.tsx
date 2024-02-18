export default function OrganizationPage() {
  return (
    <section>
      <h1>Organization Page</h1>
      <form>
        <label>
          Name
          <input type="text" />
        </label>
        <label>
          Email
          <input type="email" />
        </label>
        <label>
          Phone
          <input type="tel" />
        </label>
        <button type="submit">Submit</button>
      </form>
    </section>
  );
}
