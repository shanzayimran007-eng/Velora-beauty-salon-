import express from 'express';
import type { Request, Response } from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT) || 3000;
const isProduction = process.env.NODE_ENV === 'production';

app.use(express.json());

// Persistent storage directories
const DATA_DIR = path.resolve(__dirname, 'data');
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

const APPOINTMENTS_FILE = path.join(DATA_DIR, 'appointments.json');
const CONTACTS_FILE = path.join(DATA_DIR, 'contacts.json');

function readJsonFile<T>(filePath: string, fallback: T): T {
  try {
    if (fs.existsSync(filePath)) {
      const content = fs.readFileSync(filePath, 'utf-8');
      return JSON.parse(content);
    }
  } catch (err) {
    console.error(`Error reading ${filePath}:`, err);
  }
  return fallback;
}

function writeJsonFile<T>(filePath: string, data: T): void {
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
  } catch (err) {
    console.error(`Error writing ${filePath}:`, err);
  }
}

export interface Appointment {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  service: string;
  preferredDate: string;
  preferredTime: string;
  notes?: string;
  createdAt: string;
  status: 'Received' | 'Confirmed' | 'Archived';
}

export interface ContactMessage {
  id: string;
  fullName: string;
  email: string;
  subject: string;
  message: string;
  createdAt: string;
}

// REST API Endpoints
app.get('/api/health', (_req: Request, res: Response) => {
  res.json({ status: 'ok', salon: 'Velora Beauty Salon', timestamp: new Date().toISOString() });
});

// Appointment Request endpoints
app.get('/api/appointments', (_req: Request, res: Response) => {
  const appointments = readJsonFile<Appointment[]>(APPOINTMENTS_FILE, []);
  res.json({ success: true, appointments });
});

app.post('/api/appointments', (req: Request, res: Response): any => {
  const { fullName, email, phone, service, preferredDate, preferredTime, notes } = req.body || {};

  // Server-side validation
  if (!fullName || typeof fullName !== 'string' || !fullName.trim()) {
    return res.status(400).json({ success: false, message: 'Please provide your full name.' });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailRegex.test(email.trim())) {
    return res.status(400).json({ success: false, message: 'Please provide a valid email address.' });
  }

  if (!phone || typeof phone !== 'string' || phone.trim().length < 7) {
    return res.status(400).json({ success: false, message: 'Please provide a valid phone number for appointment confirmation.' });
  }

  if (!service || typeof service !== 'string' || !service.trim()) {
    return res.status(400).json({ success: false, message: 'Please select a beauty service.' });
  }

  if (!preferredDate) {
    return res.status(400).json({ success: false, message: 'Please choose a preferred appointment date.' });
  }

  // Prevent past dates
  const selectedDate = new Date(`${preferredDate}T00:00:00`);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  if (selectedDate < today) {
    return res.status(400).json({ success: false, message: 'Preferred appointment date cannot be in the past.' });
  }

  if (!preferredTime) {
    return res.status(400).json({ success: false, message: 'Please choose a preferred time of day.' });
  }

  const newAppointment: Appointment = {
    id: `VEL-${Date.now().toString(36).toUpperCase()}-${Math.floor(Math.random() * 899 + 100)}`,
    fullName: fullName.trim(),
    email: email.trim().toLowerCase(),
    phone: phone.trim(),
    service: service.trim(),
    preferredDate,
    preferredTime,
    notes: notes ? String(notes).trim() : '',
    createdAt: new Date().toISOString(),
    status: 'Received',
  };

  const appointments = readJsonFile<Appointment[]>(APPOINTMENTS_FILE, []);
  appointments.unshift(newAppointment);
  writeJsonFile(APPOINTMENTS_FILE, appointments);

  return res.status(201).json({
    success: true,
    message: 'Your appointment request has been successfully submitted! Our concierge team will reach out via phone or email to confirm your time.',
    appointment: newAppointment,
  });
});

// Contact message endpoints
app.get('/api/contact', (_req: Request, res: Response) => {
  const contacts = readJsonFile<ContactMessage[]>(CONTACTS_FILE, []);
  res.json({ success: true, contacts });
});

app.post('/api/contact', (req: Request, res: Response): any => {
  const { fullName, email, subject, message } = req.body || {};

  if (!fullName || typeof fullName !== 'string' || !fullName.trim()) {
    return res.status(400).json({ success: false, message: 'Please provide your name.' });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailRegex.test(email.trim())) {
    return res.status(400).json({ success: false, message: 'Please provide a valid email address.' });
  }

  if (!subject || typeof subject !== 'string' || !subject.trim()) {
    return res.status(400).json({ success: false, message: 'Please provide a subject for your inquiry.' });
  }

  if (!message || typeof message !== 'string' || message.trim().length < 5) {
    return res.status(400).json({ success: false, message: 'Please provide a message with at least 5 characters.' });
  }

  const newMessage: ContactMessage = {
    id: `MSG-${Date.now().toString(36).toUpperCase()}`,
    fullName: fullName.trim(),
    email: email.trim().toLowerCase(),
    subject: subject.trim(),
    message: message.trim(),
    createdAt: new Date().toISOString(),
  };

  const contacts = readJsonFile<ContactMessage[]>(CONTACTS_FILE, []);
  contacts.unshift(newMessage);
  writeJsonFile(CONTACTS_FILE, contacts);

  return res.status(201).json({
    success: true,
    message: 'Thank you for reaching out to Velora Beauty Salon. We have received your inquiry and will respond within 24 hours.',
    contact: newMessage,
  });
});

async function startServer() {
  if (!isProduction) {
    const { createServer } = await import('vite');
    const vite = await createServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);

    // Fallback for SPA routing in development
    app.use('*', async (req: Request, res: Response, next) => {
      const url = req.originalUrl;
      try {
        const templatePath = path.resolve(__dirname, 'index.html');
        let template = fs.readFileSync(templatePath, 'utf-8');
        template = await vite.transformIndexHtml(url, template);
        res.status(200).set({ 'Content-Type': 'text/html' }).end(template);
      } catch (e) {
        vite.ssrFixStacktrace(e as Error);
        next(e);
      }
    });
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Velora Beauty Salon server running at http://localhost:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start Velora server:', err);
});
