import SEO from "@/components/SEO";
import Section from "@/components/common/Section";
import SectionTitle from "@/components/common/SectionTitle";
import { useLang } from "@/context/LanguageContext";

export default function PolicyPage({ title, placeholder, path, description }) {
  const { lang } = useLang();

  return (
    <div className="page-enter min-h-screen bg-brand-bgLight pt-24 pb-16">
      <SEO
        title={title}
        description={description}
        url={`https://unikbiotechresearch.com${path}`}
        lang={lang}
        breadcrumbs={[
          { name: "Home", url: "https://unikbiotechresearch.com/" },
          { name: title, url: `https://unikbiotechresearch.com${path}` },
        ]}
      />
      <Section tone="light" spacing="base">
        <SectionTitle title={title} as="h1" />
        <p className="mt-8 max-w-3xl text-base leading-relaxed text-brand-muted">{placeholder}</p>
      </Section>
    </div>
  );
}
