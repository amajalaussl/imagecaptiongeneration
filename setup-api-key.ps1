# AI Caption Generator - API Key Setup Script
# This script will help you update your Hugging Face API key

Write-Host "=== AI Caption Generator - API Key Setup ===" -ForegroundColor Green
Write-Host ""
Write-Host "Please follow these steps:" -ForegroundColor Yellow
Write-Host "1. Go to https://huggingface.co/settings/tokens" -ForegroundColor Cyan
Write-Host "2. Create a new token with 'Read' permission" -ForegroundColor Cyan
Write-Host "3. Copy your token (starts with 'hf_')" -ForegroundColor Cyan
Write-Host ""
 = Read-Host "Enter your Hugging Face API key"

if ( -and .StartsWith("hf_")) {
    # Update the .env.local file
    "VITE_HF_API_KEY=" | Out-File -FilePath ".env.local" -Encoding UTF8
    Write-Host ""
    Write-Host " API key updated successfully!" -ForegroundColor Green
    Write-Host " Please restart your development server:" -ForegroundColor Yellow
    Write-Host "   Press Ctrl+C to stop the current server" -ForegroundColor White
    Write-Host "   Then run: npm run dev" -ForegroundColor White
    Write-Host ""
    Write-Host " Your app will be available at: http://localhost:5173" -ForegroundColor Cyan
} else {
    Write-Host ""
    Write-Host " Invalid API key format. Please make sure it starts with 'hf_'" -ForegroundColor Red
    Write-Host "Please run this script again with a valid token." -ForegroundColor Red
}
