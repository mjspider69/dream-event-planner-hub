export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      bookings: {
        Row: {
          budget: number
          booking_expires_at: string | null
          created_at: string | null
          customer_id: string
          customer_rating: number | null
          event_date: string
          event_location: string
          event_type: string
          guest_count: number
          id: string
          payment_status: string | null
          requirements: string | null
          special_requirements: string | null
          status: string | null
          total_amount: number | null
          updated_at: string | null
          vendor_id: string
          vendor_rating: number | null
          vendor_response: string | null
        }
        Insert: {
          budget: number
          booking_expires_at?: string | null
          created_at?: string | null
          customer_id: string
          customer_rating?: number | null
          event_date: string
          event_location: string
          event_type: string
          guest_count: number
          id?: string
          payment_status?: string | null
          requirements?: string | null
          special_requirements?: string | null
          status?: string | null
          total_amount?: number | null
          updated_at?: string | null
          vendor_id: string
          vendor_rating?: number | null
          vendor_response?: string | null
        }
        Update: {
          budget?: number
          booking_expires_at?: string | null
          created_at?: string | null
          customer_id?: string
          customer_rating?: number | null
          event_date?: string
          event_location?: string
          event_type?: string
          guest_count?: number
          id?: string
          payment_status?: string | null
          requirements?: string | null
          special_requirements?: string | null
          status?: string | null
          total_amount?: number | null
          updated_at?: string | null
          vendor_id?: string
          vendor_rating?: number | null
          vendor_response?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "bookings_vendor_id_fkey"
            columns: ["vendor_id"]
            isOneToOne: false
            referencedRelation: "vendors"
            referencedColumns: ["id"]
          },
        ]
      }
      chat_sessions: {
        Row: {
          chat_time_used: number | null
          created_at: string | null
          expires_at: string | null
          id: string
          is_active: boolean | null
          max_chat_time: number | null
          max_voice_time: number | null
          session_token: string
          updated_at: string | null
          user_id: string | null
          voice_time_used: number | null
        }
        Insert: {
          chat_time_used?: number | null
          created_at?: string | null
          expires_at?: string | null
          id?: string
          is_active?: boolean | null
          max_chat_time?: number | null
          max_voice_time?: number | null
          session_token: string
          updated_at?: string | null
          user_id?: string | null
          voice_time_used?: number | null
        }
        Update: {
          chat_time_used?: number | null
          created_at?: string | null
          expires_at?: string | null
          id?: string
          is_active?: boolean | null
          max_chat_time?: number | null
          max_voice_time?: number | null
          session_token?: string
          updated_at?: string | null
          user_id?: string | null
          voice_time_used?: number | null
        }
        Relationships: []
      }
      notifications: {
        Row: {
          created_at: string | null
          id: string
          is_read: boolean | null
          message: string
          title: string
          type: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          is_read?: boolean | null
          message: string
          title: string
          type?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          is_read?: boolean | null
          message?: string
          title?: string
          type?: string | null
          user_id?: string
        }
        Relationships: []
      }
      otps: {
        Row: {
          attempts: number | null
          created_at: string | null
          email: string | null
          expires_at: string
          id: string
          is_verified: boolean | null
          max_attempts: number | null
          otp_code: string
          phone: string | null
          purpose: string
        }
        Insert: {
          attempts?: number | null
          created_at?: string | null
          email?: string | null
          expires_at: string
          id?: string
          is_verified?: boolean | null
          max_attempts?: number | null
          otp_code: string
          phone?: string | null
          purpose?: string
        }
        Update: {
          attempts?: number | null
          created_at?: string | null
          email?: string | null
          expires_at?: string
          id?: string
          is_verified?: boolean | null
          max_attempts?: number | null
          otp_code?: string
          phone?: string | null
          purpose?: string
        }
        Relationships: []
      }
      payments: {
        Row: {
          amount: number
          booking_id: string
          created_at: string | null
          currency: string | null
          customer_id: string
          id: string
          payment_date: string | null
          payment_status: string | null
          razorpay_order_id: string | null
          razorpay_payment_id: string | null
          razorpay_signature: string | null
          updated_at: string | null
        }
        Insert: {
          amount: number
          booking_id: string
          created_at?: string | null
          currency?: string | null
          customer_id: string
          id?: string
          payment_date?: string | null
          payment_status?: string | null
          razorpay_order_id?: string | null
          razorpay_payment_id?: string | null
          razorpay_signature?: string | null
          updated_at?: string | null
        }
        Update: {
          amount?: number
          booking_id?: string
          created_at?: string | null
          currency?: string | null
          customer_id?: string
          id?: string
          payment_date?: string | null
          payment_status?: string | null
          razorpay_order_id?: string | null
          razorpay_payment_id?: string | null
          razorpay_signature?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "payments_booking_id_fkey"
            columns: ["booking_id"]
            isOneToOne: false
            referencedRelation: "bookings"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          city: string | null
          created_at: string | null
          email_verified: boolean | null
          full_name: string | null
          id: string
          last_login: string | null
          phone: string | null
          phone_verified: boolean | null
          preferences: Json | null
          updated_at: string | null
          user_id: string
          user_type: string | null
        }
        Insert: {
          city?: string | null
          created_at?: string | null
          email_verified?: boolean | null
          full_name?: string | null
          id?: string
          last_login?: string | null
          phone?: string | null
          phone_verified?: boolean | null
          preferences?: Json | null
          updated_at?: string | null
          user_id: string
          user_type?: string | null
        }
        Update: {
          city?: string | null
          created_at?: string | null
          email_verified?: boolean | null
          full_name?: string | null
          id?: string
          last_login?: string | null
          phone?: string | null
          phone_verified?: boolean | null
          preferences?: Json | null
          updated_at?: string | null
          user_id?: string
          user_type?: string | null
        }
        Relationships: []
      }
      saved_vendors: {
        Row: {
          created_at: string | null
          id: string
          user_id: string
          vendor_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          user_id: string
          vendor_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          user_id?: string
          vendor_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "saved_vendors_vendor_id_fkey"
            columns: ["vendor_id"]
            isOneToOne: false
            referencedRelation: "vendors"
            referencedColumns: ["id"]
          },
        ]
      }
      system_settings: {
        Row: {
          created_at: string | null
          description: string | null
          id: string
          setting_key: string
          setting_value: Json
          updated_at: string | null
          updated_by: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string
          setting_key: string
          setting_value: Json
          updated_at?: string | null
          updated_by?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string
          setting_key?: string
          setting_value?: Json
          updated_at?: string | null
          updated_by?: string | null
        }
        Relationships: []
      }
      vendor_availability: {
        Row: {
          created_at: string | null
          date: string
          id: string
          is_available: boolean | null
          notes: string | null
          time_slots: string[] | null
          updated_at: string | null
          vendor_id: string
        }
        Insert: {
          created_at?: string | null
          date: string
          id?: string
          is_available?: boolean | null
          notes?: string | null
          time_slots?: string[] | null
          updated_at?: string | null
          vendor_id: string
        }
        Update: {
          created_at?: string | null
          date?: string
          id?: string
          is_available?: boolean | null
          notes?: string | null
          time_slots?: string[] | null
          updated_at?: string | null
          vendor_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "vendor_availability_vendor_id_fkey"
            columns: ["vendor_id"]
            isOneToOne: false
            referencedRelation: "vendors"
            referencedColumns: ["id"]
          },
        ]
      }
      vendor_earnings: {
        Row: {
          amount: number
          booking_id: string
          commission_amount: number
          commission_rate: number
          created_at: string | null
          id: string
          net_amount: number
          status: string | null
          updated_at: string | null
          vendor_id: string
        }
        Insert: {
          amount: number
          booking_id: string
          commission_amount: number
          commission_rate: number
          created_at?: string | null
          id?: string
          net_amount: number
          status?: string | null
          updated_at?: string | null
          vendor_id: string
        }
        Update: {
          amount?: number
          booking_id?: string
          commission_amount?: number
          commission_rate?: number
          created_at?: string | null
          id?: string
          net_amount?: number
          status?: string | null
          updated_at?: string | null
          vendor_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "vendor_earnings_booking_id_fkey"
            columns: ["booking_id"]
            isOneToOne: false
            referencedRelation: "bookings"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "vendor_earnings_vendor_id_fkey"
            columns: ["vendor_id"]
            isOneToOne: false
            referencedRelation: "vendors"
            referencedColumns: ["id"]
          },
        ]
      }
      vendors: {
        Row: {
          availability: Json | null
          business_name: string
          category: string
          city: string
          contact_person: string | null
          created_at: string | null
          description: string | null
          email: string | null
          id: string
          is_approved: boolean | null
          is_featured: boolean | null
          is_online: boolean | null
          phone: string | null
          portfolio_images: string[] | null
          price_range: string | null
          rating: number | null
          social_media: Json | null
          speciality: string[] | null
          total_bookings: number | null
          updated_at: string | null
          user_id: string | null
          verification_status: string | null
        }
        Insert: {
          availability?: Json | null
          business_name: string
          category: string
          city: string
          contact_person?: string | null
          created_at?: string | null
          description?: string | null
          email?: string | null
          id?: string
          is_approved?: boolean | null
          is_featured?: boolean | null
          is_online?: boolean | null
          phone?: string | null
          portfolio_images?: string[] | null
          price_range?: string | null
          rating?: number | null
          social_media?: Json | null
          speciality?: string[] | null
          total_bookings?: number | null
          updated_at?: string | null
          user_id?: string | null
          verification_status?: string | null
        }
        Update: {
          availability?: Json | null
          business_name?: string
          category?: string
          city?: string
          contact_person?: string | null
          created_at?: string | null
          description?: string | null
          email?: string | null
          id?: string
          is_approved?: boolean | null
          is_featured?: boolean | null
          is_online?: boolean | null
          phone?: string | null
          portfolio_images?: string[] | null
          price_range?: string | null
          rating?: number | null
          social_media?: Json | null
          speciality?: string[] | null
          total_bookings?: number | null
          updated_at?: string | null
          user_id?: string | null
          verification_status?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      cleanup_expired_otps: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      create_otp_record: {
        Args: {
          p_email?: string
          p_phone?: string
          p_purpose?: string
        }
        Returns: {
          otp_code: string
          expires_at: string
        }[]
      }
      generate_otp: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      update_updated_at_column: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      validate_indian_phone: {
        Args: {
          phone_number: string
        }
        Returns: boolean
      }
      verify_otp_code: {
        Args: {
          p_email?: string
          p_phone?: string
          p_otp_code: string
          p_purpose?: string
        }
        Returns: boolean
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never