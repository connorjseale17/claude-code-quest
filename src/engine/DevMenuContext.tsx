import { createContext, useContext } from 'react';

/** Toggle handler for the dev/menu overlay. Provided at the App root so any
 *  TerminalFrame on any phase (splash, customize, loading, gameplay, cert)
 *  can fire it via the title-bar press-and-hold gate. */
export const DevMenuContext = createContext<() => void>(() => {});

export function useDevMenuToggle(): () => void {
  return useContext(DevMenuContext);
}
