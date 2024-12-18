# GForm Quick Submit Wiki

This package allows you to quickly submit data to forms. Using this tool, you can easily integrate features like contact forms into your website. Since Google Forms is free to use, it’s also perfect for beginners.

**Note**

> Google Forms has a limit on the number of submissions, making it unsuitable for large-scale commercial use.

# Tutorial

This tutorial will guide you through creating a basic contact form.

- [Create a Google Form](#1-create-a-google-form)
- [Build an Input Form](#2-build-an-input-form)
- [Setup and Explanation of the Package](#3-setup-and-explanation-of-the-package)
  - [Configure from the Form Response Page URL](#configure-from-the-form-response-page-url)
  - [Configure using the Form ID](#configure-using-the-form-id)
- [Retrieve Entry IDs](#4-retrieve-entry-ids)
- [Set Up the Submission Function](#5-set-up-the-submission-function)
- [Test the Form Submission](#6-test-the-form-submission)

## 1. Create a Google Form

Start by preparing your form. If you don’t already have one, create a new Google Form. For this tutorial, we’ll use the form shown in the image below.

**Note**

> If your Google Form is not set to public, submissions might fail. Check the settings menu of your form and ensure that it doesn’t require responders to log in with a Google account.

![GForm Quick Submit Template Form](https://github.com/user-attachments/assets/c4509126-5da2-44b3-9886-2d9dc06e55d7)

## 2. Build an Input Form

### Setup and Install Packages

```bash
npx create-next-app@latest nextjs-tutorial
```

```bash
npm i zod react-hook-form @hookform/resolvers gform-quick-submit
```

### Create the Form

To learn more about creating forms, refer to the [React Hook Form](https://react-hook-form.com/) documentation. For this tutorial, copy the following code into your root page file. The `onSubmit` function is initially empty, but we will define it in the next step.

```page.tsx
"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { GFromQuickSubmitFormPOST } from "gform-quick-submit";

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [formState, setFormState] = useState(false);
  const [formError, setFormError] = useState(undefined);

  const contactSchema = z.object({
    company: z.string().optional(),
    name: z.string().min(1, "Please enter your name"),
    email: z.string().email("Enter a valid email address"),
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

  const onSubmit = async (data: ContactFormValues) => {};

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
                  <h2 className="mb-2">Company</h2>
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

## 3. Setup and Explanation of the Package

In this step, we'll configure the `gform-quick-submit` package. You can choose one of the following two methods:

### Configure from the Form Response Page URL

1. Open the **Response Page** of your Google Form.
2. Right-click on the page and select **Inspect**.
3. Look for the form action URL (it should start with `https://docs.google.com/forms/u/...`).
4. Copy and paste this URL into the `new GFormQuickSubmit()` constructor.

For example:

```typescript
import { GFormQuickSubmit } from "gform-quick-submit";

const gform = new GFormQuickSubmit(
  "https://docs.google.com/forms/u/0/d/FORM_ID/formResponse"
);
```

### Configure Using the Form ID

Alternatively, you can use only the form's ID (you can find this in the Google Form URL after `/d/`).

For example:

```typescript
import { GFormQuickSubmit } from "gform-quick-submit";

const gform = new GFormQuickSubmit("FORM_ID");
```

**Note**

> If you use the Form ID method, ensure your form is publicly accessible. Otherwise, the submission will fail.

## 4. Retrieve Entry IDs

Each field in your Google Form has a unique `entry ID`. You need these IDs to map the input fields in your website form to the corresponding fields in the Google Form.

### Finding Entry IDs

1. Open your Google Form's **Response Page**.
2. Right-click on the field you want to inspect and select **Inspect**.
3. Look for the `name` attribute of the `<input>` or `<textarea>` element. It will look something like `entry.123456`.
4. Copy the number after `entry.`—this is the field's `entry ID`.

### Example

For example, if your form has the following fields:

- **Company**: `entry.123456`
- **Name**: `entry.654321`
- **Email**: `entry.987654`
- **Message**: `entry.456789`

You'll use these IDs in your submission function.

## 5. Set Up the Submission Function

Now, let's define the `onSubmit` function in your input form code.

```typescript
const onSubmit = async (data: ContactFormValues) => {
  setIsLoading(true);
  setFormState(false);
  setFormError(undefined);

  try {
    // Initialize GFormQuickSubmit with your form's response URL or ID
    const gform = new GFormQuickSubmit("FORM_ID");

    // Map your form data to Google Form entry IDs
    const result = await gform.submit({
      "entry.123456": data.company,
      "entry.654321": data.name,
      "entry.987654": data.email,
      "entry.456789": data.message,
    });

    console.log("Submission successful", result);
    setFormState(true);
    reset(); // Reset the form after successful submission
  } catch (error) {
    console.error("Error submitting the form:", error);
    setFormError("Failed to submit the form. Please try again.");
  } finally {
    setIsLoading(false);
  }
};
```

## 6. Test the Form Submission

Finally, run your project and test the form submission.

1. Start your development server:

```bash
npm run dev
```

2. Open your form in a browser and fill it out.

3. Click the **Submit** button.

4. Check your Google Form response sheet to confirm that the data was submitted successfully.

---

This concludes the basic tutorial for integrating Google Forms with `gform-quick-submit`. You can now use this setup to quickly add forms to your website.

Tutorial Source code: https://github.com/Fun117/gform-quick-submit/tree/main/templates/nextjs-tutorial
