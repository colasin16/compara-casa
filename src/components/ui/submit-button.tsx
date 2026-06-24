"use client";

import { useFormStatus } from "react-dom";

import { Spinner } from "@/components/ui/spinner";

type Props = React.ComponentProps<"button"> & {
  /** Optional leading icon shown when the form is not pending. */
  icon?: React.ReactNode;
};

/**
 * Submit button for forms that call a server action. While the action is
 * pending it disables itself and swaps any leading icon for a loading spinner
 * so the user gets feedback that something is happening.
 */
function SubmitButton({
  icon,
  children,
  disabled,
  className,
  ...props
}: Props) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending || disabled}
      aria-busy={pending}
      className={className}
      {...props}
    >
      {pending ? <Spinner /> : icon}
      {children}
    </button>
  );
}

export { SubmitButton };
