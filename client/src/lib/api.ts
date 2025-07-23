// API client to replace Supabase calls with our backend API

export class ApiClient {
  private baseUrl = '';

  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${this.baseUrl}/api${endpoint}`;
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    if (config.body && typeof config.body === 'object') {
      config.body = JSON.stringify(config.body);
    }

    const response = await fetch(url, config);
    
    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      throw new Error(error.error || `HTTP ${response.status}: ${response.statusText}`);
    }

    return response.json();
  }

  // OTP Management
  async sendOTP(data: { email?: string; phone?: string; purpose?: string }) {
    return this.request<{ success: boolean; message: string; otpCode?: string }>('/otp/send', {
      method: 'POST',
      body: data,
    });
  }

  async verifyOTP(data: { email?: string; phone?: string; otpCode: string; purpose?: string }) {
    return this.request<{ success: boolean; message: string }>('/otp/verify', {
      method: 'POST',
      body: data,
    });
  }

  // Profile Management
  async getProfile(userId: string) {
    return this.request(`/profile/${userId}`);
  }

  async createProfile(profile: any) {
    return this.request('/profile', {
      method: 'POST',
      body: profile,
    });
  }

  async updateProfile(userId: string, updates: any) {
    return this.request(`/profile/${userId}`, {
      method: 'PUT',
      body: updates,
    });
  }

  // Vendor Management
  async getVendors(filters: { category?: string; city?: string; featured?: boolean } = {}) {
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined) {
        params.append(key, String(value));
      }
    });
    const query = params.toString() ? `?${params.toString()}` : '';
    return this.request(`/vendors${query}`);
  }

  async getVendor(id: string) {
    return this.request(`/vendor/${id}`);
  }

  async createVendor(vendor: any) {
    return this.request('/vendor', {
      method: 'POST',
      body: vendor,
    });
  }

  async updateVendor(id: string, updates: any) {
    return this.request(`/vendor/${id}`, {
      method: 'PUT',
      body: updates,
    });
  }

  async approveVendor(id: string) {
    return this.request(`/vendor/${id}/approve`, {
      method: 'POST',
    });
  }

  // Booking Management
  async getBookings(filters: { customerId?: string; vendorId?: string; status?: string } = {}) {
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined) {
        params.append(key, String(value));
      }
    });
    const query = params.toString() ? `?${params.toString()}` : '';
    return this.request(`/bookings${query}`);
  }

  async getBooking(id: string) {
    return this.request(`/booking/${id}`);
  }

  async createBooking(booking: any) {
    return this.request('/booking', {
      method: 'POST',
      body: booking,
    });
  }

  async updateBooking(id: string, updates: any) {
    return this.request(`/booking/${id}`, {
      method: 'PUT',
      body: updates,
    });
  }

  // Payment Management
  async getPayments(bookingId?: string) {
    const query = bookingId ? `?bookingId=${bookingId}` : '';
    return this.request(`/payments${query}`);
  }

  async createPayment(payment: any) {
    return this.request('/payment', {
      method: 'POST',
      body: payment,
    });
  }

  // Notification Management
  async getNotifications(userId: string) {
    return this.request(`/notifications/${userId}`);
  }

  async createNotification(notification: any) {
    return this.request('/notification', {
      method: 'POST',
      body: notification,
    });
  }

  async markNotificationRead(id: string) {
    return this.request(`/notification/${id}/read`, {
      method: 'PUT',
    });
  }

  // Chat Session Management
  async createChatSession(session: any) {
    return this.request('/chat/session', {
      method: 'POST',
      body: session,
    });
  }

  async getChatSession(token: string) {
    return this.request(`/chat/session/${token}`);
  }

  // Saved Vendors
  async saveVendor(userId: string, vendorId: string) {
    return this.request('/saved-vendors', {
      method: 'POST',
      body: { userId, vendorId },
    });
  }

  async unsaveVendor(userId: string, vendorId: string) {
    return this.request('/saved-vendors', {
      method: 'DELETE',
      body: { userId, vendorId },
    });
  }

  async getSavedVendors(userId: string) {
    return this.request(`/saved-vendors/${userId}`);
  }

  // Legacy user support
  async getUser(id: number) {
    return this.request(`/user/${id}`);
  }

  // Cleanup utilities
  async cleanupExpiredOTPs() {
    return this.request('/cleanup/otps', {
      method: 'POST',
    });
  }
}

export const apiClient = new ApiClient();