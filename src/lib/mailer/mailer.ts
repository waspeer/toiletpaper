import nodemailer from 'nodemailer';
import Mustache from 'mustache';

import { ReceivedOrderPayload, Events } from '#root/lib/ledger/types';

const FROM_ADDRESS = 'Operation Toiletpaper <mail@klangstof.com>';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT as string),
  secure: false,
  auth: {
    user: process.env.SMTP_USER as string,
    pass: process.env.SMTP_PASSWORD as string,
  },
});

const sendConfirmationEmail = async ({
  donation,
  email,
  name,
  paymentId,
  products,
}: ReceivedOrderPayload) => {
  console.log('[mailer]: called for payment: %s', paymentId);

  let template: string;
  if (donation && !products.length) {
    console.log('[mailer]: donation confirmation template selected');
    template = (await import('./templates/donation-confirmation.html')).default;
  } else {
    console.log('[mailer]: order confirmation template selected');
    template = (await import('./templates/order-confirmation.html')).default;
  }
  const html = Mustache.render(template, { name, products });

  console.log('[mailer]: sending email to: %s', email);

  try {
    await transporter.sendMail({
      from: FROM_ADDRESS,
      to: email,
      subject: 'Order confirmation',
      html,
    });
    console.log('[mailer]: email sent');
    return Promise.resolve();
  } catch (error) {
    console.error('[mailer]: error while sending email', error);
    return Promise.reject();
  }
};

export const subscribe = (events: Events) => {
  events.ReceivedOrder.push(async (order) => {
    return sendConfirmationEmail(order);
  });
};
