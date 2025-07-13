# PowerShell script to update navigation components in all HTML files

$files = @(
    "prompt-engineering.html",
    "deep-research.html", 
    "feishu-bitable.html",
    "feishu-bitable-basic.html",
    "feishu-bitable-advanced.html",
    "feishu-bitable-ai-autofill.html",
    "feishu-bitable-workflow.html",
    "feishu-bitable-approval.html",
    "roadmap.html"
)

foreach ($file in $files) {
    Write-Host "Updating $file..."
    
    # Read the file content
    $content = Get-Content $file -Raw
    
    # Replace hardcoded nav with component
    $content = $content -replace '(?s)<nav class="bg-white[^>]*>.*?</nav>', '<navigation-component current-page="' + ($file -replace '\.html$', '') + '"></navigation-component>'
    
    # Replace mobile menu script with navigation.js
    $content = $content -replace '(?s)<script>\s*// 移动菜单切换.*?</script>', '<script src="components/navigation.js"></script>'
    
    # Write back to file
    $content | Set-Content $file -NoNewline
    
    Write-Host "Updated $file successfully"
}

Write-Host "All files updated!"