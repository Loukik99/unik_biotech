import React from 'react';

const SEO = ({
    title,
    description,
    keywords,
    url = "https://unikbiotechresearch.com",
    image = "https://unikbiotechresearch.com/official-logo.jpg",
    type = "website",
    schema,
    faqSchema,
    breadcrumbs,
    lang = "en",
    noindex = false,
}) => {
    const siteTitle = title
        ? `${title} | Unik Biotech Research`
        : "Unik Biotech Research | Organic Fertilizers, Biostimulants & Agricultural Inputs in India";
    const defaultDescription =
        "Unik Biotech Research is an ISO 9001:2008 certified company in Nashik, India, providing advanced organic fertilizers, biostimulants, micronutrient fertilizers, and crop protection products to farmers across India since 2005.";
    const metaDescription = description || defaultDescription;
    const defaultKeywords =
        "Unik Biotech Research, organic fertilizers India, biostimulants, micronutrient fertilizers, agricultural inputs, crop protection, soil conditioners, bio fertilizers, humic acid, fulvic acid, amino acid fertilizer, seaweed extract, Nashik agriculture, farming products India, AMINORICH, EXCESS biostimulant, AGROMIC RICH, UNISEARICH, RHYZOMAX, RHIZOSPROUT, plant growth promoter, crop yield enhancer, Maharashtra agriculture";
    const metaKeywords = keywords ? `${keywords}, ${defaultKeywords}` : defaultKeywords;

    // WebSite schema with SearchAction for sitelinks search box
    const websiteSchema = {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "name": "Unik Biotech Research",
        "alternateName": ["Unik Biotech", "UNIK BIOTECH RESEARCH"],
        "url": "https://unikbiotechresearch.com",
    };

    // Breadcrumb schema
    const breadcrumbSchema = breadcrumbs ? {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": breadcrumbs.map((crumb, index) => ({
            "@type": "ListItem",
            "position": index + 1,
            "name": crumb.name,
            "item": crumb.url,
        })),
    } : null;

    // FAQ schema
    const faqStructuredData = faqSchema ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": faqSchema.map(faq => ({
            "@type": "Question",
            "name": faq.question,
            "acceptedAnswer": {
                "@type": "Answer",
                "text": faq.answer,
            },
        })),
    } : null;

    return (
        <>
            <title>{siteTitle}</title>
            <meta name="description" content={metaDescription} />
            <meta name="keywords" content={metaKeywords} />
            {noindex && <meta name="robots" content="noindex, nofollow" />}

            {/* Open Graph / Facebook */}
            <meta property="og:type" content={type} />
            <meta property="og:url" content={url} />
            <meta property="og:title" content={siteTitle} />
            <meta property="og:description" content={metaDescription} />
            <meta property="og:image" content={image} />
            <meta property="og:site_name" content="Unik Biotech Research" />
            <meta property="og:locale" content={lang === "hi" ? "hi_IN" : lang === "mr" ? "mr_IN" : "en_IN"} />

            {/* Twitter */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:url" content={url} />
            <meta name="twitter:title" content={siteTitle} />
            <meta name="twitter:description" content={metaDescription} />
            <meta name="twitter:image" content={image} />

            {/* Canonical URL */}
            <link rel="canonical" href={url} />

            {/* Hreflang for multilingual */}
            <link rel="alternate" hreflang="en" href={url} />
            <link rel="alternate" hreflang="hi" href={url} />
            <link rel="alternate" hreflang="mr" href={url} />
            <link rel="alternate" hreflang="x-default" href={url} />

            {/* JSON-LD: WebSite Schema (on every page for sitelinks) */}
            <script type="application/ld+json">
                {JSON.stringify(websiteSchema)}
            </script>

            {/* JSON-LD: Primary Schema */}
            {schema && (
                <script type="application/ld+json">
                    {JSON.stringify(schema)}
                </script>
            )}

            {/* JSON-LD: Breadcrumb Schema */}
            {breadcrumbSchema && (
                <script type="application/ld+json">
                    {JSON.stringify(breadcrumbSchema)}
                </script>
            )}

            {/* JSON-LD: FAQ Schema */}
            {faqStructuredData && (
                <script type="application/ld+json">
                    {JSON.stringify(faqStructuredData)}
                </script>
            )}
        </>
    );
};

export default SEO;
