import nodemailer from 'nodemailer';

const escapeHtml = (value) => value
  .replace(/&/g, '&amp;')
  .replace(/</g, '&lt;')
  .replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;')
  .replace(/'/g, '&#039;');

export async function POST(request) {
  try {
    const body = await request.json();
    const email = typeof body.email === 'string' ? body.email.trim() : '';
    const subject = typeof body.subject === 'string' ? body.subject.trim() : '';
    const message = typeof body.message === 'string' ? body.message.trim() : '';

    if (!email || !subject || !message) {
      return Response.json(
        { error: 'All fields are required.' },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return Response.json(
        { error: 'Invalid email address.' },
        { status: 400 }
      );
    }

    if (subject.length > 160 || message.length > 5000) {
      return Response.json(
        { error: 'Please keep the subject under 160 characters and the message under 5,000 characters.' },
        { status: 400 }
      );
    }

    const smtpUser = process.env.SMTP_USER;
    const smtpAppPassword = process.env.SMTP_APP_PASSWORD;

    if (!smtpUser || !smtpAppPassword) {
      console.error('Contact form SMTP configuration is missing.');
      return Response.json(
        { error: 'Mail delivery is not configured yet. Please contact Hafis directly.' },
        { status: 503 }
      );
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: smtpUser,
        pass: smtpAppPassword,
      },
    });

    const mailOptions = {
      from: `"Portfolio Contact" <${smtpUser}>`,
      to: smtpUser,
      replyTo: email,
      subject: `[Portfolio] ${subject}`,
      text: [
        `From: ${email}`,
        `Subject: ${subject}`,
        '',
        'Message:',
        message,
      ].join('\n'),
      html: `
        <div style="font-family: 'Helvetica Neue', Arial, sans-serif; max-width: 560px; margin: 0 auto; padding: 32px; background-color: #161616; color: #FAFAFA;">
          <div style="border-bottom: 1px solid rgba(255,255,255,0.12); padding-bottom: 16px; margin-bottom: 24px;">
            <p style="font-size: 11px; letter-spacing: 0.12em; text-transform: uppercase; color: #707070; margin: 0 0 4px;">SYSTEM :: MAIL TRANSMISSION</p>
            <h2 style="font-size: 18px; font-weight: 700; letter-spacing: 0.04em; text-transform: uppercase; margin: 0;">NEW PORTFOLIO INQUIRY</h2>
          </div>
          <div style="background-color: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08); padding: 10px 14px; margin-bottom: 24px; font-size: 13px;">
            <span style="color: #707070;">FROM:</span>&nbsp;
            <strong>${escapeHtml(email)}</strong>
          </div>
          <div style="margin-bottom: 16px;">
            <p style="font-size: 11px; letter-spacing: 0.1em; text-transform: uppercase; color: #707070; margin: 0 0 6px;">SUBJECT</p>
            <p style="font-size: 14px; margin: 0;">${escapeHtml(subject)}</p>
          </div>
          <div style="border-top: 1px solid rgba(255,255,255,0.08); padding-top: 16px;">
            <p style="font-size: 11px; letter-spacing: 0.1em; text-transform: uppercase; color: #707070; margin: 0 0 6px;">MESSAGE</p>
            <p style="font-size: 14px; line-height: 1.6; margin: 0; white-space: pre-wrap;">${escapeHtml(message)}</p>
          </div>
          <div style="border-top: 1px solid rgba(255,255,255,0.08); margin-top: 32px; padding-top: 16px;">
            <p style="font-size: 11px; color: #707070; margin: 0;">Sent via Portfolio Contact Form</p>
          </div>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);

    return Response.json({ success: true });
  } catch (error) {
    console.error('SMTP Error:', error);
    return Response.json(
      { error: 'Failed to send message. Please try again later.' },
      { status: 500 }
    );
  }
}
