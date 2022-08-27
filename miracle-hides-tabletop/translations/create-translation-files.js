const de = require('./de.json');
const en = require('./en.json');

const checkTranslations = (path, ...translations) => {
  if (translations.length < 2) {
    return;
  }

  const source = translations[0];
  translations.slice(1).forEach((translation) => {
    Object.keys(source).forEach((key) => {
      if (!source[key] || !translation[key]) {
        throw new Error(`Missing key ${path}/${key}`);
      }

      if (typeof source[key] !== 'string') {
        checkTranslations(`${path}/${key}`, source[key], translation[key]);
      }
    });
  });
}

const generateDatabase = (source=de) => {
  const lines  = [];
  lines.push('/**');
  lines.push(' * Do not edit generated files!');
  lines.push('**/');
  lines.push('import { Injectable } from \'@nestjs/common\';');
  lines.push('import { InjectModel } from \'@nestjs/mongoose\';');
  lines.push('import { Model } from \'mongoose\';');
  lines.push('import { ITranslation, ITranslationDatabaseService } from \'../../types/translation.types.gen\';');
  lines.push('import { Translation, TranslationDocument } from \'./translation.schema.gen\';');
  lines.push('');
  lines.push('@Injectable()');
  lines.push('export class TranslationDatabaseService');
  lines.push('\timplements ITranslationDatabaseService');
  lines.push('{');
  lines.push('\tconstructor(');
  lines.push('\t\t@InjectModel(Translation.name)');
  lines.push('\t\tprivate translationModel: Model<TranslationDocument>,');
  lines.push('\t) {}');
  lines.push('');
  lines.push('\tasync readAsync(language: string): Promise<ITranslation> {');
  lines.push('\t\tconst result = await this.translationModel.findOne({ language }).exec();');
  lines.push('\t\tif (!result) {');
  lines.push('\t\t\treturn;');
  lines.push('\t\t}');
  lines.push('');
  lines.push('\t\treturn {');
  const keys = Object.keys(source);
  keys.sort();
  keys.forEach((key) => lines.push(`\t\t\t${key}: result.${key},`));
  lines.push('\t\t};');
  lines.push('\t}');
  lines.push('}');
  lines.push('');
 
  return lines.join('\n');
}

const generateInterface = (source=de, name='ITranslation') => {
  const pre = [];
  if (name === 'ITranslation') {
    pre.push('/**');
    pre.push(' * Do not edit generated files!');
    pre.push('**/');
    pre.push('');
  }

  const lines = [];
  lines.push(`export interface ${name} {`);
  const subs = [];
  const keys = Object.keys(source);
  keys.sort();
  keys.forEach((key) => {
    if (typeof source[key] === 'string') {
      lines.push(`\t${key}: string;`);
    } else {
      const subName = `${name}${key[0].toUpperCase()}${key.slice(1)}`;
      subs.push(generateInterface(source[key], subName));
      lines.push(`\t${key}: ${subName};`);
    }
  });

  lines.push('}')
  lines.push('');
  if (name !== 'ITranslation') {
    lines.push('');
  }
  
  return [pre.join('\n'), ...subs, lines.join('\n')].join('');
}

const generateServiceInterfaces = (content) => {
  const lines = [];
  lines.push('');
  lines.push('export interface ITranslationDatabaseService {');
  lines.push('\treadAsync(languageInternalName: string): Promise<ITranslation>;');
  lines.push('}');
  lines.push('');
  lines.push('export const TRANSLATION_DATABASE_SERVICE = \'TRANSLATION_DATABASE_SERVICE\';');
  lines.push('');
  lines.push('export interface ITranslationService {');
  lines.push('\treadAsync(languageInternalName: string): Promise<ITranslation>;');
  lines.push('}');
  lines.push('');
  lines.push('export const TRANSLATION_SERVICE = \'TRANSLATION_SERVICE\';');
  lines.push('');
  return `${content}${lines.join('\n')}`;
}

const generateSchema = (source=de, name='Translation') => {
  const pre = [];
  const post = [];
  if (name === 'Translation') {
    pre.push('/**');
    pre.push(' * Do not edit generated files!');
    pre.push('**/');
    pre.push('import { Prop, Schema, SchemaFactory } from \'@nestjs/mongoose\';');
    pre.push('import { Document } from \'mongoose\';');
    pre.push('import * as translation from \'../../types/translation.types.gen\';');
    pre.push('');
    pre.push(''); 
  }
  
  const lines = [];
  lines.push(`export type ${name}Document = ${name} & Document;`);
  lines.push('');
  lines.push('@Schema()');
  lines.push([`export class ${name} implements translation.I${name} {`]);

  const subs = [];
  const keys = Object.keys(source);
  keys.sort();
  keys.forEach((key) => {
    if (typeof source[key] === 'string') {
      lines.push('\t@Prop({ required: true })');
      lines.push(`\t${key}: string;`);
      lines.push('');
    } else {
      const subName = `${name}${key[0].toUpperCase()}${key.slice(1)}`;
      subs.push(generateSchema(source[key], subName));
      lines.push(`\t@Prop({ required: true, type: ${subName}, _id: false })`);
      lines.push(`\t${key}: ${subName};`);
      lines.push('');
    }
  });
  
  lines.pop();
  lines.push('}')
  lines.push('');
  lines.push(`export const ${name}Schema = SchemaFactory.createForClass(${name});`);
  lines.push('');
  if (name !== 'Translation') {
    lines.push('');
  }

  return [pre.join('\n'), ...subs, lines.join('\n'), post.join('\n')].join('');
}

checkTranslations('', de, en);

const fs = require('fs');
const { join } = require('path');

let interfacesContent = generateInterface();
interfacesContent = generateServiceInterfaces(interfacesContent);
fs.writeFileSync(join(__dirname, 'translation.types.gen.ts'), interfacesContent);
fs.writeFileSync(join(__dirname, '../miracle-hides-tabletop-server/src/types/translation.types.gen.ts'), interfacesContent);
console.log('Generated interface');

const schemaContent = generateSchema();
fs.writeFileSync(join(__dirname, 'translation.schema.gen.ts'), schemaContent);
fs.writeFileSync(join(__dirname, '../miracle-hides-tabletop-server/src/databases/translation-database/translation.schema.gen.ts'), schemaContent);
console.log('Generated schema');

const dbServiceContent = generateDatabase();
fs.writeFileSync(join(__dirname, 'translation-database.service.gen.ts'), dbServiceContent);
fs.writeFileSync(join(__dirname, '../miracle-hides-tabletop-server/src/databases/translation-database/translation-database.service.gen.ts'), dbServiceContent);
console.log('Generated db service');
