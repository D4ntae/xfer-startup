-- Create a SQLite database and a users table
CREATE TABLE users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT NOT NULL UNIQUE,
  password TEXT NOT NULL  -- Store hashed passwords
);

-- Insert some test data (passwords should be hashed in real applications)
INSERT INTO users (username, password) VALUES ('admin', 'admin123');
