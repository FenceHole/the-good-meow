import { getUncachableGitHubClient } from './github';
import * as fs from 'fs';
import * as path from 'path';

const OWNER = 'FenceHole';
const REPO = 'the-good-meow';

const IGNORE_PATTERNS = [
  'node_modules', 'dist', '.git', 'server/public', '.DS_Store',
  '.cache', '.local', '.config', 'generated', '.upm',
  'attached_assets', 'package-lock.json', '.replit'
];

function shouldIgnore(filePath: string): boolean {
  return IGNORE_PATTERNS.some(pattern => filePath.includes(pattern));
}

function getAllFiles(dir: string, baseDir: string): string[] {
  const files: string[] = [];
  const entries = fs.readdirSync(dir);
  for (const entry of entries) {
    const fullPath = path.join(dir, entry);
    const relativePath = path.relative(baseDir, fullPath);
    if (shouldIgnore(relativePath)) continue;
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      files.push(...getAllFiles(fullPath, baseDir));
    } else {
      files.push(relativePath);
    }
  }
  return files;
}

function isBinaryFile(filePath: string): boolean {
  const ext = path.extname(filePath).toLowerCase();
  return ['.png', '.jpg', '.jpeg', '.gif', '.ico', '.woff', '.woff2', '.ttf', '.eot', '.svg'].includes(ext);
}

async function main() {
  const octokit = await getUncachableGitHubClient();
  const baseDir = process.cwd();
  const files = getAllFiles(baseDir, baseDir);
  
  console.log(`Found ${files.length} files to push`);

  const treeItems: any[] = [];

  for (const file of files) {
    const fullPath = path.join(baseDir, file);
    const binary = isBinaryFile(file);
    
    let content: string;
    let encoding: string;
    
    if (binary) {
      content = fs.readFileSync(fullPath).toString('base64');
      encoding = 'base64';
    } else {
      content = fs.readFileSync(fullPath, 'utf8');
      encoding = 'utf-8';
    }

    const { data: blob } = await octokit.git.createBlob({
      owner: OWNER,
      repo: REPO,
      content,
      encoding,
    });

    treeItems.push({
      path: file,
      mode: '100644' as const,
      type: 'blob' as const,
      sha: blob.sha,
    });

    process.stdout.write('.');
  }

  console.log('\nCreating tree...');
  const { data: tree } = await octokit.git.createTree({
    owner: OWNER,
    repo: REPO,
    tree: treeItems,
  });

  console.log('Creating commit...');
  const { data: commit } = await octokit.git.createCommit({
    owner: OWNER,
    repo: REPO,
    message: 'Initial commit - The GOOD Meow satirical news site',
    tree: tree.sha,
    parents: [],
  });

  console.log('Updating main branch...');
  try {
    await octokit.git.createRef({
      owner: OWNER,
      repo: REPO,
      ref: 'refs/heads/main',
      sha: commit.sha,
    });
  } catch (e: any) {
    await octokit.git.updateRef({
      owner: OWNER,
      repo: REPO,
      ref: 'heads/main',
      sha: commit.sha,
      force: true,
    });
  }

  console.log(`\nDone! Code pushed to https://github.com/${OWNER}/${REPO}`);
}

main().catch(e => {
  console.error('Push failed:', e.message);
  process.exit(1);
});
