import "./styles/Career.css";

const Career = () => {
  return (
    <div className="career-section section-container">
      <div className="career-container">
        <h2>
          My <span>Approach</span>
          <br /> & Experience
        </h2>

        <div className="career-info">
          <div className="career-timeline">
            <div className="career-dot"></div>
          </div>

          {/* 1 — Growth Philosophy */}
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Growth Philosophy</h4>
                <h5>Belief: Systems outperform hacks</h5>
              </div>
              <h3>WHY</h3>
            </div>
            <p>
              Traffic without intent is noise. Content without positioning gets
              ignored. Posting without strategy wastes time. Marketing without
              measurement is guesswork. I believe in sustainable systems that
              compound over time.
            </p>
          </div>

          {/* 2 — Industries */}
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Industries & Domains</h4>
                <h5>Strength: Domain understanding + digital execution</h5>
              </div>
              <h3>WHO</h3>
            </div>
            <p>
              IT & SaaS, Ed-Tech Platforms, Agriculture & Seed Brands, Pharma &
              Life Sciences, B2B & B2B2C, D2C Brands, Local & Regional Businesses.
              I adapt strategies to fit the specific nuances of each industry.
            </p>
          </div>

          {/* 3 — Vision */}
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Closing Statement</h4>
                <h5>Impact</h5>
              </div>
              <h3>HOW</h3>
            </div>
            <p>
              I help brands get found, trusted, and chosen — across search, social,
              and AI-driven platforms. If organic growth matters, systems matter.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Career;
