import { pgTable, text, serial, integer, boolean, timestamp, uuid, decimal, jsonb } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

// Profiles table - User profile information
export const profiles = pgTable("profiles", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id").notNull(),
  fullName: text("full_name"),
  phone: text("phone"),
  city: text("city"),
  userType: text("user_type").default("customer"), // customer, vendor, admin
  emailVerified: boolean("email_verified").default(false),
  phoneVerified: boolean("phone_verified").default(false),
  lastLogin: timestamp("last_login"),
  preferences: jsonb("preferences").default("{}"),
  oauthProvider: text("oauth_provider"),
  oauthId: text("oauth_id"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// OTP table - For verification codes
export const otps = pgTable("otps", {
  id: uuid("id").primaryKey().defaultRandom(),
  email: text("email"),
  phone: text("phone"),
  otpCode: text("otp_code").notNull(),
  purpose: text("purpose").notNull().default("signup"),
  isVerified: boolean("is_verified").default(false),
  expiresAt: timestamp("expires_at").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  attempts: integer("attempts").default(0),
  maxAttempts: integer("max_attempts").default(3),
});

// Vendors table - Vendor business information
export const vendors = pgTable("vendors", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id"),
  businessName: text("business_name").notNull(),
  contactPerson: text("contact_person"),
  email: text("email"),
  phone: text("phone"),
  category: text("category").notNull(),
  city: text("city").notNull(),
  description: text("description"),
  priceRange: text("price_range"),
  portfolioImages: text("portfolio_images").array(),
  isApproved: boolean("is_approved").default(false),
  isOnline: boolean("is_online").default(true),
  isFeatured: boolean("is_featured").default(false),
  rating: decimal("rating", { precision: 3, scale: 2 }),
  totalBookings: integer("total_bookings").default(0),
  speciality: text("speciality").array(),
  socialMedia: jsonb("social_media").default("{}"),
  availability: jsonb("availability").default("{}"),
  verificationStatus: text("verification_status").default("pending"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Bookings table - Event booking information
export const bookings = pgTable("bookings", {
  id: uuid("id").primaryKey().defaultRandom(),
  customerId: uuid("customer_id").notNull(),
  vendorId: uuid("vendor_id").notNull(),
  eventType: text("event_type").notNull(),
  eventDate: timestamp("event_date").notNull(),
  eventLocation: text("event_location").notNull(),
  guestCount: integer("guest_count").notNull(),
  budget: decimal("budget", { precision: 10, scale: 2 }).notNull(),
  requirements: text("requirements"),
  specialRequirements: text("special_requirements"),
  status: text("status").default("pending"),
  paymentStatus: text("payment_status").default("pending"),
  totalAmount: decimal("total_amount", { precision: 10, scale: 2 }),
  bookingExpiresAt: timestamp("booking_expires_at"),
  vendorResponse: text("vendor_response"),
  customerRating: integer("customer_rating"),
  vendorRating: integer("vendor_rating"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Payments table - Payment tracking
export const payments = pgTable("payments", {
  id: uuid("id").primaryKey().defaultRandom(),
  bookingId: uuid("booking_id").notNull(),
  customerId: uuid("customer_id").notNull(),
  amount: decimal("amount", { precision: 10, scale: 2 }).notNull(),
  currency: text("currency").default("INR"),
  paymentStatus: text("payment_status").default("pending"),
  paymentDate: timestamp("payment_date"),
  razorpayOrderId: text("razorpay_order_id"),
  razorpayPaymentId: text("razorpay_payment_id"),
  razorpaySignature: text("razorpay_signature"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Notifications table - User notifications
export const notifications = pgTable("notifications", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id").notNull(),
  title: text("title").notNull(),
  message: text("message").notNull(),
  type: text("type").default("info"),
  isRead: boolean("is_read").default(false),
  createdAt: timestamp("created_at").defaultNow(),
});

// Saved vendors table - Customer saved vendors
export const savedVendors = pgTable("saved_vendors", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id").notNull(),
  vendorId: uuid("vendor_id").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

// Chat sessions table - AI chatbot sessions
export const chatSessions = pgTable("chat_sessions", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id"),
  sessionToken: text("session_token").notNull(),
  isActive: boolean("is_active").default(true),
  maxChatTime: integer("max_chat_time").default(300), // 5 minutes default
  maxVoiceTime: integer("max_voice_time").default(180), // 3 minutes default
  chatTimeUsed: integer("chat_time_used").default(0),
  voiceTimeUsed: integer("voice_time_used").default(0),
  expiresAt: timestamp("expires_at").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Relations
export const profilesRelations = relations(profiles, ({ many }) => ({
  vendors: many(vendors),
  bookings: many(bookings),
  notifications: many(notifications),
  savedVendors: many(savedVendors),
}));

export const vendorsRelations = relations(vendors, ({ one, many }) => ({
  profile: one(profiles, {
    fields: [vendors.userId],
    references: [profiles.userId],
  }),
  bookings: many(bookings),
  savedBy: many(savedVendors),
}));

export const bookingsRelations = relations(bookings, ({ one, many }) => ({
  customer: one(profiles, {
    fields: [bookings.customerId],
    references: [profiles.userId],
  }),
  vendor: one(vendors, {
    fields: [bookings.vendorId],
    references: [vendors.id],
  }),
  payments: many(payments),
}));

export const paymentsRelations = relations(payments, ({ one }) => ({
  booking: one(bookings, {
    fields: [payments.bookingId],
    references: [bookings.id],
  }),
}));

// Zod schemas for validation
export const insertProfileSchema = createInsertSchema(profiles).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertVendorSchema = createInsertSchema(vendors).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertBookingSchema = createInsertSchema(bookings).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertPaymentSchema = createInsertSchema(payments).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertNotificationSchema = createInsertSchema(notifications).omit({
  id: true,
  createdAt: true,
});

export const insertOtpSchema = createInsertSchema(otps).omit({
  id: true,
  createdAt: true,
});

export const insertChatSessionSchema = createInsertSchema(chatSessions).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

// Export types
export type Profile = typeof profiles.$inferSelect;
export type InsertProfile = z.infer<typeof insertProfileSchema>;

export type Vendor = typeof vendors.$inferSelect;
export type InsertVendor = z.infer<typeof insertVendorSchema>;

export type Booking = typeof bookings.$inferSelect;
export type InsertBooking = z.infer<typeof insertBookingSchema>;

export type Payment = typeof payments.$inferSelect;
export type InsertPayment = z.infer<typeof insertPaymentSchema>;

export type Notification = typeof notifications.$inferSelect;
export type InsertNotification = z.infer<typeof insertNotificationSchema>;

export type Otp = typeof otps.$inferSelect;
export type InsertOtp = z.infer<typeof insertOtpSchema>;

export type ChatSession = typeof chatSessions.$inferSelect;
export type InsertChatSession = z.infer<typeof insertChatSessionSchema>;

// Legacy user table for compatibility
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
