import { motion } from "motion/react";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import SectionTitle from "@/components/common/SectionTitle";
import { useLang } from "@/context/LanguageContext";

const VIEWPORT = { once: false, amount: 0.2 };

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

export default function DealerFAQ() {
  const { t, lang } = useLang();
  const mr = lang === "mr" ? "font-marathi" : "";
  const faqs = t("dealer", "faqs");
  const faqItems = Array.isArray(faqs) ? faqs : [];

  return (
    <section id="faq" className="mx-auto w-full max-w-6xl scroll-mt-28 px-5 py-16 sm:px-6 sm:py-20">
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={VIEWPORT}
      >
        <SectionTitle
          title={t("dealer", "faqTitle")}
          subtitle={t("dealer", "faqSub")}
          align="center"
          className={`mb-12 ${mr}`}
        />
      </motion.div>

      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={VIEWPORT}
        className="mx-auto max-w-3xl"
      >
        <Accordion type="single" collapsible className="space-y-3">
          {faqItems.map((item, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="rounded-2xl border border-gray-100 bg-white px-6 shadow-soft transition-all duration-300 ease-out hover:shadow-glass data-[state=open]:shadow-glass"
            >
              <AccordionTrigger className={`py-5 text-left text-[15px] font-semibold text-gray-900 hover:no-underline hover:text-brand-green [&[data-state=open]>svg]:text-brand-green [&[data-state=open]]:text-brand-green ${mr}`}>
                {item.question}
              </AccordionTrigger>
              <AccordionContent className={`pb-5 text-sm leading-relaxed text-gray-500 ${mr}`}>
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </motion.div>
    </section>
  );
}
