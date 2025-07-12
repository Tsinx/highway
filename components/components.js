// 组件加载器 - 统一加载所有Web Components

// 加载所有组件
function loadComponents() {
    const componentFiles = [
        'components/page-head.js',
        'components/navigation.js',
        'components/footer.js'
    ];
    
    componentFiles.forEach(file => {
        const script = document.createElement('script');
        script.src = file;
        script.defer = true;
        document.head.appendChild(script);
    });
}

// 页面加载完成后初始化组件
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadComponents);
} else {
    loadComponents();
}

// 导出加载函数供手动调用
window.loadComponents = loadComponents;

// 通用工具函数
window.setupCommonFeatures = function() {
    // 平滑滚动
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
    
    // 标签切换功能（如果页面有标签）
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    if (tabButtons.length > 0) {
        tabButtons.forEach(btn => {
            btn.addEventListener('click', function() {
                const targetTab = this.getAttribute('data-tab');
                
                tabButtons.forEach(b => {
                    b.classList.remove('tab-btn-active');
                    b.classList.add('tab-btn');
                });
                this.classList.add('tab-btn-active');
                this.classList.remove('tab-btn');
                
                tabContents.forEach(content => {
                    content.classList.remove('active');
                });
                const targetContent = document.getElementById(targetTab);
                if (targetContent) {
                    targetContent.classList.add('active');
                }
            });
        });
    }
};

// 页面加载完成后设置通用功能
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        setTimeout(window.setupCommonFeatures, 100); // 延迟执行确保组件已加载
    });
} else {
    setTimeout(window.setupCommonFeatures, 100);
}