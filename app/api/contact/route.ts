import nodemailer from "nodemailer";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

type ContactFormPayload = {
  name: string;
  email: string;
  purpose: string;
  message: string;
};

type ValidationErrors = Partial<Record<keyof ContactFormPayload, string>>;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const PURPOSE_LABELS: Record<string, string> = {
  speaking: "Speaking Engagement",
  investment: "Real Estate Investment",
  podcast: "Podcast / Media",
  partnership: "Partnership",
  other: "Other",
};

function normalizeField(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function validatePayload(payload: Record<string, unknown>): {
  data: ContactFormPayload;
  errors: ValidationErrors;
} {
  const data: ContactFormPayload = {
    name: normalizeField(payload.name),
    email: normalizeField(payload.email),
    purpose: normalizeField(payload.purpose),
    message: normalizeField(payload.message),
  };

  const errors: ValidationErrors = {};

  if (!data.name) {
    errors.name = "Please enter your name.";
  } else if (data.name.length > 120) {
    errors.name = "Your name is too long.";
  }

  if (!data.email) {
    errors.email = "Please enter your email address.";
  } else if (!EMAIL_PATTERN.test(data.email)) {
    errors.email = "Enter a valid email address.";
  }

  if (!data.purpose) {
    errors.purpose = "Select a reason for getting in touch.";
  } else if (!PURPOSE_LABELS[data.purpose]) {
    errors.purpose = "Select a valid reason for getting in touch.";
  }

  if (!data.message) {
    errors.message = "Please add a short message.";
  } else if (data.message.length > 5000) {
    errors.message = "Your message is too long.";
  }

  return { data, errors };
}

function getTransporter() {
  const host = process.env.SMTP_HOST ?? "smtp.gmail.com";
  const port = Number(process.env.SMTP_PORT ?? 465);
  const secure = (process.env.SMTP_SECURE ?? "true").toLowerCase() !== "false";
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!user || !pass) {
    throw new Error("Missing SMTP credentials.");
  }

  return nodemailer.createTransport({
    host,
    port,
    secure,
    auth: {
      user,
      pass,
    },
  });
}

export async function POST(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { message: "The submitted form data could not be read." },
      { status: 400 }
    );
  }

  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return NextResponse.json(
      { message: "The submitted form data is invalid." },
      { status: 400 }
    );
  }

  const { data, errors } = validatePayload(body as Record<string, unknown>);

  if (Object.keys(errors).length > 0) {
    return NextResponse.json(
      {
        message: "Please correct the highlighted fields and try again.",
        errors,
      },
      { status: 400 }
    );
  }

  const to = process.env.CONTACT_TO_EMAIL ?? "achodoconfidence@gmail.com";
  const from = process.env.CONTACT_FROM_EMAIL ?? process.env.SMTP_USER;

  if (!from) {
    console.error("Contact form email rejected: missing sender address.");

    return NextResponse.json(
      {
        message:
          "Email delivery is not configured yet. Please email achodoconfidence@gmail.com directly.",
      },
      { status: 500 }
    );
  }

  try {
    const transporter = getTransporter();
    const purposeLabel = PURPOSE_LABELS[data.purpose] ?? data.purpose;
    const safeName = escapeHtml(data.name);
    const safeEmail = escapeHtml(data.email);
    const safePurposeLabel = escapeHtml(purposeLabel);
    const safeMessage = escapeHtml(data.message).replace(/\n/g, "<br />");

    await transporter.sendMail({
      to,
      from: `Confidence Molade Website <${from}>`,
      replyTo: data.email,
      subject: `New website enquiry: ${purposeLabel}`,
      text: [
        "A new contact form submission was received.",
        "",
        `Name: ${data.name}`,
        `Email: ${data.email}`,
        `Purpose: ${purposeLabel}`,
        "",
        "Message:",
        data.message,
      ].join("\n"),
      html: `
        <p>A new contact form submission was received.</p>
        <p><strong>Name:</strong> ${safeName}</p>
        <p><strong>Email:</strong> ${safeEmail}</p>
        <p><strong>Purpose:</strong> ${safePurposeLabel}</p>
        <p><strong>Message:</strong></p>
        <p>${safeMessage}</p>
      `,
    });

    return NextResponse.json({
      message: "Message sent successfully. I'll be in touch soon.",
    });
  } catch (error) {
    console.error("Contact form email delivery failed:", error);

    return NextResponse.json(
      {
        message:
          "Something went wrong while sending your message. Please email achodoconfidence@gmail.com directly.",
      },
      { status: 500 }
    );
  }
}
