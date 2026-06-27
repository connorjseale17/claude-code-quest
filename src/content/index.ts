import type { LevelId } from '../engine/roomConfigs';
import type { LessonContent } from './types';
import { orientationContent } from './orientation';
import { welcomeContent } from './welcome';
import { claudemdContent } from './claudemd';
import { slashContent } from './slash';
import { mcpContent } from './mcp';
import { subagentsContent } from './subagents';
import { finalBossContent } from './final-boss';
import { twic1Content } from './twic-1';
import { twic2Content } from './twic-2';
import { twic3Content } from './twic-3';
import { cowork1Content } from './cowork-1';
import { cowork2Content } from './cowork-2';
import { cowork3Content } from './cowork-3';
import { cowork4Content } from './cowork-4';
import { cowork5Content } from './cowork-5';
import { cowork6Content } from './cowork-6';
import { cowork7Content } from './cowork-7';

export const CONTENT: Record<LevelId, LessonContent> = {
  orientation: orientationContent,
  welcome: welcomeContent,
  claudemd: claudemdContent,
  slash: slashContent,
  mcp: mcpContent,
  subagents: subagentsContent,
  'final-boss': finalBossContent,
  'twic-1': twic1Content,
  'twic-2': twic2Content,
  'twic-3': twic3Content,
  'cowork-1': cowork1Content,
  'cowork-2': cowork2Content,
  'cowork-3': cowork3Content,
  'cowork-4': cowork4Content,
  'cowork-5': cowork5Content,
  'cowork-6': cowork6Content,
  'cowork-7': cowork7Content,
};
