import { Resend } from 'resend';
import { z } from 'zod/v4';

const newsletterSchema = z.object({
  email: z.email("Invalid email address")
});

export default defineEventHandler(async (event) => {
  // 1. Method Validation
  assertMethod(event, ['POST']);

  // 2. Body Validation
  const result = await readValidatedBody(event, newsletterSchema.safeParse);

  if (!result.success) {
    throw createError({
      statusCode: 400,
      statusMessage: result.error.message,
    });
  }

  const { email } = result.data;
  const config = useRuntimeConfig();

  // Ensure your API key is in .env as RESEND_API_KEY
  const resend = new Resend(config.resendApiKey);

  try {
    // 3. Resend Audience Integration
    // You'll need an Audience ID from the Resend dashboard
    await resend.contacts.create({
      email,
      audienceId: config.resendAudienceId,
      unsubscribed: false,
    });

    return {
      ok: true,
      message: "Welcome to the family! Check your inbox soon."
    };
  } catch (err: any) {
    // Handle Resend-specific errors (e.g., contact already exists)
    const isDuplicate = err.message?.includes('422') || err.name === 'error_422';

    return {
      ok: false,
      message: isDuplicate ? "You're already on the list! ❤️" : "Could not sign you up at this time."
    }
  }
});
