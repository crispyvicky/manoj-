import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useBlog, BlogDisplay } from "../../context/BlogContext";
import "../styles/Admin.css";

const ADMIN_PASSWORD = "manoj2026";
const SESSION_KEY = "admin_authenticated";

const defaultFormData = {
    title: "",
    excerpt: "",
    content: "",
    category: "Technology",
    coverImage: "",
    coverColor: "#1a1a2e",
    featured: false,
    author: "Manoj",
    readTime: "5 min read",
    tags: "",
};

const categoryOptions = ["Technology", "Design", "Development", "Thoughts", "Tutorial", "Case Study"];

const AdminPanel = () => {
    const { blogs, addBlog, updateBlog, deleteBlog } = useBlog();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [password, setPassword] = useState("");
    const [passwordError, setPasswordError] = useState(false);

    const [view, setView] = useState<"list" | "form">("list");
    const [editingId, setEditingId] = useState<string | null>(null);
    const [formData, setFormData] = useState(defaultFormData);
    const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState("");

    useEffect(() => {
        const auth = sessionStorage.getItem(SESSION_KEY);
        if (auth === "true") setIsAuthenticated(true);
    }, []);

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (password === ADMIN_PASSWORD) {
            setIsAuthenticated(true);
            sessionStorage.setItem(SESSION_KEY, "true");
            setPasswordError(false);
        } else {
            setPasswordError(true);
        }
    };

    const showSuccess = (msg: string) => {
        setSuccessMessage(msg);
        setTimeout(() => setSuccessMessage(""), 3000);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const tagsArray = formData.tags
            .split(",")
            .map((t) => t.trim())
            .filter(Boolean);

        if (editingId) {
            await updateBlog(editingId, { ...formData, tags: tagsArray });
            showSuccess("Blog updated successfully!");
        } else {
            await addBlog({ ...formData, tags: tagsArray });
            showSuccess("Blog created successfully!");
        }
        setFormData(defaultFormData);
        setEditingId(null);
        setView("list");
    };

    const handleEdit = (blog: BlogDisplay) => {
        setFormData({
            title: blog.title,
            excerpt: blog.excerpt,
            content: blog.content,
            category: blog.category,
            coverImage: blog.coverImage,
            coverColor: blog.coverColor,
            featured: blog.featured,
            author: blog.author,
            readTime: blog.readTime,
            tags: blog.tags.join(", "),
        });
        setEditingId(blog.id ?? null);
        setView("form");
    };

    const handleDelete = async (id: string) => {
        await deleteBlog(id);
        setDeleteConfirmId(null);
        showSuccess("Blog deleted successfully!");
    };

    const handleNewBlog = () => {
        setFormData(defaultFormData);
        setEditingId(null);
        setView("form");
    };

    const handleLogout = () => {
        sessionStorage.removeItem(SESSION_KEY);
        setIsAuthenticated(false);
        setPassword("");
    };

    // Login Screen
    if (!isAuthenticated) {
        return (
            <div className="admin-page">
                <div className="admin-login-container">
                    <div className="admin-login-card">
                        <div className="admin-login-icon">🔐</div>
                        <h2>Admin Access</h2>
                        <p>Enter the admin password to manage blogs</p>
                        <form onSubmit={handleLogin} className="admin-login-form">
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => {
                                    setPassword(e.target.value);
                                    setPasswordError(false);
                                }}
                                placeholder="Enter password"
                                className={`admin-password-input ${passwordError ? "error" : ""}`}
                                autoFocus
                            />
                            {passwordError && (
                                <span className="admin-login-error">Incorrect password</span>
                            )}
                            <button type="submit" className="admin-login-btn">
                                Access Dashboard
                            </button>
                        </form>
                        <Link to="/" className="admin-home-link">
                            ← Back to Home
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="admin-page">
            {/* Header */}
            <header className="admin-header">
                <div className="admin-header-left">
                    <Link to="/" className="admin-nav-link" data-cursor="disable">
                        ← Home
                    </Link>
                    <Link to="/blogs" className="admin-nav-link" data-cursor="disable">
                        View Blogs
                    </Link>
                </div>
                <h1 className="admin-title">Blog Admin</h1>
                <div className="admin-header-right">
                    <button onClick={handleLogout} className="admin-logout-btn">
                        Logout
                    </button>
                </div>
            </header>

            {/* Success Message */}
            {successMessage && (
                <div className="admin-success-toast">{successMessage}</div>
            )}

            {view === "list" ? (
                <div className="admin-dashboard">
                    {/* Stats */}
                    <div className="admin-stats">
                        <div className="admin-stat-card">
                            <span className="stat-number">{blogs.length}</span>
                            <span className="stat-label">Total Posts</span>
                        </div>
                        <div className="admin-stat-card">
                            <span className="stat-number">
                                {blogs.filter((b) => b.featured).length}
                            </span>
                            <span className="stat-label">Featured</span>
                        </div>
                        <div className="admin-stat-card">
                            <span className="stat-number">
                                {new Set(blogs.map((b) => b.category)).size}
                            </span>
                            <span className="stat-label">Categories</span>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="admin-actions-bar">
                        <h2>All Blog Posts</h2>
                        <button onClick={handleNewBlog} className="admin-create-btn">
                            + Create New Blog
                        </button>
                    </div>

                    {/* Blog Table */}
                    <div className="admin-table-wrapper">
                        <table className="admin-table">
                            <thead>
                                <tr>
                                    <th>Title</th>
                                    <th>Category</th>
                                    <th>Date</th>
                                    <th>Featured</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {blogs.map((blog) => (
                                    <tr key={blog.id}>
                                        <td className="admin-table-title">
                                            <div className="table-title-row">
                                                {blog.coverImage && (
                                                    <img
                                                        src={blog.coverImage}
                                                        alt=""
                                                        className="table-thumb"
                                                    />
                                                )}
                                                <div>
                                                    <span className="table-blog-title">{blog.title}</span>
                                                    <span className="table-blog-excerpt">
                                                        {blog.excerpt.slice(0, 60)}...
                                                    </span>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <span className="table-category-badge">
                                                {blog.category}
                                            </span>
                                        </td>
                                        <td className="table-date">{blog.date}</td>
                                        <td>
                                            <span
                                                className={`table-featured-badge ${blog.featured ? "active" : ""}`}
                                            >
                                                {blog.featured ? "★" : "—"}
                                            </span>
                                        </td>
                                        <td className="table-actions">
                                            <button
                                                onClick={() => handleEdit(blog)}
                                                className="admin-edit-btn"
                                            >
                                                Edit
                                            </button>
                                            {deleteConfirmId === blog.id ? (
                                                <div className="delete-confirm">
                                                    <button
                                                        onClick={() => handleDelete(blog.id)}
                                                        className="confirm-delete-btn"
                                                    >
                                                        Confirm
                                                    </button>
                                                    <button
                                                        onClick={() => setDeleteConfirmId(null)}
                                                        className="cancel-delete-btn"
                                                    >
                                                        Cancel
                                                    </button>
                                                </div>
                                            ) : (
                                                <button
                                                    onClick={() => setDeleteConfirmId(blog.id)}
                                                    className="admin-delete-btn"
                                                >
                                                    Delete
                                                </button>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            ) : (
                /* Blog Form */
                <div className="admin-form-container">
                    <div className="admin-form-header">
                        <button
                            onClick={() => {
                                setView("list");
                                setEditingId(null);
                                setFormData(defaultFormData);
                            }}
                            className="admin-back-btn"
                        >
                            ← Back to List
                        </button>
                        <h2>{editingId ? "Edit Blog Post" : "Create New Blog Post"}</h2>
                    </div>

                    <form onSubmit={handleSubmit} className="admin-form">
                        <div className="form-grid">
                            <div className="form-group form-full">
                                <label>Title</label>
                                <input
                                    type="text"
                                    value={formData.title}
                                    onChange={(e) =>
                                        setFormData({ ...formData, title: e.target.value })
                                    }
                                    placeholder="Enter blog title"
                                    required
                                />
                            </div>

                            <div className="form-group form-full">
                                <label>Excerpt</label>
                                <input
                                    type="text"
                                    value={formData.excerpt}
                                    onChange={(e) =>
                                        setFormData({ ...formData, excerpt: e.target.value })
                                    }
                                    placeholder="Short description of the blog"
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label>Category</label>
                                <select
                                    value={formData.category}
                                    onChange={(e) =>
                                        setFormData({ ...formData, category: e.target.value })
                                    }
                                >
                                    {categoryOptions.map((cat) => (
                                        <option key={cat} value={cat}>
                                            {cat}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="form-group">
                                <label>Author</label>
                                <input
                                    type="text"
                                    value={formData.author}
                                    onChange={(e) =>
                                        setFormData({ ...formData, author: e.target.value })
                                    }
                                    placeholder="Author name"
                                />
                            </div>

                            <div className="form-group">
                                <label>Read Time</label>
                                <input
                                    type="text"
                                    value={formData.readTime}
                                    onChange={(e) =>
                                        setFormData({ ...formData, readTime: e.target.value })
                                    }
                                    placeholder="e.g., 5 min read"
                                />
                            </div>

                            <div className="form-group">
                                <label>Tags (comma-separated)</label>
                                <input
                                    type="text"
                                    value={formData.tags}
                                    onChange={(e) =>
                                        setFormData({ ...formData, tags: e.target.value })
                                    }
                                    placeholder="React, Web Dev, Design"
                                />
                            </div>

                            <div className="form-group form-full">
                                <label>Cover Image URL</label>
                                <input
                                    type="url"
                                    value={formData.coverImage}
                                    onChange={(e) =>
                                        setFormData({ ...formData, coverImage: e.target.value })
                                    }
                                    placeholder="https://images.unsplash.com/..."
                                />
                                {formData.coverImage && (
                                    <div className="form-image-preview">
                                        <img src={formData.coverImage} alt="Preview" />
                                    </div>
                                )}
                            </div>

                            <div className="form-group">
                                <label>Cover Color (fallback)</label>
                                <div className="color-picker-row">
                                    <input
                                        type="color"
                                        value={formData.coverColor}
                                        onChange={(e) =>
                                            setFormData({ ...formData, coverColor: e.target.value })
                                        }
                                        className="color-picker"
                                    />
                                    <span className="color-value">{formData.coverColor}</span>
                                </div>
                            </div>

                            <div className="form-group">
                                <label className="checkbox-label">
                                    <input
                                        type="checkbox"
                                        checked={formData.featured}
                                        onChange={(e) =>
                                            setFormData({ ...formData, featured: e.target.checked })
                                        }
                                    />
                                    <span className="checkmark" />
                                    Featured Post
                                </label>
                            </div>

                            <div className="form-group form-full">
                                <label>Content</label>
                                <textarea
                                    value={formData.content}
                                    onChange={(e) =>
                                        setFormData({ ...formData, content: e.target.value })
                                    }
                                    placeholder="Write your blog content here...&#10;&#10;Use ## for headings&#10;Use - for list items"
                                    required
                                    rows={15}
                                />
                            </div>
                        </div>

                        <div className="form-actions">
                            <button
                                type="button"
                                onClick={() => {
                                    setView("list");
                                    setEditingId(null);
                                    setFormData(defaultFormData);
                                }}
                                className="form-cancel-btn"
                            >
                                Cancel
                            </button>
                            <button type="submit" className="form-submit-btn">
                                {editingId ? "Update Blog" : "Publish Blog"}
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
};

export default AdminPanel;
