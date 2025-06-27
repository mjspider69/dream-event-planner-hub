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
      admin_settings: {
        Row: {
          description: string | null
          id: string
          key: string
          updated_at: string | null
          updated_by: string | null
          value: Json
        }
        Insert: {
          description?: string | null
          id?: string
          key: string
          updated_at?: string | null
          updated_by?: string | null
          value: Json
        }
        Update: {
          description?: string | null
          id?: string
          key?: string
          updated_at?: string | null
          updated_by?: string | null
          value?: Json
        }
        Relationships: [
          {
            foreignKeyName: "admin_settings_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      bookings: {
        Row: {
          budget: number | null
          created_at: string
          customer_id: string | null
          event_date: string
          event_location: string
          event_type: string
          guest_count: number | null
          id: string
          requirements: string | null
          status: string | null
          total_amount: number | null
          updated_at: string
          vendor_id: string | null
        }
        Insert: {
          budget?: number | null
          created_at?: string
          customer_id?: string | null
          event_date: string
          event_location: string
          event_type: string
          guest_count?: number | null
          id?: string
          requirements?: string | null
          status?: string | null
          total_amount?: number | null
          updated_at?: string
          vendor_id?: string | null
        }
        Update: {
          budget?: number | null
          created_at?: string
          customer_id?: string | null
          event_date?: string
          event_location?: string
          event_type?: string
          guest_count?: number | null
          id?: string
          requirements?: string | null
          status?: string | null
          total_amount?: number | null
          updated_at?: string
          vendor_id?: string | null
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
      chat_messages: {
        Row: {
          chat_room_id: string | null
          created_at: string
          id: string
          is_read: boolean | null
          message: string
          sender_type: string
          user_id: string | null
          vendor_id: string | null
        }
        Insert: {
          chat_room_id?: string | null
          created_at?: string
          id?: string
          is_read?: boolean | null
          message: string
          sender_type: string
          user_id?: string | null
          vendor_id?: string | null
        }
        Update: {
          chat_room_id?: string | null
          created_at?: string
          id?: string
          is_read?: boolean | null
          message?: string
          sender_type?: string
          user_id?: string | null
          vendor_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "chat_messages_chat_room_id_fkey"
            columns: ["chat_room_id"]
            isOneToOne: false
            referencedRelation: "chat_rooms"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "chat_messages_vendor_id_fkey"
            columns: ["vendor_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      chat_rooms: {
        Row: {
          booking_id: string | null
          created_at: string | null
          customer_id: string | null
          id: string
          last_message_at: string | null
          vendor_id: string | null
        }
        Insert: {
          booking_id?: string | null
          created_at?: string | null
          customer_id?: string | null
          id?: string
          last_message_at?: string | null
          vendor_id?: string | null
        }
        Update: {
          booking_id?: string | null
          created_at?: string | null
          customer_id?: string | null
          id?: string
          last_message_at?: string | null
          vendor_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "chat_rooms_booking_id_fkey"
            columns: ["booking_id"]
            isOneToOne: false
            referencedRelation: "bookings"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "chat_rooms_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "chat_rooms_vendor_id_fkey"
            columns: ["vendor_id"]
            isOneToOne: false
            referencedRelation: "vendors"
            referencedColumns: ["id"]
          },
        ]
      }
      contact_submissions: {
        Row: {
          created_at: string
          email: string
          id: string
          message: string
          name: string
          phone: string | null
          status: string | null
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          message: string
          name: string
          phone?: string | null
          status?: string | null
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          message?: string
          name?: string
          phone?: string | null
          status?: string | null
        }
        Relationships: []
      }
      cultural_backdrops: {
        Row: {
          city_name: string | null
          created_at: string | null
          description: string | null
          id: string
          image_url: string
          is_active: boolean | null
          state_name: string
        }
        Insert: {
          city_name?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          image_url: string
          is_active?: boolean | null
          state_name: string
        }
        Update: {
          city_name?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          image_url?: string
          is_active?: boolean | null
          state_name?: string
        }
        Relationships: []
      }
      invoices: {
        Row: {
          amount: number
          booking_id: string | null
          created_at: string | null
          customer_id: string | null
          due_date: string | null
          id: string
          invoice_number: string
          issued_date: string | null
          status: string | null
          tax_amount: number | null
          total_amount: number
          updated_at: string | null
        }
        Insert: {
          amount: number
          booking_id?: string | null
          created_at?: string | null
          customer_id?: string | null
          due_date?: string | null
          id?: string
          invoice_number: string
          issued_date?: string | null
          status?: string | null
          tax_amount?: number | null
          total_amount: number
          updated_at?: string | null
        }
        Update: {
          amount?: number
          booking_id?: string | null
          created_at?: string | null
          customer_id?: string | null
          due_date?: string | null
          id?: string
          invoice_number?: string
          issued_date?: string | null
          status?: string | null
          tax_amount?: number | null
          total_amount?: number
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "invoices_booking_id_fkey"
            columns: ["booking_id"]
            isOneToOne: false
            referencedRelation: "bookings"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "invoices_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      packages: {
        Row: {
          category: string
          created_at: string
          description: string | null
          id: string
          image_url: string | null
          included_services: Json | null
          is_featured: boolean | null
          name: string
          price_range: string | null
        }
        Insert: {
          category: string
          created_at?: string
          description?: string | null
          id?: string
          image_url?: string | null
          included_services?: Json | null
          is_featured?: boolean | null
          name: string
          price_range?: string | null
        }
        Update: {
          category?: string
          created_at?: string
          description?: string | null
          id?: string
          image_url?: string | null
          included_services?: Json | null
          is_featured?: boolean | null
          name?: string
          price_range?: string | null
        }
        Relationships: []
      }
      payments: {
        Row: {
          amount: number
          booking_id: string | null
          created_at: string
          customer_id: string | null
          id: string
          payment_date: string | null
          payment_method: string | null
          payment_status: string | null
          transaction_id: string | null
        }
        Insert: {
          amount: number
          booking_id?: string | null
          created_at?: string
          customer_id?: string | null
          id?: string
          payment_date?: string | null
          payment_method?: string | null
          payment_status?: string | null
          transaction_id?: string | null
        }
        Update: {
          amount?: number
          booking_id?: string | null
          created_at?: string
          customer_id?: string | null
          id?: string
          payment_date?: string | null
          payment_method?: string | null
          payment_status?: string | null
          transaction_id?: string | null
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
          availability: Json | null
          avatar_url: string | null
          business_category: string | null
          business_description: string | null
          business_location: string | null
          business_name: string | null
          city: string | null
          created_at: string
          first_call_used: boolean | null
          full_name: string | null
          id: string
          is_online: boolean | null
          phone: string | null
          portfolio_images: string[] | null
          price_range: string | null
          services: Json | null
          social_links: Json | null
          speciality: string[] | null
          updated_at: string
          user_type: string | null
          verification_status: string | null
        }
        Insert: {
          availability?: Json | null
          avatar_url?: string | null
          business_category?: string | null
          business_description?: string | null
          business_location?: string | null
          business_name?: string | null
          city?: string | null
          created_at?: string
          first_call_used?: boolean | null
          full_name?: string | null
          id: string
          is_online?: boolean | null
          phone?: string | null
          portfolio_images?: string[] | null
          price_range?: string | null
          services?: Json | null
          social_links?: Json | null
          speciality?: string[] | null
          updated_at?: string
          user_type?: string | null
          verification_status?: string | null
        }
        Update: {
          availability?: Json | null
          avatar_url?: string | null
          business_category?: string | null
          business_description?: string | null
          business_location?: string | null
          business_name?: string | null
          city?: string | null
          created_at?: string
          first_call_used?: boolean | null
          full_name?: string | null
          id?: string
          is_online?: boolean | null
          phone?: string | null
          portfolio_images?: string[] | null
          price_range?: string | null
          services?: Json | null
          social_links?: Json | null
          speciality?: string[] | null
          updated_at?: string
          user_type?: string | null
          verification_status?: string | null
        }
        Relationships: []
      }
      quotations: {
        Row: {
          budget: number | null
          created_at: string
          customer_id: string | null
          event_date: string
          event_location: string
          event_type: string
          guest_count: number | null
          id: string
          requirements: string | null
          selected_vendors: Json | null
          status: string | null
          total_amount: number | null
          updated_at: string
        }
        Insert: {
          budget?: number | null
          created_at?: string
          customer_id?: string | null
          event_date: string
          event_location: string
          event_type: string
          guest_count?: number | null
          id?: string
          requirements?: string | null
          selected_vendors?: Json | null
          status?: string | null
          total_amount?: number | null
          updated_at?: string
        }
        Update: {
          budget?: number | null
          created_at?: string
          customer_id?: string | null
          event_date?: string
          event_location?: string
          event_type?: string
          guest_count?: number | null
          id?: string
          requirements?: string | null
          selected_vendors?: Json | null
          status?: string | null
          total_amount?: number | null
          updated_at?: string
        }
        Relationships: []
      }
      saved_vendors: {
        Row: {
          created_at: string | null
          customer_id: string | null
          id: string
          vendor_id: string | null
        }
        Insert: {
          created_at?: string | null
          customer_id?: string | null
          id?: string
          vendor_id?: string | null
        }
        Update: {
          created_at?: string | null
          customer_id?: string | null
          id?: string
          vendor_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "saved_vendors_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "saved_vendors_vendor_id_fkey"
            columns: ["vendor_id"]
            isOneToOne: false
            referencedRelation: "vendors"
            referencedColumns: ["id"]
          },
        ]
      }
      testimonials: {
        Row: {
          created_at: string
          customer_image: string | null
          customer_name: string
          event_type: string | null
          id: string
          is_featured: boolean | null
          rating: number | null
          review_text: string
        }
        Insert: {
          created_at?: string
          customer_image?: string | null
          customer_name: string
          event_type?: string | null
          id?: string
          is_featured?: boolean | null
          rating?: number | null
          review_text: string
        }
        Update: {
          created_at?: string
          customer_image?: string | null
          customer_name?: string
          event_type?: string | null
          id?: string
          is_featured?: boolean | null
          rating?: number | null
          review_text?: string
        }
        Relationships: []
      }
      tickets: {
        Row: {
          category: string | null
          created_at: string | null
          customer_id: string | null
          description: string
          id: string
          priority: string | null
          status: string | null
          title: string
          updated_at: string | null
        }
        Insert: {
          category?: string | null
          created_at?: string | null
          customer_id?: string | null
          description: string
          id?: string
          priority?: string | null
          status?: string | null
          title: string
          updated_at?: string | null
        }
        Update: {
          category?: string | null
          created_at?: string | null
          customer_id?: string | null
          description?: string
          id?: string
          priority?: string | null
          status?: string | null
          title?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "tickets_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      vendor_availability: {
        Row: {
          created_at: string | null
          current_bookings: number | null
          date: string
          id: string
          is_available: boolean | null
          max_bookings: number | null
          notes: string | null
          vendor_id: string | null
        }
        Insert: {
          created_at?: string | null
          current_bookings?: number | null
          date: string
          id?: string
          is_available?: boolean | null
          max_bookings?: number | null
          notes?: string | null
          vendor_id?: string | null
        }
        Update: {
          created_at?: string | null
          current_bookings?: number | null
          date?: string
          id?: string
          is_available?: boolean | null
          max_bookings?: number | null
          notes?: string | null
          vendor_id?: string | null
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
          booking_id: string | null
          commission_amount: number
          commission_rate: number | null
          created_at: string | null
          id: string
          net_amount: number
          payment_date: string | null
          status: string | null
          vendor_id: string | null
        }
        Insert: {
          amount: number
          booking_id?: string | null
          commission_amount: number
          commission_rate?: number | null
          created_at?: string | null
          id?: string
          net_amount: number
          payment_date?: string | null
          status?: string | null
          vendor_id?: string | null
        }
        Update: {
          amount?: number
          booking_id?: string | null
          commission_amount?: number
          commission_rate?: number | null
          created_at?: string | null
          id?: string
          net_amount?: number
          payment_date?: string | null
          status?: string | null
          vendor_id?: string | null
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
          contact_email: string | null
          contact_phone: string | null
          created_at: string
          description: string | null
          earnings: number | null
          id: string
          is_approved: boolean | null
          is_online: boolean | null
          location: string | null
          portfolio_images: string[] | null
          price_range: string | null
          rating: number | null
          services: Json | null
          status: string | null
          updated_at: string
          user_id: string | null
        }
        Insert: {
          availability?: Json | null
          business_name: string
          category: string
          contact_email?: string | null
          contact_phone?: string | null
          created_at?: string
          description?: string | null
          earnings?: number | null
          id?: string
          is_approved?: boolean | null
          is_online?: boolean | null
          location?: string | null
          portfolio_images?: string[] | null
          price_range?: string | null
          rating?: number | null
          services?: Json | null
          status?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          availability?: Json | null
          business_name?: string
          category?: string
          contact_email?: string | null
          contact_phone?: string | null
          created_at?: string
          description?: string | null
          earnings?: number | null
          id?: string
          is_approved?: boolean | null
          is_online?: boolean | null
          location?: string | null
          portfolio_images?: string[] | null
          price_range?: string | null
          rating?: number | null
          services?: Json | null
          status?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
