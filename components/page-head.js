class PageHeadComponent extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.injectHeadContent();
    }

    injectHeadContent() {
        const title = this.getAttribute('title') || 'AI赋能高速公路管理培训';
        const description = this.getAttribute('description') || 'AI赋能高速公路管理培训 - 助力交通强国建设';
        
        // charset现在直接在HTML中设置，无需动态添加
        
        // 设置页面标题
        document.title = title;
        
        if (!document.querySelector('meta[name="viewport"]')) {
            const viewport = document.createElement('meta');
            viewport.setAttribute('name', 'viewport');
            viewport.setAttribute('content', 'width=device-width, initial-scale=1.0');
            document.head.appendChild(viewport);
        }
        
        if (!document.querySelector('meta[name="description"]')) {
            const desc = document.createElement('meta');
            desc.setAttribute('name', 'description');
            desc.setAttribute('content', description);
            document.head.appendChild(desc);
        }
        
        // 添加Tailwind CSS
        if (!document.querySelector('script[src*="tailwindcss"]')) {
            const tailwind = document.createElement('script');
            tailwind.src = 'https://cdn.tailwindcss.com';
            document.head.appendChild(tailwind);
        }
        
        // 添加Font Awesome
        if (!document.querySelector('link[href*="font-awesome"]')) {
            const fontAwesome = document.createElement('link');
            fontAwesome.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css';
            fontAwesome.rel = 'stylesheet';
            document.head.appendChild(fontAwesome);
        }
        
        // 添加通用样式
        if (!document.querySelector('#common-styles')) {
            const commonStyles = document.createElement('style');
            commonStyles.id = 'common-styles';
            commonStyles.textContent = `
                body {
                    font-family: 'Inter', 'Helvetica Neue', 'Helvetica', 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', '微软雅黑', Arial, sans-serif;
                    background-color: #f8f9fa; /* A very light gray */
                    min-height: 100vh;
                    color: #212529; /* A deep, near-black color */
                    margin: 0;
                    padding: 0;
                }
                .card-hover {
                    transition: all 0.3s ease;
                    border-radius: 1rem;
                }
                .card-hover:hover {
                    transform: translateY(-8px);
                    box-shadow: 0 15px 30px rgba(0,0,0,0.15);
                }
                .gradient-text {
                    background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    background-clip: text;
                }
                .floating {
                    animation: floating 3.5s ease-in-out infinite;
                }
                @keyframes floating {
                    0%, 100% { transform: translateY(0px); }
                    50% { transform: translateY(-15px); }
                }
                .btn-primary {
                    background-color: #2563eb;
                    color: white;
                    padding: 0.75rem 1.5rem;
                    border-radius: 0.5rem;
                    font-weight: 600;
                    transition: background-color 0.3s ease;
                    text-decoration: none;
                    display: inline-block;
                }
                .btn-primary:hover {
                    background-color: #1d4ed8;
                }
                .btn-secondary {
                    background-color: white;
                    color: #2563eb;
                    padding: 0.75rem 1.5rem;
                    border-radius: 0.5rem;
                    font-weight: 600;
                    border: 1px solid #2563eb;
                    transition: all 0.3s ease;
                    text-decoration: none;
                    display: inline-block;
                }
                .btn-secondary:hover {
                    background-color: #eff6ff;
                    color: #1d4ed8;
                }
                .tool-card {
                    transition: all 0.3s ease;
                    border: 1px solid #e5e7eb;
                    border-radius: 1rem;
                }
                .tool-card:hover {
                    transform: translateY(-8px);
                    box-shadow: 0 15px 30px rgba(0,0,0,0.15);
                    border-color: #3b82f6;
                }
                .tab-content {
                    display: none;
                }
                .tab-content.active {
                    display: block;
                    animation: fadeIn 0.5s ease-in-out;
                }
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(15px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .feature-item {
                    transition: all 0.3s ease;
                    border-radius: 0.5rem;
                }
                .feature-item:hover {
                    background-color: #f3f4f6;
                    transform: translateX(5px);
                }
                .tab-btn-active {
                    background-color: #2563eb;
                    color: white;
                }
                .tab-btn {
                    background-color: #e5e7eb;
                    color: #374151;
                }
                .tab-btn:hover {
                    background-color: #d1d5db;
                }
            `;
            document.head.appendChild(commonStyles);
        }
    }
}

customElements.define('page-head-component', PageHeadComponent);