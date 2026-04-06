require("dotenv").config({ path: ".env.local" });
const Stripe = require("stripe");

(async () => {
    const key = process.env.STRIPE_SECRET_KEY;
    const priceId = process.env.STRIPE_PRICE_ID;

    if (!key) throw new Error("Missing STRIPE_SECRET_KEY in .env.local");
    if (!priceId) throw new Error("Missing STRIPE_PRICE_ID in .env.local");

    const stripe = new Stripe(key);

    // Show which account the key is for
    const acct = await stripe.accounts.retrieve();
    console.log("KEY IS FOR ACCOUNT:", acct.id);
    console.log("Price ID:", priceId);

    // Try without Connect scoping
    try {
        const p1 = await stripe.prices.retrieve(priceId);
        console.log("✅ Found price WITHOUT stripeAccount");
        console.log("livemode:", p1.livemode);
    } catch (e) {
        console.log("❌ Not found WITHOUT stripeAccount:", e.message);
    }

    // Try WITH Connect scoping (Stripe-Account header)
    try {
        const p2 = await stripe.prices.retrieve(priceId, {
            stripeAccount: "acct_1Ha3m2AxgQ9lFyFZ",
        });
        console.log("✅ Found price WITH stripeAccount");
        console.log("livemode:", p2.livemode);
        console.log("product:", p2.product);
    } catch (e) {
        console.log("❌ Not found WITH stripeAccount:", e.message);
    }
})();
