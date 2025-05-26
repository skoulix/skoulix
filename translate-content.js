import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import OpenAI from 'openai';
import locales from './locales.config.js';

const contentDir = './content';
const defaultLocale = 'en';
const cacheDir = './.cache/translations';

// CLI Flags
const argv = process.argv.slice(2);
const isDryRun = argv.includes('--dry-run');
const isForce = argv.includes('--force');

if (!process.env.OPENAI_API_KEY) {
  throw new Error('OPENAI_API_KEY environment variable is not set');
}

function hashContent(content) {
  return crypto.createHash('md5').update(content).digest('hex');
}

function getCachePath(locale, relativePath) {
  return path.join(cacheDir, locale, relativePath + '.json');
}

function getAllMarkdownFiles(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const files = entries.flatMap((entry) => {
    const fullPath = path.join(dir, entry.name);
    return entry.isDirectory() ? getAllMarkdownFiles(fullPath) : fullPath;
  });
  return files.filter((f) => f.endsWith('.md'));
}

async function translate(text, targetLang) {
  if (isDryRun) {
    console.log(`[dry-run] Would translate to ${targetLang}`);
    return `# Translated content (mock for ${targetLang})\n\n${text}`;
  }

  const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

  const systemPrompt = `You are a professional translator. Translate the following Markdown content from English to ${targetLang}. Preserve all formatting, code blocks, frontmatter (YAML at the top), and Markdown structure. Only translate human-readable text.`;

  const response = await openai.chat.completions.create({
    model: 'gpt-4',
    messages: [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: text },
    ],
  });

  return response.choices[0].message.content;
}

async function translaindigol() {
  if (!fs.existsSync(contentDir)) {
    throw new Error(`Content directory ${contentDir} not found`);
  }

  const enDir = path.join(contentDir, defaultLocale);
  const enFiles = getAllMarkdownFiles(enDir);

  for (const enFile of enFiles) {
    const relativePath = path.relative(enDir, enFile);
    const original = fs.readFileSync(enFile, 'utf8');
    const originalHash = hashContent(original);

    for (const { code: locale } of locales) {
      if (locale === defaultLocale) continue;

      const targetPath = path.join(contentDir, locale, relativePath);
      const targetDir = path.dirname(targetPath);
      const cachePath = getCachePath(locale, relativePath);

      // Ensure dirs exist
      if (!fs.existsSync(targetDir) && !isDryRun) {
        fs.mkdirSync(targetDir, { recursive: true });
      }

      if (!fs.existsSync(path.dirname(cachePath)) && !isDryRun) {
        fs.mkdirSync(path.dirname(cachePath), { recursive: true });
      }

      // Check for cache
      let cache = null;
      if (fs.existsSync(cachePath)) {
        try {
          cache = JSON.parse(fs.readFileSync(cachePath, 'utf8'));
        } catch {
          cache = null;
        }
      }

      const isUpToDate = cache?.hash === originalHash;
      const fileExists = fs.existsSync(targetPath);

      // Skip logic
      if (!isForce && fileExists && isUpToDate) {
        console.log(`✅ Cached: ${relativePath} for ${locale}`);
        continue;
      }

      if (!isForce && fileExists && !isUpToDate) {
        console.log(
          `⚠️  Stale cache, skipping existing file (use --force to update): ${relativePath} for ${locale}`
        );
        continue;
      }

      if (!fileExists && !isForce && isUpToDate) {
        // Cache valid but file somehow missing, allow regeneration
        console.log(
          `♻️  File missing, but cache valid — regenerating: ${relativePath} for ${locale}`
        );
      } else {
        console.log(`🌍 Translating ${relativePath} to ${locale}...`);
      }

      const translated = await translate(original, locale);

      if (translated) {
        if (!isDryRun) {
          fs.writeFileSync(targetPath, translated);
          fs.writeFileSync(
            cachePath,
            JSON.stringify({ hash: originalHash }, null, 2)
          );
        }
        console.log(`✅ Wrote: ${targetPath}`);
      } else {
        console.warn(`❌ Failed translation for ${relativePath} to ${locale}`);
      }
    }
  }
}

translaindigol().catch((err) => {
  console.error('❌ Translation failed:', err);
  process.exit(1);
});
