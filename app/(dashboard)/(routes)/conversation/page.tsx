"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useRouter } from "next/navigation";

import { Heading } from "@/components/heading";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { MessageSquare } from "lucide-react";
import { formSchema } from "./constants";

const ConversationPage = () => {
  const router = useRouter();
  const [messages, setMessages] = useState<{ content: string; sentimentScore?: number; sentimentMagnitude?: number }[]>([]); // State to hold messages and sentiment analysis

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const userMessage = { content: values.prompt };

      // Send request to your API route to process sentiment analysis using Google Cloud API
      const response = await axios.post("/api/conversation", {
        messages: [userMessage],
      });

      // Update messages state with the response (sentiment analysis data)
      setMessages((current) => [...current, ...response.data]);
    } catch (error) {
      console.error("Error during conversation:", error);
    } finally {
      router.refresh();
    }
  };

  return (
    <div>
      <Heading
        title="Conversation"
        description="Our most advanced conversation model."
        icon={MessageSquare}
        iconColor="text-violet-500"
        bgColor="bg-violet-500/10"
      />
      <div className="px-4 lg:px-8">
        <div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="rounded-lg border w-full p-4 px-3 md:px-6 focus-within:shadow-sm grid grid-cols-12 gap-2"
            >
              <FormField
                name="prompt"
                render={({ field }) => (
                  <FormItem className="col-span-12 lg:col-span-10">
                    <FormControl className="m-0 p-0">
                      <Input
                        className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent"
                        disabled={isLoading}
                        placeholder="Ask a question or share a message..."
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <Button className="col-span-12 lg:col-span-2 w-full" disabled={isLoading}>
                Generate
              </Button>
            </form>
          </Form>
        </div>

        {/* Display messages and sentiment analysis */}
        <div className="space-y-4 mt-4">
          <div className="flex flex-col-reverse gap-y-4">
            {messages.map((message, index) => (
              <div key={index} className="bg-gray-100 p-4 rounded-lg">
                <p className="text-sm">{message.content}</p>
                {message.sentimentScore !== undefined && (
                  <p className="text-xs text-gray-500">
                    Sentiment Score: {message.sentimentScore} (Magnitude: {message.sentimentMagnitude})
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConversationPage;
