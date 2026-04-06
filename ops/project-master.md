
---

## 6. DESIGN PRINCIPLES (LOCKED)

### Copy rules
- No “we”
- No therapy framing
- No exaggerated promises
- No “ritual” language
- Clear, grounded, emotionally precise tone

### UX rules
- Minimal
- Calm
- No distractions
- Single path, no branching

### Product rules
- One payment → one message → one reply
- No chat loop
- No retries
- No “account system”

---

## 7. WHAT IS NOT DONE YET

### 🔲 Stripe fully connected
- Keys not added yet
- Webhook not confirmed
- End-to-end test not completed

---

### 🔲 Intake submission pipeline
- Form submission → database
- Validation + storage
- Link to session_id

---

### 🔲 AI response generation
- Prompt structure
- Output formatting
- Delivery timing (not instant)

---

### 🔲 Email delivery
- Resend domain verification
- Email template (locked tone)
- Secure link generation

---

## 8. CURRENT BLOCKER

Stripe is not connected yet.

This prevents:
- Checkout completion
- session_id generation
- Intake page unlock

---

## 9. NEXT STEP (LOCKED)

→ Connect Stripe

Approach:
- one step at a time
- no bypasses
- no shortcuts
- no fake session IDs

---

## 10. MENTAL MODEL (IMPORTANT)

This is not a “feature app”.

This is:
→ a **controlled emotional experience**

Every layer must:
- protect the moment
- prevent misuse
- avoid noise
- remain simple

---

## 11. STATUS

✔ Pages complete  
✔ Routing correct  
✔ Copy locked  
✔ Intake protected  

⏳ Stripe + backend pipeline pending

# VERBA NON DICTA — PROJECT MASTER (UPDATED)

## 1. GOAL

Build a premium one-time digital experience:

User:
- writes an unfinished message
- pays $27
- receives one AI-generated response

Core principle:
👉 One action → one result → no loop

---

## 2. CORE FLOW (FINAL INTENDED)

1. Landing (/)
2. Start (/start)
3. Stripe Checkout
4. Redirect → /intake?session_id=...
5. User writes message
6. Message saved (draft → paid)
7. AI generates response
8. Email with result sent

---

## 3. CURRENT REAL STATE (NOT ASSUMED)

### WORKING

- Frontend pages complete (Home, Start, FAQ, Intake)
- Stripe connected
- Supabase connected
- Draft save flow implemented (Step 1–2)
- requests table unified (no split tables)

---

### PARTIALLY WORKING

- Intake submission saves draft (needs verification in real run)
- Session ID preservation implemented (URL/state)

---

### NOT WORKING (CRITICAL)

- Stripe → draft connection (metadata + linking)
- Payment confirmation → DB update (status = paid)
- Output generation trigger
- Email delivery pipeline

---

## 4. ACTUAL ARCHITECTURE (SIMPLIFIED)

Single table:

requests

Fields:
- id (uuid)
- content (text)
- email (optional)
- status (draft | paid | processed | failed)
- stripe_session_id (nullable)
- created_at

---

## 5. CURRENT BLOCKER (REAL)

NOT:
- UI
- Stripe setup
- Supabase setup

ACTUAL BLOCKER:

👉 Broken continuity between:
draft → payment → post-payment processing

---

## 6. RULES (ENFORCED)

- No manual fixes in code
- ALL changes through Codex
- One goal at a time
- No parallel implementations
- No new tables unless absolutely required
- Do not mix Stripe session_id with internal id

---

## 7. DEFINITION OF DONE (STRICT)

User can:

1. Write message
2. Pay
3. Return to system
4. System finds correct draft
5. Status updates to "paid"
6. AI response generated
7. Email delivered

NO:
- broken states
- duplicate records
- manual recovery

---

## 8. NEXT STEP (LOCKED)

👉 Connect Stripe session → draft record

This is the ONLY priority.

---

## 9. SYSTEM TRUTH

You are NOT building features anymore.

👉 You are connecting an existing system.

Failure risk now:
- wrong linking logic
- inconsistent identifiers
- state loss after redirect

END OF SUMMARY