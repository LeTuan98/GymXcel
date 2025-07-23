// Blog Post Specific JavaScript

// Smooth scrolling for internal links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Reading progress indicator
function createReadingProgress() {
    const progressBar = document.createElement('div');
    progressBar.className = 'reading-progress';
    progressBar.style.cssText = `
        position: fixed;
        top: 80px;
        left: 0;
        width: 0%;
        height: 3px;
        background: linear-gradient(135deg, #D4AF37, #B8860B);
        z-index: 1000;
        transition: width 0.1s ease;
    `;
    document.body.appendChild(progressBar);

    window.addEventListener('scroll', () => {
        const article = document.querySelector('.blog-article');
        if (article) {
            const articleTop = article.offsetTop;
            const articleHeight = article.offsetHeight;
            const windowHeight = window.innerHeight;
            const scrollTop = window.pageYOffset;
            
            const articleStart = articleTop - windowHeight / 2;
            const articleEnd = articleTop + articleHeight - windowHeight / 2;
            
            if (scrollTop >= articleStart && scrollTop <= articleEnd) {
                const progress = (scrollTop - articleStart) / (articleEnd - articleStart);
                progressBar.style.width = Math.min(progress * 100, 100) + '%';
            } else if (scrollTop < articleStart) {
                progressBar.style.width = '0%';
            } else {
                progressBar.style.width = '100%';
            }
        }
    });
}

// Initialize reading progress
createReadingProgress();

// Social sharing functionality
function initSocialSharing() {
    const shareButtons = document.querySelectorAll('.share-btn');
    const pageUrl = encodeURIComponent(window.location.href);
    const pageTitle = encodeURIComponent(document.title);
    
    shareButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            
            let shareUrl = '';
            const platform = button.classList[1]; // facebook, twitter, etc.
            
            switch(platform) {
                case 'facebook':
                    shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${pageUrl}`;
                    break;
                case 'twitter':
                    shareUrl = `https://twitter.com/intent/tweet?url=${pageUrl}&text=${pageTitle}`;
                    break;
                case 'linkedin':
                    shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${pageUrl}`;
                    break;
                case 'email':
                    shareUrl = `mailto:?subject=${pageTitle}&body=Check out this article: ${pageUrl}`;
                    break;
            }
            
            if (shareUrl) {
                if (platform === 'email') {
                    window.location.href = shareUrl;
                } else {
                    window.open(shareUrl, '_blank', 'width=600,height=400');
                }
            }
        });
    });
}

// Initialize social sharing
initSocialSharing();

// Newsletter form submission
const newsletterForm = document.querySelector('.newsletter-form');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = newsletterForm.querySelector('input[type="email"]').value;
        
        // Here you would typically send the email to your newsletter service
        console.log('Newsletter signup:', email);
        
        // Show success message
        const button = newsletterForm.querySelector('button');
        const originalText = button.textContent;
        button.textContent = 'Subscribed!';
        button.style.background = '#4CAF50';
        
        setTimeout(() => {
            button.textContent = originalText;
            button.style.background = '';
            newsletterForm.reset();
        }, 2000);
    });
}

// Comment form submission
const commentForm = document.querySelector('.comment-form form');
if (commentForm) {
    commentForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const formData = new FormData(commentForm);
        const name = commentForm.querySelector('input[type="text"]').value;
        const email = commentForm.querySelector('input[type="email"]').value;
        const comment = commentForm.querySelector('textarea').value;
        
        // Here you would typically send the comment to your backend
        console.log('New comment:', { name, email, comment });
        
        // Show success message
        const button = commentForm.querySelector('button');
        const originalText = button.textContent;
        button.textContent = 'Comment Posted!';
        button.style.background = '#4CAF50';
        
        setTimeout(() => {
            button.textContent = originalText;
            button.style.background = '';
            commentForm.reset();
        }, 2000);
    });
}

// Animate elements on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
const animateElements = document.querySelectorAll('.sidebar-widget, .exercise-highlight, .comment-item');
animateElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Copy link functionality
function addCopyLinkButton() {
    const shareButtons = document.querySelector('.share-buttons');
    if (shareButtons) {
        const copyButton = document.createElement('a');
        copyButton.href = '#';
        copyButton.className = 'share-btn copy-link';
        copyButton.style.background = '#666666';
        copyButton.style.color = '#ffffff';
        copyButton.innerHTML = '<i class="fas fa-link"></i><span>Copy Link</span>';
        
        copyButton.addEventListener('click', (e) => {
            e.preventDefault();
            navigator.clipboard.writeText(window.location.href).then(() => {
                const span = copyButton.querySelector('span');
                const originalText = span.textContent;
                span.textContent = 'Copied!';
                
                setTimeout(() => {
                    span.textContent = originalText;
                }, 2000);
            });
        });
        
        shareButtons.appendChild(copyButton);
    }
}

// Add copy link button
addCopyLinkButton();

// Table of contents generator (if needed)
function generateTableOfContents() {
    const headings = document.querySelectorAll('.article-content h2, .article-content h3');
    if (headings.length > 3) {
        const tocContainer = document.createElement('div');
        tocContainer.className = 'table-of-contents';
        tocContainer.innerHTML = '<h3>Table of Contents</h3><ul></ul>';
        
        const tocList = tocContainer.querySelector('ul');
        
        headings.forEach((heading, index) => {
            const id = `heading-${index}`;
            heading.id = id;
            
            const li = document.createElement('li');
            const a = document.createElement('a');
            a.href = `#${id}`;
            a.textContent = heading.textContent;
            a.className = heading.tagName.toLowerCase();
            
            li.appendChild(a);
            tocList.appendChild(li);
        });
        
        // Insert TOC after the intro paragraph
        const intro = document.querySelector('.article-intro');
        if (intro) {
            intro.parentNode.insertBefore(tocContainer, intro.nextSibling);
        }
    }
}

// Generate table of contents
generateTableOfContents();

// Highlight current section in TOC
function highlightCurrentSection() {
    const headings = document.querySelectorAll('.article-content h2, .article-content h3');
    const tocLinks = document.querySelectorAll('.table-of-contents a');
    
    if (headings.length === 0 || tocLinks.length === 0) return;
    
    window.addEventListener('scroll', () => {
        let current = '';
        
        headings.forEach(heading => {
            const rect = heading.getBoundingClientRect();
            if (rect.top <= 100) {
                current = heading.id;
            }
        });
        
        tocLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

// Initialize TOC highlighting
highlightCurrentSection();

// Add styles for table of contents
const tocStyles = `
.table-of-contents {
    background: rgba(212, 175, 55, 0.05);
    border: 1px solid rgba(212, 175, 55, 0.2);
    border-radius: 15px;
    padding: 2rem;
    margin: 2rem 0;
}

.table-of-contents h3 {
    color: #B8860B;
    margin-bottom: 1rem;
}

.table-of-contents ul {
    list-style: none;
    padding: 0;
}

.table-of-contents li {
    margin-bottom: 0.5rem;
}

.table-of-contents a {
    color: #555555;
    text-decoration: none;
    transition: color 0.3s ease;
    display: block;
    padding: 0.25rem 0;
}

.table-of-contents a:hover,
.table-of-contents a.active {
    color: #B8860B;
}

.table-of-contents a.h3 {
    padding-left: 1rem;
    font-size: 0.9rem;
}
`;

// Add TOC styles to the page
const styleSheet = document.createElement('style');
styleSheet.textContent = tocStyles;
document.head.appendChild(styleSheet);

// Print functionality
function addPrintButton() {
    const articleContent = document.querySelector('.article-content');
    if (articleContent) {
        const printButton = document.createElement('button');
        printButton.className = 'print-button';
        printButton.innerHTML = '<i class="fas fa-print"></i> Print Article';
        printButton.style.cssText = `
            position: fixed;
            bottom: 100px;
            right: 30px;
            background: #2C2C2C;
            color: #ffffff;
            border: none;
            padding: 12px 20px;
            border-radius: 25px;
            cursor: pointer;
            font-weight: 600;
            display: flex;
            align-items: center;
            gap: 0.5rem;
            z-index: 1000;
            transition: all 0.3s ease;
        `;
        
        printButton.addEventListener('click', () => {
            window.print();
        });
        
        printButton.addEventListener('mouseenter', () => {
            printButton.style.background = '#D4AF37';
            printButton.style.color = '#000000';
        });
        
        printButton.addEventListener('mouseleave', () => {
            printButton.style.background = '#2C2C2C';
            printButton.style.color = '#ffffff';
        });
        
        document.body.appendChild(printButton);
    }
}

// Add print button
addPrintButton();

// Estimated reading time calculator
function calculateReadingTime() {
    const articleContent = document.querySelector('.article-content');
    if (articleContent) {
        const text = articleContent.textContent;
        const wordsPerMinute = 200;
        const words = text.trim().split(/\s+/).length;
        const readingTime = Math.ceil(words / wordsPerMinute);
        
        // Update the reading time in the meta section
        const timeElement = document.querySelector('.stat-item .fas.fa-clock').parentElement.querySelector('span');
        if (timeElement) {
            timeElement.textContent = `${readingTime} min read`;
        }
    }
}

// Calculate and update reading time
calculateReadingTime();