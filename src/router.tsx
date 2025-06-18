import { createRouter as createTanstackRouter } from '@tanstack/react-router'
import { routerWithQueryClient } from '@tanstack/react-router-with-query'
import * as TanstackQuery from './integrations/tanstack-query/root-provider'

import { WagmiProvider } from 'wagmi'
// Import the generated route tree
import { routeTree } from './routeTree.gen'

import './styles.css'
import { wagmiAdapter } from './integrations/tanstack-query/reown'

// Create a new router instance
export const createRouter = () => {
  const router = routerWithQueryClient(
    createTanstackRouter({
      routeTree,
      context: {
        ...TanstackQuery.getContext(),
      },
      scrollRestoration: true,
      defaultPreloadStaleTime: 0,
    }),
    TanstackQuery.getContext().queryClient,
    {
      WrapProvider: ({ children }) => (
        <WagmiProvider config={wagmiAdapter.wagmiConfig}>
          {children}
        </WagmiProvider>
      ),
    },
  )

  return router
}

// Register the router instance for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: ReturnType<typeof createRouter>
  }
}
