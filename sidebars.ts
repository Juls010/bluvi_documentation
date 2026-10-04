import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */
const sidebars: SidebarsConfig = {
  generalSidebar: [
    'general/intro',
    'general/architecture',
    'general/repositories',
    'general/design-decisions',
    'general/deployment',
  ],
  backSidebar: [
    'back/intro',
    'back/endpoints',
    'back/profile-management',
    'back/realtime',
    'back/verification',
    'back/data-and-migrations',
    'back/admin',
  ],
  frontSidebar: [
    'front/intro',
    'front/architecture',
    'front/tutorial',
  ],
  mobileSidebar: [
    'mobile/intro',
    'mobile/architecture',
    'mobile/features',
    'mobile/verification',
    'mobile/e2e',
    'mobile/release',
  ],
};

export default sidebars;
