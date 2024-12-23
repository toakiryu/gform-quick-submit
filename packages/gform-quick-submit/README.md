# GForm Quick Submit Wiki

This package allows you to quickly send data to a form. With this tool, you can easily integrate forms like contact forms into your website. Since Google Forms is free to use, this package is ideal for beginners.

For the latest documentation, please refer to the [official repository Wiki](https://github.com/toakiryu/gform-quick-submit/wiki).

**Note**

> Google Forms has submission limits and is therefore not suitable for large-scale commercial use.

# Tutorial

This tutorial will guide you through creating a basic contact form.

- [Create a Google Form](#1-create-a-google-form)
- [Create an Input Form](#2-create-an-input-form)
- [Setup and Configure the Package](#3-setup-and-configure-the-package)
  - [Configure Using the Form's Response Page URL](#configure-using-the-forms-response-page-url)
  - [Configure Using the Form ID](#configure-using-the-form-id)
- [Retrieve Entry IDs](#4-retrieve-entry-ids)
- [Set Up the Submission Function](#5-set-up-the-submission-function)
- [Test Submitting the Form](#6-test-submitting-the-form)

## 1. Create a Google Form

First, prepare your form. If you don't already have one, create a new Google Form. For this tutorial, we will use the form shown in the image below.

**Note**

> If your Google Form is not publicly accessible, submissions may fail. In the "Settings" menu, ensure the form does not require users to log in with a Google account.

![GForm Quick Submit Template Form](https://github.com/user-attachments/assets/c4509126-5da2-44b3-9886-2d9dc06e55d7)

## 2. Create an Input Form

### Setup and Install the Package

```bash
npx create-next-app@latest nextjs-tutorial
```

```bash
npm i zod react-hook-form @hookform/resolvers gform-quick-submit
```

### Build the Form

Refer to the [react-hook-form](https://react-hook-form.com/) documentation if you want to learn more about creating forms. For this tutorial, paste the following code into the root page file. The `onSubmit` function is empty for now but will be completed in the next steps.

```page.tsx
"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { GFromQuickSubmitFormPOST } from "gform-quick-submit";

export default function Home() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [formState, setFormState] = useState<boolean>(false);
  const [formError, setFormError] = useState<unknown | undefined>(undefined);

  const contactSchema = z.object({
    company: z.string().optional(),
    name: z.string().min(1, "Please enter your name"),
    email: z.string().email("Please enter a valid email address"),
    message: z.string().min(1, "Please enter a message"),
  });

  type ContactFormValues = z.infer<typeof contactSchema>;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormValues) => {
  };

  return (
    <div className="flex justify-center items-center w-full h-full min-h-dvh">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="container max-w-sm p-5 rounded-2xl border border-neutral-800 bg-neutral-900 shadow-lg"
      >
        <div>
          <div className="mb-5">
            <h1 className="font-bold text-xl">Contact Us</h1>
          </div>
          {formState ? (
            <div>Form submitted successfully.</div>
          ) : (
            <>
              <div className="flex flex-col gap-4 w-full">
                <label htmlFor="company">
                  <h2 className="mb-2">Company Name</h2>
                  <input
                    id="company"
                    type="text"
                    {...register("company")}
                    className="w-full py-1 px-2 bg-neutral-800 border border-neutral-700 rounded-lg"
                  />
                </label>
                <label htmlFor="name">
                  <h2 className="mb-2">Name*</h2>
                  <input
                    id="name"
                    type="text"
                    placeholder="Guest"
                    {...register("name")}
                    className={`w-full py-1 px-2 bg-neutral-800 border ${
                      errors.name?.message
                        ? "border-red-500"
                        : "border-neutral-700"
                    } rounded-lg`}
                  />
                  <p className="text-sm text-red-500 mt-2">
                    {errors.name?.message}
                  </p>
                </label>
                <label htmlFor="email">
                  <h2 className="mb-2">Email*</h2>
                  <input
                    id="email"
                    type="email"
                    placeholder="example@gmail.com"
                    {...register("email")}
                    className={`w-full py-1 px-2 bg-neutral-800 border ${
                      errors.email?.message
                        ? "border-red-500"
                        : "border-neutral-700"
                    } rounded-lg`}
                  />
                  <p className="text-sm text-red-500 mt-2">
                    {errors.email?.message}
                  </p>
                </label>
                <label htmlFor="message">
                  <h2 className="mb-2">Message*</h2>
                  <textarea
                    id="message"
                    placeholder="Hello"
                    {...register("message")}
                    className={`w-full py-1 px-2 bg-neutral-800 border ${
                      errors.message?.message
                        ? "border-red-500"
                        : "border-neutral-700"
                    } rounded-lg`}
                  />
                  <p className="text-sm text-red-500 mt-2">
                    {errors.message?.message}
                  </p>
                </label>
              </div>
              <hr className="my-2 border-neutral-700" />
              <div>
                <div className="flex flex-col">
                  {formState && (
                    <div className="mb-3">
                      <p className="text-sm text-red-500">
                        {formError as string}
                      </p>
                    </div>
                  )}
                  <div className="flex gap-2">
                    <button
                      type="submit"
                      color="primary"
                      disabled={isSubmitting || isLoading}
                      className="bg-white text-black min-w-16 py-1 px-2 border rounded-lg hover:opacity-80 active:scale-95 transition-all duration-300 ease-in-out"
                    >
                      {isSubmitting || isLoading ? "Submitting..." : "Submit"}
                    </button>
                    <button
                      type="reset"
                      onClick={() => reset()}
                      disabled={isSubmitting || isLoading}
                      className="bg-white/10 text-white min-w-16 py-1 px-2 border border-white/10 rounded-lg hover:opacity-80 active:scale-95 transition-all duration-300 ease-in-out"
                    >
                      Reset
                    </button>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </form>
    </div>
  );
}
```

## 3. Setup and Configure the Package

To send data to Google Forms, you first need to configure the `gform-quick-submit` package. There are two ways to set it up:

- Using the Form's Response Page URL
- Using the Form ID

### Configure Using the Form's Response Page URL

1. Open your Google Form and submit a test response.
2. Navigate to the **Responses** tab and open the spreadsheet where the responses are stored.
3. Copy the URL of the response page.
4. Use this URL in the `GFormQuickSubmitFormPOST` function.

### Configure Using the Form ID

1. Open your Google Form and locate the Form ID in the URL.  
   Example: In `https://docs.google.com/forms/d/e/1FAIpQLSfEXAMPLE/viewform`, the Form ID is `1FAIpQLSfEXAMPLE`.
2. Use this Form ID in the configuration object.

---

## 4. Retrieve Entry IDs

Each field in a Google Form is assigned a unique `entry ID`. This ID is required to correctly map your form fields to the data used in `gform-quick-submit`.

To simplify the process of retrieving entry IDs, follow these steps:

### Use the Entry ID Detection Tool

1. Visit the [Entry ID Detection Tool](https://gform-quick-submit.toakiryu.com/entriesparse).
2. Enter the URL of your Google Form and click the "Detect Entry IDs" button.
3. The tool will display a list of field names and their corresponding entry IDs.
4. Copy these entry IDs and use them in your configuration.

> **Note**: If the tool is not functioning, refer to the manual method for inspecting the network tab (detailed below).

---

## 5. Set Up the Submission Function

Now that you have the form URL or ID and the entry IDs, configure the `onSubmit` function.

```page.tsx
import { GFormQuickSubmitFormPOST } from "gform-quick-submit";

const onSubmit = async (data: ContactFormValues) => {
  setIsLoading(true);
  setFormError(undefined);

  try {
    const response = await GFormQuickSubmitFormPOST({
      data: {
        "entry.123456789": data.company,
        "entry.987654321": data.name,
        "entry.456789123": data.email,
        "entry.654321987": data.message,
      },
    });

    if (response.ok) {
      setFormState(true);
      reset();
    } else {
      throw new Error("Failed to submit the form.");
    }
  } catch (error) {
    console.error("Error:", error);
    setFormError(error.message);
  } finally {
    setIsLoading(false);
  }
};
```

Replace `YOUR_FORM_ID` and the `entry IDs` with the values from your Google Form.

---

## 6. Test Submitting the Form

Run your application locally using the following command:

```bash
npm run dev
```

Access the form in your browser, fill out the fields, and submit the form. Check the Google Form's response spreadsheet to confirm that the data has been successfully submitted.

---

## Conclusion

Congratulations! You have successfully integrated the `gform-quick-submit` package into your form. For further customization and advanced use cases, please refer to the [official repository Wiki](https://github.com/toakiryu/gform-quick-submit/wiki).
