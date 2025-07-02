import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: '**',
    renderMode: RenderMode.Prerender,
  },
];

// THIS IS ONLY FOR SERVER STATIC ROUTER_CONFIGURATION. CAN IGNORE FOR NOW
