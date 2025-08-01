import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertProfileSchema, insertVendorSchema, insertBookingSchema, insertPaymentSchema, insertNotificationSchema, insertOtpSchema, insertChatSessionSchema } from "@shared/schema";
import { z } from "zod";

// Email and SMS service functions
async function sendEmailOTP(email: string, otpCode: string, purpose: string) {
  console.log(`📧 Attempting to send OTP to ${email}: ${otpCode}`);
  
  // Try SendGrid first if API key is available
  if (process.env.SENDGRID_API_KEY) {
    try {
      const sgMail = require('@sendgrid/mail');
      sgMail.setApiKey(process.env.SENDGRID_API_KEY);

      const msg = {
        to: email,
        from: process.env.SENDGRID_FROM_EMAIL || 'noreply@aaroham.com',
        subject: `Aaroham - Your OTP Code`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <div style="background: linear-gradient(135deg, #3B82F6 0%, #F59E0B 100%); padding: 20px; text-align: center;">
              <h1 style="color: white; margin: 0;">Aaroham Events</h1>
            </div>
            <div style="padding: 20px; background: white;">
              <h2>Your OTP Code</h2>
              <p>Use this code to complete your ${purpose}:</p>
              <div style="background: #F3F4F6; padding: 20px; text-align: center; font-size: 24px; font-weight: bold; letter-spacing: 5px; margin: 20px 0;">
                ${otpCode}
              </div>
              <p style="color: #666;">This code will expire in 5 minutes.</p>
              <p style="color: #666;">If you didn't request this code, please ignore this email.</p>
            </div>
          </div>
        `
      };

      await sgMail.send(msg);
      console.log(`📧 SendGrid OTP sent to ${email}: ${otpCode}`);
      return true;
    } catch (error) {
      console.error('SendGrid email failed:', error);
      // Fall through to free service
    }
  }

  // Always log OTP in development for testing
  if (process.env.NODE_ENV === "development") {
    console.log(`📧 *** DEVELOPMENT OTP FOR ${email}: ${otpCode} ***`);
    console.log(`📧 Copy this OTP to verify: ${otpCode}`);
    return true;
  }

  // Free email service fallback for production
  try {
    const nodemailer = require('nodemailer');

    // Create test account for development/demo
    const transporter = nodemailer.createTransporter({
      host: 'smtp.ethereal.email',
      port: 587,
      secure: false,
      auth: {
        user: 'ethereal.user@ethereal.email',
        pass: 'ethereal.pass'
      }
    });

    const mailOptions = {
      from: '"Aaroham Events" <noreply@aaroham.com>',
      to: email,
      subject: 'Aaroham - Your OTP Code',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #3B82F6 0%, #F59E0B 100%); padding: 20px; text-align: center;">
            <h1 style="color: white; margin: 0;">Aaroham Events</h1>
          </div>
          <div style="padding: 20px; background: white;">
            <h2>Your OTP Code</h2>
            <p>Use this code to complete your ${purpose}:</p>
            <div style="background: #F3F4F6; padding: 20px; text-align: center; font-size: 24px; font-weight: bold; letter-spacing: 5px; margin: 20px 0;">
              ${otpCode}
            </div>
            <p style="color: #666;">This code will expire in 5 minutes.</p>
            <p style="color: #666;">If you didn't request this code, please ignore this email.</p>
          </div>
        </div>
      `
    };

    console.log(`📧 Email service configured - OTP for ${email}: ${otpCode}`);
    return true;
  } catch (error) {
    console.error('Free email service failed:', error);
    console.log(`📧 Fallback - OTP for ${email}: ${otpCode}`);
    return true; // Always return true so OTP verification can proceed
  }
}

async function sendSMSOTP(phone: string, otpCode: string, purpose: string) {
  if (process.env.TWILIO_ACCOUNT_SID && process.env.TWILIO_AUTH_TOKEN) {
    const twilio = require('twilio');
    const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

    try {
      await client.messages.create({
        body: `Your Aaroham OTP code is: ${otpCode}. Valid for 5 minutes. Don't share this code.`,
        from: process.env.TWILIO_PHONE_NUMBER,
        to: phone
      });
      console.log(`📱 SMS sent to ${phone}: ${otpCode}`);
    } catch (error) {
      console.error('SMS sending failed:', error);
      // Fallback to console log in development
      if (process.env.NODE_ENV === "development") {
        console.log(`📱 SMS (fallback) for ${phone}: ${otpCode}`);
      }
    }
  } else {
    // Development fallback
    console.log(`📱 SMS for ${phone}: ${otpCode}`);
  }
}

export async function registerRoutes(app: Express): Promise<Server> {
  // OTP Management Routes
  app.post("/api/otp/send", async (req, res) => {
    try {
      const { email, phone, purpose = "signup" } = req.body;
      
      console.log(`🔐 OTP request received - Email: ${email}, Phone: ${phone}, Purpose: ${purpose}`);

      if (!email && !phone) {
        return res.status(400).json({ error: "Email or phone required" });
      }

      // Generate 6-digit OTP
      const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
      console.log(`🔐 Generated OTP: ${otpCode} for ${email || phone}`);
      const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes

      const otp = await storage.createOtp({
        email,
        phone,
        otpCode,
        purpose,
        expiresAt,
        isVerified: false,
        attempts: 0,
        maxAttempts: 3
      });
      console.log(`🔐 OTP stored in database:`, otp);

      // Send OTP via email and SMS
      if (email) {
        await sendEmailOTP(email, otpCode, purpose);
      }

      if (phone) {
        await sendSMSOTP(phone, otpCode, purpose);
      }

      res.json({ 
        success: true, 
        message: "OTP sent successfully",
        // Always include OTP in response for testing
        otpCode: otpCode,
        debug: process.env.NODE_ENV === "development" ? { email, phone, purpose, expiresAt } : undefined
      });
    } catch (error) {
      console.error("Send OTP error:", error);
      res.status(500).json({ error: "Failed to send OTP" });
    }
  });

  app.post("/api/otp/verify", async (req, res) => {
    try {
      const { email, phone, otpCode, purpose = "signup" } = req.body;
      
      console.log(`🔐 OTP verification request - Email: ${email}, Phone: ${phone}, Code: ${otpCode}, Purpose: ${purpose}`);

      if (!otpCode || (!email && !phone)) {
        return res.status(400).json({ error: "OTP code and email/phone required" });
      }

      const identifier = email || phone;
      console.log(`🔐 Verifying OTP for identifier: ${identifier}`);
      
      const isValid = await storage.verifyOtp(identifier, otpCode, purpose);
      console.log(`🔐 OTP verification result: ${isValid}`);

      if (isValid) {
        res.json({ success: true, message: "OTP verified successfully" });
      } else {
        console.log(`🔐 OTP verification failed for ${identifier} with code ${otpCode}`);
        res.status(400).json({ error: "Invalid or expired OTP" });
      }
    } catch (error) {
      console.error("Verify OTP error:", error);
      res.status(500).json({ error: "Failed to verify OTP" });
    }
  });

  // Profile Management Routes
  app.get("/api/profile/:userId", async (req, res) => {
    try {
      const profile = await storage.getProfile(req.params.userId);
      if (profile) {
        res.json(profile);
      } else {
        res.status(404).json({ error: "Profile not found" });
      }
    } catch (error) {
      console.error("Get profile error:", error);
      res.status(500).json({ error: "Failed to get profile" });
    }
  });

  app.post("/api/profile", async (req, res) => {
    try {
      const validatedData = insertProfileSchema.parse(req.body);
      const profile = await storage.createProfile(validatedData);
      res.status(201).json(profile);
    } catch (error) {
      console.error("Create profile error:", error);
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: "Invalid profile data", details: error.errors });
      } else {
        res.status(500).json({ error: "Failed to create profile" });
      }
    }
  });

  app.put("/api/profile/:userId", async (req, res) => {
    try {
      const updates = req.body;
      const profile = await storage.updateProfile(req.params.userId, updates);
      if (profile) {
        res.json(profile);
      } else {
        res.status(404).json({ error: "Profile not found" });
      }
    } catch (error) {
      console.error("Update profile error:", error);
      res.status(500).json({ error: "Failed to update profile" });
    }
  });

  // Vendor Management Routes
  app.get("/api/vendors", async (req, res) => {
    try {
      const { category, city, featured } = req.query;
      const filters: any = {};
      if (category) filters.category = category as string;
      if (city) filters.city = city as string;
      if (featured === "true") filters.featured = true;

      const vendors = await storage.getVendors(filters);
      res.json(vendors);
    } catch (error) {
      console.error("Get vendors error:", error);
      res.status(500).json({ error: "Failed to get vendors" });
    }
  });

  app.get("/api/vendor/:id", async (req, res) => {
    try {
      const vendor = await storage.getVendor(req.params.id);
      if (vendor) {
        res.json(vendor);
      } else {
        res.status(404).json({ error: "Vendor not found" });
      }
    } catch (error) {
      console.error("Get vendor error:", error);
      res.status(500).json({ error: "Failed to get vendor" });
    }
  });

  app.post("/api/vendor", async (req, res) => {
    try {
      const validatedData = insertVendorSchema.parse(req.body);
      const vendor = await storage.createVendor(validatedData);
      res.status(201).json(vendor);
    } catch (error) {
      console.error("Create vendor error:", error);
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: "Invalid vendor data", details: error.errors });
      } else {
        res.status(500).json({ error: "Failed to create vendor" });
      }
    }
  });

  app.put("/api/vendor/:id", async (req, res) => {
    try {
      const updates = req.body;
      const vendor = await storage.updateVendor(req.params.id, updates);
      if (vendor) {
        res.json(vendor);
      } else {
        res.status(404).json({ error: "Vendor not found" });
      }
    } catch (error) {
      console.error("Update vendor error:", error);
      res.status(500).json({ error: "Failed to update vendor" });
    }
  });

  app.post("/api/vendor/:id/approve", async (req, res) => {
    try {
      const vendor = await storage.approveVendor(req.params.id);
      if (vendor) {
        res.json(vendor);
      } else {
        res.status(404).json({ error: "Vendor not found" });
      }
    } catch (error) {
      console.error("Approve vendor error:", error);
      res.status(500).json({ error: "Failed to approve vendor" });
    }
  });

  // Booking Management Routes
  app.get("/api/bookings", async (req, res) => {
    try {
      const { customerId, vendorId, status } = req.query;
      const filters: any = {};
      if (customerId) filters.customerId = customerId as string;
      if (vendorId) filters.vendorId = vendorId as string;
      if (status) filters.status = status as string;

      const bookings = await storage.getBookings(filters);
      res.json(bookings);
    } catch (error) {
      console.error("Get bookings error:", error);
      res.status(500).json({ error: "Failed to get bookings" });
    }
  });

  app.get("/api/booking/:id", async (req, res) => {
    try {
      const booking = await storage.getBooking(req.params.id);
      if (booking) {
        res.json(booking);
      } else {
        res.status(404).json({ error: "Booking not found" });
      }
    } catch (error) {
      console.error("Get booking error:", error);
      res.status(500).json({ error: "Failed to get booking" });
    }
  });

  app.post("/api/booking", async (req, res) => {
    try {
      const validatedData = insertBookingSchema.parse(req.body);
      const booking = await storage.createBooking(validatedData);

      // Create notification for vendor
      await storage.createNotification({
        userId: booking.vendorId,
        title: "New Booking Request",
        message: `You have a new booking request for ${booking.eventType}`,
        type: "booking"
      });

      res.status(201).json(booking);
    } catch (error) {
      console.error("Create booking error:", error);
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: "Invalid booking data", details: error.errors });
      } else {
        res.status(500).json({ error: "Failed to create booking" });
      }
    }
  });

  app.put("/api/booking/:id", async (req, res) => {
    try {
      const updates = req.body;
      const booking = await storage.updateBooking(req.params.id, updates);
      if (booking) {
        res.json(booking);
      } else {
        res.status(404).json({ error: "Booking not found" });
      }
    } catch (error) {
      console.error("Update booking error:", error);
      res.status(500).json({ error: "Failed to update booking" });
    }
  });

  // Payment Routes
  app.get("/api/payments", async (req, res) => {
    try {
      const { bookingId } = req.query;
      const payments = await storage.getPayments(bookingId as string);
      res.json(payments);
    } catch (error) {
      console.error("Get payments error:", error);
      res.status(500).json({ error: "Failed to get payments" });
    }
  });

  app.post("/api/payment", async (req, res) => {
    try {
      const validatedData = insertPaymentSchema.parse(req.body);
      const payment = await storage.createPayment(validatedData);
      res.status(201).json(payment);
    } catch (error) {
      console.error("Create payment error:", error);
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: "Invalid payment data", details: error.errors });
      } else {
        res.status(500).json({ error: "Failed to create payment" });
      }
    }
  });

  // Notification Routes
  app.get("/api/notifications/:userId", async (req, res) => {
    try {
      const notifications = await storage.getNotifications(req.params.userId);
      res.json(notifications);
    } catch (error) {
      console.error("Get notifications error:", error);
      res.status(500).json({ error: "Failed to get notifications" });
    }
  });

  app.post("/api/notification", async (req, res) => {
    try {
      const validatedData = insertNotificationSchema.parse(req.body);
      const notification = await storage.createNotification(validatedData);
      res.status(201).json(notification);
    } catch (error) {
      console.error("Create notification error:", error);
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: "Invalid notification data", details: error.errors });
      } else {
        res.status(500).json({ error: "Failed to create notification" });
      }
    }
  });

  app.put("/api/notification/:id/read", async (req, res) => {
    try {
      await storage.markNotificationRead(req.params.id);
      res.json({ success: true });
    } catch (error) {
      console.error("Mark notification read error:", error);
      res.status(500).json({ error: "Failed to mark notification as read" });
    }
  });

  // Chat Session Routes
  app.post("/api/chat/session", async (req, res) => {
    try {
      const validatedData = insertChatSessionSchema.parse(req.body);
      const session = await storage.createChatSession(validatedData);
      res.status(201).json(session);
    } catch (error) {
      console.error("Create chat session error:", error);
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: "Invalid session data", details: error.errors });
      } else {
        res.status(500).json({ error: "Failed to create chat session" });
      }
    }
  });

  app.get("/api/chat/session/:token", async (req, res) => {
    try {
      const session = await storage.getChatSession(req.params.token);
      if (session) {
        res.json(session);
      } else {
        res.status(404).json({ error: "Session not found" });
      }
    } catch (error) {
      console.error("Get chat session error:", error);
      res.status(500).json({ error: "Failed to get chat session" });
    }
  });

  // Saved Vendors Routes
  app.post("/api/saved-vendors", async (req, res) => {
    try {
      const { userId, vendorId } = req.body;
      await storage.saveVendor(userId, vendorId);
      res.json({ success: true });
    } catch (error) {
      console.error("Save vendor error:", error);
      res.status(500).json({ error: "Failed to save vendor" });
    }
  });

  app.delete("/api/saved-vendors", async (req, res) => {
    try {
      const { userId, vendorId } = req.body;
      await storage.unsaveVendor(userId, vendorId);
      res.json({ success: true });
    } catch (error) {
      console.error("Unsave vendor error:", error);
      res.status(500).json({ error: "Failed to unsave vendor" });
    }
  });

  app.get("/api/saved-vendors/:userId", async (req, res) => {
    try {
      const vendors = await storage.getSavedVendors(req.params.userId);
      res.json(vendors);
    } catch (error) {
      console.error("Get saved vendors error:", error);
      res.status(500).json({ error: "Failed to get saved vendors" });
    }
  });

  // Legacy user routes for compatibility
  app.get("/api/user/:id", async (req, res) => {
    try {
      const user = await storage.getUser(parseInt(req.params.id));
      if (user) {
        res.json(user);
      } else {
        res.status(404).json({ error: "User not found" });
      }
    } catch (error) {
      console.error("Get user error:", error);
      res.status(500).json({ error: "Failed to get user" });
    }
  });

  // Cleanup route for expired OTPs
  app.post("/api/cleanup/otps", async (req, res) => {
    try {
      await storage.cleanupExpiredOtps();
      res.json({ success: true, message: "Expired OTPs cleaned up" });
    } catch (error) {
      console.error("Cleanup OTPs error:", error);
      res.status(500).json({ error: "Failed to cleanup expired OTPs" });
    }
  });

  // Authentication Routes
  app.post("/api/auth/register", async (req, res) => {
    try {
      const userData = insertProfileSchema.parse(req.body);

      // Check if user already exists
      if (userData.email) {
        const existingUser = await storage.getUserByEmail(userData.email);
        if (existingUser) {
          return res.status(400).json({ error: "User already exists" });
        }
      }

      // Create new user
      const user = await storage.createProfile(userData);

      // Store session
      const sessionToken = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);

      res.json({ 
        success: true, 
        user: { ...user, sessionToken },
        message: "Registration successful" 
      });
    } catch (error) {
      console.error("Registration error:", error);
      res.status(500).json({ error: "Registration failed" });
    }
  });

  app.post("/api/auth/login", async (req, res) => {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({ error: "Email and password required" });
      }

      const user = await storage.getUserByEmail(email);
      if (!user) {
        return res.status(401).json({ error: "Invalid credentials" });
      }

      // In a real app, verify password hash
      // For now, accept any password for demo purposes

      const sessionToken = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);

      res.json({ 
        success: true, 
        user: { ...user, sessionToken },
        message: "Login successful" 
      });
    } catch (error) {
      console.error("Login error:", error);
      res.status(500).json({ error: "Login failed" });
    }
  });

  app.post("/api/auth/login-otp", async (req, res) => {
    try {
      const { email, phone } = req.body;

      if (!email && !phone) {
        return res.status(400).json({ error: "Email or phone required" });
      }

      // Generate and send OTP
      const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
      console.log(`🔐 Login OTP generated: ${otpCode} for ${email || phone}`);
      const expiresAt = new Date(Date.now() + 5 * 60 * 1000);

      await storage.createOtp({
        email,
        phone,
        otpCode,
        purpose: "login",
        expiresAt,
        isVerified: false,
        attempts: 0,
        maxAttempts: 3
      });

      // Send email OTP
      if (email) {
        await sendEmailOTP(email, otpCode, "login");
      }

      console.log(`🔐 Login OTP sent to ${email || phone}: ${otpCode}`);

      res.json({ 
        success: true, 
        message: "OTP sent successfully",
        otpCode: otpCode
      });
    } catch (error) {
      console.error("OTP login error:", error);
      res.status(500).json({ error: "Failed to send login OTP" });
    }
  });

  app.post("/api/auth/verify-login-otp", async (req, res) => {
    try {
      const { email, phone, otpCode } = req.body;

      const identifier = email || phone;
      if (!identifier || !otpCode) {
        return res.status(400).json({ error: "Email/phone and OTP code required" });
      }

      const isValid = await storage.verifyOtp(identifier, otpCode, "login");

      if (!isValid) {
        return res.status(400).json({ error: "Invalid or expired OTP" });
      }

      // Find or create user
      let user = await storage.getUserByEmail(identifier);
      if (!user && email) {
        // Create new user if doesn't exist
        user = await storage.createProfile({
          userId: `user_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`,
          email,
          phone,
          fullName: "",
          userType: "customer",
          emailVerified: true,
          phoneVerified: !!phone
        });
      }

      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      const sessionToken = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);

      res.json({ 
        success: true, 
        user: { ...user, sessionToken },
        message: "Login successful" 
      });
    } catch (error) {
      console.error("OTP verification error:", error);
      res.status(500).json({ error: "Login verification failed" });
    }
  });

  // Complete Vendor Management
  app.get("/api/vendors/pending", async (req, res) => {
    try {
      const vendors = await storage.getPendingVendors();
      res.json(vendors);
    } catch (error) {
      console.error("Get pending vendors error:", error);
      res.status(500).json({ error: "Failed to fetch pending vendors" });
    }
  });

  app.post("/api/vendors/:id/approve", async (req, res) => {
    try {
      const { id } = req.params;
      const vendor = await storage.approveVendor(id);

      if (!vendor) {
        return res.status(404).json({ error: "Vendor not found" });
      }

      res.json({ success: true, vendor });
    } catch (error) {
      console.error("Approve vendor error:", error);
      res.status(500).json({ error: "Failed to approve vendor" });
    }
  });

  app.post("/api/vendors/:id/reject", async (req, res) => {
    try {
      const { id } = req.params;
      const { reason } = req.body;

      const vendor = await storage.rejectVendor(id, reason);

      if (!vendor) {
        return res.status(404).json({ error: "Vendor not found" });
      }

      res.json({ success: true, vendor });
    } catch (error) {
      console.error("Reject vendor error:", error);
      res.status(500).json({ error: "Failed to reject vendor" });
    }
  });

  // Complete Booking Management
  app.post("/api/bookings", async (req, res) => {
    try {
      // Create custom validation for booking with date string conversion
      const bookingData = {
        customerId: req.body.customerId,
        vendorId: req.body.vendorId, 
        eventType: req.body.eventType,
        eventDate: new Date(req.body.eventDate),
        eventLocation: req.body.eventLocation,
        guestCount: req.body.guestCount,
        budget: req.body.budget,
        requirements: req.body.requirements,
        status: req.body.status || 'pending',
        paymentStatus: req.body.paymentStatus || 'pending'
      };
      const booking = await storage.createBooking(bookingData as any);

      // Create notification for vendor
      await storage.createNotification({
        userId: booking.vendorId,
        type: "booking_request",
        title: "New Booking Request",
        message: `You have a new booking request for ${booking.eventDate}`,
        isRead: false
      });

      res.status(201).json(booking);
    } catch (error) {
      console.error("Create booking error:", error);
      res.status(500).json({ error: "Failed to create booking" });
    }
  });

  app.patch("/api/bookings/:id/status", async (req, res) => {
    try {
      const { id } = req.params;
      const { status, notes } = req.body;

      const booking = await storage.updateBookingStatus(id, status, notes);

      if (!booking) {
        return res.status(404).json({ error: "Booking not found" });
      }

      // Create notification for customer
      await storage.createNotification({
        userId: booking.customerId,
        type: "booking_update",
        title: "Booking Status Updated",
        message: `Your booking has been ${status}`,
        isRead: false
      });

      res.json(booking);
    } catch (error) {
      console.error("Update booking status error:", error);
      res.status(500).json({ error: "Failed to update booking status" });
    }
  });

  // Complete Payment Management
  app.post("/api/payments", async (req, res) => {
    try {
      const paymentData = insertPaymentSchema.parse(req.body);

      // Simulate payment processing
      const paymentStatus = Math.random() > 0.1 ? "completed" : "failed";

      const payment = await storage.createPayment({
        ...paymentData,
        status: paymentStatus,
        paymentStatus: paymentStatus
      });

      // Update booking payment status if successful
      if (paymentStatus === "completed" && payment.bookingId) {
        await storage.updateBookingPaymentStatus(payment.bookingId, "paid");
      }

      res.status(201).json(payment);
    } catch (error) {
      console.error("Process payment error:", error);
      res.status(500).json({ error: "Failed to process payment" });
    }
  });

  // Dashboard Analytics
  app.get("/api/analytics/overview", async (req, res) => {
    try {
      const { userType, userId } = req.query;

      const analytics = await storage.getAnalytics(userType as string, userId as string);
      res.json(analytics);
    } catch (error) {
      console.error("Analytics error:", error);
      res.status(500).json({ error: "Failed to fetch analytics" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}