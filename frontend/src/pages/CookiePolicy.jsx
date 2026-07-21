import SEO from "@/components/SEO";
import Section from "@/components/common/Section";
import SectionTitle from "@/components/common/SectionTitle";
import { useLang } from "@/context/LanguageContext";
import { cn } from "@/lib/utils";

const SECTIONS = [
  {
    id: "what-are-cookies",
    title: "What Are Cookies?",
    paragraphs: [
      "Cookies are small text files that are placed on your device when you visit a website. They are widely used to make websites work more efficiently and to provide information to site owners.",
      "When you visit our website, cookies may be stored on your computer, tablet, or mobile device. These files contain information that helps the website recognize your device on subsequent visits.",
      "Cookies cannot access other information on your device or harm your computer. They are designed to improve your browsing experience by remembering your preferences and enabling certain site functionality.",
    ],
  },
  {
    id: "why-we-use-cookies",
    title: "Why We Use Cookies",
    paragraphs: [
      "We use cookies to ensure our website functions properly and to understand how visitors interact with our content. This helps us provide a better experience for everyone who uses our site.",
      "Cookies allow us to remember your settings and preferences, such as language choices or display options, so you do not have to re-enter them each time you visit.",
      "We may also use cookies to analyze site traffic and usage patterns. This information helps us improve our website design, content, and overall performance.",
      "Some cookies are essential for the website to operate, while others help us enhance your experience or support our marketing efforts. You can learn more about each category in the sections below.",
    ],
  },
  {
    id: "types-of-cookies",
    title: "Types of Cookies We Use",
    paragraphs: [
      "We may use several categories of cookies on our website. Essential cookies are required for basic site functionality, such as navigation and access to secure areas.",
      "Performance and analytics cookies help us understand how visitors use our website by collecting anonymous information about page visits, traffic sources, and user behavior.",
      "Functionality cookies allow the website to remember choices you make and provide enhanced, personalized features. Marketing cookies may be used to deliver relevant content or measure the effectiveness of our communications.",
    ],
  },
  {
    id: "managing-preferences",
    title: "Managing Your Cookie Preferences",
    paragraphs: [
      "You have choices regarding how cookies are used on our website. Most web browsers allow you to control cookies through their settings, including the ability to block or delete cookies.",
      "You can adjust your browser settings to refuse all cookies or to alert you when a cookie is being sent. Please note that disabling certain cookies may affect the functionality of our website and limit your ability to use some features.",
      "If our website offers a cookie preference tool, you can use it to customize which optional cookies you accept. Your preferences can typically be updated at any time.",
    ],
  },
  {
    id: "third-party-cookies",
    title: "Third-Party Cookies",
    paragraphs: [
      "Some cookies on our website may be set by third-party services that appear on our pages. These third parties may include analytics providers, embedded content platforms, or social media integrations.",
      "We do not control the cookies placed by third parties, and their use is governed by the respective third party's privacy and cookie policies. We encourage you to review those policies for more information.",
      "Third-party cookies may collect information about your browsing activity across different websites. This helps those services provide analytics, advertising, or other features as part of their offerings.",
    ],
  },
  {
    id: "policy-changes",
    title: "Changes to This Cookie Policy",
    paragraphs: [
      "We may update this Cookie Policy from time to time to reflect changes in our practices, technology, or business operations. When we make changes, we will revise the date at the top or bottom of this page.",
      "We encourage you to review this policy periodically to stay informed about how we use cookies. Continued use of our website after any updates constitutes your acknowledgment of the revised policy.",
      "If we make significant changes to how we use cookies, we may provide additional notice on our website or through other appropriate channels.",
    ],
  },
  {
    id: "contact-us",
    title: "Contact Us",
    paragraphs: [
      "If you have questions about this Cookie Policy or how we use cookies on our website, please contact us using the details provided on our website.",
      "We will respond to your inquiries as promptly as possible and will be happy to assist with any concerns regarding cookies or your privacy preferences.",
      "For general information about how we handle personal data, you may also refer to our Privacy Policy, which is available on our website.",
    ],
  },
];

export default function CookiePolicy() {
  const { lang } = useLang();

  return (
    <div className="page-enter min-h-screen bg-brand-bgLight pt-24 pb-16">
      <SEO
        title="Cookie Policy"
        description="Cookie Policy for Unik Biotech Research."
        url="https://unikbiotechresearch.com/cookie-policy"
        lang={lang}
        breadcrumbs={[
          { name: "Home", url: "https://unikbiotechresearch.com/" },
          { name: "Cookie Policy", url: "https://unikbiotechresearch.com/cookie-policy" },
        ]}
      />

      <Section tone="light" spacing="base">
        <SectionTitle
          title="Cookie Policy"
          as="h1"
          subtitle="This page outlines how cookies may be used on our website. Final policy content will be provided by the client."
        />

        <div className="mt-12 grid gap-10 lg:grid-cols-[minmax(0,16rem)_1fr] lg:gap-16">
          <nav
            aria-label="Cookie Policy sections"
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
                    {paragraphs.map((paragraph, paragraphIndex) => (
                      <p
                        key={paragraphIndex}
                        className="text-base leading-relaxed text-brand-muted"
                      >
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
