import SEO from "@/components/SEO";
import Section from "@/components/common/Section";
import SectionTitle from "@/components/common/SectionTitle";
import { useLang } from "@/context/LanguageContext";
import { cn } from "@/lib/utils";

const SECTIONS = [
  {
    id: "introduction",
    title: "Introduction",
    paragraphs: [
      "This Privacy Policy describes how we may collect, use, and handle personal information when you visit our website, contact us, or interact with our services. We encourage you to read this page to understand our general practices regarding personal data.",
      "By using our website or providing information to us, you acknowledge that your personal information may be processed as described in this policy. If you do not agree with these practices, you may choose not to use our website or submit personal information through our forms.",
      "This policy applies to information collected through our website and related online channels. It does not cover information collected offline or through third-party websites that may link to or from our site.",
    ],
  },
  {
    id: "information-we-collect",
    title: "Information We Collect",
    paragraphs: [
      "We may collect information that you voluntarily provide when you fill out contact forms, request information, subscribe to updates, or otherwise communicate with us. This may include your name, email address, phone number, company name, and the content of your message.",
      "When you visit our website, we may automatically collect certain technical information such as your browser type, device type, operating system, IP address, referring URLs, and general usage data about how you interact with our pages.",
      "We may also receive information from third-party service providers that help us operate our website, such as analytics or hosting services. The types of information collected depend on the services used and your browser settings.",
      "We do not intentionally collect sensitive personal information unless you choose to include it in a message or form submission. Please avoid sending information you do not wish to share through our website.",
    ],
  },
  {
    id: "how-we-use-your-information",
    title: "How We Use Your Information",
    paragraphs: [
      "We may use the information we collect to respond to your inquiries, provide requested information, and communicate with you about our products, services, or updates where appropriate.",
      "Technical and usage information may be used to maintain and improve our website, understand visitor preferences, monitor performance, and help us develop content that is relevant to our audience.",
      "We may also use collected information for internal business purposes, such as record keeping, quality review, and general administration of our online presence.",
      "We generally process information based on your interaction with our website, our legitimate business interests in operating and improving our services, and, where applicable, your consent.",
    ],
  },
  {
    id: "cookies-and-tracking",
    title: "Cookies and Tracking Technologies",
    paragraphs: [
      "Our website may use cookies and similar technologies to remember preferences, support basic site functionality, and collect information about how visitors use our pages.",
      "Cookies are small text files stored on your device by your browser. They may be session cookies, which expire when you close your browser, or persistent cookies, which remain until they expire or are deleted.",
      "You can usually manage or disable cookies through your browser settings. Please note that restricting cookies may affect certain features or the overall experience of our website.",
      "Where we use analytics or similar tools, those services may collect aggregated or device-level information to help us understand traffic patterns and site usage. Their use is subject to their own policies.",
    ],
  },
  {
    id: "data-sharing",
    title: "Data Sharing and Third-Party Services",
    paragraphs: [
      "We do not sell personal information. We may share information with trusted service providers who assist us in operating our website, hosting content, delivering communications, or analyzing site performance.",
      "These providers may process information on our behalf and are generally expected to use it only for the services they perform for us. We may also share information when required by applicable law, regulation, legal process, or governmental request.",
      "Our website may contain links to external websites or services that are not operated by us. We are not responsible for the privacy practices of those third parties, and we encourage you to review their policies before providing personal information.",
      "In the event of a business transition, such as a merger, acquisition, or restructuring, personal information may be transferred as part of that transaction, subject to applicable requirements.",
    ],
  },
  {
    id: "data-security",
    title: "Data Security",
    paragraphs: [
      "We take reasonable administrative, technical, and organizational measures designed to protect personal information from unauthorized access, disclosure, alteration, or loss.",
      "However, no method of transmission over the internet or method of electronic storage is completely secure. While we work to safeguard information, we cannot ensure absolute security of data transmitted to or stored by us.",
      "You are responsible for maintaining the confidentiality of any credentials or access details associated with your use of our services, where applicable.",
      "If you believe your interaction with us is no longer secure, please contact us using the details provided below so we can review the matter.",
    ],
  },
  {
    id: "your-rights",
    title: "Your Rights",
    paragraphs: [
      "Depending on your location and applicable law, you may have certain choices regarding the personal information we hold about you. These may include the ability to request access, correction, or deletion of your information.",
      "You may also be able to opt out of receiving marketing communications from us by following the unsubscribe instructions in those messages or by contacting us directly.",
      "To submit a request related to your personal information, please use the contact details provided in this policy. We may need to verify your identity before responding to certain requests.",
      "We will consider and respond to requests in accordance with applicable legal requirements and our internal procedures.",
    ],
  },
  {
    id: "policy-changes",
    title: "Changes to This Privacy Policy",
    paragraphs: [
      "We may update this Privacy Policy from time to time to reflect changes in our practices, services, or operational needs. When we make changes, we will revise the effective date or post an updated version on this page.",
      "We encourage you to review this policy periodically to stay informed about how we may handle personal information. Continued use of our website after changes are posted may indicate your acknowledgment of the updated policy.",
      "If we make material changes that significantly affect how personal information is handled, we may provide additional notice where appropriate.",
    ],
  },
  {
    id: "contact-us",
    title: "Contact Us",
    paragraphs: [
      "If you have questions about this Privacy Policy or how we handle personal information, please contact us using the contact options available on our website.",
      "When reaching out, please include enough detail for us to understand and respond to your inquiry. We aim to review and address reasonable requests in a timely manner.",
      "For general business inquiries, you may also use the contact information listed on our website. We appreciate your interest in our privacy practices and welcome your feedback.",
    ],
  },
];

export default function PrivacyPolicy() {
  const { lang } = useLang();

  return (
    <div className="page-enter min-h-screen bg-brand-bgLight pt-24 pb-16">
      <SEO
        title="Privacy Policy"
        description="Privacy Policy for Unik Biotech Research."
        url="https://unikbiotechresearch.com/privacy-policy"
        lang={lang}
        breadcrumbs={[
          { name: "Home", url: "https://unikbiotechresearch.com/" },
          { name: "Privacy Policy", url: "https://unikbiotechresearch.com/privacy-policy" },
        ]}
      />

      <Section tone="light" spacing="base">
        <SectionTitle
          title="Privacy Policy"
          as="h1"
          subtitle="This page describes how we may collect, use, and protect personal information when you visit our website or interact with us online."
        />

        <div className="mt-12 grid gap-10 lg:grid-cols-[minmax(0,16rem)_1fr] lg:gap-16">
          <nav
            aria-label="Privacy Policy sections"
            className="lg:sticky lg:top-28 lg:self-start"
          >
            <div className="rounded-2xl border border-black/[0.06] bg-white p-5 shadow-soft">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-green">
                On this page
              </p>
              <ol className="mt-4 space-y-2">
                {SECTIONS.map(({ id, title }, index) => (
                  <li key={id}>
                    <a
                      href={`#${id}`}
                      className="group flex gap-2 text-sm leading-snug text-brand-muted transition-colors hover:text-brand-green"
                    >
                      <span className="mt-0.5 shrink-0 font-medium tabular-nums text-brand-green/70">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span className="group-hover:underline group-hover:underline-offset-2">{title}</span>
                    </a>
                  </li>
                ))}
              </ol>
            </div>
          </nav>

          <article className="min-w-0">
            <div className="rounded-2xl border border-black/[0.06] bg-white shadow-soft">
              {SECTIONS.map(({ id, title, paragraphs }, index) => (
                <section
                  key={id}
                  id={id}
                  className={cn(
                    "scroll-mt-28 px-6 py-8 sm:px-8 sm:py-10",
                    index > 0 && "border-t border-black/[0.06]"
                  )}
                >
                  <h2 className="text-xl font-bold text-brand-ink sm:text-2xl">{title}</h2>
                  <div className="mt-4 max-w-3xl space-y-4">
                    {paragraphs.map((paragraph) => (
                      <p key={paragraph.slice(0, 40)} className="text-base leading-relaxed text-brand-muted">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </section>
              ))}
            </div>
          </article>
        </div>
      </Section>
    </div>
  );
}
