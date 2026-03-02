-- Create blogs table
CREATE TABLE IF NOT EXISTS blogs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  excerpt TEXT NOT NULL,
  content TEXT NOT NULL,
  category TEXT NOT NULL DEFAULT 'Technology',
  cover_image TEXT DEFAULT '',
  cover_color TEXT DEFAULT '#1a1a2e',
  date TEXT NOT NULL,
  featured BOOLEAN DEFAULT false,
  author TEXT DEFAULT 'Manoj',
  read_time TEXT DEFAULT '5 min read',
  tags TEXT[] DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security but allow all operations (public blog)
ALTER TABLE blogs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read" ON blogs FOR SELECT USING (true);
CREATE POLICY "Allow public insert" ON blogs FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update" ON blogs FOR UPDATE USING (true);
CREATE POLICY "Allow public delete" ON blogs FOR DELETE USING (true);

-- Seed initial blogs
INSERT INTO blogs (title, excerpt, content, category, cover_image, cover_color, date, featured, author, read_time, tags) VALUES
(
  'The Future of Web Development in 2026',
  'Exploring the cutting-edge technologies shaping the web — from AI-powered interfaces to edge computing and beyond.',
  'The web development landscape is evolving at an unprecedented pace. In 2026, we''re seeing the convergence of several transformative technologies.

## AI-Powered Interfaces

Artificial intelligence is no longer just a backend tool. Modern web applications are leveraging AI directly in the browser, creating personalized, adaptive user experiences.

## Edge Computing Revolution

With edge computing becoming mainstream, web applications now process data closer to the user than ever before. This means faster load times and reduced latency.

## WebAssembly Goes Mainstream

WebAssembly is no longer experimental. Complex applications now run at near-native speed in the browser.

## What This Means for Developers

The key takeaway? Adaptability is everything. The developers who thrive are those who embrace continuous learning.',
  'Technology',
  'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&q=80',
  '#1a1a2e',
  '2026-02-28',
  true,
  'Manoj',
  '5 min read',
  ARRAY['Web Dev', 'AI', 'Future Tech']
),
(
  'Designing for Dark Mode: Best Practices',
  'Dark mode isn''t just a trend — it''s a design philosophy. Learn the principles behind creating stunning dark interfaces.',
  'Dark mode has evolved from a trendy feature to an essential design consideration.

## Why Dark Mode Matters

Beyond aesthetics, dark mode reduces eye strain in low-light environments, saves battery on OLED screens, and can make your content feel more premium.

## Color Selection

Avoid pure black backgrounds. Instead, use very dark grays that feel softer and more natural. For text, opt for slightly warm off-whites that reduce contrast strain.

## Accent Colors

Your accent colors need to work on dark backgrounds. Bright, saturated colors pop beautifully against dark surfaces.',
  'Design',
  'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80',
  '#16213e',
  '2026-02-20',
  false,
  'Manoj',
  '4 min read',
  ARRAY['Design', 'UI/UX', 'Dark Mode']
),
(
  'Building 3D Experiences with Three.js & React',
  'How to bring immersive 3D worlds into web applications using React Three Fiber — lessons from real projects.',
  'Three.js combined with React Three Fiber has made 3D web development accessible to frontend developers.

## Getting Started

React Three Fiber provides a declarative way to work with Three.js. Instead of imperative WebGL commands, you write JSX components that represent 3D objects.

## Performance Optimization

- Use instancing for repeated geometries
- Implement LOD for complex scenes
- Lazy load 3D models outside the initial viewport
- Optimize textures appropriately

## The Creative Possibilities

3D on the web isn''t just for games. Product showcases, data visualization, interactive storytelling — the applications are limitless.',
  'Development',
  'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&q=80',
  '#0f3460',
  '2026-02-15',
  false,
  'Manoj',
  '6 min read',
  ARRAY['Three.js', 'React', '3D', 'WebGL']
),
(
  'The Art of Creative Problem Solving',
  'Why the best developers think like artists — blending logic with creativity to build extraordinary solutions.',
  'Software development is often seen as a purely logical discipline. But the best solutions come from creative thinking.

## Thinking Beyond Code

Great developers don''t just write code — they solve problems. And problem-solving is inherently creative.

## Constraints Breed Creativity

Some of the most innovative solutions come from working within tight constraints.

## Building a Creative Practice

Creativity isn''t a talent — it''s a practice. Regular brainstorming, sketching, prototyping, and experimenting will make you a better developer.',
  'Thoughts',
  'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=800&q=80',
  '#533483',
  '2026-02-10',
  false,
  'Manoj',
  '4 min read',
  ARRAY['Creativity', 'Problem Solving', 'Career']
);
