import React from "react";
import type { Template } from "tinacms";
import { PageBlocksTestimonial } from "../../tina/__generated__/types";
import { tinaField } from "tinacms/dist/react";
import { Section } from "../layout/section";
import { Container } from "../layout/container";

export const Testimonial = ({ data }: { data: PageBlocksTestimonial }) => {
  return (
    <Section hasBgColor={true}>
      <Container size="large">
        <blockquote>
          <div
            className={`relative z-10 max-w-3xl mx-auto text-4xl lg:text-5xl font-bold tracking-normal text-center title-font text-white`}
          >
            <span
              className={`block opacity-15 text-8xl absolute inset-y-1/2 transform translate-y-2	-left-4 leading-4 -z-1`}
            >
              &ldquo;
            </span>
            <p
              data-tina-field={tinaField(data, `quote`)}
              className="relative opacity-95"
            >
              {data.quote}
            </p>
            <span
              className={`block opacity-15 text-8xl absolute inset-y-1/2 transform translate-y-3	-right-4 leading-4 -z-1`}
            >
              &rdquo;
            </span>
          </div>
          <div className={`my-8 flex-grow-0`}>
            <span
              className={`block mx-auto h-0.5 w-1/6 bg-gray-200 dark:bg-gray-700`}
            ></span>
          </div>
          <footer className="text-center">
            <p
              data-tina-field={tinaField(data, `author`)}
              className={`tracking-wide title-font font-bold text-lg text-white`}
            >
              {data.author}
            </p>
          </footer>
        </blockquote>
      </Container>
    </Section>
  );
};

export const testimonialBlockSchema: Template = {
  name: "testimonial",
  label: "Citation",
  ui: {
    previewSrc: "/blocks/testimonial.png",
    defaultItem: {
      quote:
        "There are only two hard things in Computer Science: cache invalidation and naming things.",
      author: "Phil Karlton"
    },
  },
  fields: [
    {
      type: "string",
      ui: {
        component: "textarea",
      },
      label: "Citation",
      name: "quote",
    },
    {
      type: "string",
      label: "Auteur",
      name: "author",
    }
  ],
};
