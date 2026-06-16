"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0f] disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-lg shadow-blue-500/25 hover:from-blue-500 hover:to-blue-400 hover:shadow-blue-500/40 active:scale-[0.98]",
        secondary:
          "bg-white/5 text-slate-50 border border-white/10 hover:bg-white/10 hover:border-white/20 active:scale-[0.98]",
        outline:
          "border border-blue-500/50 text-blue-400 bg-transparent hover:bg-blue-500/10 hover:border-blue-400 active:scale-[0.98]",
        ghost:
          "text-slate-300 hover:text-slate-50 hover:bg-white/5 active:scale-[0.98]",
        destructive:
          "bg-red-600 text-white shadow-lg shadow-red-500/25 hover:bg-red-500 hover:shadow-red-500/40 active:scale-[0.98]",
      },
      size: {
        sm: "h-8 px-3 text-xs rounded-md gap-1.5",
        default: "h-10 px-5 py-2 gap-2",
        lg: "h-12 px-8 text-base gap-2.5",
        icon: "h-10 w-10",
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
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
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
