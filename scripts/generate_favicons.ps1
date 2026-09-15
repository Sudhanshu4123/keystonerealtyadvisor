Add-Type -AssemblyName System.Drawing

$baseDir = "C:\Users\sanje\Downloads\keystone\frontend\public"
$srcFile = Join-Path $baseDir "keystone-logo.jpg"
$srcImg = [System.Drawing.Image]::FromFile($srcFile)

function Export-Png([System.Drawing.Image]$source, [int]$width, [int]$height, [string]$destination) {
    $bmp = New-Object System.Drawing.Bitmap($width, $height)
    $gfx = [System.Drawing.Graphics]::FromImage($bmp)
    $gfx.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $gfx.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
    $gfx.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
    $gfx.CompositingQuality = [System.Drawing.Drawing2D.CompositingQuality]::HighQuality
    $gfx.DrawImage($source, 0, 0, $width, $height)
    $gfx.Dispose()
    
    if (Test-Path $destination) {
        Remove-Item $destination -Force
    }
    $bmp.Save($destination, [System.Drawing.Imaging.ImageFormat]::Png)
    $bmp.Dispose()
}

Export-Png $srcImg 1024 1024 (Join-Path $baseDir "keystone-logo.png")
Export-Png $srcImg 512 512 (Join-Path $baseDir "favicon-512x512.png")
Export-Png $srcImg 192 192 (Join-Path $baseDir "favicon-192x192.png")
Export-Png $srcImg 180 180 (Join-Path $baseDir "apple-touch-icon.png")
Export-Png $srcImg 48 48 (Join-Path $baseDir "favicon-48x48.png")
Export-Png $srcImg 32 32 (Join-Path $baseDir "favicon-32x32.png")

# Generate favicon.ico
$icoDest = Join-Path $baseDir "favicon.ico"
if (Test-Path $icoDest) {
    Remove-Item $icoDest -Force
}
$bmpIco = New-Object System.Drawing.Bitmap(48, 48)
$gfxIco = [System.Drawing.Graphics]::FromImage($bmpIco)
$gfxIco.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
$gfxIco.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
$gfxIco.DrawImage($srcImg, 0, 0, 48, 48)
$gfxIco.Dispose()

$hIcon = $bmpIco.GetHicon()
$icon = [System.Drawing.Icon]::FromHandle($hIcon)
$fs = New-Object System.IO.FileStream($icoDest, [System.IO.FileMode]::Create)
$icon.Save($fs)
$fs.Close()
$bmpIco.Dispose()

$srcImg.Dispose()
Write-Host "All icons generated successfully!"
