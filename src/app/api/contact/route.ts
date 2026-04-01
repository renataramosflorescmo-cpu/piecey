import { NextResponse } from "next/server";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  message: z.string().min(10),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const data = contactSchema.parse(body);

    // TODO: Send email via Resend, SendGrid, or save to Supabase
    console.log("Contact form submission:", data);

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Dados inválidos." },
      { status: 400 }
    );
  }
}
