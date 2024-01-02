"use server";
const stripe = require("stripe")(process.env.STRIPE_TEST_SECRET_KEY!);

export async function getStripeCheckoutSession() {
  try {
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price: process.env.STRIPE_PRICE_ID,
          quantity: 1,
        },
      ],
      mode: "subscription",
      success_url:
        "https://disabilityforums.vercel.app/dashboard/payments?success=true",
    });
    return {
      id: session.id,
    };
  } catch (error) {
    return null;
  }
}
