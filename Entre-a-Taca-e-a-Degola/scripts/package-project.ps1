$ErrorActionPreference = 'Stop'
Add-Type -AssemblyName System.IO.Compression
Add-Type -AssemblyName System.IO.Compression.FileSystem
$projectRoot = (Resolve-Path -LiteralPath (Join-Path $PSScriptRoot '..')).Path
$archivePath = Join-Path $projectRoot 'episodes\EP01-Gremio-Vasco-2026\entrega\final\EP01-Projeto-Editavel.zip'
if (Test-Path -LiteralPath $archivePath) { Remove-Item -LiteralPath $archivePath }
$archive = [System.IO.Compression.ZipFile]::Open($archivePath, [System.IO.Compression.ZipArchiveMode]::Create)
try {
  $folders = @('src', 'shared', 'public', 'scripts', 'docs', 'episodes')
  $files = foreach ($folder in $folders) {
    Get-ChildItem -LiteralPath (Join-Path $projectRoot $folder) -Recurse -File | Where-Object {
      $relative = $_.FullName.Substring($projectRoot.Length + 1)
      $relative -notmatch '\\entrega\\' -and $relative -notmatch '\\revisoes\\'
    }
  }
  $files += Get-Item -LiteralPath (Join-Path $projectRoot 'README.md'), (Join-Path $projectRoot 'package.json'), (Join-Path $projectRoot 'package-lock.json'), (Join-Path $projectRoot 'tsconfig.json')
  foreach ($file in $files) {
    $entry = $file.FullName.Substring($projectRoot.Length + 1).Replace('\', '/')
    [System.IO.Compression.ZipFileExtensions]::CreateEntryFromFile($archive, $file.FullName, $entry, [System.IO.Compression.CompressionLevel]::Optimal) | Out-Null
  }
} finally { $archive.Dispose() }
Write-Output $archivePath
