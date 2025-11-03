import { readFileSync, writeFileSync, existsSync, readdirSync, statSync } from 'fs';
import { join } from 'path';

interface PokemonEntry {
  dexId: number[];
  japanese?: string;
  english?: string;
  files: string[]; // Track which files this Pokémon appears in
}

interface ExtractedData {
  [dexId: string]: PokemonEntry;
}

function extractPokemonFromFile(filePath: string): { dexId: number[], names: { ja?: string, en?: string } } | null {
  try {
    const content = readFileSync(filePath, 'utf-8');
    
    // Extract dexId
    const dexIdMatch = content.match(/dexId:\s*\[([^\]]+)\]/);
    if (!dexIdMatch) return null;
    
    const dexIds = dexIdMatch[1].split(',').map((id: string) => parseInt(id.trim()));
    
    // Extract Japanese name
    const jaNameMatch = content.match(/name:\s*{\s*ja:\s*["']([^"']+)["']/);
    const jaName = jaNameMatch ? jaNameMatch[1] : undefined;
    
    // Extract English name (if exists)
    const enNameMatch = content.match(/name:\s*{[^}]*en:\s*["']([^"']+)["']/);
    const enName = enNameMatch ? enNameMatch[1] : undefined;
    
    return {
      dexId: dexIds,
      names: { ja: jaName, en: enName }
    };
  } catch (error) {
    console.warn(`Error reading file ${filePath}:`, error);
    return null;
  }
}

function scanDirectory(dirPath: string, results: ExtractedData) {
  if (!existsSync(dirPath)) return;
  
  const items = readdirSync(dirPath);
  
  for (const item of items) {
    const fullPath = join(dirPath, item);
    const stat = statSync(fullPath);
    
    if (stat.isDirectory()) {
      scanDirectory(fullPath, results);
    } else if (item.endsWith('.ts') && !item.includes('index') && item !== 'Set.ts') {
      const pokemonData = extractPokemonFromFile(fullPath);
      
      if (pokemonData && pokemonData.dexId.length > 0) {
        for (const dexId of pokemonData.dexId) {
          const key = dexId.toString();
          
          if (!results[key]) {
            results[key] = {
              dexId: [dexId],
              files: []
            };
          }
          
          // Update names if we have them
          if (pokemonData.names.ja) {
            results[key].japanese = pokemonData.names.ja;
          }
          if (pokemonData.names.en) {
            results[key].english = pokemonData.names.en;
          }
          
          // Track the file
          results[key].files.push(fullPath);
        }
      }
    }
  }
}

function main() {
  const results: ExtractedData = {};
  
  console.log('Scanning data/ directory...');
  scanDirectory('/Users/littlejedi/dev/cards-database/data', results);
  
  console.log('Scanning data-asia/ directory...');
  scanDirectory('/Users/littlejedi/dev/cards-database/data-asia', results);
  
  // Sort by dexId
  const sortedEntries = Object.entries(results)
    .sort(([a], [b]) => parseInt(a) - parseInt(b));
  
  console.log(`Found ${sortedEntries.length} unique Pokémon`);
  
  // Display sample results
  console.log('\nSample entries:');
  sortedEntries.slice(0, 10).forEach(([dexId, data]) => {
    console.log(`Dex #${dexId}: ${data.japanese || 'N/A'} | ${data.english || 'N/A'} (${data.files.length} files)`);
  });
  
  // Write to temporary file
  const outputPath = '/Users/littlejedi/dev/cards-database/extracted-pokemon.json';
  writeFileSync(outputPath, JSON.stringify(sortedEntries, null, 2));
  console.log(`\nFull results saved to: ${outputPath}`);
  
  // Show statistics
  const withJapanese = sortedEntries.filter(([_, data]) => data.japanese).length;
  const withEnglish = sortedEntries.filter(([_, data]) => data.english).length;
  
  console.log(`\nStatistics:`);
  console.log(`- Total unique Pokémon: ${sortedEntries.length}`);
  console.log(`- With Japanese names: ${withJapanese}`);
  console.log(`- With English names: ${withEnglish}`);
}

main();