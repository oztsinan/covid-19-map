"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { Spinner } from "./Spinner";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow hover:opacity-70 transition-all",
        destructive:
          "bg-destructive text-destructive-foreground shadow-sm hover:opacity-70 transition-all",
        outline:
          "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground hover:opacity-70 transition-all",
        secondary:
          "bg-secondary text-secondary-foreground shadow-sm hover:opacity-70 transition-all",
        ghost:
          "hover:bg-accent hover:text-accent-foreground hover:opacity-70 transition-all",
        link: "text-primary underline-offset-4 hover:underline hover:opacity-70 transition-all",
      },
      size: {
        default: "h-input px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "size-8",
        auto: "p-2 rounded-lg",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  isLoading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, isLoading, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";

    if (isLoading) {
      return (
        <Comp
          disabled
          className={cn(buttonVariants({ variant, size, className }), "gap-1")}
          ref={ref}
          {...props}
        >
          <Spinner />
          {props?.children}
        </Comp>
      );
    }

    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
