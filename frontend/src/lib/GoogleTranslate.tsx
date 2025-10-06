import { useEffect, useRef } from 'react';

declare global {
  interface Window {
    googleTranslateElementInit: () => void;
    google?: {
      translate?: any;
    };
  }
}

const GoogleTranslate = () => {
  const scriptRef = useRef<HTMLScriptElement | null>(null);

  useEffect(() => {
    window.googleTranslateElementInit = () => {
      if (window.google?.translate) {
        new window.google.translate.TranslateElement(
          { pageLanguage: 'en', includedLanguages: 'en,kn' },
          'google_translate_element'
        );
      }
    };

    const script = document.createElement('script');
    script.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
    script.async = true;
    scriptRef.current = script;
    document.head.appendChild(script);

    setTimeout(() => {
      const elements = document.querySelectorAll(
        '.goog-te-menu-value span:last-child, ' +
        '.goog-te-banner-frame, ' +
        '.goog-te-gadget .goog-te-menu-value span[style*="color"], ' +
        '[data-translate-source-lang], .goog-te-gadget img'
      );
      elements.forEach(el => {
        const element = el as HTMLElement;
        if (element) element.style.display = 'none';
      });

      const menuValue = document.querySelector('.goog-te-menu-value') as HTMLElement;
      if (menuValue) {
        menuValue.style.border = 'none';
        menuValue.style.background = 'transparent';
      }
    }, 1500);

    return () => {
      if (scriptRef.current) {
        document.head.removeChild(scriptRef.current);
      }
    };
  }, []);

  return (
    <div id="google_translate_element">
      <style>{`
        .goog-te-menu-value span:last-child { 
          display: none !important; 
        }
        .goog-te-banner-frame, 
        .goog-te-banner-frame * { 
          display: none !important; 
        }
        .goog-te-gadget .goog-te-menu-value span[style*="color"] { 
          display: none !important; 
        }
        .goog-te-menu-value:hover { 
          border: none !important; 
          box-shadow: none !important;
        }
        .goog-te-gadget img {
          display: none !important;
        }
        .skiptranslate {
          display: none !important;
        }
      `}</style>
    </div>
  );
};

export default GoogleTranslate;