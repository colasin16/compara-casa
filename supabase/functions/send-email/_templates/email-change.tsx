import { Link, Section, Text } from "npm:@react-email/components@0.0.22";
import * as React from "npm:react@18.3.1";
import type { LocaleTranslations } from "../_i18n.ts";
import { BaseEmail, styles } from "./base.tsx";

export interface EmailChangeEmailProps {
  brand: string;
  confirmUrl: string;
  t: LocaleTranslations["emailChange"];
  footer: LocaleTranslations["footer"];
}

export function EmailChangeEmail({
  brand,
  confirmUrl,
  t,
  footer,
}: EmailChangeEmailProps) {
  return (
    <BaseEmail brand={brand} preview={t.preview} footer={footer}>
      <Text style={styles.heading}>{t.heading}</Text>
      <Text style={styles.body}>{t.intro}</Text>
      <Section style={styles.buttonSection}>
        <Link href={confirmUrl} style={styles.button}>
          {t.button}
        </Link>
      </Section>
      <Text style={styles.expiry}>{t.expiry}</Text>
    </BaseEmail>
  );
}

export default EmailChangeEmail;
