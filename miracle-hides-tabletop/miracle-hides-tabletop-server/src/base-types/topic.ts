import { IsString, Length } from 'class-validator';
import createSchemaEntry from './create-schema-entry';

export const TOPIC_MAX_LENGTH = 256;
export const TOPIC_MIN_LENGTH = 3;

export const topicSchemaEntry = () => createSchemaEntry({
  maxLength: TOPIC_MAX_LENGTH,
  minLength: TOPIC_MIN_LENGTH,
  name: 'topic',
  type: String,
});

export interface ITopic {
  topic: string;
}

export class TopicDto implements ITopic {
  @IsString()
  @Length(TOPIC_MIN_LENGTH, TOPIC_MAX_LENGTH)
  topic: string;
}
