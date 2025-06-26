# 🚗 PRE-PARKING SYSTEM

A full-stack smart parking solution that allows users to book slots online, receive confirmation emails, and control physical gates using NodeMCU. Built with ❤️ using React, Node.js, MySQL, and ESP8266!

---

## 🔧 Features

- 🔐 User Login & Signup with email/password
- 🅿️ Book available parking slots (visual + live status)
- ✉️ Email confirmation with unique access link
- 🚦 NodeMCU-based gate control (servo motor)
- 🕵️ IR sensor detection to confirm vehicle entry
- 🧠 Admin can reset slot data on server restart
- 📜 Booking history page + Clear history option
- 🧼 Modern & clean UI with mobile-friendly design

---

## 🖥️ Tech Stack

| Frontend | Backend       | Hardware         | DB         |
|----------|---------------|------------------|------------|
| React.js | Node.js       | NodeMCU ESP8266  | MySQL      |
| CSS3     | Express + CORS| IR sensor + Servo| Nodemailer |

---

## ⚙️ Folder Structure

PRE-PARKING-SYSTEM/
├── parkitnow-app/
│ ├── frontend/ # React app
│ └── backend/ # Express API + routes
├── esp_code/
│ └── esp_code.ino # NodeMCU WiFi + gate logic
└── README.md

yaml
Copy
Edit

---

## 🚀 How to Run Locally

### 1. Clone the Repo
```bash
git clone https://github.com/shashu-hyper1/PRE-PARKING-SYSTEM.git
cd PRE-PARKING-SYSTEM
2. Start Backend Server
bash
Copy
Edit
cd parkitnow-app/backend
npm install
node index.js
3. Start Frontend
bash
Copy
Edit
cd ../frontend
npm install
npm start
4. Flash NodeMCU
Upload esp_code/esp_code.ino to your ESP8266 using Arduino IDE.

📩 Email Integration
On booking, a verification email is sent with a special link.

Clicking the link hits your NodeMCU to open the gate using /open?slot={slot}.

💡 Make sure your ESP8266 is connected to the same network and accessible.

👨‍💻 Author
Made with ❤️ by @shashu-hyper1
Built during internship project & personal passion for embedded tech + full-stack apps.

📸 Demo (optional)
Add a GIF/screenshot here of your UI or NodeMCU gate working!

🪪 License
MIT License – feel free to use and remix with credit.

yaml
Copy
Edit

---

### ✅ What's Next?

- Want me to generate this as a file for you? I can drop a downloadable `README.md`.
- Want a **GIF walkthrough** banner or live preview badge?
- Want to host the frontend live (Vercel/Netlify) and use Railway or Render for backend?

Let’s flex your project fully 💪
