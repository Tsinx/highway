class FooterComponent extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.render();
    }

    render() {
        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: block;
                }
                footer {
                    background-color: #1f2937;
                    color: white;
                    padding: 2.5rem 0;
                }
                .container {
                    max-width: 1200px;
                    margin: 0 auto;
                    padding: 0 1.5rem;
                    text-align: center;
                }
                .footer-content {
                    color: #9ca3af;
                    font-size: 1rem;
                }
                .footer-content a {
                    color: #60a5fa;
                    text-decoration: none;
                    transition: color 0.3s ease;
                }
                .footer-content a:hover {
                    color: #93c5fd;
                }
            </style>
            
            <footer>
                <div class="container">
                    <div class="footer-content">
                        <p>&copy; 2025 AI赋能高速公路管理培训 | 助力交通强国建设</p>
                    </div>
                </div>
            </footer>
        `;
    }
}

customElements.define('footer-component', FooterComponent);