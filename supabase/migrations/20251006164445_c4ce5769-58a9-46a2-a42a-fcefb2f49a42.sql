-- Add damaged and returned statuses to sale_status
ALTER TYPE sale_status ADD VALUE IF NOT EXISTS 'damaged';
ALTER TYPE sale_status ADD VALUE IF NOT EXISTS 'returned';
