import '../styles/LinkedInPost.css';

function LinkedInPost() {
  return (
    <div className="linkedin-post">
      <div className="post-header">
        <div className="profile-info">
          <h3>James Law</h3>
          <span className="job-title">Product Manager</span>
        </div>
        <img 
          src="/linkedin-logo.png" 
          alt="LinkedIn" 
          className="linkedin-icon"
        />
      </div>
      <div className="post-content">
        <p>Genuinely proud of the part I played in delivering this.</p>
        <div className="shared-content">
          <div className="company-info">
            <h4>Ninety Percent of Everything (90POE)</h4>
            <span>11,018 followers</span>
          </div>
          <p>📢 We're thrilled to announce a groundbreaking update to OpenOcean STUDIO. Introducing comprehensive commercial voyage management capabilities, seamlessly integrated with our existing operational and performance features.</p>
          <p>Our next-generation platform now empowers customers with a unified view for managing the entire "charter to cash" workflow.</p>
          <div className="key-benefits">
            <p>🔐 Key benefits:</p>
            <ul>
              <li>✔ Eliminate silos - seamless integration streamlines decision-making across teams.</li>
              <li>✔ Real-time insights - leverage our unique virtualVESSEL digital twin technology for highly accurate voyage estimates and continuous adjustments.</li>
              <li>✔ Effortless execution - convert estimates into detailed voyage plans with automatic population of key details such as itinerary, costs, and revenue items.</li>
              <li>✔ Live Profit & Loss - empower both operational and commercial teams to make real-time decisions for maximum profitability and efficiency.</li>
            </ul>
          </div>
        </div>
        <div className="post-footer">
          <a 
            href="https://www.linkedin.com/posts/james-law-4386b553_posidonia2024-maritimetechnology-digitaltransformation-activity-7203662276027973634-JMkK"
            target="_blank"
            rel="noopener noreferrer"
            className="view-on-linkedin"
          >
            View on LinkedIn
          </a>
        </div>
      </div>
    </div>
  );
}

export default LinkedInPost; 