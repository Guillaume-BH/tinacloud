"use client";
import React from "react";

import { TinaMarkdown } from "tinacms/dist/rich-text";
import type { Template } from "tinacms";
import { PageBlocksContent } from "../../tina/__generated__/types";
import { tinaField } from "tinacms/dist/react";
import { Container } from "../layout/container";
import { Section } from "../layout/section";
import Image from "next/image";

export const Content = ({ data }: { data: PageBlocksContent }) => {
  return (
    <Section color={data.color}>
      <Container
        className={`prose prose-lg ${
          data.color === "primary" ? `prose-primary` : `dark:prose-dark`
        }`}
        data-tina-field={tinaField(data, "body")}
        size="large"
        width="medium"
      >
        <TinaMarkdown content={data.body} />
        {data.image && (
              <div
                data-tina-field={tinaField(data.image, "src")}
                className="relative flex-shrink-0 md:w-2/5 flex justify-center"
              >
                <Image
                  className="w-full h-auto max-w-full rounded-lg"
                  style={{ objectFit: "cover" }}
                  alt={data.image.alt}
                  src={data.image.src}
                  width={500}
                  height={500}
                />
              </div>
            )}
      </Container>
    </Section>
  );
};

export const contentBlockSchema: Template = {
  name: "content",
  label: "Content",
  ui: {
    previewSrc: "/blocks/content.png",
    defaultItem: {
      body: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros. Nullam malesuada erat ut turpis. Suspendisse urna nibh, viverra non, semper suscipit, posuere a, pede.",
    },
  },
  fields: [
    {
      type: "rich-text",
      label: "Body",
      name: "body",
    },
    {
      type: "string",
      label: "Color",
      name: "color",
      options: [
        { label: "Default", value: "default" },
        { label: "Tint", value: "tint" },
        { label: "Primary", value: "primary" },
      ],
    },
    {
      type: "object",
      label: "Image",
      name: "imageContent",
      fields: [
        {
          name: "imageContentSrc",
          label: "Image Source",
          type: "image",
        },
        {
          name: "imageContentAlt",
          label: "Alt Text",
          type: "string",
        },
      ],
    },
  ],
};
