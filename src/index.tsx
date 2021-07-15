import React, { useEffect, useState } from "react";
import ReactDOMServer from "react-dom/server";
import { createIntl, createIntlCache, IntlShape, MessageDescriptor } from "react-intl";
import { PrimitiveType, FormatXMLElementFn, Options } from "intl-messageformat";

const useCustomIntl = (locale, blurbs) => {
  const [intl, setIntl] = useState<IntlShape>();

  useEffect(() => {
    const cache = createIntlCache();
    const intlOriginal = createIntl({ locale, messages: blurbs }, cache);
    const { formatMessage: formatMessageOriginal } = intlOriginal;
    const formatMessage = (
      descriptor: MessageDescriptor,
      values?: Record<string, PrimitiveType | FormatXMLElementFn<string, string>>,
      opts?: Options
    ): any => {
      const { id } = descriptor;
      const orgs = formatMessageOriginal(descriptor, values, opts);
      const nodes = Array.isArray(orgs) ? orgs : [orgs];

      return (
        <span
          dangerouslySetInnerHTML={{
            __html: `<!--COPYRAY ${id}-->${nodes
              .map((node) => (typeof node === "object" ? ReactDOMServer.renderToString(node) : node))
              .join("")}`,
          }}
        />
      );
    };

    setIntl({ ...intlOriginal, formatMessage });
  }, [locale, blurbs]);

  return intl;
};

export type useCopyTunerProps = {
  locale: string;
  blurbs: { [key: string]: string };
  url?: string;
};

export const useCopyTuner = (props: useCopyTunerProps) => {
  const { locale, blurbs, url } = props;
  const intl = useCustomIntl(locale, blurbs);

  useEffect(() => {
    const startCopyRay = async () => {
      const { start } = url && (await import("./lib/main"));
      start && start(url);
    };

    startCopyRay();
  }, [url]);

  return { intl };
};
