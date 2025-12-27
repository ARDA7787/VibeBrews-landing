CREATE TABLE student_profiles (
    student_id UUID PRIMARY KEY NOT NULL,
    first_name TEXT NOT NULL,
    last_name TEXT,
    email TEXT UNIQUE NOT NULL,
    phone TEXT,
    date_of_birth DATE,
    enrollment_date TIMESTAMP,
    summary TEXT,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    last_updated_at TIMESTAMP
);