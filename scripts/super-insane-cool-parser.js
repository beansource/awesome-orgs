function updateMarkdown(fileString, section, newContent) {
  const lines = fileString.split('\n');
  let newLines = [];
  for (const line of lines) {
    if (line.includes(section)) {
      newLines.push(line);
      newLines.push(newContent);
    } else {
      newLines.push(line);
    }
  }

  return newLines.join('\n');
}

function main({ mkdownData }) {
  const
    orgId                 = mkdownData['handle']['text'];
    orgName               = mkdownData['org-name']['text'],
    orgDescription        = mkdownData['description']['text'],
    orgCategory           = mkdownData['org-category']['text'].toLowerCase(),
    formattedOrgCategory  = `#${orgCategory}`,
    newOrgUrl             = `https://github.com/${orgId}`,
    data                  = `- [${orgName} [${orgId}]](${newOrgUrl}) - ${orgDescription}`
  ;

  const 
    fs = require('fs'),
    readme = fs.readFileSync('readme.md', 'utf8'),
    newReadme = updateMarkdown(readme, formattedOrgCategory, data)
  ;
  fs.writeFileSync('readme.md', newReadme, 'utf8');

  // Log the new readme
  console.log(
    "New readme: \n",
    newReadme.split('\n').map(line => `\t${line}`).join('\n')
  );
}

module.exports = main;
