import type { LevelId } from '../engine/roomConfigs';
import type { LessonContent } from './types';
import { welcomeContent } from './welcome';
import { claudemdContent } from './claudemd';
import { slashContent } from './slash';
import { mcpContent } from './mcp';
import { subagentsContent } from './subagents';
import { finalBossContent } from './final-boss';
import { twic1Content } from './twic-1';
import { twic2Content } from './twic-2';
import { twic3Content } from './twic-3';

export const CONTENT: Record<LevelId, LessonContent> = {
  welcome: welcomeContent,
  claudemd: claudemdContent,
  slash: slashContent,
  mcp: mcpContent,
  subagents: subagentsContent,
  'final-boss': finalBossContent,
  'twic-1': twic1Content,
  'twic-2': twic2Content,
  'twic-3': twic3Content,
};
