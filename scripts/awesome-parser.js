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
    orgCategory           = mkdownData['org-category']['text'],
    orgCategoryFormatted  = mkdownData['org-category']['text'].toLowerCase().replace(' ', '-'),
    formattedOrgCategory  = `<!-- @${orgCategoryFormatted} -->`,
    orgUrl                = `https://github.com/${orgId}`,
    newLine               = `- [${orgName}](${orgUrl}) - ${orgDescription}`,
    data                  = { orgId, orgName, orgDescription, orgCategory, orgUrl }
  ;
  
  const 
    fs            = require('fs'),
    readme        = fs.readFileSync('readme.md', 'utf8'),
    newReadmeText = updateMarkdown(readme, formattedOrgCategory, newLine)
  ;
  fs.writeFileSync('readme.md', newReadmeText, 'utf8');

  // Log results
  console.log("New readme: \n", newReadme.split('\n').map(line => `\t${line}`).join('\n'));
  console.table(data);
  
  return data;
}

module.exports = main;
