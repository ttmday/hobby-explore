"use client";

import ActivitySchema from "@/schemas/activities/ActivitySchema";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import { cn } from "@/lib/utils";
import { ACTIVITIES_CATEGORIES } from "@/constants/activities/categories";
import { CheckIcon, ChevronDown } from "lucide-react";
import { Slider } from "../ui/slider";
import Dropzone from "react-dropzone";
import Image from "next/image";
import { X} from "lucide-react"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

// Modal requirements:
// Description: Refers to a brief activity description (50 - 100 characters) ✅
// Name: Refers to the activity name to be displayed (50 - 120 characters) ✅
// Accessibility: Refers to how accessible an activity is economically (Numeric value from 0 to 100). The shorten the value, the cheaper the activity
// Category: Refers to the category of the activity that is displayed in a list. Select the most appropriate one for your activity ✅
// Tips: Refers to small short cards with images about your activity. Tips are meant to be short in description (50 - 100).
// Tips - Images: Refers to the image of one tip. A tip can only have one image and you can have a maximum of 4 tips and a minimum of 3 tips.
// Participants: Refers to the number of participants in one activity. (Min. 1 - Max. 100)

// Possible components:
// Tip Card - Starts as an empty dropzone. Once you put an image, you actually start to edit one tip
// Name input - Just a normal input to write text lol ✅
// Category Selector - A selector to select categories ✅
// Description - Textarea thing ✅
// Two slider selection - Slider elector to select the min. accessibility value and the max. one.
// Normal slider - Normal slider to select the amount of participants ✅

// First step, create the Zod Schema

// TODO: ADD DEFAULT VALUES FROM API WHEN EDITING
export function CreateActivityModal() {
  const TIPS_ARRAY = Array.from({ length: 4 }, () => ({
    description: "",
    imageFile: undefined,
  }));
  const categories = Object.entries(ACTIVITIES_CATEGORIES).map(
    ([label, value]) => ({ label, value })
  );

  const form = useForm<z.infer<typeof ActivitySchema>>({
    resolver: zodResolver(ActivitySchema),
    defaultValues: {
      tips: TIPS_ARRAY,
    },
  });

  const { control } = form;
  const { register } = form;

  const { fields, append, prepend, remove, swap, move, insert } = useFieldArray(
    {
      control,
      name: "tips",
    }
  );

  function onSubmit(values: z.infer<typeof ActivitySchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="My Activity" {...field} />
              </FormControl>
              <FormDescription>The name of your activity.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Tell us a bit about your activity"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Explain briefly what's your activity about. Let the tips do the
                rest of the work.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="participants"
          render={({ field: { onChange, value } }) => (
            <FormItem>
              <FormLabel>Participants</FormLabel>
              <FormControl>
                <Slider
                  onValueChange={onChange}
                  defaultValue={[value ? value[0] : 1]}
                  min={1}
                  max={100}
                  step={1}
                  className={cn("w-[60%]")}
                />
              </FormControl>
              <FormDescription>
                {`Number of participants: ${value ? value[0] : 1}`}
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Category</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      role="combobox"
                      className={cn(
                        "w-[200px] justify-between",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value
                        ? categories.find(
                            (category) => String(category.value) === field.value
                          )?.label
                        : "Select category"}
                      <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0">
                  <Command>
                    <CommandInput
                      placeholder="Search category..."
                      className="h-9"
                    />
                    <CommandEmpty>No category found.</CommandEmpty>
                    <CommandGroup>
                      {categories.map((category) => (
                        <CommandItem
                          value={category.label}
                          key={category.value}
                          onSelect={() => {
                            form.setValue("category", String(category.value));
                          }}
                        >
                          {category.label}
                          <CheckIcon
                            className={cn(
                              "ml-auto h-4 w-4",
                              String(category.value) === field.value
                                ? "opacity-100"
                                : "opacity-0"
                            )}
                          />
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </Command>
                </PopoverContent>
              </Popover>
              <FormDescription>
                This is your activity category. Use a proper one according to
                what you're posting.
              </FormDescription>
              <FormMessage className="min-h-4" />
            </FormItem>
          )}
        />

        <h3>Tips</h3>
        <FormDescription>Get started uploading tips and images for your hobby. Tips are pretty much your explanations or thoughts about your activity.</FormDescription>
        <ul className="flex flex-col gap-4">
          {fields.map((item, index) => (
            <li key={item.id}>
              {form.watch(`tips.${index}.imageFile`) === undefined ? (
                <Controller
                  control={form.control}
                  name={`tips.${index}.imageFile`}
                  rules={{
                    required: {
                      value: true,
                      message: "This field is required",
                    },
                  }}
                  render={({ field: { onChange, onBlur }, fieldState }) => (
                    <Dropzone
                      noClick
                      onDrop={(acceptedFiles) => {
                        form.setValue(
                          `tips.${index}.imageFile`,
                          acceptedFiles as unknown as File[],
                          {
                            shouldValidate: true,
                          }
                        );
                      }}
                    >
                      {({
                        getRootProps,
                        getInputProps,
                        open,
                        isDragActive,
                        acceptedFiles,
                      }) => (
                        <Card
                          className={`border-2 border-dashed bg-muted hover:cursor-pointer duration-200 hover:border-muted-foreground/50`}
                        >
                          <CardContent
                            className="flex flex-col items-center justify-center space-y-2 px-2 py-4 text-xs"
                            {...getRootProps()}
                          >
                            <div className="flex items-center justify-center text-muted-foreground">
                              <span className="font-medium">
                                Drag Files to Upload or
                              </span>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="ml-auto flex h-8 space-x-2 px-0 pl-1 text-xs"
                                onClick={open}
                              >
                                Click Here
                              </Button>
                              <input
                                {...getInputProps({
                                  id: "spreadsheet",
                                  onChange,
                                  onBlur,
                                })}
                              />
                            </div>
                            <span
                              className="block font-medium text-red-500"
                              role="alert"
                            >
                              {fieldState.error && fieldState.error.message}
                            </span>
                          </CardContent>
                        </Card>
                      )}
                    </Dropzone>
                  )}
                />
              ) : (
                <li>
                  <Card className="rounded-2xl hover:shadow-sm hover:border-mainGreen relative duration-200 w-[350px] h-[380px]">
                    <div className="relative">
                      <Image
                        width={0}
                        height={0}
                        className="object-cover rounded-t-2xl w-full max-h-[300px] h-[250px]"
                        src={URL.createObjectURL(
                          form.getValues(`tips.${index}.imageFile.${0}`)
                        )}
                        alt={`Tip #${index + 1}`}
                      />
                      <Button type="button" onClick={() => form.setValue(
                          `tips.${index}.imageFile`,
                          undefined as any)} className="bg-white p-1 rounded-full absolute top-4 right-4 w-8 h-8 hover:bg-white/90">
                        <X className="text-mainBlack text-sm" />
                      </Button>
                    </div>
                    <FormField
                      control={form.control}
                      name={`tips.${index}.description`}
                      render={({ field }) => (
                        <FormItem className="p-4">
                          <FormLabel className=" text-gray text-sm">
                            Tip #{index + 1}
                          </FormLabel>
                          <FormControl>
                            <Textarea
                              className="!outline-none resize-none !p-0 !focus-visible:ring-transparent !focus-visible:ring-offset-transparent !border-none"
                              placeholder="Share some tips or your thoughts..."
                              {...field}
                            />
                          </FormControl>
        
                        </FormItem>
                      )}
                    />
                  </Card>
                </li>
              )}
            </li>
          ))}
        </ul>

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
