import SEO from "@/components/SEO";
import Section from "@/components/common/Section";
import SectionTitle from "@/components/common/SectionTitle";
import { useLang } from "@/context/LanguageContext";
import { cn } from "@/lib/utils";

export default function PrivacyPolicy() {
  const { t, tArr, lang } = useLang();
  const mr = lang === "mr" ? "font-marathi" : "";
  const sections = tArr("privacyPolicy", "sections");

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
          title={t("privacyPolicy", "title")}
          as="h1"
          subtitle={t("privacyPolicy", "subtitle")}
          titleClassName={mr}
        />

        <div className="mt-12 grid gap-10 lg:grid-cols-[minmax(0,16rem)_1fr] lg:gap-16">
          <nav
            aria-label="Privacy Policy sections"
            className="lg:sticky lg:top-28 lg:self-start"
          >
            <div className="rounded-2xl border border-black/[0.06] bg-white p-5 shadow-soft">
              <p className={cn("text-xs font-semibold uppercase tracking-[0.18em] text-brand-green", mr)}>
                {t("privacyPolicy", "onThisPage")}
              </p>
              <ol className="mt-4 space-y-2">
                {sections.map(({ id, title }, index) => (
                  <li key={id}>
                    <a
                      href={`#${id}`}
                      className="group flex gap-2 text-sm leading-snug text-brand-muted transition-colors hover:text-brand-green"
                    >
                      <span className="mt-0.5 shrink-0 font-medium tabular-nums text-brand-green/70">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span className={cn("group-hover:underline group-hover:underline-offset-2", mr)}>{title}</span>
                    </a>
                  </li>
                ))}
              </ol>
            </div>
          </nav>

          <article className="min-w-0">
            <div className="rounded-2xl border border-black/[0.06] bg-white shadow-soft">
              {sections.map(({ id, title, paragraphs = [] }, index) => (
                <section
                  key={id}
                  id={id}
                  className={cn(
                    "scroll-mt-28 px-6 py-8 sm:px-8 sm:py-10",
                    index > 0 && "border-t border-black/[0.06]"
                  )}
                >
                  <h2 className={cn("text-xl font-bold text-brand-ink sm:text-2xl", mr)}>{title}</h2>
                  <div className="mt-4 max-w-3xl space-y-4">
                    {paragraphs.map((paragraph, paragraphIndex) => (
                      <p key={paragraphIndex} className={cn("text-base leading-relaxed text-brand-muted", mr)}>
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
