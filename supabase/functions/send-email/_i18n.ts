export type EmailLocale = "en" | "es";

export const emailTranslations = {
  en: {
    brand: "ComparaCasa",
    footer: {
      tagline: "Score and compare houses your way",
      notice:
        "This email was sent because you signed up for ComparaCasa. If you did not sign up, you can safely ignore it.",
    },
    confirmSignup: {
      subject: "Confirm your ComparaCasa account",
      preview: "Please confirm your email address to get started.",
      heading: "Confirm your email",
      intro:
        "Thanks for signing up for ComparaCasa! Click the button below to confirm your email address and activate your account.",
      button: "Confirm email address",
      expiry:
        "This link expires in 24 hours. If you did not create an account, you can safely ignore this email.",
    },
    resetPassword: {
      subject: "Reset your ComparaCasa password",
      preview: "Reset your password to regain access to your account.",
      heading: "Reset your password",
      intro:
        "You requested a password reset for your ComparaCasa account. Click the button below to choose a new password.",
      button: "Reset password",
      expiry:
        "This link expires in 1 hour. If you did not request a password reset, you can safely ignore this email.",
    },
    emailChange: {
      subject: "Confirm your new email address",
      preview: "Confirm your new email address for your ComparaCasa account.",
      heading: "Confirm your new email",
      intro:
        "You requested to change the email address on your ComparaCasa account. Click the button below to confirm your new email address.",
      button: "Confirm new email",
      expiry:
        "This link expires in 24 hours. If you did not request this change, please ignore this email and your address will remain unchanged.",
    },
  },
  es: {
    brand: "ComparaCasa",
    footer: {
      tagline: "Puntúa y compara casas a tu manera",
      notice:
        "Este correo se envió porque te registraste en ComparaCasa. Si no fuiste tú, puedes ignorarlo.",
    },
    confirmSignup: {
      subject: "Confirma tu cuenta de ComparaCasa",
      preview: "Por favor confirma tu dirección de email para empezar.",
      heading: "Confirma tu email",
      intro:
        "¡Gracias por registrarte en ComparaCasa! Haz clic en el botón de abajo para confirmar tu dirección de email y activar tu cuenta.",
      button: "Confirmar dirección de email",
      expiry:
        "Este enlace caduca en 24 horas. Si no creaste una cuenta, puedes ignorar este correo.",
    },
    resetPassword: {
      subject: "Restablece tu contraseña de ComparaCasa",
      preview: "Restablece tu contraseña para volver a acceder a tu cuenta.",
      heading: "Restablece tu contraseña",
      intro:
        "Solicitaste restablecer la contraseña de tu cuenta de ComparaCasa. Haz clic en el botón de abajo para elegir una nueva contraseña.",
      button: "Restablecer contraseña",
      expiry:
        "Este enlace caduca en 1 hora. Si no solicitaste un restablecimiento de contraseña, puedes ignorar este correo.",
    },
    emailChange: {
      subject: "Confirma tu nueva dirección de email",
      preview: "Confirma tu nueva dirección de email para tu cuenta de ComparaCasa.",
      heading: "Confirma tu nuevo email",
      intro:
        "Solicitaste cambiar la dirección de email de tu cuenta de ComparaCasa. Haz clic en el botón de abajo para confirmar tu nueva dirección.",
      button: "Confirmar nuevo email",
      expiry:
        "Este enlace caduca en 24 horas. Si no solicitaste este cambio, ignora este correo y tu dirección no cambiará.",
    },
  },
} as const;

export type EmailTranslations = typeof emailTranslations;
export type LocaleTranslations = EmailTranslations["en"];
