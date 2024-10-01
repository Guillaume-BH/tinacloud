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
    <Section hasBgColor={false}>
      <Container
        className={`prose prose-lg`}
        data-tina-field={tinaField(data, "body")}
        size="large"
        width="medium"
      >
        <TinaMarkdown content={data.body} />
        {data.imageContent && data.imageContent.map(imageContent => 
              {return imageContent.imageContentSrc && <div
                data-tina-field={tinaField(imageContent, "imageContentSrc")}
                className="flex flex-wrap gap-4"
              >
                <Image
                  className="w-full h-auto max-w-full rounded-lg"
                  style={{ objectFit: "cover" }}
                  alt={imageContent.imageContentAlt}
                  src={imageContent.imageContentSrc}
                  width={500}
                  height={500}
                />
              </div>}
            )}
      </Container>
    </Section>
  );
};

export const contentBlockSchema: Template = {
  name: "content",
  label: "Contenu",
  ui: {
    previewSrc: "/blocks/content.png",
    defaultItem: {
      body: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros. Nullam malesuada erat ut turpis. Suspendisse urna nibh, viverra non, semper suscipit, posuere a, pede.",
    },
  },
  fields: [
    {
      type: "rich-text",
      label: "Texte",
      name: "body",
    },
    {
      type: "object",
      label: "Image",
      list: true,
      name: "imageContent",
      fields: [
        {
          name: "imageContentSrc",
          label: "Source de l'image",
          type: "image",
        },
        {
          name: "imageContentAlt",
          label: "Texte alternatif (description de l'image)",
          type: "string",
        },
      ],
    },
  ],
};
