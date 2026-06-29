import {
  Body,
  Container,
  Head,
  Hr,
  Html,
  Preview,
  Text,
} from "npm:@react-email/components@0.0.22";
import * as React from "npm:react@18.3.1";

// Brand colours from the app's design system
export const BRAND_PRIMARY = "#00a76f";
export const BRAND_BG = "#f4f6f8";
export const BRAND_TEXT = "#1c252e";
export const BRAND_MUTED = "#637381";
export const BRAND_WHITE = "#ffffff";
export const BRAND_BORDER = "rgba(145, 158, 171, 0.2)";

export const styles = {
  main: {
    backgroundColor: BRAND_BG,
    fontFamily:
      "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Helvetica Neue', sans-serif",
  } as React.CSSProperties,
  container: {
    backgroundColor: BRAND_WHITE,
    margin: "40px auto",
    padding: "40px",
    borderRadius: "8px",
    maxWidth: "560px",
    border: `1px solid ${BRAND_BORDER}`,
  } as React.CSSProperties,
  logo: {
    color: BRAND_PRIMARY,
    fontSize: "20px",
    fontWeight: "700" as const,
    letterSpacing: "-0.3px",
    margin: "0 0 32px",
  } as React.CSSProperties,
  heading: {
    color: BRAND_TEXT,
    fontSize: "24px",
    fontWeight: "700" as const,
    lineHeight: "1.3",
    margin: "0 0 16px",
  } as React.CSSProperties,
  body: {
    color: BRAND_TEXT,
    fontSize: "15px",
    lineHeight: "1.6",
    margin: "0 0 24px",
  } as React.CSSProperties,
  button: {
    backgroundColor: BRAND_PRIMARY,
    borderRadius: "6px",
    color: BRAND_WHITE,
    display: "inline-block",
    fontSize: "15px",
    fontWeight: "600" as const,
    padding: "12px 24px",
    textDecoration: "none",
    textAlign: "center" as const,
  } as React.CSSProperties,
  buttonSection: {
    margin: "24px 0",
  } as React.CSSProperties,
  expiry: {
    color: BRAND_MUTED,
    fontSize: "13px",
    lineHeight: "1.5",
    margin: "24px 0 0",
  } as React.CSSProperties,
  hr: {
    borderColor: BRAND_BORDER,
    margin: "32px 0 24px",
  } as React.CSSProperties,
  footer: {
    color: BRAND_MUTED,
    fontSize: "12px",
    lineHeight: "1.5",
    margin: "0",
  } as React.CSSProperties,
  footerBrand: {
    color: BRAND_PRIMARY,
    fontWeight: "600" as const,
    textDecoration: "none",
  } as React.CSSProperties,
};

export interface BaseEmailProps {
  brand: string;
  preview: string;
  children: React.ReactNode;
  footer: {
    tagline: string;
    notice: string;
  };
}

export function BaseEmail({ brand, preview, children, footer }: BaseEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>{preview}</Preview>
      <Body style={styles.main}>
        <Container style={styles.container}>
          <Text style={styles.logo}>{brand}</Text>
          {children}
          <Hr style={styles.hr} />
          <Text style={styles.footer}>
            <span style={styles.footerBrand}>{brand}</span>
            {" — "}
            {footer.tagline}
          </Text>
          <Text style={styles.footer}>{footer.notice}</Text>
        </Container>
      </Body>
    </Html>
  );
}
