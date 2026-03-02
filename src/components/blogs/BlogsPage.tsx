import { useState } from "react";
import { Link } from "react-router-dom";
import { useBlog, BlogDisplay } from "../../context/BlogContext";
import "../styles/Blogs.css";

const categories = ["All", "Technology", "Design", "Development", "Thoughts"];

const BlogsPage = () => {
    const { blogs } = useBlog();
    const [activeCategory, setActiveCategory] = useState("All");
    const [searchQuery, setSearchQuery] = useState("");

    const filteredBlogs = blogs.filter((blog) => {
        const matchesCategory =
            activeCategory === "All" || blog.category === activeCategory;
        const matchesSearch =
            blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            blog.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
            blog.tags.some((tag) =>
                tag.toLowerCase().includes(searchQuery.toLowerCase())
            );
        return matchesCategory && matchesSearch;
    });

    const featuredBlog = filteredBlogs.find((b) => b.featured);
    const regularBlogs = filteredBlogs.filter((b) => !b.featured);

    const getCardSize = (index: number): string => {
        const pattern = [
            "large",
            "small",
            "medium",
            "small",
            "medium",
            "large",
            "small",
            "medium",
        ];
        return pattern[index % pattern.length];
    };

    return (
        <div className="blogs-page">
            {/* Header */}
            <header className="blogs-header">
                <div className="blogs-header-inner">
                    <Link to="/" className="blogs-back-link" data-cursor="disable">
                        <span className="back-arrow">←</span> Back
                    </Link>
                    <h1 className="blogs-title">BLOG</h1>
                    <div className="blogs-header-right">
                        <Link
                            to="/admin"
                            className="admin-link-btn"
                            data-cursor="disable"
                        >
                            Admin
                        </Link>
                    </div>
                </div>
            </header>

            {/* Filter Bar */}
            <div className="blogs-filter-bar">
                <div className="blogs-categories">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            className={`category-btn ${activeCategory === cat ? "active" : ""}`}
                            onClick={() => setActiveCategory(cat)}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
                <div className="blogs-search">
                    <input
                        type="text"
                        placeholder="Search blogs..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="search-input"
                    />
                </div>
            </div>

            {/* Featured Blog */}
            {featuredBlog && (
                <Link
                    to={`/blogs/${featuredBlog.id}`}
                    className="featured-blog-card"
                    style={{
                        backgroundImage: featuredBlog.coverImage
                            ? `linear-gradient(135deg, rgba(0,0,0,0.7), rgba(0,0,0,0.3)), url(${featuredBlog.coverImage})`
                            : undefined,
                        backgroundColor: !featuredBlog.coverImage
                            ? featuredBlog.coverColor
                            : undefined,
                    }}
                >
                    <div className="featured-badge">FEATURED</div>
                    <div className="featured-content">
                        <span className="blog-category-tag">{featuredBlog.category}</span>
                        <h2 className="featured-title">{featuredBlog.title}</h2>
                        <p className="featured-excerpt">{featuredBlog.excerpt}</p>
                        <div className="featured-meta">
                            <span>{featuredBlog.author}</span>
                            <span className="meta-dot">·</span>
                            <span>{featuredBlog.date}</span>
                            <span className="meta-dot">·</span>
                            <span>{featuredBlog.readTime}</span>
                        </div>
                    </div>
                </Link>
            )}

            {/* Blog Grid */}
            <div className="blogs-grid">
                {regularBlogs.map((blog: BlogDisplay, index: number) => (
                    <Link
                        to={`/blogs/${blog.id}`}
                        key={blog.id}
                        className={`blog-card blog-card-${getCardSize(index)}`}
                    >
                        {blog.coverImage && (
                            <div
                                className="blog-card-image"
                                style={{ backgroundImage: `url(${blog.coverImage})` }}
                            />
                        )}
                        <div
                            className="blog-card-body"
                            style={{ backgroundColor: blog.coverColor || "#1a1a2e" }}
                        >
                            <div className="card-category-strip">
                                <span className="card-category-label">{blog.category}</span>
                            </div>
                            <h3 className="blog-card-title">{blog.title}</h3>
                            <p className="blog-card-excerpt">{blog.excerpt}</p>
                            <div className="blog-card-meta">
                                <span>{blog.date}</span>
                                <span>{blog.readTime}</span>
                            </div>
                            <div className="blog-card-tags">
                                {blog.tags.map((tag) => (
                                    <span key={tag} className="blog-tag">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </Link>
                ))}
            </div>

            {filteredBlogs.length === 0 && (
                <div className="blogs-empty">
                    <p>No blogs found. Try a different filter or search term.</p>
                </div>
            )}

            {/* Footer */}
            <footer className="blogs-footer">
                <p>© {new Date().getFullYear()} Manoj. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default BlogsPage;
