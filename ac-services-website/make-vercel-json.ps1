$content = '{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
'
[System.IO.File]::WriteAllText("$PSScriptRoot\vercel.json", $content, [System.Text.UTF8Encoding]::new($false))
