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
};
