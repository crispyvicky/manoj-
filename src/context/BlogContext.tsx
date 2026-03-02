import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from "react";
import { supabase } from "../lib/supabase";

export interface Blog {
    id?: string;
    title: string;
    excerpt: string;
    content: string;
    category: string;
    cover_image: string;
    cover_color: string;
    date: string;
    featured: boolean;
    author: string;
    read_time: string;
    tags: string[];
}

// Frontend-friendly interface (camelCase)
export interface BlogDisplay {
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
    blogs: BlogDisplay[];
    loading: boolean;
    addBlog: (blog: Omit<BlogDisplay, "id" | "date">) => Promise<void>;
    updateBlog: (id: string, blog: Partial<BlogDisplay>) => Promise<void>;
    deleteBlog: (id: string) => Promise<void>;
    getBlog: (id: string) => BlogDisplay | undefined;
    refreshBlogs: () => Promise<void>;
}

const BlogContext = createContext<BlogContextType | undefined>(undefined);

// Convert DB row (snake_case) to display (camelCase)
const toDisplay = (row: Blog): BlogDisplay => ({
    id: row.id!,
    title: row.title,
    excerpt: row.excerpt,
    content: row.content,
    category: row.category,
    coverImage: row.cover_image,
    coverColor: row.cover_color,
    date: row.date,
    featured: row.featured,
    author: row.author,
    readTime: row.read_time,
    tags: row.tags || [],
});

// Convert display (camelCase) to DB row (snake_case)
const toRow = (blog: Partial<BlogDisplay>): Partial<Blog> => {
    const row: Partial<Blog> = {};
    if (blog.title !== undefined) row.title = blog.title;
    if (blog.excerpt !== undefined) row.excerpt = blog.excerpt;
    if (blog.content !== undefined) row.content = blog.content;
    if (blog.category !== undefined) row.category = blog.category;
    if (blog.coverImage !== undefined) row.cover_image = blog.coverImage;
    if (blog.coverColor !== undefined) row.cover_color = blog.coverColor;
    if (blog.date !== undefined) row.date = blog.date;
    if (blog.featured !== undefined) row.featured = blog.featured;
    if (blog.author !== undefined) row.author = blog.author;
    if (blog.readTime !== undefined) row.read_time = blog.readTime;
    if (blog.tags !== undefined) row.tags = blog.tags;
    return row;
};

export const BlogProvider = ({ children }: { children: ReactNode }) => {
    const [blogs, setBlogs] = useState<BlogDisplay[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchBlogs = useCallback(async () => {
        try {
            const { data, error } = await supabase
                .from("blogs")
                .select("*")
                .order("date", { ascending: false });

            if (error) {
                console.error("Error fetching blogs:", error);
                return;
            }

            setBlogs((data || []).map(toDisplay));
        } catch (err) {
            console.error("Failed to fetch blogs:", err);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchBlogs();
    }, [fetchBlogs]);

    const addBlog = async (blogData: Omit<BlogDisplay, "id" | "date">) => {
        const newRow = {
            ...toRow(blogData),
            date: new Date().toISOString().split("T")[0],
        };

        const { error } = await supabase.from("blogs").insert([newRow]);

        if (error) {
            console.error("Error adding blog:", error);
            return;
        }

        await fetchBlogs();
    };

    const updateBlog = async (id: string, updates: Partial<BlogDisplay>) => {
        const { error } = await supabase
            .from("blogs")
            .update(toRow(updates))
            .eq("id", id);

        if (error) {
            console.error("Error updating blog:", error);
            return;
        }

        await fetchBlogs();
    };

    const deleteBlog = async (id: string) => {
        const { error } = await supabase.from("blogs").delete().eq("id", id);

        if (error) {
            console.error("Error deleting blog:", error);
            return;
        }

        await fetchBlogs();
    };

    const getBlog = (id: string) => blogs.find((blog) => blog.id === id);

    const refreshBlogs = async () => {
        await fetchBlogs();
    };

    return (
        <BlogContext.Provider
            value={{ blogs, loading, addBlog, updateBlog, deleteBlog, getBlog, refreshBlogs }}
        >
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
