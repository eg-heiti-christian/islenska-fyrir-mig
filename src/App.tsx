import '@mantine/core/styles.css';

import { MantineProvider } from '@mantine/core';

import { Layout } from './components/Layout/Layout'
import { Router } from './Router';
import { theme } from './theme';

export default function App() {
  return (
    <MantineProvider theme={theme}>
      <Layout>
        <Router />
      </Layout>
    </MantineProvider>
  );
}
