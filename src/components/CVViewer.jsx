import { useState, useEffect } from 'react';
import '../styles/CVViewer.css';
import cvFile from '../assets/documents/james-cv.pdf';
import cvPreview from '../assets/images/cv-preview.png';

function CVViewer() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const downloadCV = () => {
    const link = document.createElement('a');
    link.href = cvFile;
    link.download = 'james-cv.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const openPDFInNewTab = () => {
    window.open(cvFile, '_blank');
  };

  if (isMobile) {
    return (
      <div className="cv-container mobile">
        <div className="cv-header">
          <h2>My CV</h2>
        </div>
        <div className="cv-preview-container">
          <img 
            src={cvPreview} 
            alt="CV Preview" 
            className="cv-preview-image"
            onClick={openPDFInNewTab}
          />
          <div className="mobile-buttons">
            <button onClick={openPDFInNewTab} className="view-button">
              Open PDF
            </button>
            <button onClick={downloadCV} className="download-button">
              Download PDF
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="cv-container">
      <div className="cv-header">
        <h2>My CV</h2>
        <button onClick={downloadCV} className="download-button">
          Download PDF
        </button>
      </div>
      <div className="pdf-container">
        <iframe
          src={`${cvFile}#view=FitH`}
          title="CV"
          className="pdf-viewer"
        />
      </div>
    </div>
  );
}

export default CVViewer; 