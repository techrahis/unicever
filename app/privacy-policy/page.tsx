import NavBar from "@/app/_components/navbar";

export default function PrivacyPolicy() {
  return (
    <main>
      <NavBar />
      <section className="flex min-h-screen flex-col justify-between p-24 space-y-6 pt-32">
        <p className="text-sm">Last Updated: Thursday 2 May 2024</p>
        <p>
          Welcome to UNICEVER, a platform committed to safeguarding your privacy
          while providing reliable certificate authentication and verification
          services. This Privacy Policy outlines how we collect, utilize, and
          protect your personal information as you engage with our platform. We
          encourage you to carefully review this document to understand our
          practices regarding your privacy.
        </p>

        <div className="space-y-4">
          <h2 className="text-xl md:text-2xl font-medium">
            1. Information Collection
          </h2>
          <p>
            At UNICEVER, we collect limited data to enhance your experience and
            improve our platform&apos;s functionality. This may include:
          </p>
          <ul>
            <li>
              Information provided voluntarily during account registration or
              certificate issuance.
            </li>
            <li>
              Data gathered through analytics tools to understand user
              interactions and optimize our services.
            </li>
          </ul>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl md:text-2xl font-medium">
            2. Use of Your Information
          </h2>
          <p>
            Your information is solely utilized to facilitate certificate
            authentication and verification processes. We do not sell, rent, or
            share your personal data with third parties, ensuring your privacy
            remains intact.
          </p>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl md:text-2xl font-medium">
            3. Cookies and Tracking
          </h2>
          <p>
            We may use cookies and tracking technologies to enhance your
            browsing experience on our website. These tools help us personalize
            content and provide relevant services. You have the option to manage
            your cookie preferences in your browser settings; however, disabling
            cookies may affect certain features of our platform.
          </p>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl md:text-2xl font-medium">4. Data Security</h2>
          <p>
            UNICEVER employs robust security measures to protect your data from
            unauthorized access, misuse, or alteration. While we strive to
            maintain the highest standards of security, it&apos;s important to
            acknowledge that no method of transmission over the internet is
            entirely foolproof.
          </p>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl md:text-2xl font-medium">
            5. Third-Party Links
          </h2>
          <p>
            Our platform may contain links to third-party websites or services
            for additional resources or information. We do not control the
            content or privacy practices of these external sites. We advise
            users to review the privacy policies of third-party platforms before
            disclosing any personal information.
          </p>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl md:text-2xl font-medium">
            6. Children&apos;s Privacy
          </h2>
          <p>
            UNICEVER does not knowingly collect personal information from
            individuals under the age of 13. If you believe that a child has
            provided us with their data without parental consent, please contact
            us immediately for appropriate action.
          </p>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl md:text-2xl font-medium">
            7. Changes to This Policy
          </h2>
          <p>
            We reserve the right to update or modify this Privacy Policy at any
            time. Any revisions will be effective immediately upon posting on
            our website. We encourage you to check this page regularly for the
            latest updates.
          </p>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl md:text-2xl font-medium">8. Contact Us</h2>
          <p>
            If you have any questions, concerns, or feedback regarding our
            Privacy Policy or the handling of your personal information, please
            don&apos;t hesitate to contact us at
            <a
              className="text-blue-500 font-semibold"
              href="unicever2024@gmail.com"
            >
              unicever2024@gmail.com
            </a>
            .
          </p>
        </div>

        <p>
          By using UNICEVER, you signify your acceptance of this Privacy Policy.
          If you do not agree with any aspect of this policy, please refrain
          from using our services. Your trust and privacy are of utmost
          importance to us.
        </p>
      </section>
    </main>
  );
}
