// tina/config.tsx
import { defineConfig } from "tinacms";

// tina/collection/post.ts
var Post = {
  label: "Blog Posts",
  name: "post",
  path: "content/posts",
  format: "mdx",
  ui: {
    router: ({ document }) => {
      return `/posts/${document._sys.breadcrumbs.join("/")}`;
    }
  },
  fields: [
    {
      type: "string",
      label: "Title",
      name: "title",
      isTitle: true,
      required: true
    },
    {
      type: "image",
      name: "heroImg",
      label: "Hero Image"
    },
    {
      type: "rich-text",
      label: "Excerpt",
      name: "excerpt"
    },
    {
      type: "reference",
      label: "Author",
      name: "author",
      collections: ["author"]
    },
    {
      type: "datetime",
      label: "Posted Date",
      name: "date",
      ui: {
        dateFormat: "MMMM DD YYYY",
        timeFormat: "hh:mm A"
      }
    },
    {
      type: "rich-text",
      label: "Body",
      name: "_body",
      templates: [
        {
          name: "DateTime",
          label: "Date & Time",
          inline: true,
          fields: [
            {
              name: "format",
              label: "Format",
              type: "string",
              options: ["utc", "iso", "local"]
            }
          ]
        },
        {
          name: "BlockQuote",
          label: "Block Quote",
          fields: [
            {
              name: "children",
              label: "Quote",
              type: "rich-text"
            },
            {
              name: "authorName",
              label: "Author",
              type: "string"
            }
          ]
        },
        {
          name: "NewsletterSignup",
          label: "Newsletter Sign Up",
          fields: [
            {
              name: "children",
              label: "CTA",
              type: "rich-text"
            },
            {
              name: "placeholder",
              label: "Placeholder",
              type: "string"
            },
            {
              name: "buttonText",
              label: "Button Text",
              type: "string"
            },
            {
              name: "disclaimer",
              label: "Disclaimer",
              type: "rich-text"
            }
          ],
          ui: {
            defaultItem: {
              placeholder: "Enter your email",
              buttonText: "Notify Me"
            }
          }
        }
      ],
      isBody: true
    }
  ]
};
var post_default = Post;

// tina/fields/color.tsx
import React2 from "react";
var colorOptions = [
  "blue",
  "teal",
  "green",
  "yellow",
  "orange",
  "red",
  "pink",
  "purple",
  "white"
];
var ColorPickerInput = ({ input }) => {
  const inputClasses = {
    blue: "bg-blue-500 border-blue-600",
    teal: "bg-teal-500 border-teal-600",
    green: "bg-green-500 border-green-600",
    yellow: "bg-yellow-500 border-yellow-600",
    orange: "bg-orange-500 border-orange-600",
    red: "bg-red-500 border-red-600",
    pink: "bg-pink-500 border-pink-600",
    purple: "bg-purple-500 border-purple-600",
    white: "bg-white border-gray-150"
  };
  return React2.createElement(React2.Fragment, null, React2.createElement("input", { type: "text", id: input.name, className: "hidden", value: input.value.join(","), readOnly: true }), React2.createElement("div", { className: "flex gap-2 flex-wrap" }, colorOptions.map((color) => {
    return React2.createElement(
      "button",
      {
        key: color,
        className: `w-9 h-9 rounded-full shadow border ${inputClasses[color]} ${input.value.includes(color) ? "ring-[3px] ring-offset-2 ring-blue-400" : ""}`,
        onClick: () => {
          const newValue = input.value.includes(color) ? input.value.filter((c) => c !== color) : [...input.value, color];
          input.onChange(newValue);
        }
      }
    );
  })));
};

// tina/collection/global.ts
var Global = {
  label: "Global",
  name: "global",
  path: "content/global",
  format: "json",
  ui: {
    global: true
  },
  fields: [
    {
      type: "object",
      label: "Header",
      name: "header",
      fields: [
        {
          type: "object",
          label: "Image",
          name: "imageHeaderObject",
          fields: [
            {
              name: "imageHeaderObjectSrc",
              label: "Source de l'image",
              type: "image"
            },
            {
              name: "imageHeaderObjecttAlt",
              label: "Texte alternatif (description de l'image)",
              type: "string"
            }
          ]
        },
        {
          type: "object",
          label: "Liens de navigation",
          name: "nav",
          list: true,
          ui: {
            itemProps: (item) => {
              return { label: item?.label };
            },
            defaultItem: {
              href: "home",
              label: "Accueil"
            }
          },
          fields: [
            {
              type: "string",
              label: "Lien",
              name: "href"
            },
            {
              type: "string",
              label: "Label",
              name: "label"
            }
          ]
        }
      ]
    },
    {
      type: "object",
      label: "Footer",
      name: "footer",
      fields: [
        {
          type: "string",
          label: "Color",
          name: "color",
          options: [
            { label: "Default", value: "default" },
            { label: "Primary", value: "primary" }
          ]
        },
        {
          type: "object",
          label: "Social Links",
          name: "social",
          fields: [
            {
              type: "string",
              label: "Twitter",
              name: "twitter"
            },
            {
              type: "string",
              label: "Youtube",
              name: "youtube"
            }
          ]
        }
      ]
    },
    {
      type: "object",
      label: "Theme",
      name: "theme",
      // @ts-ignore
      fields: [
        {
          type: "string",
          label: "Primary Color",
          name: "color",
          ui: {
            component: ColorPickerInput
          }
        },
        {
          type: "string",
          name: "font",
          label: "Font Family",
          options: [
            {
              label: "System Sans",
              value: "sans"
            },
            {
              label: "Nunito",
              value: "nunito"
            },
            {
              label: "Lato",
              value: "lato"
            }
          ]
        },
        {
          type: "string",
          name: "darkMode",
          label: "Dark Mode",
          options: [
            {
              label: "System",
              value: "system"
            },
            {
              label: "Light",
              value: "light"
            },
            {
              label: "Dark",
              value: "dark"
            }
          ]
        }
      ]
    }
  ]
};
var global_default = Global;

// tina/collection/author.ts
var Author = {
  label: "Authors",
  name: "author",
  path: "content/authors",
  format: "md",
  fields: [
    {
      type: "string",
      label: "Name",
      name: "name",
      isTitle: true,
      required: true
    },
    {
      type: "image",
      label: "Avatar",
      name: "avatar"
    }
  ]
};
var author_default = Author;

// components/blocks/hero.tsx
import * as React6 from "react";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import { tinaField as tinaField2 } from "tinacms/dist/react";
import Image from "next/image";

// components/layout/section.tsx
import React3 from "react";

// components/layout/container.tsx
import React4 from "react";

// lib/utils.ts
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// components/blocks/actions.tsx
import Link from "next/link";
import * as React5 from "react";
import { BiRightArrowAlt } from "react-icons/bi";
import { tinaField } from "tinacms/dist/react";

// components/blocks/hero.tsx
var heroBlockSchema = {
  name: "hero",
  label: "Hero",
  ui: {
    previewSrc: "/blocks/hero.png",
    defaultItem: {
      tagline: "Here's some text above the other text",
      headline: "This Big Text is Totally Awesome",
      text: "Phasellus scelerisque, libero eu finibus rutrum, risus risus accumsan libero, nec molestie urna dui a leo."
    }
  },
  fields: [
    {
      type: "string",
      label: "Titre",
      name: "headline"
    },
    {
      label: "Contenu",
      name: "text",
      type: "rich-text"
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
          link: "/"
        },
        itemProps: (item) => ({ label: item.label })
      },
      fields: [
        {
          label: "Label",
          name: "label",
          type: "string"
        },
        {
          label: "Type",
          name: "type",
          type: "string",
          options: [
            { label: "Bouton", value: "button" },
            { label: "Lien", value: "link" }
          ]
        },
        {
          label: "Icone",
          name: "icon",
          type: "boolean"
        },
        {
          label: "Lien",
          name: "link",
          type: "string"
        }
      ]
    },
    {
      type: "object",
      label: "Image",
      name: "image",
      fields: [
        {
          name: "src",
          label: "Source de l'image",
          type: "image"
        },
        {
          name: "alt",
          label: "Texte alternatif (desciption de l'image)",
          type: "string"
        }
      ]
    },
    {
      type: "string",
      label: "Color",
      name: "color",
      options: [
        { label: "Default", value: "default" },
        { label: "Tint", value: "tint" },
        { label: "Primary", value: "primary" }
      ]
    }
  ]
};

// components/blocks/content.tsx
import React7 from "react";
import { TinaMarkdown as TinaMarkdown2 } from "tinacms/dist/rich-text";
import { tinaField as tinaField3 } from "tinacms/dist/react";
import Image2 from "next/image";
var contentBlockSchema = {
  name: "content",
  label: "Contenu",
  ui: {
    previewSrc: "/blocks/content.png",
    defaultItem: {
      body: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros. Nullam malesuada erat ut turpis. Suspendisse urna nibh, viverra non, semper suscipit, posuere a, pede."
    }
  },
  fields: [
    {
      type: "rich-text",
      label: "Texte",
      name: "body"
    },
    {
      type: "string",
      label: "Contenu HTML",
      name: "contentHtmlContent",
      ui: {
        component: "textarea"
      }
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
          type: "image"
        },
        {
          name: "imageContentAlt",
          label: "Texte alternatif (description de l'image)",
          type: "string"
        }
      ]
    }
  ]
};

// components/blocks/testimonial.tsx
import React8 from "react";
import { tinaField as tinaField4 } from "tinacms/dist/react";
var testimonialBlockSchema = {
  name: "testimonial",
  label: "Citation",
  ui: {
    previewSrc: "/blocks/testimonial.png",
    defaultItem: {
      quote: "There are only two hard things in Computer Science: cache invalidation and naming things.",
      author: "Phil Karlton"
    }
  },
  fields: [
    {
      type: "string",
      ui: {
        component: "textarea"
      },
      label: "Citation",
      name: "quote"
    },
    {
      type: "string",
      label: "Auteur",
      name: "author"
    }
  ]
};

// components/blocks/features.tsx
import { tinaField as tinaField5 } from "tinacms/dist/react";

// components/icon.tsx
import * as BoxIcons from "react-icons/bi";
import React10 from "react";

// components/layout/layout-context.tsx
import React9, { useState, useContext } from "react";
var LayoutContext = React9.createContext(void 0);
var useLayout = () => {
  const context = useContext(LayoutContext);
  return context || {
    theme: {
      color: "blue",
      darkMode: "default"
    },
    globalSettings: void 0,
    pageData: void 0
  };
};

// components/icon.tsx
var IconOptions = {
  Tina: (props) => React10.createElement(
    "svg",
    {
      ...props,
      viewBox: "0 0 66 80",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg"
    },
    React10.createElement("title", null, "Tina"),
    React10.createElement(
      "path",
      {
        d: "M39.4615 36.1782C42.763 33.4475 44.2259 17.3098 45.6551 11.5091C47.0843 5.70828 52.995 6.0025 52.995 6.0025C52.995 6.0025 51.4605 8.67299 52.0864 10.6658C52.7123 12.6587 57 14.4401 57 14.4401L56.0752 16.8781C56.0752 16.8781 54.1441 16.631 52.995 18.9297C51.8459 21.2283 53.7336 43.9882 53.7336 43.9882C53.7336 43.9882 46.8271 57.6106 46.8271 63.3621C46.8271 69.1136 49.5495 73.9338 49.5495 73.9338H45.7293C45.7293 73.9338 40.1252 67.2648 38.9759 63.9318C37.8266 60.5988 38.2861 57.2658 38.2861 57.2658C38.2861 57.2658 32.1946 56.921 26.7931 57.2658C21.3915 57.6106 17.7892 62.2539 17.1391 64.8512C16.4889 67.4486 16.2196 73.9338 16.2196 73.9338H13.1991C11.3606 68.2603 9.90043 66.2269 10.6925 63.3621C12.8866 55.4269 12.4557 50.9263 11.9476 48.9217C11.4396 46.9172 8 45.1676 8 45.1676C9.68492 41.7349 11.4048 40.0854 18.8029 39.9133C26.201 39.7413 36.1599 38.9088 39.4615 36.1782Z",
        fill: "currentColor"
      }
    ),
    React10.createElement(
      "path",
      {
        d: "M20.25 63.03C20.25 63.03 21.0305 70.2533 25.1773 73.9342H28.7309C25.1773 69.9085 24.7897 59.415 24.7897 59.415C22.9822 60.0035 20.4799 62.1106 20.25 63.03Z",
        fill: "currentColor"
      }
    )
  ),
  ...BoxIcons
};
var iconColorClass = {
  blue: {
    regular: "text-blue-400",
    circle: "bg-blue-400 dark:bg-blue-500 text-blue-50"
  },
  teal: {
    regular: "text-teal-400",
    circle: "bg-teal-400 dark:bg-teal-500 text-teal-50"
  },
  green: {
    regular: "text-green-400",
    circle: "bg-green-400 dark:bg-green-500 text-green-50"
  },
  red: {
    regular: "text-red-400",
    circle: "bg-red-400 dark:bg-red-500 text-red-50"
  },
  pink: {
    regular: "text-pink-400",
    circle: "bg-pink-400 dark:bg-pink-500 text-pink-50"
  },
  purple: {
    regular: "text-purple-400",
    circle: "bg-purple-400 dark:bg-purple-500 text-purple-50"
  },
  orange: {
    regular: "text-orange-400",
    circle: "bg-orange-400 dark:bg-orange-500 text-orange-50"
  },
  yellow: {
    regular: "text-yellow-400",
    circle: "bg-yellow-400 dark:bg-yellow-500 text-yellow-50"
  },
  white: {
    regular: "text-white opacity-80",
    circle: "bg-white-400 dark:bg-white-500 text-white-50"
  }
};
var iconSizeClass = {
  xs: "w-6 h-6 flex-shrink-0",
  small: "w-8 h-8 flex-shrink-0",
  medium: "w-12 h-12 flex-shrink-0",
  large: "w-14 h-14 flex-shrink-0",
  xl: "w-16 h-16 flex-shrink-0",
  custom: ""
};
var Icon = ({
  data,
  parentColor = "",
  className = "",
  tinaField: tinaField6 = ""
}) => {
  const { theme } = useLayout();
  if (IconOptions[data.name] === null || IconOptions[data.name] === void 0) {
    return null;
  }
  const { name, color, size = "medium", style = "regular" } = data;
  const IconSVG = IconOptions[name];
  const iconSizeClasses = typeof size === "string" ? iconSizeClass[size] : iconSizeClass[Object.keys(iconSizeClass)[size]];
  const iconColor = color ? color === "primary" ? theme.color : color : theme.color;
  if (style == "circle") {
    return React10.createElement(
      "div",
      {
        "data-tina-field": tinaField6,
        className: `relative z-10 inline-flex items-center justify-center flex-shrink-0 ${iconSizeClasses} rounded-full ${iconColorClass[iconColor].circle} ${className}`
      },
      React10.createElement(IconSVG, { className: "w-2/3 h-2/3" })
    );
  } else {
    const iconColorClasses = iconColorClass[parentColor === "primary" && (iconColor === theme.color || iconColor === "primary") ? "white" : iconColor].regular;
    return React10.createElement(
      IconSVG,
      {
        "data-tina-field": tinaField6,
        className: `${iconSizeClasses} ${iconColorClasses} ${className}`
      }
    );
  }
};

// tina/fields/icon.tsx
import React11 from "react";
import { Button, wrapFieldsWithMeta } from "tinacms";
import { BiChevronRight } from "react-icons/bi";
import { GoCircleSlash } from "react-icons/go";
import {
  Popover,
  PopoverButton,
  Transition,
  PopoverPanel
} from "@headlessui/react";
var parseIconName = (name) => {
  const splitName = name.split(/(?=[A-Z])/);
  if (splitName.length > 1) {
    return splitName.slice(1).join(" ");
  } else {
    return name;
  }
};
var IconPickerInput = wrapFieldsWithMeta(({ input }) => {
  const [filter, setFilter] = React11.useState("");
  const filteredBlocks = React11.useMemo(() => {
    return Object.keys(IconOptions).filter((name) => {
      return name.toLowerCase().includes(filter.toLowerCase());
    });
  }, [filter]);
  const inputLabel = Object.keys(IconOptions).includes(input.value) ? parseIconName(input.value) : "Select Icon";
  const InputIcon = IconOptions[input.value] ? IconOptions[input.value] : null;
  return React11.createElement("div", { className: "relative z-[1000]" }, React11.createElement("input", { type: "text", id: input.name, className: "hidden", ...input }), React11.createElement(Popover, null, ({ open }) => React11.createElement(React11.Fragment, null, React11.createElement(PopoverButton, null, React11.createElement(
    Button,
    {
      className: `text-sm h-11 px-4 ${InputIcon ? "h-11" : "h-10"}`,
      size: "custom",
      rounded: "full",
      variant: open ? "secondary" : "white"
    },
    InputIcon && React11.createElement(InputIcon, { className: "w-7 mr-1 h-auto fill-current text-blue-500" }),
    inputLabel,
    !InputIcon && React11.createElement(BiChevronRight, { className: "w-5 h-auto fill-current opacity-70 ml-1" })
  )), React11.createElement(
    "div",
    {
      className: "absolute w-full min-w-[192px] max-w-2xl -bottom-2 left-0 translate-y-full",
      style: { zIndex: 1e3 }
    },
    React11.createElement(
      Transition,
      {
        enter: "transition duration-150 ease-out",
        enterFrom: "transform opacity-0 -translate-y-2",
        enterTo: "transform opacity-100 translate-y-0",
        leave: "transition duration-75 ease-in",
        leaveFrom: "transform opacity-100 translate-y-0",
        leaveTo: "transform opacity-0 -translate-y-2"
      },
      React11.createElement(PopoverPanel, { className: "relative overflow-hidden rounded-lg shadow-lg bg-white border border-gray-150 z-50" }, ({ close }) => React11.createElement("div", { className: "max-h-[24rem] flex flex-col w-full h-full" }, React11.createElement("div", { className: "bg-gray-50 p-2 border-b border-gray-100 z-10 shadow-sm" }, React11.createElement(
        "input",
        {
          type: "text",
          className: "bg-white text-sm rounded-sm border border-gray-100 shadow-inner py-1.5 px-2.5 w-full block placeholder-gray-200",
          onClick: (event) => {
            event.stopPropagation();
            event.preventDefault();
          },
          value: filter,
          onChange: (event) => {
            setFilter(event.target.value);
          },
          placeholder: "Filter..."
        }
      )), filteredBlocks.length === 0 && React11.createElement("span", { className: "relative text-center text-xs px-2 py-3 text-gray-300 bg-gray-50 italic" }, "No matches found"), filteredBlocks.length > 0 && React11.createElement("div", { className: "w-full grid grid-cols-6 auto-rows-auto p-2 overflow-y-auto" }, React11.createElement(
        "button",
        {
          className: "relative rounded-lg text-center text-xs py-2 px-3 flex-1 outline-none transition-all ease-out duration-150 hover:text-blue-500 focus:text-blue-500 focus:bg-gray-50 hover:bg-gray-50",
          key: "clear-input",
          onClick: () => {
            input.onChange("");
            setFilter("");
            close();
          }
        },
        React11.createElement(GoCircleSlash, { className: "w-6 h-auto text-gray-200" })
      ), filteredBlocks.map((name) => {
        return React11.createElement(
          "button",
          {
            className: "relative flex items-center justify-center rounded-lg text-center text-xs py-2 px-3 flex-1 outline-none transition-all ease-out duration-150 hover:text-blue-500 focus:text-blue-500 focus:bg-gray-50 hover:bg-gray-50",
            key: name,
            onClick: () => {
              input.onChange(name);
              setFilter("");
              close();
            }
          },
          React11.createElement(
            Icon,
            {
              data: {
                name,
                size: "custom",
                color: "blue"
              },
              className: "w-7 h-auto"
            }
          )
        );
      }))))
    )
  ))));
});
var iconSchema = {
  type: "object",
  label: "Icon",
  name: "icon",
  fields: [
    {
      type: "string",
      label: "Icon",
      name: "name",
      ui: {
        component: IconPickerInput
      }
    },
    {
      type: "string",
      label: "Color",
      name: "color",
      list: true,
      ui: {
        component: ColorPickerInput
      }
    },
    {
      name: "style",
      label: "Style",
      type: "string",
      options: [
        {
          label: "Circle",
          value: "circle"
        },
        {
          label: "Float",
          value: "float"
        }
      ]
    }
  ]
};

// components/blocks/features.tsx
var defaultFeature = {
  title: "Here's Another Feature",
  text: "This is where you might talk about the feature, if this wasn't just filler text.",
  icon: {
    color: "",
    style: "float",
    name: ""
  }
};
var featureBlockSchema = {
  name: "features",
  label: "Mises en avant",
  ui: {
    previewSrc: "/blocks/features.png",
    defaultItem: {
      items: [defaultFeature, defaultFeature, defaultFeature]
    }
  },
  fields: [
    {
      type: "object",
      label: "Element \xE0 mettre en avant",
      name: "items",
      list: true,
      ui: {
        itemProps: (item) => {
          return {
            label: item?.title
          };
        },
        defaultItem: {
          ...defaultFeature
        }
      },
      fields: [
        iconSchema,
        {
          type: "string",
          label: "Titre",
          name: "title"
        },
        {
          type: "string",
          label: "Texte",
          name: "text",
          ui: {
            component: "textarea"
          }
        }
      ]
    }
  ]
};

// tina/collection/page.ts
var Page = {
  label: "Pages",
  name: "page",
  path: "content/pages",
  ui: {
    router: ({ document }) => {
      if (document._sys.filename === "home") {
        return `/`;
      }
      if (document._sys.filename === "about") {
        return `/about`;
      }
      return void 0;
    }
  },
  fields: [
    {
      type: "string",
      label: "Title",
      name: "title",
      description: "The title of the page. This is used to display the title in the CMS",
      isTitle: true,
      required: true
    },
    {
      type: "object",
      list: true,
      name: "blocks",
      label: "Sections",
      ui: {
        visualSelector: true
      },
      templates: [
        heroBlockSchema,
        //@ts-ignore
        featureBlockSchema,
        contentBlockSchema,
        testimonialBlockSchema
      ]
    }
  ]
};
var page_default = Page;

// tina/config.tsx
var config = defineConfig({
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID,
  branch: process.env.NEXT_PUBLIC_TINA_BRANCH || // custom branch env override
  process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_REF || // Vercel branch env
  process.env.HEAD,
  // Netlify branch env
  token: process.env.TINA_TOKEN,
  media: {
    // If you wanted cloudinary do this
    // loadCustomStore: async () => {
    //   const pack = await import("next-tinacms-cloudinary");
    //   return pack.TinaCloudCloudinaryMediaStore;
    // },
    // this is the config for the tina cloud media store
    tina: {
      publicFolder: "public",
      mediaRoot: "uploads"
    }
  },
  build: {
    publicFolder: "public",
    // The public asset folder for your framework
    outputFolder: "admin"
    // within the public folder
  },
  schema: {
    collections: [page_default, post_default, author_default, global_default]
  }
});
var config_default = config;
export {
  config_default as default
};
