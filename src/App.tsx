import '@mantine/core/styles.css';

import { MantineProvider  } from '@mantine/core';

import { Router } from './Router';
import { theme, resolver } from './theme';

export default function App() {
  return (
    <MantineProvider forceColorScheme='dark' theme={theme} cssVariablesResolver={resolver}>
        <Router />
    </MantineProvider>
  );
}
