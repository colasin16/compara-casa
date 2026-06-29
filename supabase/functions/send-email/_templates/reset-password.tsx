import { Link, Section, Text } from "npm:@react-email/components@0.0.22";
import * as React from "npm:react@18.3.1";
import type { LocaleTranslations } from "../_i18n.ts";
import { BaseEmail, styles } from "./base.tsx";

export interface ResetPasswordEmailProps {
  brand: string;
  resetUrl: string;
  t: LocaleTranslations["resetPassword"];
  footer: LocaleTranslations["footer"];
}

export function ResetPasswordEmail({
  brand,
  resetUrl,
  t,
  footer,
}: ResetPasswordEmailProps) {
  return (
    <BaseEmail brand={brand} preview={t.preview} footer={footer}>
      <Text style={styles.heading}>{t.heading}</Text>
      <Text style={styles.body}>{t.intro}</Text>
      <Section style={styles.buttonSection}>
        <Link href={resetUrl} style={styles.button}>
          {t.button}
        </Link>
      </Section>
      <Text style={styles.expiry}>{t.expiry}</Text>
    </BaseEmail>
  );
}

export default ResetPasswordEmail;
