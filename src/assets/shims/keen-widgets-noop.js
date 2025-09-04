(function (w) {
  // Basic util so Keen code using it won't explode
  if (!w.KTUtil) {
    w.KTUtil = {
      onDOMContentLoaded: function (cb) {
        if (document.readyState !== 'loading') cb();
        else document.addEventListener('DOMContentLoaded', cb);
      }
    };
  }

  // Helper to ensure an object with an .init() exists
  function ensureInit(name) {
    const obj = w[name] || {};
    if (typeof obj.init !== 'function') obj.init = function () {};
    w[name] = obj;
  }

  // ThemeMode stub — the important bit for your current error
  if (!w.KTThemeMode) {
    const mql = window.matchMedia('(prefers-color-scheme: dark)');
    w.KTThemeMode = {
      // event bus no-ops
      on: function () {},          // KTThemeMode.on('kt.thememode.change', cb)
      off: function () {},
      // values used by the demo code
      getMenuMode: function () { return 'system'; },
      getMode: function () { return mql.matches ? 'dark' : 'light'; },
      setMode: function (_mode) {} // optional; noop
    };
  } else {
    // If it exists but lacks .on(), add no-op handlers
    w.KTThemeMode.on  = w.KTThemeMode.on  || function(){};
    w.KTThemeMode.off = w.KTThemeMode.off || function(){};
  }

  // Everything KTComponents.init() usually touches
  [
    'KTApp','KTDrawer','KTMenu','KTScroll','KTSticky','KTSwapper',
    'KTToggle','KTScrolltop','KTDialer','KTImageInput','KTPasswordMeter',
    'KTLayout','KTBlockUI'
  ].forEach(ensureInit);
})(window);
