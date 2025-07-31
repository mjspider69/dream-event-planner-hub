import { 
  users, profiles, vendors, bookings, payments, notifications, otps, chatSessions, savedVendors,
  type User, type InsertUser, type Profile, type InsertProfile, 
  type Vendor, type InsertVendor, type Booking, type InsertBooking,
  type Payment, type InsertPayment, type Notification, type InsertNotification,
  type Otp, type InsertOtp, type ChatSession, type InsertChatSession
} from "@shared/schema";
import { db } from "./db";
import { eq, and, desc, like, gte, lte, inArray, or } from "drizzle-orm";

// Database operation wrapper with retry logic
async function withRetry<T>(operation: () => Promise<T>, maxRetries = 3): Promise<T> {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await operation();
    } catch (error) {
      console.error(`Database operation failed (attempt ${attempt}/${maxRetries}):`, error);

      if (attempt === maxRetries) {
        throw error;
      }

      // Wait before retrying
      await new Promise(resolve => setTimeout(resolve, attempt * 1000));
    }
  }
  throw new Error('Max retries exceeded');
}

export interface IStorage {
  // Legacy user methods for compatibility
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  // Profile methods
  getProfile(userId: string): Promise<Profile | undefined>;
  getProfileByEmail(email: string): Promise<Profile | undefined>;
  createProfile(profile: InsertProfile): Promise<Profile>;
  updateProfile(userId: string, updates: Partial<InsertProfile>): Promise<Profile | undefined>;

  // OTP methods
  createOtp(otp: InsertOtp): Promise<Otp>;
  verifyOtp(email: string, otpCode: string, purpose: string): Promise<boolean>;
  cleanupExpiredOtps(): Promise<void>;

  // Vendor methods
  getVendors(filters?: { category?: string; city?: string; featured?: boolean }): Promise<Vendor[]>;
  getVendor(id: string): Promise<Vendor | undefined>;
  getVendorByUserId(userId: string): Promise<Vendor | undefined>;
  createVendor(vendor: InsertVendor): Promise<Vendor>;
  updateVendor(id: string, updates: Partial<InsertVendor>): Promise<Vendor | undefined>;
  approveVendor(id: string): Promise<Vendor | undefined>;

  // Booking methods
  getBookings(filters?: { customerId?: string; vendorId?: string; status?: string }): Promise<Booking[]>;
  getBooking(id: string): Promise<Booking | undefined>;
  createBooking(booking: InsertBooking): Promise<Booking>;
  updateBooking(id: string, updates: Partial<InsertBooking>): Promise<Booking | undefined>;

  // Payment methods
  getPayments(bookingId?: string): Promise<Payment[]>;
  createPayment(payment: InsertPayment): Promise<Payment>;
  updatePayment(id: string, updates: Partial<InsertPayment>): Promise<Payment | undefined>;

  // Notification methods
  getNotifications(userId: string): Promise<Notification[]>;
  createNotification(notification: InsertNotification): Promise<Notification>;
  markNotificationRead(id: string): Promise<void>;

  // Chat session methods
  createChatSession(session: InsertChatSession): Promise<ChatSession>;
  getChatSession(sessionToken: string): Promise<ChatSession | undefined>;
  updateChatSession(id: string, updates: Partial<InsertChatSession>): Promise<ChatSession | undefined>;

  // Saved vendors methods
  saveVendor(userId: string, vendorId: string): Promise<void>;
  unsaveVendor(userId: string, vendorId: string): Promise<void>;
  getSavedVendors(userId: string): Promise<Vendor[]>;
  getUserByEmail(email: string): Promise<Profile | undefined>;
  getPendingVendors(): Promise<Vendor[]>;
  rejectVendor(id: string, reason?: string): Promise<Vendor | undefined>;
  updateBookingStatus(id: string, status: string, notes?: string): Promise<Booking | undefined>;
  updateBookingPaymentStatus(bookingId: string, paymentStatus: string): Promise<void>;
  getAnalytics(userType: string, userId?: string): Promise<any>;
  healthCheck(): Promise<void>;
}

export class DatabaseStorage implements IStorage {
  // Legacy user methods for compatibility
  async getUser(id: number): Promise<User | undefined> {
    return withRetry(async () => {
      const [user] = await db.select().from(users).where(eq(users.id, id));
      return user || undefined;
    });
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return withRetry(async () => {
      const [user] = await db.select().from(users).where(eq(users.username, username));
      return user || undefined;
    });
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    return withRetry(async () => {
      const [user] = await db.insert(users).values(insertUser).returning();
      return user;
    });
  }

  // Profile methods
  async getProfile(userId: string): Promise<Profile | undefined> {
    return withRetry(async () => {
      const [profile] = await db.select().from(profiles).where(eq(profiles.userId, userId));
      return profile || undefined;
    });
  }

  async getProfileByEmail(email: string): Promise<Profile | undefined> {
    // Note: This would need email field in profiles table or join with auth
    return withRetry(async () => {
      const [profile] = await db.select().from(profiles).limit(1);
      return profile || undefined;
    });
  }

  async createProfile(profile: InsertProfile): Promise<Profile> {
    return withRetry(async () => {
      const [newProfile] = await db.insert(profiles).values(profile).returning();
      return newProfile;
    });
  }

  async updateProfile(userId: string, updates: Partial<InsertProfile>): Promise<Profile | undefined> {
    return withRetry(async () => {
      const [updated] = await db
        .update(profiles)
        .set({ ...updates, updatedAt: new Date() })
        .where(eq(profiles.userId, userId))
        .returning();
      return updated || undefined;
    });
  }

  // OTP methods
  async createOtp(otp: InsertOtp): Promise<Otp> {
    return withRetry(async () => {
      const [newOtp] = await db.insert(otps).values(otp).returning();
      return newOtp;
    });
  }

  async verifyOtp(email: string, otpCode: string, purpose: string): Promise<boolean> {
    return withRetry(async () => {
      const [otp] = await db
        .select()
        .from(otps)
        .where(
          and(
            eq(otps.email, email),
            eq(otps.otpCode, otpCode),
            eq(otps.purpose, purpose),
            eq(otps.isVerified, false),
            gte(otps.expiresAt, new Date())
          )
        );

      if (otp) {
        await db
          .update(otps)
          .set({ isVerified: true })
          .where(eq(otps.id, otp.id));
        return true;
      }
      return false;
    }).catch(error => {
      console.error("Verify OTP error:", error);
      return false;
    });
  }

  async cleanupExpiredOtps(): Promise<void> {
    return withRetry(async () => {
      await db.delete(otps).where(lte(otps.expiresAt, new Date()));
    });
  }

  // Vendor methods
  async getVendors(filters: { category?: string; city?: string; featured?: boolean } = {}): Promise<Vendor[]> {
    return withRetry(async () => {
      const conditions = [eq(vendors.isApproved, true)];

      if (filters.category) {
        conditions.push(eq(vendors.category, filters.category));
      }
      if (filters.city) {
        conditions.push(eq(vendors.city, filters.city));
      }
      if (filters.featured) {
        conditions.push(eq(vendors.isFeatured, true));
      }

      return await db
        .select()
        .from(vendors)
        .where(and(...conditions))
        .orderBy(desc(vendors.rating));
    }).catch(error => {
      console.error("Get vendors error:", error);
      return [];
    });
  }

  async getVendor(id: string): Promise<Vendor | undefined> {
    return withRetry(async () => {
      const [vendor] = await db.select().from(vendors).where(eq(vendors.id, id));
      return vendor || undefined;
    });
  }

  async getVendorByUserId(userId: string): Promise<Vendor | undefined> {
    return withRetry(async () => {
      const [vendor] = await db.select().from(vendors).where(eq(vendors.userId, userId));
      return vendor || undefined;
    });
  }

  async createVendor(vendorData: InsertVendor): Promise<Vendor> {
    return withRetry(async () => {
      const [newVendor] = await db.insert(vendors).values({
        ...vendorData,
        // id will be generated by UUID DEFAULT in database
        isApproved: true, // Auto-approve vendors for immediate listing
        isOnline: true,
        createdAt: new Date(),
        updatedAt: new Date()
      }).returning();
      return newVendor;
    });
  }

  async updateVendor(id: string, updates: Partial<InsertVendor>): Promise<Vendor | undefined> {
    return withRetry(async () => {
      const [updated] = await db
        .update(vendors)
        .set({ ...updates, updatedAt: new Date() })
        .where(eq(vendors.id, id))
        .returning();
      return updated || undefined;
    });
  }

  async approveVendor(id: string): Promise<Vendor | undefined> {
    return withRetry(async () => {
      const [approved] = await db
        .update(vendors)
        .set({ isApproved: true, updatedAt: new Date() })
        .where(eq(vendors.id, id))
        .returning();
      return approved || undefined;
    });
  }

  // Booking methods
  async getBookings(filters: { customerId?: string; vendorId?: string; status?: string } = {}): Promise<Booking[]> {
    return withRetry(async () => {
      const conditions = [];
      if (filters.customerId) conditions.push(eq(bookings.customerId, filters.customerId));
      if (filters.vendorId) conditions.push(eq(bookings.vendorId, filters.vendorId));
      if (filters.status) conditions.push(eq(bookings.status, filters.status));

      if (conditions.length > 0) {
        return await db
          .select()
          .from(bookings)
          .where(and(...conditions))
          .orderBy(desc(bookings.createdAt));
      } else {
        return await db
          .select()
          .from(bookings)
          .orderBy(desc(bookings.createdAt));
      }
    });
  }

  async getBooking(id: string): Promise<Booking | undefined> {
    return withRetry(async () => {
      const [booking] = await db.select().from(bookings).where(eq(bookings.id, id));
      return booking || undefined;
    });
  }

  async createBooking(booking: InsertBooking): Promise<Booking> {
    return withRetry(async () => {
      const [newBooking] = await db.insert(bookings).values(booking).returning();
      return newBooking;
    });
  }

  async updateBooking(id: string, updates: Partial<InsertBooking>): Promise<Booking | undefined> {
    return withRetry(async () => {
      const [updated] = await db
        .update(bookings)
        .set({ ...updates, updatedAt: new Date() })
        .where(eq(bookings.id, id))
        .returning();
      return updated || undefined;
    });
  }

  // Payment methods
  async getPayments(bookingId?: string): Promise<Payment[]> {
    return withRetry(async () => {
      if (bookingId) {
        return await db
          .select()
          .from(payments)
          .where(eq(payments.bookingId, bookingId))
          .orderBy(desc(payments.createdAt));
      } else {
        return await db
          .select()
          .from(payments)
          .orderBy(desc(payments.createdAt));
      }
    });
  }

  async createPayment(payment: InsertPayment): Promise<Payment> {
    return withRetry(async () => {
      const [newPayment] = await db.insert(payments).values(payment).returning();
      return newPayment;
    });
  }

  async updatePayment(id: string, updates: Partial<InsertPayment>): Promise<Payment | undefined> {
    return withRetry(async () => {
      const [updated] = await db
        .update(payments)
        .set({ ...updates, updatedAt: new Date() })
        .where(eq(payments.id, id))
        .returning();
      return updated || undefined;
    });
  }

  // Notification methods
  async getNotifications(userId: string): Promise<Notification[]> {
    return withRetry(async () => {
      return await db
        .select()
        .from(notifications)
        .where(eq(notifications.userId, userId))
        .orderBy(desc(notifications.createdAt));
    });
  }

  async createNotification(notification: InsertNotification): Promise<Notification> {
    return withRetry(async () => {
      const [newNotification] = await db.insert(notifications).values(notification).returning();
      return newNotification;
    });
  }

  async markNotificationRead(id: string): Promise<void> {
    return withRetry(async () => {
      await db
        .update(notifications)
        .set({ isRead: true })
        .where(eq(notifications.id, id));
    });
  }

  // Chat session methods
  async createChatSession(session: InsertChatSession): Promise<ChatSession> {
    return withRetry(async () => {
      const [newSession] = await db.insert(chatSessions).values(session).returning();
      return newSession;
    });
  }

  async getChatSession(sessionToken: string): Promise<ChatSession | undefined> {
    return withRetry(async () => {
      const [session] = await db
        .select()
        .from(chatSessions)
        .where(eq(chatSessions.sessionToken, sessionToken));
      return session || undefined;
    });
  }

  async updateChatSession(id: string, updates: Partial<InsertChatSession>): Promise<ChatSession | undefined> {
    return withRetry(async () => {
      const [updated] = await db
        .update(chatSessions)
        .set({ ...updates, updatedAt: new Date() })
        .where(eq(chatSessions.id, id))
        .returning();
      return updated || undefined;
    });
  }

  // Saved vendors methods
  async saveVendor(userId: string, vendorId: string): Promise<void> {
    return withRetry(async () => {
      await db.insert(savedVendors).values({ userId, vendorId }).onConflictDoNothing();
    });
  }

  async unsaveVendor(userId: string, vendorId: string): Promise<void> {
    return withRetry(async () => {
      await db
        .delete(savedVendors)
        .where(and(eq(savedVendors.userId, userId), eq(savedVendors.vendorId, vendorId)));
    });
  }

  async getSavedVendors(userId: string): Promise<Vendor[]> {
    return withRetry(async () => {
      const result = await db
        .select({ vendor: vendors })
        .from(savedVendors)
        .innerJoin(vendors, eq(savedVendors.vendorId, vendors.id))
        .where(eq(savedVendors.userId, userId));

      return result.map(r => r.vendor);
    });
  }

  async getUserByEmail(email: string): Promise<Profile | undefined> {
    return withRetry(async () => {
      const [user] = await db.select().from(profiles).where(eq(profiles.email, email));
      return user || undefined;
    });
  }

  async getPendingVendors(): Promise<Vendor[]> {
    return withRetry(async () => {
      return await db.select().from(vendors).where(eq(vendors.isApproved, false));
    });
  }

  async rejectVendor(id: string, reason?: string): Promise<Vendor | undefined> {
    return withRetry(async () => {
      const [vendor] = await db
        .update(vendors)
        .set({ 
          isApproved: false, 
          rejectionReason: reason,
          updatedAt: new Date() 
        })
        .where(eq(vendors.id, id))
        .returning();
      return vendor || undefined;
    });
  }

  async updateBookingStatus(id: string, status: string, notes?: string): Promise<Booking | undefined> {
    return withRetry(async () => {
      const [booking] = await db
        .update(bookings)
        .set({ 
          status: status as any, 
          notes,
          updatedAt: new Date() 
        })
        .where(eq(bookings.id, id))
        .returning();
      return booking || undefined;
    });
  }

  async updateBookingPaymentStatus(bookingId: string, paymentStatus: string): Promise<void> {
    return withRetry(async () => {
      await db
        .update(bookings)
        .set({ 
          paymentStatus: paymentStatus as any,
          updatedAt: new Date() 
        })
        .where(eq(bookings.id, bookingId));
    });
  }

  async getAnalytics(userType: string, userId?: string): Promise<any> {
    return withRetry(async () => {
      const now = new Date();
      const thisMonth = new Date(now.getFullYear(), now.getMonth(), 1);

      if (userType === 'admin') {
        const allVendors = await db.select().from(vendors);
        const pendingVendors = await db.select().from(vendors).where(eq(vendors.isApproved, false));
        const allBookings = await db.select().from(bookings);
        const allPayments = await db.select().from(payments);
        const monthlyBookings = await db.select().from(bookings).where(gte(bookings.createdAt, thisMonth));

        return {
          totalVendors: allVendors.length,
          pendingVendors: pendingVendors.length,
          totalBookings: allBookings.length,
          totalRevenue: allPayments.reduce((sum, p) => sum + (parseFloat(p.amount) || 0), 0),
          monthlyBookings: monthlyBookings.length,
          recentActivity: [
            ...allBookings.slice(-5).map(b => ({
              type: 'booking',
              message: `New booking for ${b.eventDate}`,
              timestamp: b.createdAt || new Date()
            })),
            ...allVendors.slice(-3).map(v => ({
              type: 'vendor',
              message: `New vendor registration: ${v.businessName}`,
              timestamp: v.createdAt || new Date()
            }))
          ].sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
        };
      }

      if (userType === 'vendor' && userId) {
        const vendorBookings = await db.select().from(bookings).where(eq(bookings.vendorId, userId));
        const vendorPayments = await db.select().from(payments).where(
          inArray(payments.bookingId, vendorBookings.map(b => b.id))
        );

        return {
          totalBookings: vendorBookings.length,
          pendingBookings: vendorBookings.filter(b => b.status === 'pending').length,
          completedBookings: vendorBookings.filter(b => b.status === 'completed').length,
          totalEarnings: vendorPayments.reduce((sum, p) => sum + (parseFloat(p.amount) || 0), 0),
          monthlyBookings: vendorBookings.filter(b => new Date(b.createdAt || new Date()) >= thisMonth).length,
          upcomingEvents: vendorBookings
            .filter(b => new Date(b.eventDate) > now && b.status === 'confirmed')
            .sort((a, b) => new Date(a.eventDate).getTime() - new Date(b.eventDate).getTime())
            .slice(0, 5)
        };
      }

      if (userType === 'customer' && userId) {
        const customerBookings = await db.select().from(bookings).where(eq(bookings.customerId, userId));
        const customerPayments = await db.select().from(payments).where(
          inArray(payments.bookingId, customerBookings.map(b => b.id))
        );

        return {
          totalBookings: customerBookings.length,
          upcomingEvents: customerBookings
            .filter(b => new Date(b.eventDate) > now)
            .sort((a, b) => new Date(a.eventDate).getTime() - new Date(b.eventDate).getTime())
            .slice(0, 5),
          pastEvents: customerBookings
            .filter(b => new Date(b.eventDate) < now)
            .sort((a, b) => new Date(b.eventDate).getTime() - new Date(a.eventDate).getTime())
            .slice(-5),
          totalSpent: customerPayments.reduce((sum, p) => sum + (parseFloat(p.amount) || 0), 0)
        };
      }

      return {};
    });
  }

  async healthCheck(): Promise<void> {
    return withRetry(async () => {
      // Simple health check - just query the database
      await db.select().from(profiles).limit(1);
    });
  }
}

export const storage = new DatabaseStorage();