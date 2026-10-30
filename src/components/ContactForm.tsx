"use client";

import { FormEvent, useState } from "react";

const careOptions = ["Personal care assistance", "Companionship and supervision", "Household assistance", "Respite services", "Not sure yet"];

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    setStatus("sending");
    setMessage("");
    const data = Object.fromEntries(new FormData(form).entries());
    try {
      const response = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
      const result: { error?: string } = await response.json();
      if (!response.ok) throw new Error(result.error || "Could not send the request.");
      form.reset();
      setStatus("success");
      setMessage("Your request was sent. Our team will contact you soon.");
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "Something went wrong. Please call or email us instead.");
    }
  }

  return (
    <form onSubmit={submit} aria-label="Start your care conversation">
      <div className="row">
        <label>First name<input name="first" required maxLength={80} autoComplete="given-name" /></label>
        <label>Last name<input name="last" required maxLength={80} autoComplete="family-name" /></label>
      </div>
      <div className="row">
        <label>Email<input type="email" name="email" required maxLength={254} autoComplete="email" /></label>
        <label>Phone<input type="tel" name="phone" required maxLength={40} autoComplete="tel" /></label>
      </div>
      <div className="row">
        <label>Type of care<select name="care">{careOptions.map(option => <option key={option}>{option}</option>)}</select></label>
        <label>City where care is needed<input name="city" maxLength={120} autoComplete="address-level2" /></label>
      </div>
      <label>Message (optional)<textarea name="msg" maxLength={3000} placeholder="Please avoid including sensitive medical information." /></label>
      <div className="trap" aria-hidden="true"><label>Leave this field empty<input name="website" tabIndex={-1} autoComplete="off" /></label></div>
      <p className="fine">Do not include medical records or other sensitive information in this form. For urgent assistance, call emergency services.</p>
      <button className="btn brand" type="submit" disabled={status === "sending"}>{status === "sending" ? "Sending…" : "Send request"}</button>
      {message && <p role={status === "error" ? "alert" : "status"} className={status === "error" ? "form-error" : "form-success"}>{message}</p>}
    </form>
  );
}
