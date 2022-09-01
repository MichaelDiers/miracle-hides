const fs = require('fs');
const { connect } = require('http2');
const { join } = require('path');

let content = [
  'import { Type } from \'@nestjs/common\';',
  'import { IntersectionType } from \'@nestjs/swagger\';',
  '',
];

for (let i=2; i < 26; i++) {
  const typeList = [...Array(i)].map((value, index) => String.fromCharCode(65 + index)); 
  content.push(`export function intersectionHelper${i}<${typeList.join(', ')}>(`);
  content = [...content, ...typeList.map((x) => `\tclass${x}Ref: Type<${x}>,`)]
  content.push(`) : Type<${typeList.join(' & ')}> {`);
  if (i === 2) {
    content.push(`\treturn IntersectionType(${typeList.map((x) => `class${x}Ref`).join(', ')});`);
  } else {
    content.push(`\treturn intersectionHelper2(`);
    content.push(`\t\tclass${typeList[0]}Ref,`);
    content.push(`\t\tintersectionHelper${i - 1}(`);
    content = [...content, ...typeList.slice(1).map((x) => `\t\t\tclass${x}Ref,`)];
    content.push('\t\t),');
    content.push('\t);');
  }

  content.push('}');
  content.push('');
}

const text = content.join('\n');
fs.writeFileSync(join(__dirname, 'intersection-helper.gen.ts'), text);
fs.writeFileSync(join(__dirname, '../miracle-hides-tabletop-server/src/base-types/intersection-helper.gen.ts'), text);
