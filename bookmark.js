javascript:(function() {
  const githubAccessToken = 'YOUR_GITHUB_PAT_HERE';
  const dom = document.querySelector('main > .flex-1 > .h-full .flex:has(> .w-full)');
  const template = document.createElement('template');
  template.innerHTML = dom.innerHTML;
  ['.items-end', 'img', 'svg', 'button', ':empty'].forEach(selector => {
    template.content.querySelectorAll(selector).forEach(node => {
      node.remove();
    });
  });

  const title = document.title.replace(/[^a-z0-9]/gi, '_');
  const content = `<!DOCTYPE html>
<html lang="en">
<head>
  <title>Chat GPT: ${title}</title>
  <meta name="generator" content="chatGPT Saving Bookmark"/>
  <style>
body {
  font-size: 16px;
  font-family: Arial, sans-serif !important;
  line-height: 28px;
  color: whitesmoke !important;
}
body > .w-full {
  padding: 10px;
  margin: 10px;
  border-radius: 5px;
}
body > .w-full:nth-child(2n+1)::before {
    content: "Prompt";
    display: block;
    font-weight: bold;
    margin-bottom: 2px;
    font-size: 16px;
    background: none;
    font-family: Arial, sans-serif !important;
    line-height: 18px;
    color: whitesmoke !important;
}
body > .w-full:nth-child(2n+2)::before {
    content: "AI";
    display: block;
    font-weight: bold;
    margin-bottom: 2px;
    font-size: 16px;
    background: none;
    font-family: Arial, sans-serif !important;
    line-height: 18px;
    color: whitesmoke !important;
}
/* prompt */
body > .w-full:nth-child(2n+1) {
  background: #3B3F41;
  padding: 10px;
  margin: 10px;
  border-radius: 5px;
}
/* response */
body > .w-full:nth-child(2n+2) {
  background: #52575A;
  margin: 10px;
}
p{
    color: whitesmoke;
}
a, a:visited {
  color: #7792cd;
}
pre {
  margin: 0 0 1em 0;
  display: inline-block;
  width: 100%;
}
pre code.hljs {
  margin-bottom: 1em;
  border-radius: 5px;
}
.whitespace-pre-wrap {
  white-space: pre-wrap;
}
.flex-col {
  max-width: 850px;
  margin: 0px auto;
}
</style>

  <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/highlightjs/cdn-release@11.7.0/build/styles/default.min.css"/>
</head>
<body>${template.innerHTML}</body>
</html>`;

  const gistDescription = `Chat GPT transcript: ${title}`;
  const gistFilename = `${title}.html`;
  const gistContent = {};
  gistContent[gistFilename] = { content };

  const data = {
    description: gistDescription,
    public: false,
    files: gistContent,
  };

  fetch('https://api.github.com/gists', {
    method: 'POST',
    headers: {
      'Authorization': `token ${githubAccessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
  .then(response => response.json())
  .then(gist => {
    const gistId = gist.id;
    const previewUrl = `https://gistpreview.github.io/?${gistId}`;
    navigator.clipboard.writeText(previewUrl).then(() => {
      console.log('Preview url copied to clipboard:', previewUrl);
    }).catch(error => {
      console.error('Failed to copy preview url to clipboard:', error);
    });
    window.open(previewUrl);
  })
  .catch(error => {
    console.error(error);
    alert('An error occurred while creating the Gist.');
  });
})();
