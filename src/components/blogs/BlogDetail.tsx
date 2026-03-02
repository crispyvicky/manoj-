import { Link, useParams, useNavigate } from "react-router-dom";
import { useBlog } from "../../context/BlogContext";
import "../styles/Blogs.css";

const BlogDetail = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { getBlog } = useBlog();

    const blog = id ? getBlog(id) : undefined;

    if (!blog) {
        return (
            <div className="blog-detail-page">
                <div className="blog-detail-not-found">
                    <h2>Blog Not Found</h2>
                    <p>The blog post you're looking for doesn't exist.</p>
                    <Link to="/blogs" className="back-to-blogs-btn">
                        ← Back to Blogs
                    </Link>
                </div>
            </div>
        );
    }

    const renderContent = (content: string) => {
        return content.split("\n").map((line, i) => {
            if (line.startsWith("## ")) {
                return (
                    <h2 key={i} className="detail-content-heading">
                        {line.replace("## ", "")}
                    </h2>
                );
            }
            if (line.startsWith("### ")) {
                return (
                    <h3 key={i} className="detail-content-subheading">
                        {line.replace("### ", "")}
                    </h3>
                );
            }
            if (line.startsWith("- **")) {
                const parts = line.replace("- **", "").split("**");
                return (
                    <li key={i} className="detail-content-list-item">
                        <strong>{parts[0]}</strong>
                        {parts[1]}
                    </li>
                );
            }
            if (line.startsWith("- ")) {
                return (
                    <li key={i} className="detail-content-list-item">
                        {line.replace("- ", "")}
                    </li>
                );
            }
            if (line.trim() === "") {
                return <br key={i} />;
            }
            return (
                <p key={i} className="detail-content-paragraph">
                    {line}
                </p>
            );
        });
    };

    return (
        <div className="blog-detail-page">
            {/* Navigation */}
            <header className="blog-detail-header">
                <button
                    className="detail-back-btn"
                    onClick={() => navigate("/blogs")}
                    data-cursor="disable"
                >
                    <span className="back-arrow">←</span> Back to Blogs
                </button>
            </header>

            {/* Hero */}
            <div
                className="blog-detail-hero"
                style={{
                    backgroundImage: blog.coverImage
                        ? `linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(11,8,12,1)), url(${blog.coverImage})`
                        : undefined,
                    backgroundColor: !blog.coverImage
                        ? blog.coverColor
                        : undefined,
                }}
            >
                <div className="blog-detail-hero-content">
                    <span className="detail-category-badge">{blog.category}</span>
                    <h1 className="blog-detail-title">{blog.title}</h1>
                    <div className="blog-detail-meta">
                        <span className="detail-author">{blog.author}</span>
                        <span className="meta-dot">·</span>
                        <span>{blog.date}</span>
                        <span className="meta-dot">·</span>
                        <span>{blog.readTime}</span>
                    </div>
                    <div className="blog-detail-tags">
                        {blog.tags.map((tag) => (
                            <span key={tag} className="detail-tag">
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>
            </div>

            {/* Content */}
            <article className="blog-detail-content">
                <p className="blog-detail-excerpt">{blog.excerpt}</p>
                <div className="blog-detail-body">{renderContent(blog.content)}</div>
            </article>

            {/* Footer Nav */}
            <div className="blog-detail-footer-nav">
                <Link to="/blogs" className="back-to-blogs-btn">
                    ← All Posts
                </Link>
            </div>
        </div>
    );
};

export default BlogDetail;
