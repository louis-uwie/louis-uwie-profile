import { bootstrapApplication } from '@angular/platform-browser';
import { App } from './app/app';
import { config } from './app/app.config.server';

const bootstrap = () => bootstrapApplication(App, config);

export default bootstrap;

// THIS IS ONLY FOR SERVER STATIC ROUTER_CONFIGURATION. CAN IGNORE FOR NOW
