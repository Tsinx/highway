class NavigationComponent extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.render();
        this.setupEventListeners();
    }

    render() {
        const currentPage = this.getAttribute('current-page') || '';
        
        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: block;
                }
                nav {
                    background: rgba(255, 255, 255, 0.95);
                    backdrop-filter: blur(16px);
                    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
                    position: sticky;
                    top: 0;
                    z-index: 50;
                }
                .container {
                    max-width: 1200px;
                    margin: 0 auto;
                    padding: 0 1.5rem;
                }
                .nav-content {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 1rem 0;
                }
                .logo {
                    font-size: 1.5rem;
                    font-weight: bold;
                    color: #2563eb;
                    text-decoration: none;
                    display: flex;
                    align-items: center;
                }
                .logo i {
                    margin-right: 0.5rem;
                }
                .nav-links {
                    display: none;
                    align-items: center;
                    gap: 2rem;
                }
                @media (min-width: 768px) {
                    .nav-links {
                        display: flex;
                    }
                }
                .nav-link {
                    color: #4b5563;
                    text-decoration: none;
                    transition: color 0.3s ease;
                    position: relative;
                }
                .nav-link:hover {
                    color: #1d4ed8;
                }
                .nav-link-active {
                    color: #2563eb;
                    font-weight: 600;
                    border-bottom: 2px solid #2563eb;
                    padding-bottom: 0.25rem;
                }
                .dropdown {
                    position: relative;
                }
                .dropdown-toggle {
                    display: flex;
                    align-items: center;
                    cursor: pointer;
                }
                .dropdown-toggle i {
                    margin-left: 0.25rem;
                    font-size: 0.75rem;
                }
                .dropdown-menu {
                    position: absolute;
                    top: 100%;
                    left: 0;
                    width: 14rem;
                    margin-top: 0.5rem;
                    background: white;
                    border-radius: 0.75rem;
                    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
                    opacity: 0;
                    visibility: hidden;
                    transition: all 0.3s ease;
                    z-index: 20;
                }
                .dropdown:hover .dropdown-menu {
                    opacity: 1;
                    visibility: visible;
                }
                .dropdown-menu a {
                    display: block;
                    padding: 0.5rem 1rem;
                    font-size: 0.875rem;
                    color: #374151;
                    text-decoration: none;
                    transition: all 0.2s ease;
                }
                .dropdown-menu a:hover {
                    background-color: #eff6ff;
                    color: #1d4ed8;
                }
                .mobile-menu-button {
                    display: block;
                    color: #374151;
                    background: none;
                    border: none;
                    font-size: 1.5rem;
                    cursor: pointer;
                }
                @media (min-width: 768px) {
                    .mobile-menu-button {
                        display: none;
                    }
                }
                .mobile-menu {
                    display: none;
                    padding: 0 1.5rem 1rem;
                }
                .mobile-menu.active {
                    display: block;
                }
                .mobile-menu a {
                    display: block;
                    padding: 0.5rem 0;
                    color: #374151;
                    text-decoration: none;
                    transition: color 0.3s ease;
                }
                .mobile-menu a:hover {
                    color: #2563eb;
                }
                .mobile-menu a.active {
                    color: #2563eb;
                    font-weight: 600;
                }
            </style>
            
            <nav>
                <div class="container">
                    <div class="nav-content">
                        <a href="index.html" class="logo">
                            <i class="fas fa-cogs"></i>AI赋能高速管理
                        </a>
                        
                        <div class="nav-links">
                            <a href="index.html" class="nav-link ${currentPage === 'index' ? 'nav-link-active' : ''}">主页</a>
                            <a href="ai-tools.html" class="nav-link ${currentPage === 'ai-tools' ? 'nav-link-active' : ''}">AI工具箱</a>
                            
                            <div class="dropdown">
                                <a href="ai-applications.html" class="nav-link dropdown-toggle ${currentPage === 'ai-applications' ? 'nav-link-active' : ''}">
                                    AI应用 <i class="fas fa-chevron-down"></i>
                                </a>
                                <div class="dropdown-menu">
                                    <a href="ai-applications.html">总览</a>
                                    <a href="prompt-engineering.html">提示词工程</a>
                                    <a href="ai-editor.html">AI编辑器</a>
                                    <a href="report-analysis.html">报告分析</a>
                                    <a href="deep-research.html">深度研究</a>
                                    <a href="image-generation.html">图像生成</a>
                                    <a href="video-generation.html">视频生成</a>
                                </div>
                            </div>
                            
                            <div class="dropdown">
                                <a href="feishu-bitable.html" class="nav-link dropdown-toggle ${currentPage === 'feishu-bitable' ? 'nav-link-active' : ''}">
                                    飞书多维表格 <i class="fas fa-chevron-down"></i>
                                </a>
                                <div class="dropdown-menu">
                                    <a href="feishu-bitable.html">总览</a>
                                    <a href="feishu-bitable-basic.html">第一章：基础</a>
                                    <a href="feishu-bitable-advanced.html">第二章：进阶</a>
                                    <a href="feishu-bitable-ai-autofill.html">第三章：AI批量填充</a>
                                    <a href="feishu-bitable-approval.html">第四章：智能审批</a>
                                    <a href="feishu-bitable-workflow.html">第五章：工作流与Agent</a>
                                </div>
                            </div>
                            
                            <div class="dropdown">
                                <a href="coze-bot-creation.html" class="nav-link dropdown-toggle ${currentPage === 'coze-bot-creation' ? 'nav-link-active' : ''}">
                                    实战演练 <i class="fas fa-chevron-down"></i>
                                </a>
                                <div class="dropdown-menu">
                                    <a href="coze-bot-creation.html">构建Coze机器人</a>
                                </div>
                            </div>
                            
                            <a href="roadmap.html" class="nav-link ${currentPage === 'roadmap' ? 'nav-link-active' : ''}">实施路线图</a>
                        </div>
                        
                        <button class="mobile-menu-button" id="mobile-menu-button">
                            <i class="fas fa-bars"></i>
                        </button>
                    </div>
                    
                    <div class="mobile-menu" id="mobile-menu">
                        <a href="index.html" class="${currentPage === 'index' ? 'active' : ''}">主页</a>
                        <a href="ai-tools.html" class="${currentPage === 'ai-tools' ? 'active' : ''}">AI工具箱</a>
                        <a href="ai-applications.html" class="${currentPage === 'ai-applications' ? 'active' : ''}">AI应用</a>
                        <a href="feishu-bitable.html" class="${currentPage === 'feishu-bitable' ? 'active' : ''}">飞书多维表格</a>
                        <a href="coze-bot-creation.html" class="${currentPage === 'coze-bot-creation' ? 'active' : ''}">实战演练</a>
                        <a href="roadmap.html" class="${currentPage === 'roadmap' ? 'active' : ''}">实施路线图</a>
                    </div>
                </div>
            </nav>
        `;
    }

    setupEventListeners() {
        const mobileMenuButton = this.shadowRoot.getElementById('mobile-menu-button');
        const mobileMenu = this.shadowRoot.getElementById('mobile-menu');
        
        if (mobileMenuButton && mobileMenu) {
            mobileMenuButton.addEventListener('click', () => {
                mobileMenu.classList.toggle('active');
            });
        }
    }
}

customElements.define('navigation-component', NavigationComponent);