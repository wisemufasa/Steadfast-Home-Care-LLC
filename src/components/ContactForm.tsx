
"use client";

import { useState, type FormEvent } from "react";

const careOptions = [
  "Personal care assistance",
  "Companionship and supervision",
  "Household assistance",
  "Respite services",
  "Not sure yet",
];

type FormStatus = "idle" | "sending" | "success" | "error";

export default function ContactForm() {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [message, setMessage] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;

    // Ignore submissions caught by the spam protection field.
    const formData = new FormData(form);
    if (formData.get("website")) return;

    setStatus("sending");
    setMessage("");

    const data = Object.fromEntries(formData.entries());

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result: { error?: string } = await response.json();

      if (!response.ok) {
        throw new Error(
          result.error || "Could not send your request. Please try again."
        );
      }

      form.reset();
      setStatus("success");
      setMessage(
        "Your request was sent successfully. Our team will contact you soon."
      );
    } catch (error) {
      setStatus("error");
      setMessage(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please call or email us instead."
      );
    }
  }

  return (
    <form
      onSubmit={submit}
      aria-label="Start your care conversation"
      className="contact-form"
    >
      <div className="row form-row">
        <label htmlFor="first">
          First Name *
          <input
            id="first"
            name="first"
            type="text"
            placeholder="First name"
            required
            maxLength={80}
            autoComplete="given-name"
          />
        </label>

        <label htmlFor="last">
          Last Name *
          <input
            id="last"
            name="last"
            type="text"
            placeholder="Last name"
            required
            maxLength={80}
            autoComplete="family-name"
          />
        </label>
      </div>

      <div className="row form-row">
        <label htmlFor="email">
          Email Address *
          <input
            id="email"
            name="email"
            type="email"
            placeholder="you@example.com"
            required
            maxLength={254}
            autoComplete="email"
          />
        </label>

        <label htmlFor="phone">
          Phone Number *
          <input
            id="phone"
            name="phone"
            type="tel"
            placeholder="(555) 555-5555"
            required
            maxLength={40}
            autoComplete="tel"
          />
        </label>
      </div>

      <div className="row form-row">
        <label htmlFor="care">
          Type of Care *
          <select id="care" name="care" defaultValue="" required>
            <option value="" disabled>
              Select a service
            </option>

            {careOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>

        <label htmlFor="city">
          City Where Care Is Needed
          <input
            id="city"
            name="city"
            type="text"
            placeholder="Enter city"
            maxLength={120}
            autoComplete="address-level2"
          />
        </label>
      </div>

      <label htmlFor="msg">
        How Can We Help?
        <textarea
          id="msg"
          name="msg"
          rows={5}
          maxLength={3000}
          placeholder="Tell us a little about the assistance you are looking for. Please avoid including sensitive medical information."
        />
      </label>

      {/* Spam protection
      <div className="trap" aria-hidden="true">
        <label htmlFor="website">
          Leave this field empty
          <input
            id="website"
            name="website"
            type="text"
            tabIndex={-1}
            autoComplete="off"
          />
        </label>
      </div> */}

      <p className="fine">
        Please do not include medical records, diagnoses, medication
        information, or other sensitive health information in this form.
        For urgent assistance, contact emergency services.
      </p>

      <button
        className="btn brand"
        type="submit"
        disabled={status === "sending"}
      >
        {status === "sending" ? "Sending..." : "Send Request"}
      </button>

      {message && (
        <p
          role={status === "error" ? "alert" : "status"}
          aria-live="polite"
          className={
            status === "error" ? "form-error" : "form-success"
          }
        >
          {message}
        </p>
      )}
    </form>
  );
}
