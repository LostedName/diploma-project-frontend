import React from 'react';

export interface ElementRoute {
  path: string,
  element: React.FC,
}

export type ElementRoutes = Array<ElementRoute>;