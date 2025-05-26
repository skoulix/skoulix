import { Resend } from 'resend';
import { z } from 'zod';
import sanitizeHtml from 'sanitize-html';

const resend = new Resend(process.env.RESEND_API_KEY);

const ContactSchema = z.object({
    name: z.string().min(1, 'Name is required'),
    email: z.string().email('Invalid email'),
    message: z.string().min(1, 'Message is required'),
});

export default defineEventHandler(async (event) => {
    if (event.method !== 'POST') {
        return sendError(
            event,
            createError({
                statusCode: 405,
                statusMessage: 'Only POST allowed',
            }),
        );
    }

    const body = await readBody(event);

    // ✅ Validate input
    const result = ContactSchema.safeParse(body);
    if (!result.success) {
        return sendError(
            event,
            createError({
                statusCode: 400,
                statusMessage: 'Validation failed',
                data: result.error.flatten().fieldErrors,
            }),
        );
    }

    // ✅ Sanitize message
    const { name, email, message } = result.data;
    const cleanMessage = sanitizeHtml(message, {
        allowedTags: [],
        allowedAttributes: {},
    });

    try {
        // ✅ Send email with Resend
        await resend.emails.send({
            from: 'Contact Form <evan@send.seapixel.com>',
            to: ['evan@seapixel.com'],
            subject: 'New Contact Form Submission',
            reply_to: email,
            html: `
                <h2>New Message</h2>
                <p><strong>Name:</strong> ${sanitizeHtml(name)}</p>
                <p><strong>Email:</strong> ${sanitizeHtml(email)}</p>
                <p><strong>Message:</strong><br/>${cleanMessage.replace(/\n/g, '<br/>')}</p>
            `,
        });

        return { success: true };
    } catch (error) {
        console.error('Resend error:', error);
        return sendError(
            event,
            createError({
                statusCode: 500,
                statusMessage: 'Email failed to send',
            }),
        );
    }
});
