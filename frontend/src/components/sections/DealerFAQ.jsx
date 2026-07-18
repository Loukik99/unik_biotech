import { motion } from "motion/react";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import SectionTitle from "@/components/common/SectionTitle";

const VIEWPORT = { once: false, amount: 0.2 };

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

const FAQ_ITEMS = [
  {
    question: "Who can become an authorized UNIK BIOTECH dealer?",
    answer:
      "Agricultural retailers, distributors, agri-input businesses and entrepreneurs involved in the agriculture sector can apply to become an authorized dealer.",
  },
  {
    question: "How long does the approval process take?",
    answer:
      "Our team reviews dealer applications after submission and contacts eligible applicants once the verification process is complete.",
  },
  {
    question: "Do I need previous experience in agricultural products?",
    answer:
      "Previous experience is beneficial but not mandatory. Our team provides guidance to help new dealers understand our products and processes.",
  },
  {
    question: "What support does UNIK BIOTECH provide to dealers?",
    answer:
      "Dealers receive product information, technical guidance, promotional support and assistance from our sales team.",
  },
  {
    question: "Can I apply from any state in India?",
    answer:
      "Yes. We welcome dealer applications from different regions across India, subject to our dealer network requirements.",
  },
  {
    question: "How do I locate my nearest dealer?",
    answer:
      "Use the Dealer Locator above to search by dealer name, city, district or state.",
  },
];

export default function DealerFAQ() {
  return (
    <section id="faq" className="mx-auto w-full max-w-6xl scroll-mt-28 px-5 py-16 sm:px-6 sm:py-20">
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={VIEWPORT}
      >
        <SectionTitle
          title="Frequently Asked Questions"
          subtitle="Find answers to common questions about becoming an authorized UNIK BIOTECH dealer and using our Dealer Locator."
          align="center"
          className="mb-12"
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
          {FAQ_ITEMS.map((item, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="rounded-2xl border border-gray-100 bg-white px-6 shadow-soft transition-all duration-300 ease-out hover:shadow-glass data-[state=open]:shadow-glass"
            >
              <AccordionTrigger className="py-5 text-left text-[15px] font-semibold text-gray-900 hover:no-underline hover:text-brand-green [&[data-state=open]>svg]:text-brand-green [&[data-state=open]]:text-brand-green">
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="pb-5 text-sm leading-relaxed text-gray-500">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </motion.div>
    </section>
  );
}