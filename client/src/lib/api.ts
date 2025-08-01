// API client to replace Supabase calls with our backend API

const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

export class ApiClient {
  private baseUrl = API_BASE_URL;

  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;
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

    console.log('Making API request to:', url);

    try {
      const response = await fetch(url, config);

      if (!response.ok) {
        const error = await response.json().catch(() => ({}));
        console.error('API Error:', error);
        throw new Error(error.error || `HTTP ${response.status}: ${response.statusText}`);
      }

      return response.json();
    } catch (error) {
      console.error('Network Error:', error);
      if (error instanceof TypeError && error.message.includes('fetch')) {
        throw new Error('Unable to connect to server. Please check your connection.');
      }
      throw error;
    }
  }

  // OTP Management
  async sendOTP(data: { email?: string; phone?: string; purpose?: string }) {
    console.log('📡 API: Sending OTP request:', data);
    return this.request<{ success: boolean; message: string; otpCode?: string }>('/otp/send', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async verifyOTP(data: { email?: string; phone?: string; otpCode: string; purpose?: string }) {
    console.log('📡 API: Verifying OTP:', { ...data, otpCode: '***' });
    return this.request<{ success: boolean; message: string }>('/otp/verify', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  // Profile Management
  async getProfile(userId: string) {
    return this.request(`/profile/${userId}`);
  }

  async createProfile(profile: any) {
    return this.request('/profile', {
      method: 'POST',
      body: JSON.stringify(profile),
    });
  }

  async updateProfile(userId: string, updates: any) {
    return this.request(`/profile/${userId}`, {
      method: 'PUT',
      body: JSON.stringify(updates),
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
    return this.request('/bookings', {
      method: 'POST',
      body: JSON.stringify(booking),
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
      body: JSON.stringify({ userId, vendorId }),
    });
  }

  async unsaveVendor(userId: string, vendorId: string) {
    return this.request('/saved-vendors', {
      method: 'DELETE',
      body: JSON.stringify({ userId, vendorId }),
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

  // Generic post method for flexibility
  async post<T>(endpoint: string, data?: any): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined,
    });
  }
}

export const apiClient = new ApiClient();