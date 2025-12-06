# PropertyPeedika - Client Handover Guide

## 1. Project Overview
**PropertyPeedika** is a modern real estate application built with the MERN stack (MongoDB, Express, React, Node.js).

- **Frontend (User Interface)**: Hosted on **Vercel**.
- **Backend (API & Database Logic)**: Hosted on **Render**.
- **Database**: **MongoDB Atlas**.
- **Image Storage**: **Cloudinary**.

---

## 2. Step-by-Step Ownership Transfer

### Step 1: Client Creates Accounts
The client needs to create their own accounts on these 5 services. They should use their own email/password.

1.  **GitHub**: [https://github.com/signup](https://github.com/signup) (For storing the code)
2.  **MongoDB Atlas**: [https://www.mongodb.com/cloud/atlas/register](https://www.mongodb.com/cloud/atlas/register) (For the database)
3.  **Cloudinary**: [https://cloudinary.com/users/register/free](https://cloudinary.com/users/register/free) (For images)
4.  **Render**: [https://dashboard.render.com/register](https://dashboard.render.com/register) (For backend hosting)
5.  **Vercel**: [https://vercel.com/signup](https://vercel.com/signup) (For frontend hosting)

### Step 2: Transfer the Code (GitHub)
Once the client has a GitHub account, you need to move the code to them.

**Option A: The Easy Way (Zip File)**
1.  You (Developer) download the code as a **ZIP file**.
2.  Send the ZIP file to the Client.
3.  Client logs into GitHub and clicks **"New Repository"**.
4.  Client names it `propertypeedika`.
5.  Client clicks **"Uploading an existing file"** link.
6.  Client drags and drops the files from the ZIP folder.
7.  Client clicks **"Commit changes"**.

**Option B: The Professional Way (Repo Transfer)**
1.  Go to your GitHub Repository Settings.
2.  Scroll to the bottom "Danger Zone".
3.  Click **"Transfer ownership"**.
4.  Enter the Client's GitHub username.
5.  They will receive an email to accept the transfer.

---

## 3. Deployment Links
*(These will change once the client deploys to their own accounts)*
- **Live Website**: [Insert Vercel URL here]
- **Admin Panel**: [Insert Admin URL here]
- **API Endpoint**: [Insert Render URL here]

---

## 4. Credentials Setup
**⚠️ IMPORTANT: Keep these credentials safe.**

### Hosting
| Service | URL | Login Email | Password |
|---------|-----|-------------|----------|
| **Vercel** (Frontend) | https://vercel.com | [Email] | [Password] |
| **Render** (Backend) | https://dashboard.render.com | [Email] | [Password] |

### Services
| Service | URL | Login Email | Password |
|---------|-----|-------------|----------|
| **MongoDB Atlas** (Database) | https://cloud.mongodb.com | [Email] | [Password] |
| **Cloudinary** (Images) | https://cloudinary.com | [Email] | [Password] |
| **Domain Registrar** (GoDaddy/Namecheap) | [URL] | [Email] | [Password] |

---

## 4. Domain Configuration (DNS)
To point your custom domain (e.g., `propertypeedika.com`) to the website:

1.  Log in to your **Domain Registrar** (e.g., GoDaddy).
2.  Go to **DNS Management**.
3.  Add/Update the following records (provided by Vercel):

| Type | Name | Value | TTL |
|------|------|-------|-----|
| **A** | `@` | `76.76.21.21` | 1 Hour |
| **CNAME** | `www` | `cname.vercel-dns.com` | 1 Hour |

*Note: It may take up to 48 hours for these changes to propagate worldwide.*

---

## 5. Environment Variables
The application requires specific "Environment Variables" to function. These are secret keys configured in the hosting dashboards (Render & Vercel).

**See the attached `ENV_VARIABLES_TEMPLATE.txt` for the full list of required keys.**

---

## 6. Source Code
The full source code is available in the following GitHub repository:
- **Repository URL**: [Insert GitHub Repo URL]
- **Branch**: `main`

To run the project locally:
1.  Install Node.js.
2.  Clone the repo.
3.  Run `npm install` in both root and `server` folders.
4.  Create `.env` files with the required variables.
5. Run `npm run dev`.

---

## 7. Service Limits & Costs (Free Tiers)
Your project currently uses the **Free Tiers** of all services. This is perfect for starting out, but be aware of the limits:

### **Cloudinary (Images)**
- **Free Limit**: 25 Credits per month.
- **Storage**: You can easily store **1,000+ images** (approx. 2-5 GB).
- **Bandwidth**: If your site gets **very high traffic** (e.g., 100,000+ views/month), you might hit the bandwidth limit.
- **Action**: If you hit limits, you can upgrade to a paid plan (~$89/mo) or optimize images further.

### **Render (Backend)**
- **Free Limit**: The server "sleeps" after 15 minutes of inactivity.
- **Effect**: The **first load** of the website might take 30-50 seconds to wake up the server.
- **Action**: Upgrade to "Starter" plan ($7/month) to keep the server awake 24/7.

### **MongoDB (Database)**
- **Free Limit**: 512 MB storage.
- **Capacity**: Enough for thousands of property listings.
### **MongoDB (Database)**
- **Free Limit**: 512 MB storage.
- **Capacity**: Enough for thousands of property listings.
- **Action**: Upgrade only if you have massive amounts of data.

---

## 8. Email Notification Setup (EmailJS)
We use **EmailJS** to send emails directly from the frontend (React) without needing a backend server.

1.  **Create Account**: Go to [https://www.emailjs.com](https://www.emailjs.com) and sign up for free.
2.  **Add Service**:
    - Click "Add New Service".
    - Select "Gmail".
    - Connect your Gmail account.
    - Copy the **Service ID** (e.g., `service_xyz123`).
3.  **Add Template**:
    - Click "Email Templates" -> "Create New Template".
    - Design your email (Subject: `New Enquiry from {{from_name}}`).
    - Copy the **Template ID** (e.g., `template_abc456`).
4.  **Get Public Key**:
    - Go to "Account" (Avatar icon) -> "General".
    - Copy the **Public Key** (e.g., `user_123456789`).
5.  **Add to Vercel Environment Variables**:
    - `VITE_EMAILJS_SERVICE_ID`
    - `VITE_EMAILJS_TEMPLATE_ID`
    - `VITE_EMAILJS_PUBLIC_KEY`
