import Link from "next/link";

interface ButtonProps {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  className?: string;
}

const variants = {
  primary:
    "bg-primary text-[#1c1810] shadow-sm hover:opacity-90 dark:text-[#1c1810]",
  secondary: "border border-border text-text hover:border-primary hover:text-primary",
  ghost: "text-secondary hover:underline",
};

export default function Button({
  href,
  children,
  variant = "primary",
  className = "",
}: ButtonProps) {
  return (
    <Link
      href={href}
      className={`inline-flex items-center justify-center rounded-lg px-6 py-3 font-medium transition ${variants[variant]} ${className}`}
    >
      {children}
    </Link>
  );
}
