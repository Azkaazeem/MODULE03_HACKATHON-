create table if not exists admins (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  username text unique not null,
  password text not null,
  created_at timestamptz default now()
);

create table if not exists students (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  cnic text unique not null,
  roll_number text unique not null,
  email text,
  city text,
  password text,
  registered boolean default false,
  created_at timestamptz default now()
);

create table if not exists courses (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  status text not null check (status in ('Open', 'Closed')),
  description text not null,
  batch text not null,
  created_at timestamptz default now()
);

create table if not exists course_applications (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  email text not null,
  phone text not null,
  cnic text not null,
  city text not null,
  education text not null,
  statement text not null,
  course_id uuid references courses(id) on delete cascade,
  course_name text not null,
  created_at timestamptz default now()
);

create table if not exists leave_requests (
  id uuid primary key default gen_random_uuid(),
  student_id uuid references students(id) on delete cascade,
  student_name text not null,
  reason text not null,
  from_date date not null,
  to_date date not null,
  image_url text,
  status text not null default 'Pending' check (status in ('Pending', 'Approved', 'Rejected')),
  created_at timestamptz default now()
);

insert into admins (name, username, password)
values ('Portal Super Admin', 'admin', 'admin123')
on conflict (username) do nothing;
