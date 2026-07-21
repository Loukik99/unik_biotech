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
      "These Terms and Conditions govern your access to and use of this website. By visiting or using our site, you agree to be bound by these terms and our related policies.",
      "This website is provided for general informational purposes. The content on this site may describe our business, products, services, and other topics of interest to our visitors.",
      "Please read these terms carefully before using the website. If you do not agree with any part of these terms, you should discontinue use of the site.",
    ],
  },
  {
    id: "acceptance-of-terms",
    title: "Acceptance of Terms",
    paragraphs: [
      "By accessing or using this website, you confirm that you have read, understood, and agree to these Terms and Conditions. Your continued use of the site constitutes ongoing acceptance of these terms.",
      "If you are using this website on behalf of an organization, you represent that you have the authority to bind that organization to these terms.",
      "We may update these terms from time to time. When changes are posted, your continued use of the website may indicate your acceptance of the revised terms.",
    ],
  },
  {
    id: "use-of-the-website",
    title: "Use of the Website",
    paragraphs: [
      "You may use this website for lawful purposes and in a manner consistent with these terms. You agree not to use the site in any way that could damage, disable, overburden, or impair its operation.",
      "You may not attempt to gain unauthorized access to any part of the website, related systems, or networks. You also agree not to interfere with the security or integrity of the site or its content.",
      "We reserve the right to restrict or terminate access to the website at any time, with or without notice, if we believe use of the site violates these terms or poses a risk to the site or other users.",
      "Information on this website is provided on a general basis and may be changed or updated without prior notice. We do not guarantee that the site will be available at all times or free from errors or interruptions.",
    ],
  },
  {
    id: "intellectual-property",
    title: "Intellectual Property",
    paragraphs: [
      "All content on this website, including text, graphics, logos, images, layouts, and other materials, is owned by us or used with permission and is protected by applicable intellectual property laws.",
      "You may view and download content from this website for personal, non-commercial use only, unless otherwise permitted in writing. You may not copy, reproduce, distribute, modify, or create derivative works from site content without prior authorization.",
      "Trademarks, service marks, and trade names displayed on this website may not be used without the prior written consent of the respective owner.",
      "Unauthorized use of any materials on this website may violate copyright, trademark, or other applicable laws and could result in legal action.",
    ],
  },
  {
    id: "user-responsibilities",
    title: "User Responsibilities",
    paragraphs: [
      "You are responsible for ensuring that any information you submit through this website is accurate, complete, and appropriate. You agree not to submit false, misleading, or unlawful content.",
      "If you contact us through forms, email, or other channels linked from this site, you agree to communicate respectfully and not to transmit harmful, offensive, or unauthorized material.",
      "You are responsible for maintaining the confidentiality of any account credentials or access details associated with your use of our services, where applicable.",
      "You agree to comply with all applicable laws and regulations when using this website and when interacting with us through any online channels we provide.",
    ],
  },
  {
    id: "limitation-of-liability",
    title: "Limitation of Liability",
    paragraphs: [
      "This website and its content are provided on an \"as is\" and \"as available\" basis. To the fullest extent permitted by applicable law, we disclaim all warranties, whether express or implied, regarding the site and its content.",
      "We do not warrant that the website will be uninterrupted, error-free, secure, or free from viruses or other harmful components. You use the site at your own risk.",
      "To the maximum extent permitted by applicable law, we shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from or related to your use of this website.",
      "Nothing in these terms excludes or limits liability where such exclusion or limitation is not permitted by applicable law.",
    ],
  },
  {
    id: "third-party-links",
    title: "Third-Party Links",
    paragraphs: [
      "This website may contain links to third-party websites or services that are not owned or controlled by us. These links are provided for convenience and informational purposes only.",
      "We do not endorse and are not responsible for the content, policies, practices, or availability of any third-party sites or services. Your use of third-party websites is at your own discretion and risk.",
      "We encourage you to review the terms and privacy policies of any third-party websites you visit. We are not liable for any loss or damage arising from your use of or reliance on third-party content or services.",
    ],
  },
  {
    id: "changes-to-these-terms",
    title: "Changes to These Terms",
    paragraphs: [
      "We may revise these Terms and Conditions at any time to reflect changes in our website, business practices, or legal requirements. Updated terms will be posted on this page with a revised effective date where applicable.",
      "It is your responsibility to review these terms periodically. Continued use of the website after changes are posted may constitute your acceptance of the updated terms.",
      "If we make material changes, we may provide additional notice on the website or through other reasonable means where appropriate.",
    ],
  },
  {
    id: "governing-law",
    title: "Governing Law",
    paragraphs: [
      "These Terms and Conditions shall be governed by and interpreted in accordance with applicable laws, without regard to conflict of law principles.",
      "Any dispute arising out of or relating to these terms or your use of this website shall be subject to the jurisdiction of the courts or tribunals designated by applicable law.",
      "If any provision of these terms is found to be invalid or unenforceable, the remaining provisions shall continue in full force and effect to the extent permitted by applicable law.",
    ],
  },
  {
    id: "contact-us",
    title: "Contact Us",
    paragraphs: [
      "If you have questions about these Terms and Conditions or your use of this website, please contact us using the contact options available on our website.",
      "When reaching out, please include sufficient detail so we can understand and respond to your inquiry. We aim to review and address reasonable requests in a timely manner.",
      "For general business inquiries, you may also use the contact information listed on our website. We appreciate your interest and welcome your feedback.",
    ],
  },
];

export default function TermsAndConditions() {
  const { lang } = useLang();

  return (
    <div className="page-enter min-h-screen bg-brand-bgLight pt-24 pb-16">
      <SEO
        title="Terms & Conditions"
        description="Terms and Conditions for Unik Biotech Research."
        url="https://unikbiotechresearch.com/terms-and-conditions"
        lang={lang}
        breadcrumbs={[
          { name: "Home", url: "https://unikbiotechresearch.com/" },
          { name: "Terms & Conditions", url: "https://unikbiotechresearch.com/terms-and-conditions" },
        ]}
      />

      <Section tone="light" spacing="base">
        <SectionTitle
          title="Terms & Conditions"
          as="h1"
          subtitle="These terms govern access to and use of this website. Please read them carefully before using our site."
        />

        <div className="mt-12 grid gap-10 lg:grid-cols-[minmax(0,16rem)_1fr] lg:gap-16">
          <nav
            aria-label="Terms & Conditions sections"
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
