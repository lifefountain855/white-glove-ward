-- Supabase Schema for White Glove Ward

-- Create custom types
CREATE TYPE user_role AS ENUM ('customer', 'cleaner', 'manager');
CREATE TYPE booking_status AS ENUM ('pending', 'confirmed', 'completed', 'cancelled');
CREATE TYPE photo_type AS ENUM ('before', 'after');
CREATE TYPE service_type AS ENUM ('standard', 'deep', 'move-out');

-- Create profiles table (extends auth.users)
CREATE TABLE profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  role user_role NOT NULL DEFAULT 'customer',
  full_name TEXT,
  phone TEXT,
  email TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create bookings table
CREATE TABLE bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  cleaner_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
  status booking_status NOT NULL DEFAULT 'pending',
  scheduled_date TIMESTAMPTZ NOT NULL,
  home_size TEXT NOT NULL, -- e.g. "2 bed, 1 bath"
  service_type service_type NOT NULL,
  price NUMERIC(10, 2) NOT NULL,
  special_instructions TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create photos table
CREATE TABLE photos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_id UUID REFERENCES bookings(id) ON DELETE CASCADE,
  type photo_type NOT NULL,
  url TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create reviews table
CREATE TABLE reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_id UUID REFERENCES bookings(id) ON DELETE CASCADE,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE photos ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

-- RLS Policies
-- Profiles: Everyone can read, users can update their own
CREATE POLICY "Profiles are viewable by everyone" ON profiles FOR SELECT USING (true);
CREATE POLICY "Users can insert their own profile" ON profiles FOR INSERT WITH CHECK (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (auth.uid() = id);

-- Bookings: 
-- Managers can do everything.
-- Customers can read/create/update their own.
-- Cleaners can read/update assigned bookings.
CREATE POLICY "Managers have full access to bookings" ON bookings FOR ALL USING (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'manager')
);
CREATE POLICY "Customers view own bookings" ON bookings FOR SELECT USING (auth.uid() = customer_id);
CREATE POLICY "Customers create own bookings" ON bookings FOR INSERT WITH CHECK (auth.uid() = customer_id);
CREATE POLICY "Customers update own bookings" ON bookings FOR UPDATE USING (auth.uid() = customer_id);
CREATE POLICY "Cleaners view assigned bookings" ON bookings FOR SELECT USING (auth.uid() = cleaner_id);
CREATE POLICY "Cleaners update assigned bookings" ON bookings FOR UPDATE USING (auth.uid() = cleaner_id);

-- Photos & Reviews (similar generic access for brevity - adjust as needed)
CREATE POLICY "Enable read access for all" ON photos FOR SELECT USING (true);
CREATE POLICY "Enable insert for authenticated users" ON photos FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Enable read access for all" ON reviews FOR SELECT USING (true);
CREATE POLICY "Enable insert for authenticated users" ON reviews FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- Function to handle new user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, email, role)
  VALUES (new.id, new.email, 'customer');
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to call the function on signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();


-- ==========================================
-- MOCK DATA
-- ==========================================
-- Note: To insert these, we temporarily bypass the auth.users constraint.
-- Do NOT use this in production.
ALTER TABLE profiles DROP CONSTRAINT IF EXISTS profiles_id_fkey;

INSERT INTO profiles (id, role, full_name, phone, email) VALUES
('b844be25-1011-4965-b1ab-df7b03fb4ff9', 'customer', 'Alice Smith', '555-0100', 'alice@example.com'),
('e0c90bb2-f5db-4411-968b-57788ba8cb3b', 'customer', 'Bob Johnson', '555-0101', 'bob@example.com'),
('42bc942b-e7b3-469b-8422-b9e73fc34dc9', 'cleaner', 'Carlos Cleaner', '555-0200', 'carlos@whiteglove.com'),
('c7335d50-fb68-450f-90be-d4b971a8f69e', 'manager', 'Diana Manager', '555-0300', 'diana@whiteglove.com')
ON CONFLICT (id) DO NOTHING;

INSERT INTO bookings (id, customer_id, cleaner_id, status, scheduled_date, home_size, service_type, price, special_instructions) VALUES
('a1000000-0000-0000-0000-000000000001', 'b844be25-1011-4965-b1ab-df7b03fb4ff9', '42bc942b-e7b3-469b-8422-b9e73fc34dc9', 'completed', NOW() - INTERVAL '2 days', '2 bed, 2 bath', 'standard', 150.00, 'Gate code is 1234'),
('a1000000-0000-0000-0000-000000000002', 'b844be25-1011-4965-b1ab-df7b03fb4ff9', '42bc942b-e7b3-469b-8422-b9e73fc34dc9', 'confirmed', NOW() + INTERVAL '5 days', '2 bed, 2 bath', 'standard', 150.00, 'Gate code is 1234'),
('a1000000-0000-0000-0000-000000000003', 'e0c90bb2-f5db-4411-968b-57788ba8cb3b', NULL, 'pending', NOW() + INTERVAL '10 days', '3 bed, 2 bath', 'deep', 300.00, 'Please clean the fridge')
ON CONFLICT (id) DO NOTHING;

INSERT INTO reviews (booking_id, rating, comment) VALUES
('a1000000-0000-0000-0000-000000000001', 5, 'Carlos was amazing! So quiet and thorough.')
ON CONFLICT DO NOTHING;
