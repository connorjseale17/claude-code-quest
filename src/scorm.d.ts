export {};

declare global {
  interface Window {
    /**
     * SCORM 1.2 run-time bridge. Defined by `scorm/scorm-api.js`, which is
     * injected into `index.html` ONLY in the SCORM/LMS build (`npm run
     * build:scorm`). It is `undefined` on the standalone web build, so every
     * call site must optional-chain it.
     */
    SCORM?: {
      /** True once `LMSInitialize` succeeded against a host LMS API. */
      readonly available: boolean;
      /** Mark the module incomplete (used on first entry). */
      setIncomplete(): void;
      /** Mark the module complete (+ optional 0–100 raw score, default 100). */
      setComplete(score?: number): void;
      /** Flush pending values to the LMS. */
      commit(): void;
      /** Write session time and close the SCORM session. */
      finish(): void;
    };
  }
}
