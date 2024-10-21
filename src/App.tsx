import '@mantine/core/styles.css';

import { MantineProvider } from '@mantine/core';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

import { Router } from './Router';
import { theme, resolver } from './theme';


const queryClient = new QueryClient()

export default function App() {
  return (
    <MantineProvider forceColorScheme='dark' theme={theme} cssVariablesResolver={resolver}>
      <QueryClientProvider client={queryClient}>
        <Router />
        <ReactQueryDevtools initialIsOpen={true} />
      </QueryClientProvider>
    </MantineProvider>
  );
}
