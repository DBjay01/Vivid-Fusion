"use client" ;

import { LanguageServiceClient } from '@google-cloud/language';
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { CodeIcon, ImageIcon, MessageSquare, Music } from "lucide-react";
import { useRouter } from "next/navigation";
//import type { ChatCompletionRequestMessage } from "openai";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";


import { Heading } from "@/components/heading";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { cn } from "@/lib/utils";
import { formSchema } from "./constants";



const MusicPage = () => {

    const router = useRouter();
    const [music, setMusic] = useState<string>();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
         prompt: "",
        }
      });

      const isLoading = form.formState.isSubmitting;
      
      const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
          setMusic(undefined);
    
          const response = await axios.post("/api/music", values);
    
          setMusic(response.data.audio);
          form.reset();
        } catch (error: any) {
         // if (axios.isAxiosError(error) && error?.response?.status === 403)
         // else toast.error("Something went wrong.");
    
          console.error(error);
        } finally {
          router.refresh();
        }
      };

    return(
    <div>
    <Heading
        title="Code Generation"
        description="generate code just the algorithm"
        icon={CodeIcon}
        iconColor="text-green-500"
        bgColor="bg-green-500/10"
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
                        placeholder="Piano solo"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

                <Button
                className="col-span-12 lg:col-span-2 w-full"
                disabled={isLoading}
              >
                Generate
              </Button>
            </form>
          </Form>
        </div>
        <div className="space-y-4 mt-4">

        <div className="flex flex-col-reverse gap-y-4">
        {isLoading && (
            <div className="p-8 rounded-lg w-full flex items-center justify-center bg-muted">
              {/* <Loader /> */}
            </div>
          )}
          {!music && !isLoading }

          {music && (
            <audio controls className="w-full mt-8">
              <source src={music} />
            </audio>
          )}
          </div>
        </div>

    </div>
    </div>
    );
}

export default MusicPage;