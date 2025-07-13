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
                /* 三级菜单样式 */
                .dropdown-submenu {
                    position: relative;
                }
                .dropdown-submenu > a {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                }
                .dropdown-submenu > a::after {
                    content: '\f054';
                    font-family: 'Font Awesome 5 Free';
                    font-weight: 900;
                    font-size: 0.75rem;
                    color: #9ca3af;
                }
                .dropdown-submenu-menu {
                    position: absolute;
                    top: 0;
                    left: 100%;
                    width: 12rem;
                    margin-left: 0.25rem;
                    background: white;
                    border-radius: 0.75rem;
                    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
                    opacity: 0;
                    visibility: hidden;
                    transition: all 0.3s ease;
                    z-index: 30;
                }
                .dropdown-submenu:hover .dropdown-submenu-menu {
                    opacity: 1;
                    visibility: visible;
                }
                .dropdown-submenu-menu a {
                    padding: 0.375rem 0.75rem;
                    font-size: 0.8125rem;
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
                /* 移动端三级菜单样式 */
                .mobile-submenu {
                    margin-left: 1rem;
                }
                .mobile-submenu-toggle {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    cursor: pointer;
                }
                .mobile-submenu-toggle::after {
                    content: '\f054';
                    font-family: 'Font Awesome 5 Free';
                    font-weight: 900;
                    font-size: 0.75rem;
                    color: #9ca3af;
                    transition: transform 0.3s ease;
                }
                .mobile-submenu-toggle.active::after {
                    transform: rotate(90deg);
                }
                .mobile-submenu-items {
                    display: none;
                    margin-left: 1rem;
                    margin-top: 0.5rem;
                }
                .mobile-submenu-items.active {
                    display: block;
                }
                .mobile-submenu-items a {
                    padding: 0.25rem 0;
                    font-size: 0.875rem;
                    color: #6b7280;
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
                            
                            <div class="dropdown">
                                <a href="ai-tools.html" class="nav-link dropdown-toggle ${currentPage === 'ai-tools' ? 'nav-link-active' : ''}">
                                    AI核心能力 <i class="fas fa-chevron-down"></i>
                                </a>
                                <div class="dropdown-menu">
                                    <a href="ai-tools.html">AI工具导航</a>
                                    <a href="prompt-engineering.html">提示词工程</a>
                                    <a href="ai-editor.html">AI编辑器</a>
                                </div>
                            </div>
                            
                            <div class="dropdown">
                                <a href="project-risk-assessment.html" class="nav-link dropdown-toggle ${currentPage === 'project-risk-assessment' || currentPage === 'project-design-procurement' || currentPage === 'project-construction-management' ? 'nav-link-active' : ''}">
                                    AI赋能 · 工程项目 <i class="fas fa-chevron-down"></i>
                                </a>
                                <div class="dropdown-menu">
                                    <a href="project-risk-assessment.html">项目前期风险管控</a>
                                    <a href="project-design-procurement.html">设计与采购优化</a>
                                    <a href="project-construction-management.html">施工过程降本增效</a>
                                </div>
                            </div>
                            
                            <div class="dropdown">
                                <a href="ai-applications.html" class="nav-link dropdown-toggle ${currentPage === 'ai-applications' || currentPage === 'report-analysis' || currentPage === 'deep-research' || currentPage === 'image-generation' || currentPage === 'video-generation' || currentPage === 'coze-bot-creation' || currentPage === 'feishu-bitable' || currentPage === 'feishu-bitable-basic' || currentPage === 'feishu-bitable-advanced' || currentPage === 'feishu-bitable-workflow' || currentPage === 'feishu-bitable-approval' || currentPage === 'feishu-bitable-ai-autofill' ? 'nav-link-active' : ''}">
                                    AI赋能 · 办公协同 <i class="fas fa-chevron-down"></i>
                                </a>
                                <div class="dropdown-menu">
                                    <a href="ai-applications.html">AI应用总览</a>
                                    <a href="report-analysis.html">报告分析</a>
                                    <a href="deep-research.html">深度研究</a>
                                    <a href="image-generation.html">图像生成</a>
                                    <a href="video-generation.html">视频生成</a>
                                    <div class="dropdown-submenu">
                                        <a href="feishu-bitable.html">飞书多维表格</a>
                                        <div class="dropdown-submenu-menu">
                                            <a href="feishu-bitable-basic.html">基础功能</a>
                                            <a href="feishu-bitable-advanced.html">高级应用</a>
                                            <a href="feishu-bitable-ai-autofill.html">AI智能填充</a>
                                            <a href="feishu-bitable-workflow.html">自动化工作流</a>
                                            <a href="feishu-bitable-approval.html">审批流程</a>
                                        </div>
                                    </div>
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
                        <a href="ai-tools.html" class="${currentPage === 'ai-tools' ? 'active' : ''}">AI核心能力</a>
                        <a href="project-risk-assessment.html" class="${currentPage === 'project-risk-assessment' || currentPage === 'project-design-procurement' || currentPage === 'project-construction-management' ? 'active' : ''}">AI赋能 · 工程项目</a>
                        <a href="ai-applications.html" class="${currentPage === 'ai-applications' || currentPage === 'report-analysis' || currentPage === 'deep-research' || currentPage === 'image-generation' || currentPage === 'video-generation' || currentPage === 'coze-bot-creation' || currentPage === 'feishu-bitable' || currentPage === 'feishu-bitable-basic' || currentPage === 'feishu-bitable-advanced' || currentPage === 'feishu-bitable-workflow' || currentPage === 'feishu-bitable-approval' || currentPage === 'feishu-bitable-ai-autofill' ? 'active' : ''}">AI赋能 · 办公协同</a>
                        <div class="mobile-submenu">
                            <div class="mobile-submenu-toggle" data-target="feishu-submenu">
                                <span>飞书多维表格</span>
                            </div>
                            <div class="mobile-submenu-items" id="feishu-submenu">
                                <a href="feishu-bitable.html" class="${currentPage === 'feishu-bitable' ? 'active' : ''}">总览</a>
                                <a href="feishu-bitable-basic.html" class="${currentPage === 'feishu-bitable-basic' ? 'active' : ''}">基础功能</a>
                                <a href="feishu-bitable-advanced.html" class="${currentPage === 'feishu-bitable-advanced' ? 'active' : ''}">高级应用</a>
                                <a href="feishu-bitable-ai-autofill.html" class="${currentPage === 'feishu-bitable-ai-autofill' ? 'active' : ''}">AI智能填充</a>
                                <a href="feishu-bitable-workflow.html" class="${currentPage === 'feishu-bitable-workflow' ? 'active' : ''}">自动化工作流</a>
                                <a href="feishu-bitable-approval.html" class="${currentPage === 'feishu-bitable-approval' ? 'active' : ''}">审批流程</a>
                            </div>
                        </div>
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
        
        // 移动端三级菜单切换功能
        const submenuToggles = this.shadowRoot.querySelectorAll('.mobile-submenu-toggle');
        submenuToggles.forEach(toggle => {
            toggle.addEventListener('click', () => {
                const targetId = toggle.getAttribute('data-target');
                const submenuItems = this.shadowRoot.getElementById(targetId);
                
                if (submenuItems) {
                    submenuItems.classList.toggle('active');
                    toggle.classList.toggle('active');
                }
            });
        });
    }
}

customElements.define('navigation-component', NavigationComponent);