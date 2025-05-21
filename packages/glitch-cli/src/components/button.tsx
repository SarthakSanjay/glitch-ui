import { cva, VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";

const buttonVariants = cva("rounded-md text-sm", {
  variants: {
    variant: {
      default:
        "bg-pink-500 rounded-md text-white transition-colors hover:bg-pink-600",
      outline:
        "border border-pink-500 rounded-md text-white transition-colors hover:border-pink-600,",
      fill: "",
    },
    size: {
      default: "h-10 px-3 py-2",
      sm: "h-8 px-3",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
});

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & { asChild?: boolean }) {
  switch (variant) {
    case "fill":
      return <div></div>;
  }
  return (
    <button
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
