"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import { Loader2, Send, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";

const contactFormSchema = z.object({
  firstName: z.string().min(1, "First name is required").max(50),
  lastName: z.string().min(1, "Last name is required").max(50),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  company: z.string().optional(),
  service: z.string().min(1, "Please select a service"),
  budget: z.string().optional(),
  message: z.string().min(10, "Message must be at least 10 characters").max(2000),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

const services = [
  { value: "staffing", label: "Staffing Solutions" },
  { value: "web-development", label: "Web Development" },
  { value: "mobile-development", label: "Mobile Development" },
  { value: "ai-automation", label: "AI & Automation" },
  { value: "consulting", label: "Consulting" },
  { value: "other", label: "Other" },
];

const budgets = [
  { value: "under-10k", label: "Under $10,000" },
  { value: "10k-25k", label: "$10,000 – $25,000" },
  { value: "25k-50k", label: "$25,000 – $50,000" },
  { value: "50k-100k", label: "$50,000 – $100,000" },
  { value: "100k+", label: "$100,000+" },
];

const fieldVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.08,
      duration: 0.4,
      ease: "easeOut",
    },
  }),
};

interface ContactFormProps {
  className?: string;
}

export function ContactForm({ className }: ContactFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      company: "",
      service: "",
      budget: "",
      message: "",
    },
  });

  const onSubmit = async (data: ContactFormValues) => {
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to submit");
      }

      setIsSuccess(true);
      reset();
      toast({
        title: "Message sent!",
        description: "We'll get back to you within 24 hours.",
        variant: "success",
      });
    } catch {
      toast({
        title: "Something went wrong",
        description: "Please try again or email us directly.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className={cn(
          "rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-8 text-center",
          className
        )}
      >
        <CheckCircle2 className="h-12 w-12 text-emerald-400 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-slate-50 mb-2">
          Thank you!
        </h3>
        <p className="text-slate-400 mb-6">
          Your message has been received. We&apos;ll be in touch shortly.
        </p>
        <Button
          variant="outline"
          onClick={() => setIsSuccess(false)}
        >
          Send another message
        </Button>
      </motion.div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={cn("space-y-5", className)}
    >
      {/* Name Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <motion.div custom={0} variants={fieldVariants} initial="hidden" animate="visible">
          <Label htmlFor="firstName" className="mb-2 block">
            First Name <span className="text-red-400">*</span>
          </Label>
          <Input
            id="firstName"
            placeholder="John"
            {...register("firstName")}
            className={errors.firstName ? "border-red-500/50" : ""}
          />
          {errors.firstName && (
            <p className="text-xs text-red-400 mt-1">{errors.firstName.message}</p>
          )}
        </motion.div>

        <motion.div custom={1} variants={fieldVariants} initial="hidden" animate="visible">
          <Label htmlFor="lastName" className="mb-2 block">
            Last Name <span className="text-red-400">*</span>
          </Label>
          <Input
            id="lastName"
            placeholder="Doe"
            {...register("lastName")}
            className={errors.lastName ? "border-red-500/50" : ""}
          />
          {errors.lastName && (
            <p className="text-xs text-red-400 mt-1">{errors.lastName.message}</p>
          )}
        </motion.div>
      </div>

      {/* Email & Phone */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <motion.div custom={2} variants={fieldVariants} initial="hidden" animate="visible">
          <Label htmlFor="email" className="mb-2 block">
            Email <span className="text-red-400">*</span>
          </Label>
          <Input
            id="email"
            type="email"
            placeholder="john@company.com"
            {...register("email")}
            className={errors.email ? "border-red-500/50" : ""}
          />
          {errors.email && (
            <p className="text-xs text-red-400 mt-1">{errors.email.message}</p>
          )}
        </motion.div>

        <motion.div custom={3} variants={fieldVariants} initial="hidden" animate="visible">
          <Label htmlFor="phone" className="mb-2 block">
            Phone
          </Label>
          <Input
            id="phone"
            type="tel"
            placeholder="+1 (555) 123-4567"
            {...register("phone")}
          />
        </motion.div>
      </div>

      {/* Company */}
      <motion.div custom={4} variants={fieldVariants} initial="hidden" animate="visible">
        <Label htmlFor="company" className="mb-2 block">
          Company
        </Label>
        <Input
          id="company"
          placeholder="Your company name"
          {...register("company")}
        />
      </motion.div>

      {/* Service & Budget */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <motion.div custom={5} variants={fieldVariants} initial="hidden" animate="visible">
          <Label className="mb-2 block">
            Service <span className="text-red-400">*</span>
          </Label>
          <Select onValueChange={(value) => setValue("service", value)}>
            <SelectTrigger className={errors.service ? "border-red-500/50" : ""}>
              <SelectValue placeholder="Select a service" />
            </SelectTrigger>
            <SelectContent>
              {services.map((service) => (
                <SelectItem key={service.value} value={service.value}>
                  {service.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.service && (
            <p className="text-xs text-red-400 mt-1">{errors.service.message}</p>
          )}
        </motion.div>

        <motion.div custom={6} variants={fieldVariants} initial="hidden" animate="visible">
          <Label className="mb-2 block">Budget Range</Label>
          <Select onValueChange={(value) => setValue("budget", value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select budget range" />
            </SelectTrigger>
            <SelectContent>
              {budgets.map((budget) => (
                <SelectItem key={budget.value} value={budget.value}>
                  {budget.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </motion.div>
      </div>

      {/* Message */}
      <motion.div custom={7} variants={fieldVariants} initial="hidden" animate="visible">
        <Label htmlFor="message" className="mb-2 block">
          Message <span className="text-red-400">*</span>
        </Label>
        <Textarea
          id="message"
          placeholder="Tell us about your project, goals, and timeline..."
          rows={5}
          {...register("message")}
          className={errors.message ? "border-red-500/50" : ""}
        />
        {errors.message && (
          <p className="text-xs text-red-400 mt-1">{errors.message.message}</p>
        )}
      </motion.div>

      {/* Submit */}
      <motion.div custom={8} variants={fieldVariants} initial="hidden" animate="visible">
        <Button
          type="submit"
          size="lg"
          disabled={isSubmitting}
          className="w-full sm:w-auto"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Sending...
            </>
          ) : (
            <>
              <Send className="h-4 w-4" />
              Send Message
            </>
          )}
        </Button>
      </motion.div>
    </form>
  );
}
