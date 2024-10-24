"use client";
import * as React from "react";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import type { Template } from "tinacms";
import { PageBlocksHero } from "../../tina/__generated__/types";
import { tinaField } from "tinacms/dist/react";
import Image from "next/image";
import { Section } from "../layout/section";
import { Container } from "../layout/container";
import { Actions } from "./actions";

export const Hero = ({ data }: { data: PageBlocksHero }) => {
  return (
    <Section hasBgColor={false}>
      <Container
        size="large"
        className="grid grid-cols-1 md:grid-cols-5 gap-14 items-start justify-center"
      >
        <div className="row-start-2 md:row-start-1 md:col-span-5 text-center md:text-left">
          {data.headline && (
            <h3
              data-tina-field={tinaField(data, "headline")}
              className={`w-full relative mb-10 text-5xl font-extrabold tracking-normal leading-tight title-font`}
            >
              <span
                className={`bg-clip-text text-transparent bg-gradient-to-r from-pink-600 to-pink-800`}
              >
                {data.headline}
              </span>
            </h3>
          )}
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex flex-col md:w-3/5">
              {data.text && (
                <div
                  data-tina-field={tinaField(data, "text")}
                  className={`prose prose-lg mx-auto md:mx-0 mb-10 ${
                    data.color === "primary"
                      ? `prose-primary`
                      : `dark:prose-dark`
                  }`}
                >
                  <TinaMarkdown content={data.text} />
                </div>
              )}
            </div>
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
          </div>
          {data.actions && (
            <div className="mt-10">
              <Actions
                className="justify-center md:justify-start py-2"
                parentColor={data.color}
                actions={data.actions}
              />
            </div>
          )}
        </div>
      </Container>
    </Section>
  );
};

export const heroBlockSchema: Template = {
  name: "hero",
  label: "Hero",
  ui: {
    previewSrc: "/blocks/hero.png",
    defaultItem: {
      tagline: "Here's some text above the other text",
      headline: "This Big Text is Totally Awesome",
      text: "Phasellus scelerisque, libero eu finibus rutrum, risus risus accumsan libero, nec molestie urna dui a leo.",
    },
  },
  fields: [
    {
      type: "string",
      label: "Titre",
      name: "headline",
    },
    {
      label: "Contenu",
      name: "text",
      type: "rich-text",
    },
    {
      label: "Actions",
      name: "actions",
      type: "object",
      list: true,
      ui: {
        defaultItem: {
          label: "Label",
          type: "button",
          icon: true,
          link: "/",
        },
        itemProps: (item) => ({ label: item.label }),
      },
      fields: [
        {
          label: "Label",
          name: "label",
          type: "string",
        },
        {
          label: "Type",
          name: "type",
          type: "string",
          options: [
            { label: "Bouton", value: "button" },
            { label: "Lien", value: "link" },
          ],
        },
        {
          label: "Icone",
          name: "icon",
          type: "boolean",
        },
        {
          label: "Lien",
          name: "link",
          type: "string",
        },
      ],
    },
    {
      type: "object",
      label: "Image",
      name: "image",
      fields: [
        {
          name: "src",
          label: "Source de l'image",
          type: "image",
        },
        {
          name: "alt",
          label: "Texte alternatif (desciption de l'image)",
          type: "string",
        },
      ],
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
  ],
};
