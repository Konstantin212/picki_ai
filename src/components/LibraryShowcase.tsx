"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Mail, Check, X } from "lucide-react";
import api from "@/lib/axios";

// Simple form schema
const formSchema = z.object({
  email: z.string().email("Invalid email"),
});

type FormData = z.infer<typeof formSchema>;

export function LibraryShowcase() {
  const { toast } = useToast();

  // React Hook Form example
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  // React Query example
  const { isLoading } = useQuery({
    queryKey: ["test"],
    queryFn: () => api.get("/api/test").then((res) => res.data),
    enabled: false, // Don't run automatically
  });

  // React Query mutation example
  const mutation = useMutation({
    mutationFn: (data: FormData) => api.post("/api/test", data),
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Form submitted successfully",
      });
    },
  });

  return (
    <div className="p-8 space-y-8">
      <h1 className="text-2xl font-bold mb-8">Library Showcase</h1>

      {/* Lucide Icons */}
      <div className="space-y-2">
        <h2 className="text-xl font-semibold">Lucide Icons</h2>
        <div className="flex gap-4">
          <Mail className="w-6 h-6" />
          <Check className="w-6 h-6 text-green-500" />
          <X className="w-6 h-6 text-red-500" />
        </div>
      </div>

      {/* React Hook Form */}
      <div className="space-y-2">
        <h2 className="text-xl font-semibold">React Hook Form</h2>
        <form
          onSubmit={form.handleSubmit((data) => mutation.mutate(data))}
          className="space-y-4"
        >
          <input
            {...form.register("email")}
            placeholder="Enter email"
            className="border p-2 rounded"
          />
          {form.formState.errors.email && (
            <p className="text-red-500">
              {form.formState.errors.email.message}
            </p>
          )}
          <Button type="submit">Submit Form</Button>
        </form>
      </div>

      {/* React Query */}
      <div className="space-y-2">
        <h2 className="text-xl font-semibold">React Query</h2>
        <div className="space-y-4">
          <Button>Test Query</Button>
          {isLoading && <p>Loading...</p>}
        </div>
      </div>

      {/* shadcn/ui Button variants */}
      <div>
        <h2 className="text-xl font-semibold">shadcn/ui Buttons</h2>
        <div className="flex gap-4">
          <Button>Default</Button>
          <Button variant="primary">Primary</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="link">Link</Button>
        </div>
      </div>
    </div>
  );
}
