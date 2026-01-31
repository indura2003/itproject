const { chromium } = require('playwright');
const fs = require('fs');

async function runTests() {
  
  const resultsFile = 'tstcase.csv';
  fs.writeFileSync(resultsFile, 'TC ID,Test case name,Input length type,Input,Expected output,Actual output,Status,What is covered by the test\n', 'utf8');
  
  const testCases = [
    {
      tcId: 'Pos_Fun_001',
      name: 'Simple present tense statement',
      input: 'mama iskoolee inna',
      expected: 'මම ඉස්කෝලේ ඉන්න',
      type: 'S',
      what: 'Simple present tense; Declarative statement; S (≤30 characters); Accuracy validation'
    },
    {
      tcId: 'Pos_Fun_002',
      name: 'Simple food request',
      input: 'mata kiri oonee',
      expected: 'මට කිරි ඕනෑ',
      type: 'S',
      what: 'Simple request; Declarative statement; S (≤30 characters); Accuracy validation'
    },
    {
      tcId: 'Pos_Fun_003',
      name: 'Going home statement',
      input: 'api gedhara yanavaa',
      expected: 'අපි ගෙදර යනවා',
      type: 'S',
      what: 'Present continuous; Declarative statement; S (≤30 characters); Accuracy validation'
    },
    {
      tcId: 'Pos_Fun_004',
      name: 'Two activities connected',
      input: 'mama kaeema kannam saha passe naaginnam',
      expected: 'මම කෑම කන්නම් සහ පස්සේ නාගින්නම්',
      type: 'S',
      what: 'Compound sentence with conjunction; Future intent; S (≤30 characters); Accuracy validation'
    },
    {
      tcId: 'Pos_Fun_005',
      name: 'Weather condition compound',
      input: 'vaessa yanavanam api yannee naee',
      expected: 'වැස්ස යනවනම් අපි යන්නේ නෑ',
      type: 'S',
      what: 'Conditional statement; Compound sentence; S (≤30 characters); Accuracy validation'
    },
    {
      tcId: 'Pos_Fun_006',
      name: 'Conditional complex sentence',
      input: 'oyaa enavaanam mama innaanam kaeema laeesthi karannam',
      expected: 'ඔයා එනවානම් මම ඉන්නානම් කෑම ලෑස්ති කරන්නම්',
      type: 'M',
      what: 'Complex conditional; Multiple clauses; M (31-100 characters); Accuracy validation'
    },
    {
      tcId: 'Pos_Fun_007',
      name: 'Simple question about state',
      input: 'oyaa kohedha innee',
      expected: 'ඔයා කොහෙද ඉන්නේ',
      type: 'S',
      what: 'Interrogative (question); Location query; S (≤30 characters); Accuracy validation'
    },
    {
      tcId: 'Pos_Fun_008',
      name: 'Question about time',
      input: 'kavaddha enna yanne',
      expected: 'කවද්ද එන්න යන්නේ',
      type: 'S',
      what: 'Interrogative (question); Time query; S (≤30 characters); Accuracy validation'
    },
    {
      tcId: 'Pos_Fun_009',
      name: 'Polite question request',
      input: 'oyaata mata eeka kiyanna puluvandha',
      expected: 'ඔයාට මට ඒක කියන්න පුලුවන්ද',
      type: 'S',
      what: 'Polite request; Interrogative (question); S (≤30 characters); Accuracy validation'
    },
    {
      tcId: 'Pos_Fun_010',
      name: 'Direct command',
      input: 'laBa enna',
      expected: 'ලඟ එන්න',
      type: 'S',
      what: 'Imperative (command); Direct instruction; S (≤30 characters); Accuracy validation'
    },
    {
      tcId: 'Pos_Fun_011',
      name: 'Polite command',
      input: 'karuNaakaralaa poddak thissee balanna',
      expected: 'කරුණාකරලා පොඩ්ඩක් තිස්සේ බලන්න',
      type: 'S',
      what: 'Polite imperative; Request with courtesy marker; S (≤30 characters); Accuracy validation'
    },
    {
      tcId: 'Pos_Fun_012',
      name: 'Morning greeting',
      input: 'suba udhaeesanak',
      expected: 'සුබ උදෑසනක්',
      type: 'S',
      what: 'Greeting; Fixed expression; S (≤30 characters); Accuracy validation'
    },
    {
      tcId: 'Pos_Fun_013',
      name: 'Affirmative response',
      input: 'ov hari',
      expected: 'ඔව් hari',
      type: 'S',
      what: 'Affirmative response; Code-mixing; S (≤30 characters); Accuracy validation'
    },
    {
      tcId: 'Pos_Fun_014',
      name: 'Past tense action',
      input: 'mama iiyee gedhara giyaa',
      expected: 'මම ඊයේ ගෙදර ගියා',
      type: 'S',
      what: 'Past tense; Declarative statement; S (≤30 characters); Accuracy validation'
    },
    {
      tcId: 'Pos_Fun_015',
      name: 'Future tense plan',
      input: 'api heta kolambata yamu',
      expected: 'අපි හෙට කොලඹට යමු',
      type: 'S',
      what: 'Future tense; Collective action; S (≤30 characters); Accuracy validation'
    },
    {
      tcId: 'Pos_Fun_016',
      name: 'Simple negation',
      input: 'mata epaa eeka',
      expected: 'මට එපා ඒක',
      type: 'S',
      what: 'Negation; Declarative statement; S (≤30 characters); Accuracy validation'
    },
    {
      tcId: 'Pos_Fun_017',
      name: 'Cannot statement',
      input: 'mata eeka karanna baee',
      expected: 'මට ඒක කරන්න බෑ',
      type: 'S',
      what: 'Inability expression; Negation; S (≤30 characters); Accuracy validation'
    },
    {
      tcId: 'Pos_Fun_018',
      name: 'Plural pronoun usage',
      input: 'eyaalaa heta enavaa',
      expected: 'එයාලා හෙට එනවා',
      type: 'S',
      what: 'Plural pronoun; Future continuous; S (≤30 characters); Accuracy validation'
    },
    {
      tcId: 'Pos_Fun_019',
      name: 'Common phrase pattern',
      input: 'poddak innako mama ennam',
      expected: 'පොඩ්ඩක් ඉන්නකො මම එන්නම්',
      type: 'S',
      what: 'Request with future intent; Common colloquial pattern; S (≤30 characters); Accuracy validation'
    },
    {
      tcId: 'Pos_Fun_020',
      name: 'English brand term embedded',
      input: 'mata Facebook account eka login karanna baee',
      expected: 'මට Facebook account එක login කරන්න බෑ',
      type: 'S',
      what: 'Code-mixing; English terms preserved; Inability statement; S (≤30 characters); Accuracy validation'
    },
    {
      tcId: 'Pos_Fun_021',
      name: 'Place name preservation',
      input: 'nimeelaa Kandy giyaa',
      expected: 'නිමේලා Kandy ගියා',
      type: 'S',
      what: 'Proper noun preservation; Past tense; S (≤30 characters); Accuracy validation'
    },
    {
      tcId: 'Pos_Fun_022',
      name: 'Exclamation mark handling',
      input: 'supiri!',
      expected: 'සුපිරි!',
      type: 'S',
      what: 'Exclamation; Punctuation handling; S (≤30 characters); Accuracy validation'
    },
    {
      tcId: 'Pos_Fun_023',
      name: 'Currency amount',
      input: 'mata Rs. 500k oonee',
      expected: 'මට Rs. 500ක් ඕනෑ',
      type: 'S',
      what: 'Currency preservation; Number handling; Request; S (≤30 characters); Accuracy validation'
    },
    {
      tcId: 'Pos_Fun_024',
      name: 'Medium length conversation',
      input: 'mama heta office yanavaa eehindha mata adha raee kanna baee. oyaa mata raee eka savanna puluvandha',
      expected: 'මම හෙට office යනවා ඒහින්ද මට අද රෑ කන්න බෑ. ඔයා මට රෑ එක සවන්න පුලුවන්ද',
      type: 'M',
      what: 'Multi-sentence; Causal relationship; Question; M (31-100 characters); Accuracy validation'
    },
    {
      tcId: 'Neg_Fun_001',
      name: 'Missing space between words',
      input: 'mamagedharainnee',
      expected: 'මම ගෙදර ඉන්නේ',
      type: 'S',
      what: 'Spacing error handling; Word boundary detection; S (≤30 characters); Robustness validation'
    },
    {
      tcId: 'Neg_Fun_002',
      name: 'Joined compound words',
      input: 'apipassekathakaramu',
      expected: 'අපි පස්සේ කතා කරමු',
      type: 'S',
      what: 'Compound word segmentation; Missing spaces; S (≤30 characters); Robustness validation'
    },
    {
      tcId: 'Neg_Fun_003',
      name: 'Mixed spacing issues',
      input: 'mata  oonee  eeka',
      expected: 'මට ඕනෑ ඒක',
      type: 'S',
      what: 'Multiple space handling; Whitespace normalization; S (≤30 characters); Robustness validation'
    },
    {
      tcId: 'Neg_Fun_004',
      name: 'Line break in sentence',
      input: 'mama yanavam\ngedhara',
      expected: 'මම යනවම් ගෙදර',
      type: 'S',
      what: 'Line break handling; Whitespace normalization; S (≤30 characters); Robustness validation'
    },
    {
      tcId: 'Neg_Fun_005',
      name: 'Informal slang phrase',
      input: 'machaang supiriyaane',
      expected: 'මචාන්ග් සුපිරියානෙ',
      type: 'S',
      what: 'Colloquial/slang handling; Informal speech; S (≤30 characters); Robustness validation'
    },
    {
      tcId: 'Neg_Fun_006',
      name: 'Colloquial expression',
      input: 'adooo mokakkdha mee',
      expected: 'අඩෝඕ මොකක්ක්ද මේ',
      type: 'S',
      what: 'Exclamation handling; Colloquial expression; S (≤30 characters); Robustness validation'
    },
    {
      tcId: 'Neg_Fun_007',
      name: 'Mixed English with errors',
      input: 'mamaWhatsAppekagiyaa',
      expected: 'මම WhatsApp එක ගියා',
      type: 'S',
      what: 'Code-mixing with spacing errors; English term preservation; S (≤30 characters); Robustness validation'
    },
    {
      tcId: 'Neg_Fun_008',
      name: 'Abbreviation in sentence',
      input: 'mata ASAP eeka oonee',
      expected: 'මට ASAP ඒක ඕනෑ',
      type: 'S',
      what: 'Abbreviation handling; English term preservation; S (≤30 characters); Robustness validation'
    },
    {
      tcId: 'Neg_Fun_009',
      name: 'Question with spacing error',
      input: 'oyaakohedhainnee',
      expected: 'ඔයා කොහෙද ඉන්නේ',
      type: 'S',
      what: 'Interrogative with spacing error; Word segmentation; S (≤30 characters); Robustness validation'
    },
    {
      tcId: 'Neg_Fun_010',
      name: 'Complex slang statement',
      input: 'eyi bro eeka set karala denna',
      expected: 'එයි bro ඒක set කරල දෙන්න',
      type: 'S',
      what: 'Multiple English terms; Colloquial/slang; Code-mixing; S (≤30 characters); Robustness validation'
    }
  ];
  
  const browser = await chromium.launch({ 
    headless: false,
    slowMo: 100
  });
  
  try {
    for (const tc of testCases) {
      console.log(`\n=== ${tc.tcId}: ${tc.name} ===`);
      console.log(`Input: "${tc.input}"`);
      console.log(`Expected: "${tc.expected}"`);
      
      const page = await browser.newPage();
      
      try {
        await page.goto('https://www.swifttranslator.com/', { waitUntil: 'networkidle' });
        await page.waitForTimeout(3000);

        // Find input field
        const inputElement = page.locator('textarea, input[type="text"]').first();
        await inputElement.isVisible();

        // Type text
        await inputElement.click();
        await inputElement.fill('');
        await page.keyboard.type(tc.input, { delay: 100 });

        // Wait for transliteration
        await page.waitForTimeout(1500);

        // Look for output
        let actual = 'OUTPUT_NOT_FOUND';
        const methods = [
          () => page.locator('textarea').nth(1).inputValue(),
          () => page.locator('textarea').last().inputValue(),
          () => page.locator('div').filter({ hasText: tc.expected[0] }).first().innerText(),
          () => page.locator('*').filter({ hasText: tc.expected[0] }).first().innerText()
        ];

        for (const method of methods) {
          try {
            const result = await method();
            if (result && result !== tc.input && result.includes(tc.expected[0])) {
              actual = result;
              break;
            }
          } catch (e) {
            // Try next method
          }
        }

        console.log(`Actual: "${actual}"`);

        // Compare and determine status
        let status = 'Fail';
        if (actual.includes(tc.expected.replace(/[?.]/g, ''))) {
          status = 'Pass';
        }

        console.log(`Status: ${status}`);

        // Save to CSV
        fs.appendFileSync(resultsFile, `"${tc.tcId}","${tc.name}","${tc.type}","${tc.input}","${tc.expected}","${actual}","${status}","${tc.what}"\n`, 'utf8');

      } catch (error) {
        console.error(`Error in test ${tc.tcId}:`, error.message);
        const actual = `ERROR: ${error.message}`;
        const status = 'Fail';
        fs.appendFileSync(resultsFile, `"${tc.tcId}","${tc.name}","${tc.type}","${tc.input}","${tc.expected}","${actual}","${status}","${tc.what}"\n`, 'utf8');
      } finally {
        await page.close();
      }
    }
  } finally {
    await browser.close();
  }
  
  console.log('\n=== Test Summary ===');
  console.log(`Results saved to: ${resultsFile}`);
  console.log(`Total test cases: ${testCases.length}`);
}

runTests().catch(console.error);