import { Resend } from "resend";
import { z } from "zod";
import ContactEmail from "@/lib/email/templates/ContactEmail";

export const runtime = "edge";

const payloadSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  message: z.string().min(10)
});

export async function POST(request: Request) {
  try {
    const json = await request.json();
    const parsed = payloadSchema.safeParse(json);

    if (!parsed.success) {
      return new Response(JSON.stringify({ ok: false, issues: parsed.error.issues }), {
        status: 422,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const resendApiKey = process.env.RESEND_API_KEY;
    const basePayload = {
      from: "KingpiN Vision Forge <noreply@kingpinvisionforge.com>",
      to: ["ops@kingpinvisionforge.com"],
      subject: `New Neural Inquiry from ${parsed.data.name}`,
      react: ContactEmail({
        name: parsed.data.name,
        email: parsed.data.email,
        message: parsed.data.message
      })
    };

    if (resendApiKey) {
      const resend = new Resend(resendApiKey);
      await resend.emails.send(basePayload);
    } else {
      console.info("RESEND_API_KEY missing – mocked email", basePayload);
    }

    return new Response(JSON.stringify({ ok: true }), { status: 200, headers: { 'Content-Type': 'application/json' } });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ ok: false }), { status: 500, headers: { 'Content-Type': 'application/json' } });
  }
}
