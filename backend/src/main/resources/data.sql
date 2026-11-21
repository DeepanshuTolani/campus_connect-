-- Seed a default admin (password = "admin123", BCrypt hash below)
INSERT INTO admins (username, password, name)
SELECT 'admin', '$2b$10$GWXnVcBgxiUmsZDWF1zGTejzj8TtiwzGBYp.xLwpjwKMl/v.2/QLy', 'Placement Admin'
WHERE NOT EXISTS (SELECT 1 FROM admins WHERE username = 'admin');
