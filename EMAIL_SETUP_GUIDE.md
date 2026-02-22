# Email Setup Guide for Contact Form

## Option 1: EmailJS Setup (Recommended)

### Step 1: Create EmailJS Account
1. Go to https://www.emailjs.com/
2. Click "Sign Up" and create a free account
3. Verify your email address

### Step 2: Add Email Service
1. In the EmailJS dashboard, go to **"Email Services"**
2. Click **"Add New Service"**
3. Select **"Gmail"** (or your preferred email provider)
4. Click **"Connect Account"**
5. Sign in with: **krnarendra2000@gmail.com**
6. Authorize EmailJS to send emails
7. Note your **Service ID** (e.g., `service_xxxxx`)

### Step 3: Create Email Template
1. Go to **"Email Templates"** in the dashboard
2. Click **"Create New Template"**
3. Configure the template:
   - **Template Name**: Contact Form
   - **To Email**: `krnarendra2000@gmail.com`
   - **From Name**: `{{from_name}}`
   - **From Email**: `{{from_email}}`
   - **Subject**: `New Contact Form Submission from {{from_name}}`
   - **Content** (HTML or Plain Text):
     ```
     New contact form submission:
     
     Name: {{from_name}}
     Email: {{from_email}}
     Mobile: {{mobile}}
     Company: {{company}}
     
     Message:
     {{message}}
     ```
4. Click **"Save"**
5. Note your **Template ID** (e.g., `template_xxxxx`)

### Step 4: Get Public Key
1. Go to **"Account"** → **"General"**
2. Find **"API Keys"** section
3. Copy your **Public Key** (e.g., `xxxxxxxxxxxxx`)

### Step 5: Update contact.html
Open `contact.html` and find these lines (around line 603 and 631):

Replace:
- `YOUR_PUBLIC_KEY` with your Public Key
- `YOUR_SERVICE_ID` with your Service ID  
- `YOUR_TEMPLATE_ID` with your Template ID

Example:
```javascript
emailjs.init("abc123xyz789");  // Your Public Key
emailjs.send('service_abc123', 'template_xyz789', formData)
```

---

## Option 2: Formspree (Simpler Alternative)

If you prefer a simpler setup, I can switch the form to use Formspree instead. It requires:
1. Sign up at https://formspree.io/ (free)
2. Create a form endpoint
3. Update one line in the code

Would you like me to implement Formspree instead?

---

## Testing

After setup:
1. Open `contact.html` in a browser
2. Fill out the contact form
3. Click "Send Message"
4. Check `krnarendra2000@gmail.com` inbox for the email

---

## Troubleshooting

- **"Failed to send"**: Check that all IDs are correct
- **No email received**: Check spam folder, verify EmailJS service is connected
- **Form not submitting**: Check browser console for errors
