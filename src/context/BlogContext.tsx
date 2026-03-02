import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export interface Blog {
    id: string;
    title: string;
    excerpt: string;
    content: string;
    category: string;
    coverImage: string;
    coverColor: string;
    date: string;
    featured: boolean;
    author: string;
    readTime: string;
    tags: string[];
}

interface BlogContextType {
    blogs: Blog[];
    addBlog: (blog: Omit<Blog, "id" | "date">) => void;
    updateBlog: (id: string, blog: Partial<Blog>) => void;
    deleteBlog: (id: string) => void;
    getBlog: (id: string) => Blog | undefined;
}

const BlogContext = createContext<BlogContextType | undefined>(undefined);

const STORAGE_KEY = "manoj_blogs";

const generateId = () => `blog_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;

const seedBlogs: Blog[] = [
    {
        id: "blog_seed_1",
        title: "The Future of Web Development in 2026",
        excerpt: "Exploring the cutting-edge technologies shaping the web — from AI-powered interfaces to edge computing and beyond.",
        content: `The web development landscape is evolving at an unprecedented pace. In 2026, we're seeing the convergence of several transformative technologies that are reshaping how we build and experience the web.\n\n## AI-Powered Interfaces\n\nArtificial intelligence is no longer just a backend tool. Modern web applications are leveraging AI directly in the browser, creating personalized, adaptive user experiences that respond to user behavior in real-time.\n\n## Edge Computing Revolution\n\nWith edge computing becoming mainstream, web applications now process data closer to the user than ever before. This means faster load times, reduced latency, and more responsive applications across the globe.\n\n## The Rise of Web Components\n\nFramework-agnostic web components are gaining serious traction. Developers are building reusable, encapsulated components that work across React, Vue, Angular, and vanilla JavaScript projects.\n\n## WebAssembly Goes Mainstream\n\nWebAssembly is no longer experimental. Complex applications — from video editing to 3D modeling — now run at near-native speed in the browser, opening doors that were previously closed to web developers.\n\n## What This Means for Developers\n\nThe key takeaway? Adaptability is everything. The developers who thrive in 2026 are those who embrace continuous learning and aren't afraid to experiment with emerging technologies.`,
        category: "Technology",
        coverImage: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&q=80",
        coverColor: "#1a1a2e",
        date: "2026-02-28",
        featured: true,
        author: "Manoj",
        readTime: "5 min read",
        tags: ["Web Dev", "AI", "Future Tech"],
    },
    {
        id: "blog_seed_2",
        title: "Designing for Dark Mode: Best Practices",
        excerpt: "Dark mode isn't just a trend — it's a design philosophy. Learn the principles behind creating stunning dark interfaces.",
        content: `Dark mode has evolved from a trendy feature to an essential design consideration. Here's how to do it right.\n\n## Why Dark Mode Matters\n\nBeyond aesthetics, dark mode reduces eye strain in low-light environments, saves battery on OLED screens, and can make your content feel more premium and immersive.\n\n## Color Selection\n\nAvoid pure black (#000000) backgrounds. Instead, use very dark grays (#0b080c, #121212) that feel softer and more natural. For text, avoid pure white — opt for slightly warm off-whites (#eae5ec) that reduce contrast strain.\n\n## Accent Colors\n\nYour accent colors need to work on dark backgrounds. Bright, saturated colors pop beautifully against dark surfaces. Consider using orange (#FF6B35) or amber tones for warmth.\n\n## Elevation Through Luminance\n\nIn dark mode, higher UI elements should be slightly lighter. This creates a sense of depth without relying on shadows, which are less visible on dark backgrounds.\n\n## Testing Across Conditions\n\nAlways test your dark mode in actual low-light conditions. What looks great on your bright office monitor might be too bright at midnight.`,
        category: "Design",
        coverImage: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80",
        coverColor: "#16213e",
        date: "2026-02-20",
        featured: false,
        author: "Manoj",
        readTime: "4 min read",
        tags: ["Design", "UI/UX", "Dark Mode"],
    },
    {
        id: "blog_seed_3",
        title: "Building 3D Experiences with Three.js & React",
        excerpt: "How to bring immersive 3D worlds into web applications using React Three Fiber — lessons from real projects.",
        content: `Three.js combined with React Three Fiber has made 3D web development accessible to frontend developers. Here's what I've learned building real 3D experiences.\n\n## Getting Started\n\nReact Three Fiber (@react-three/fiber) provides a declarative way to work with Three.js. Instead of imperative WebGL commands, you write JSX components that represent 3D objects.\n\n## Performance Optimization\n\nThe biggest challenge in 3D web development is performance. Here are key strategies:\n\n- **Use instancing** for repeated geometries\n- **Implement LOD** (Level of Detail) for complex scenes\n- **Lazy load** 3D models outside the initial viewport\n- **Optimize textures** — compress and resize appropriately\n\n## Physics Integration\n\nLibraries like @react-three/rapier and @react-three/cannon add realistic physics to your 3D scenes. From gravity to collisions, physics make experiences feel tangible.\n\n## Accessibility Considerations\n\nDon't forget users who can't interact with 3D content. Always provide fallbacks and ensure critical information isn't locked behind 3D-only interactions.\n\n## The Creative Possibilities\n\n3D on the web isn't just for games. Product showcases, data visualization, interactive storytelling — the creative applications are limitless.`,
        category: "Development",
        coverImage: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&q=80",
        coverColor: "#0f3460",
        date: "2026-02-15",
        featured: false,
        author: "Manoj",
        readTime: "6 min read",
        tags: ["Three.js", "React", "3D", "WebGL"],
    },
    {
        id: "blog_seed_4",
        title: "The Art of Creative Problem Solving",
        excerpt: "Why the best developers think like artists — blending logic with creativity to build extraordinary solutions.",
        content: `Software development is often seen as a purely logical discipline. But the best solutions come from creative thinking.\n\n## Thinking Beyond Code\n\nGreat developers don't just write code — they solve problems. And problem-solving is inherently creative. It requires looking at challenges from multiple angles and finding elegant solutions.\n\n## Constraints Breed Creativity\n\nSome of the most innovative solutions come from working within tight constraints. Limited resources, tight deadlines, or technical limitations can push you to think differently.\n\n## Cross-Disciplinary Inspiration\n\nLook beyond tech for inspiration. Architecture, music, nature, and art all contain patterns and principles that can inform better software design.\n\n## The Importance of Play\n\nSide projects and creative coding experiments aren't just fun — they're essential for growth. They give you space to explore ideas without the pressure of production constraints.\n\n## Building a Creative Practice\n\nCreativity isn't a talent — it's a practice. Regular brainstorming, sketching, prototyping, and experimenting will make you a more creative (and better) developer.`,
        category: "Thoughts",
        coverImage: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=800&q=80",
        coverColor: "#533483",
        date: "2026-02-10",
        featured: false,
        author: "Manoj",
        readTime: "4 min read",
        tags: ["Creativity", "Problem Solving", "Career"],
    },
];

export const BlogProvider = ({ children }: { children: ReactNode }) => {
    const [blogs, setBlogs] = useState<Blog[]>(() => {
        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            if (stored) {
                const parsed = JSON.parse(stored) as Blog[];
                if (Array.isArray(parsed) && parsed.length > 0) return parsed;
            }
        } catch {
            // Ignore parse errors
        }
        return seedBlogs;
    });

    useEffect(() => {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(blogs));
        } catch (e) {
            console.warn("Failed to save blogs to localStorage:", e);
        }
    }, [blogs]);

    const addBlog = (blogData: Omit<Blog, "id" | "date">) => {
        const newBlog: Blog = {
            ...blogData,
            id: generateId(),
            date: new Date().toISOString().split("T")[0],
        };
        setBlogs((prev) => [newBlog, ...prev]);
    };

    const updateBlog = (id: string, updates: Partial<Blog>) => {
        setBlogs((prev) =>
            prev.map((blog) => (blog.id === id ? { ...blog, ...updates } : blog))
        );
    };

    const deleteBlog = (id: string) => {
        setBlogs((prev) => prev.filter((blog) => blog.id !== id));
    };

    const getBlog = (id: string) => blogs.find((blog) => blog.id === id);

    return (
        <BlogContext.Provider value={{ blogs, addBlog, updateBlog, deleteBlog, getBlog }}>
            {children}
        </BlogContext.Provider>
    );
};

export const useBlog = () => {
    const context = useContext(BlogContext);
    if (!context) {
        throw new Error("useBlog must be used within a BlogProvider");
    }
    return context;
};
