#!/usr/bin/env node

/**
 * generate-agentic.js
 * 
 * Automatically compiles:
 * - /llms.txt (Standard LLM Table of Contents per llmstxt.org v2)
 * - /.well-known/llms.txt
 * - /llms-full.txt (Single-file comprehensive knowledge base)
 * - /projects.json (Structured machine dataset of all projects)
 * - /index.md (Markdown version of homepage)
 * - /case-studies/*.md (Clean Markdown versions of all case studies)
 */

const fs = require('fs');
const path = require('path');

const repoRoot = path.resolve(__dirname, '..');

// 1. Read js/projects.js
let code = fs.readFileSync(path.join(repoRoot, 'js/projects.js'), 'utf8');
code = code.replace(/^const projects/m, 'var projects');
eval(code);

function htmlToMarkdown(html) {
  if (!html) return '';
  return html
    .replace(/<a\s+[^>]*href=["']([^"']*)["'][^>]*>(.*?)<\/a>/gi, (match, href, text) => {
      let cleanHref = href;
      if (cleanHref.startsWith('../')) {
        cleanHref = 'https://ducklin.de/' + cleanHref.replace(/^\.\.\//, '');
      } else if (cleanHref.startsWith('./')) {
        cleanHref = 'https://ducklin.de/' + cleanHref.replace(/^\.\//, '');
      }
      return `[${text.trim()}](${cleanHref})`;
    })
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<\/?p>/gi, '\n\n')
    .replace(/<\/?strong>/gi, '**')
    .replace(/<\/?b>/gi, '**')
    .replace(/<\/?em>/gi, '*')
    .replace(/<\/?i>/gi, '*')
    .replace(/<[^>]+>/g, '')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

// 2. Parse projects and their rich case studies
const projectData = projects.map(p => {
  const docFile = p.docHref ? path.join(repoRoot, p.docHref.replace(/^\.\//, '')) : null;
  let title = p.name;
  let subtitle = '';
  let overview = '';
  let stack = p.techStack ? [...p.techStack] : [];
  let features = [];
  let links = [];

  if (p.href) {
    let demoUrl = p.href;
    if (demoUrl.startsWith('./')) demoUrl = 'https://ducklin.de/' + demoUrl.replace(/^\.\//, '');
    links.push({ label: 'Live Demo', url: demoUrl });
  }

  if (p.docHref) {
    let docUrl = 'https://ducklin.de/' + p.docHref.replace(/^\.\//, '');
    links.push({ label: 'Case Study (HTML)', url: docUrl });
    let mdDocUrl = docUrl.replace(/\.html$/, '.md');
    links.push({ label: 'Case Study (Markdown)', url: mdDocUrl });
  }

  if (p.github) {
    links.push({ label: 'GitHub Repository', url: p.github });
  }

  if (docFile && fs.existsSync(docFile)) {
    const html = fs.readFileSync(docFile, 'utf8');

    const headerMatch = html.match(/<header class=["']case-study-header["'][^>]*>([\s\S]*?)<\/header>/i);
    if (headerMatch) {
      const headerContent = headerMatch[1];
      const subMatch = headerContent.match(/<p>([\s\S]*?)<\/p>/i);
      if (subMatch) {
        subtitle = htmlToMarkdown(subMatch[1]);
      }
      const linksMatch = headerContent.match(/<div class=["']case-study-links["']>([\s\S]*?)<\/div>/i);
      if (linksMatch) {
        const linkMatches = [...linksMatch[1].matchAll(/<a\s+[^>]*href=["']([^"']*)["'][^>]*>([\s\S]*?)<\/a>/gi)];
        for (const m of linkMatches) {
          let url = m[1];
          if (url.startsWith('../')) url = 'https://ducklin.de/' + url.replace(/^\.\.\//, '');
          const label = m[2].replace(/<[^>]+>/g, '').trim();
          if (!links.some(l => l.url === url)) {
            links.push({ label, url });
          }
        }
      }
    }

    const overviewMatch = html.match(/<section>\s*<h2>Project Overview<\/h2>([\s\S]*?)<\/section>/i);
    if (overviewMatch) {
      overview = htmlToMarkdown(overviewMatch[1]);
    }

    const stackMatch = html.match(/<section>\s*<h2>Tech Stack<\/h2>[\s\S]*?<ul[^>]*>([\s\S]*?)<\/ul>/i);
    if (stackMatch && stack.length === 0) {
      const items = [...stackMatch[1].matchAll(/<li>([\s\S]*?)<\/li>/gi)].map(m => m[1].replace(/<[^>]+>/g, '').trim());
      stack = items;
    }

    const featMatch = html.match(/<section>\s*<h2>Key Features<\/h2>[\s\S]*?<ul[^>]*>([\s\S]*?)<\/ul>/i);
    if (featMatch) {
      features = [...featMatch[1].matchAll(/<li>([\s\S]*?)<\/li>/gi)].map(m => htmlToMarkdown(m[1]));
    }
  }

  if (!overview) overview = p.description || '';
  if (!subtitle) subtitle = p.description || '';

  return {
    ...p,
    title,
    subtitle,
    overview,
    techStack: stack,
    features,
    links,
    slug: p.docHref ? path.basename(p.docHref, '.html') : p.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')
  };
});

// 3. Write case-studies/*.md
for (const p of projectData) {
  if (!p.docHref) continue;
  const mdFileName = p.slug + '.md';
  const mdFilePath = path.join(repoRoot, 'case-studies', mdFileName);

  const lines = [];
  lines.push(`# ${p.name}`);
  lines.push('');
  if (p.subtitle) {
    lines.push(`> ${p.subtitle}`);
    lines.push('');
  }

  if (p.links.length > 0) {
    lines.push('## Links');
    lines.push('');
    for (const l of p.links) {
      lines.push(`- [${l.label}](${l.url})`);
    }
    lines.push('');
  }

  lines.push('## Project Overview');
  lines.push('');
  lines.push(p.overview);
  lines.push('');

  if (p.techStack && p.techStack.length > 0) {
    lines.push('## Tech Stack');
    lines.push('');
    for (const tech of p.techStack) {
      lines.push(`- ${tech}`);
    }
    lines.push('');
  }

  if (p.features && p.features.length > 0) {
    lines.push('## Key Features');
    lines.push('');
    for (const feat of p.features) {
      lines.push(`- ${feat}`);
    }
    lines.push('');
  }

  if (p.deviceSupport && p.deviceSupport.length > 0) {
    lines.push('## Platform & Device Support');
    lines.push('');
    lines.push(`Supported devices: ${p.deviceSupport.join(', ')}`);
    lines.push('');
  }

  fs.writeFileSync(mdFilePath, lines.join('\n'), 'utf8');
}

// 4. Write projects.json
const cleanProjectsJson = projectData.map(p => ({
  id: p.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
  name: p.name,
  description: p.description,
  featured: !!p.featured,
  relevance: p.relevance || 0,
  date: p.date,
  status: p.status,
  deviceSupport: p.deviceSupport || [],
  tags: p.tags || [],
  techStack: p.techStack || [],
  liveDemoUrl: p.href ? (p.href.startsWith('http') ? p.href : 'https://ducklin.de/' + p.href.replace(/^\.\//, '')) : null,
  caseStudyHtmlUrl: p.docHref ? 'https://ducklin.de/' + p.docHref.replace(/^\.\//, '') : null,
  caseStudyMarkdownUrl: p.docHref ? 'https://ducklin.de/case-studies/' + p.slug + '.md' : null,
  githubUrl: p.github || (p.links.find(l => l.url.includes('github.com')) ? p.links.find(l => l.url.includes('github.com')).url : null),
  overview: p.overview,
  features: p.features
}));

fs.writeFileSync(path.join(repoRoot, 'projects.json'), JSON.stringify(cleanProjectsJson, null, 2), 'utf8');

// 5. Write llms.txt
const llmsTxtLines = [];
llmsTxtLines.push('# Aaron Postels – Systems, Web & Graphics Engineer');
llmsTxtLines.push('');
llmsTxtLines.push('> Portfolio and engineering knowledge base of Aaron Postels (Ducklin). Specializes in Rust, WebAssembly, WebGPU, React Three Fiber, physics simulations, 6-DoF Stewart platform kinematics, game engines, and full-stack software development.');
llmsTxtLines.push('');
llmsTxtLines.push('This file serves as the canonical table of contents for AI agents and LLMs. Below are the primary projects, live demos, and case studies. Detailed markdown files are available for all case studies without HTML noise. For a single-file context dump of the entire portfolio, fetch [llms-full.txt](https://ducklin.de/llms-full.txt). For structured machine data, fetch [projects.json](https://ducklin.de/projects.json).');
llmsTxtLines.push('');

llmsTxtLines.push('## Featured Projects');
llmsTxtLines.push('');
const featuredProjects = projectData.filter(p => p.featured);
for (const p of featuredProjects) {
  const mdUrl = `https://ducklin.de/case-studies/${p.slug}.md`;
  llmsTxtLines.push(`- [${p.name}](${mdUrl}): ${p.description}`);
}
llmsTxtLines.push('');

llmsTxtLines.push('## Live Interactive Demos');
llmsTxtLines.push('');
const liveProjects = projectData.filter(p => p.href && !p.featured);
for (const p of liveProjects) {
  let demoUrl = p.href.startsWith('http') ? p.href : 'https://ducklin.de/' + p.href.replace(/^\.\//, '');
  let mdUrl = `https://ducklin.de/case-studies/${p.slug}.md`;
  llmsTxtLines.push(`- [${p.name}](${mdUrl}): ${p.description} (Demo: ${demoUrl})`);
}
llmsTxtLines.push('');

llmsTxtLines.push('## Project Archive');
llmsTxtLines.push('');
const archiveProjects = projectData.filter(p => !p.href);
for (const p of archiveProjects) {
  let mdUrl = `https://ducklin.de/case-studies/${p.slug}.md`;
  llmsTxtLines.push(`- [${p.name}](${mdUrl}): ${p.description}`);
}
llmsTxtLines.push('');

llmsTxtLines.push('## Case Studies (Markdown)');
llmsTxtLines.push('');
for (const p of projectData) {
  if (p.docHref) {
    let mdUrl = `https://ducklin.de/case-studies/${p.slug}.md`;
    let techStr = p.techStack.length > 0 ? ` [${p.techStack.slice(0, 4).join(', ')}]` : '';
    llmsTxtLines.push(`- [${p.name}](${mdUrl})${techStr}: ${p.description}`);
  }
}
llmsTxtLines.push('');

llmsTxtLines.push('## Optional');
llmsTxtLines.push('');
llmsTxtLines.push('- [Full Portfolio Context (llms-full.txt)](https://ducklin.de/llms-full.txt): Complete consolidated text export of all 34 project overviews, tech stacks, and features in a single prompt-ready file.');
llmsTxtLines.push('- [Structured Projects Dataset (projects.json)](https://ducklin.de/projects.json): Complete machine-readable JSON array of all projects with metadata, tags, stacks, and links.');
llmsTxtLines.push('- [Home Page Markdown (index.md)](https://ducklin.de/index.md): Markdown version of the ducklin.de homepage.');
llmsTxtLines.push('- [GitHub Profile](https://github.com/aaronpostels): Open-source repositories and contributions.');
llmsTxtLines.push('- [LinkedIn](https://www.linkedin.com/in/aaronpostels): Professional background and experience.');

fs.writeFileSync(path.join(repoRoot, 'llms.txt'), llmsTxtLines.join('\n'), 'utf8');

const wellKnownDir = path.join(repoRoot, '.well-known');
if (!fs.existsSync(wellKnownDir)) {
  fs.mkdirSync(wellKnownDir, { recursive: true });
}
fs.writeFileSync(path.join(wellKnownDir, 'llms.txt'), llmsTxtLines.join('\n'), 'utf8');

// 6. Write llms-full.txt
const fullLines = [];
fullLines.push('# Aaron Postels (Ducklin) — Complete Engineering Portfolio & Knowledge Base');
fullLines.push('');
fullLines.push('> Systems, Web & Graphics Engineer specializing in Rust, WebAssembly, WebGPU, React Three Fiber, physics simulations, 6-DoF Stewart platform kinematics, game engines, and full-stack software development.');
fullLines.push('');
fullLines.push('## Contact & Links');
fullLines.push('- Website: https://ducklin.de');
fullLines.push('- GitHub: https://github.com/aaronpostels');
fullLines.push('- LinkedIn: https://www.linkedin.com/in/aaronpostels');
fullLines.push('- Instagram: https://www.instagram.com/apos.tels/');
fullLines.push('- Location: Germany');
fullLines.push('');
fullLines.push('## Core Competencies & Technologies');
fullLines.push('- **Languages**: Rust, TypeScript, JavaScript, Python, C++, C#, Java, WGSL, GLSL, HTML5/CSS3');
fullLines.push('- **Graphics & Web 3D**: WebGPU, WebAssembly (SIMD), Three.js, React Three Fiber (R3F), Drei, Shaders, Instanced Rendering');
fullLines.push('- **Simulation & Mechanics**: 6-axis Stewart motion platform inverse kinematics, classical washout filter algorithms, physics-based simulations, archetype Entity Component Systems (ECS)');
fullLines.push('- **Web & Frameworks**: React, Vite, Node.js, GSAP, Tailwind CSS, REST APIs');
fullLines.push('- **Game Dev & AI**: Unity, Godot, Reinforcement Learning (ML-Agents, PPO, Ray casting), Minecraft Java modding, Hytale modding');
fullLines.push('');
fullLines.push('---');
fullLines.push('');
fullLines.push('## Detailed Project Catalog (34 Projects)');
fullLines.push('');

for (let i = 0; i < projectData.length; i++) {
  const p = projectData[i];
  fullLines.push(`### ${i + 1}. ${p.name}`);
  fullLines.push('');
  if (p.subtitle) {
    fullLines.push(`*${p.subtitle}*`);
    fullLines.push('');
  }
  fullLines.push(`- **Status**: ${p.status || 'Completed'}`);
  fullLines.push(`- **Date**: ${p.date || 'N/A'}`);
  if (p.featured) fullLines.push('- **Featured**: Yes');
  if (p.tags && p.tags.length > 0) fullLines.push(`- **Categories**: ${p.tags.join(', ')}`);
  if (p.techStack && p.techStack.length > 0) fullLines.push(`- **Tech Stack**: ${p.techStack.join(', ')}`);
  if (p.deviceSupport && p.deviceSupport.length > 0) fullLines.push(`- **Device Support**: ${p.deviceSupport.join(', ')}`);
  
  if (p.links && p.links.length > 0) {
    fullLines.push('- **Links**:');
    for (const l of p.links) {
      fullLines.push(`  - [${l.label}](${l.url})`);
    }
  }
  fullLines.push('');
  fullLines.push('#### Overview');
  fullLines.push(p.overview);
  fullLines.push('');

  if (p.features && p.features.length > 0) {
    fullLines.push('#### Key Features & Architecture');
    for (const feat of p.features) {
      fullLines.push(`- ${feat}`);
    }
    fullLines.push('');
  }
  fullLines.push('---');
  fullLines.push('');
}

fs.writeFileSync(path.join(repoRoot, 'llms-full.txt'), fullLines.join('\n'), 'utf8');

// 7. Write index.md
const indexMdLines = [];
indexMdLines.push('# Aaron Postels');
indexMdLines.push('## Full-Stack, Systems & Game Developer');
indexMdLines.push('');
indexMdLines.push('> Hi, I\'m Aaron. I build unique digital and physical experiences, from complex web applications and 3D simulations to custom game engines and interactive installations.');
indexMdLines.push('');
indexMdLines.push('### Contact & Socials');
indexMdLines.push('- Website: [ducklin.de](https://ducklin.de)');
indexMdLines.push('- GitHub: [github.com/aaronpostels](https://github.com/aaronpostels)');
indexMdLines.push('- LinkedIn: [linkedin.com/in/aaronpostels](https://www.linkedin.com/in/aaronpostels)');
indexMdLines.push('- Instagram: [@apos.tels](https://www.instagram.com/apos.tels/)');
indexMdLines.push('');
indexMdLines.push('### Featured Projects');
for (const p of featuredProjects) {
  let doc = `https://ducklin.de/case-studies/${p.slug}.md`;
  let live = p.href ? ` [Live Demo](https://ducklin.de/${p.href.replace(/^\.\//, '')})` : '';
  indexMdLines.push(`- **[${p.name}](${doc})**${live}: ${p.description}`);
}
indexMdLines.push('');
indexMdLines.push('### Live Interactive Demos');
for (const p of liveProjects) {
  let doc = `https://ducklin.de/case-studies/${p.slug}.md`;
  let demo = `https://ducklin.de/${p.href.replace(/^\.\//, '')}`;
  indexMdLines.push(`- **[${p.name}](${demo})** ([Case Study](${doc})): ${p.description}`);
}
indexMdLines.push('');
indexMdLines.push('### Project Archive');
for (const p of archiveProjects) {
  let doc = `https://ducklin.de/case-studies/${p.slug}.md`;
  indexMdLines.push(`- **[${p.name}](${doc})**: ${p.description}`);
}
indexMdLines.push('');
indexMdLines.push('### Machine-Readable & Agent Endpoints');
indexMdLines.push('- [llms.txt](https://ducklin.de/llms.txt) — LLM table of contents');
indexMdLines.push('- [llms-full.txt](https://ducklin.de/llms-full.txt) — Consolidated single-file prompt context');
indexMdLines.push('- [projects.json](https://ducklin.de/projects.json) — Full structured JSON dataset');

fs.writeFileSync(path.join(repoRoot, 'index.md'), indexMdLines.join('\n'), 'utf8');

console.log('Successfully generated all agentic files:');
console.log('  - /llms.txt & /.well-known/llms.txt');
console.log('  - /llms-full.txt');
console.log('  - /projects.json');
console.log('  - /index.md');
console.log(`  - ${projectData.filter(p => p.docHref).length} Markdown case studies in /case-studies/*.md`);
