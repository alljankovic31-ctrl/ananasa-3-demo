# Email automation

The admin dashboard already has manual email and WhatsApp actions.

Automatic email confirmation will use:

1. Supabase Edge Function `send-confirmation`
2. Resend API key stored as a Supabase Function Secret
3. A verified sender address stored as `CONFIRMATION_FROM_EMAIL`

Required Supabase secrets:

```text
RESEND_API_KEY=re_...
CONFIRMATION_FROM_EMAIL=Ananasa 3 <reservations@your-domain.com>
```

After the function is deployed, the admin dashboard can call:

```text
POST /functions/v1/send-confirmation
```

with a signed-in admin session and a JSON body such as:

```json
{
  "kind": "reservation",
  "id": 123
}
```
