/*
 * SCORM 1.2 run-time bridge for Claude Code Quest.
 * ---------------------------------------------------------------------------
 * Pure vanilla JS, zero dependencies. Loaded as a plain <script> in the LMS
 * build's index.html BEFORE the app bundle, so window.SCORM exists by the time
 * React mounts.
 *
 * What it does:
 *   - Finds the LMS-provided SCORM 1.2 API object (window.API) by walking up
 *     the frame/opener hierarchy (the algorithm every SCORM 1.2 player expects).
 *   - LMSInitialize on load, and seeds cmi.core.lesson_status to "incomplete"
 *     on first entry so the course shows as in-progress.
 *   - Exposes window.SCORM.setComplete() — the app calls this when the learner
 *     finishes the Quest (cert page) or reaches the end/stamp screen.
 *   - Writes cmi.core.session_time and LMSFinish on page exit.
 *
 * If no LMS API is found (e.g. the package is opened directly, outside an LMS),
 * every method degrades to a silent no-op, so the same build still runs
 * standalone for previewing.
 *
 * Spec: ADL SCORM 1.2 Run-Time Environment. SCORM 1.2 is the most broadly
 * supported profile across LMSs, which is why this package targets it.
 */
(function () {
  'use strict';

  var API = null;
  var initialized = false;
  var finished = false;
  var startTime = Date.now();

  // ---- API discovery (SCORM 1.2 standard walk) ----
  function findAPIInWindow(win) {
    var depth = 0;
    while (
      win &&
      win.API == null &&
      win.parent != null &&
      win.parent !== win &&
      depth < 12
    ) {
      depth++;
      win = win.parent;
    }
    return win ? win.API : null;
  }

  function locateAPI() {
    var found = findAPIInWindow(window);
    if (found == null && window.opener != null) {
      try {
        found = findAPIInWindow(window.opener);
      } catch (e) {
        /* cross-origin opener — ignore */
      }
    }
    return found;
  }

  function toBool(v) {
    return v === 'true' || v === true;
  }

  function initialize() {
    if (initialized) return true;
    API = locateAPI();
    if (API == null) return false;
    if (!toBool(API.LMSInitialize(''))) return false;
    initialized = true;

    var status = API.LMSGetValue('cmi.core.lesson_status');
    if (!status || status === 'not attempted' || status === 'unknown') {
      API.LMSSetValue('cmi.core.lesson_status', 'incomplete');
    }
    API.LMSSetValue('cmi.core.score.min', '0');
    API.LMSSetValue('cmi.core.score.max', '100');
    API.LMSCommit('');
    return true;
  }

  function commit() {
    if (!initialized || !API) return;
    API.LMSCommit('');
  }

  // SCORM 1.2 CMITimespan: HHHH:MM:SS(.SS)
  function formatSessionTime(ms) {
    var totalSec = Math.max(0, Math.floor(ms / 1000));
    var h = Math.floor(totalSec / 3600);
    var m = Math.floor((totalSec % 3600) / 60);
    var s = totalSec % 60;
    function pad(n) {
      return (n < 10 ? '0' : '') + n;
    }
    return pad(h) + ':' + pad(m) + ':' + pad(s);
  }

  function setComplete(score) {
    if (!initialized && !initialize()) return;
    API.LMSSetValue('cmi.core.lesson_status', 'completed');
    var raw =
      typeof score === 'number' && isFinite(score) ? Math.round(score) : 100;
    API.LMSSetValue('cmi.core.score.raw', String(raw));
    commit();
  }

  function setIncomplete() {
    if (!initialized && !initialize()) return;
    var status = API.LMSGetValue('cmi.core.lesson_status');
    if (status !== 'completed' && status !== 'passed') {
      API.LMSSetValue('cmi.core.lesson_status', 'incomplete');
      commit();
    }
  }

  function finish() {
    if (!initialized || !API || finished) return;
    finished = true;
    API.LMSSetValue('cmi.core.session_time', formatSessionTime(Date.now() - startTime));
    API.LMSSetValue('cmi.core.exit', '');
    API.LMSCommit('');
    API.LMSFinish('');
  }

  // Open the session as soon as the bridge loads.
  initialize();

  // Close it cleanly when the learner leaves; commit on tab-hide as insurance.
  window.addEventListener('pagehide', finish);
  window.addEventListener('unload', finish);
  document.addEventListener('visibilitychange', function () {
    if (document.visibilityState === 'hidden') commit();
  });

  window.SCORM = {
    get available() {
      return initialized;
    },
    setIncomplete: setIncomplete,
    setComplete: setComplete,
    commit: commit,
    finish: finish,
  };
})();
