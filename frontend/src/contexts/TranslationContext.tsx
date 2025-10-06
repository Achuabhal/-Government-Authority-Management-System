import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Extend Window interface for Google Translate
declare global {
  interface Window {
    google?: {
      translate?: any;
    };
  }
}

type Language = 'en' | 'kn';

interface TranslationContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  translate: () => void;
}

const TranslationContext = createContext<TranslationContextType | undefined>(undefined);

export const useTranslation = () => {
  const context = useContext(TranslationContext);
  if (context === undefined) {
    throw new Error('useTranslation must be used within a TranslationProvider');
  }
  return context;
};

interface TranslationProviderProps {
  children: ReactNode;
}

export const TranslationProvider = ({ children }: TranslationProviderProps) => {
  // Get language from localStorage or default to Kannada
  const getStoredLanguage = (): Language => {
    try {
      const stored = localStorage.getItem('bvp.selectedLanguage');
      if (stored === 'en' || stored === 'kn') {
        console.log('TranslationContext: Found stored language:', stored);
        return stored;
      }
    } catch (error) {
      console.log('TranslationContext: Error reading stored language:', error);
    }
    console.log('TranslationContext: Defaulting to Kannada');
    return 'kn'; // Default to Kannada
  };

  // Detect current language from URL (for backward compatibility)
  const getCurrentLanguage = (): Language => {
    const url = window.location.href;
    console.log('TranslationContext: getCurrentLanguage - URL:', url);
    if (url.includes('#googtrans(en|en)')) {
      console.log('TranslationContext: Detected English from URL');
      return 'en';
    } else if (url.includes('#googtrans(en|kn)')) {
      console.log('TranslationContext: Detected Kannada from URL');
      return 'kn';
    }
    // Fallback to stored language
    return getStoredLanguage();
  };

  const [language, setLanguage] = useState<Language>(getStoredLanguage());
  const [isTranslating, setIsTranslating] = useState(false);

  // Custom setLanguage function that saves to localStorage
  const setLanguageWithPersistence = (newLanguage: Language) => {
    console.log('TranslationContext: Setting language to:', newLanguage);
    try {
      localStorage.setItem('bvp.selectedLanguage', newLanguage);
      console.log('TranslationContext: Language saved to localStorage');
    } catch (error) {
      console.log('TranslationContext: Error saving language to localStorage:', error);
    }
    setLanguage(newLanguage);
  };

  // Initialize Google Translate
  useEffect(() => {
    console.log('TranslationContext: Initializing Google Translate');
    // Wait for Google Translate to load
    const initializeTranslation = () => {
      console.log('TranslationContext: Checking for Google Translate...');
      if (window.google && window.google.translate) {
        console.log('TranslationContext: Google Translate found');
        // Set initial language to Kannada only once
        const currentUrl = window.location.href;
        if (!currentUrl.includes('#googtrans')) {
          // Use history.replaceState to avoid page reload
          const newUrl = currentUrl + '#googtrans(en|kn)';
          console.log('TranslationContext: Setting initial URL to:', newUrl);
          window.history.replaceState(null, '', newUrl);
        } else {
          console.log('TranslationContext: URL already has googtrans');
        }
      } else {
        console.log('TranslationContext: Google Translate not found, retrying...');
        setTimeout(initializeTranslation, 500);
      }
    };
    
    // Only initialize once
    setTimeout(initializeTranslation, 2000);
  }, []);

  // Listen for URL changes to update language state
  useEffect(() => {
    const handleHashChange = () => {
      const newLanguage = getCurrentLanguage();
      setLanguage(newLanguage);
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const translate = () => {
    if (isTranslating) {
      console.log('TranslationContext: Translation already in progress, skipping');
      return;
    }
    
    setIsTranslating(true);
    // Fix: Use correct language codes for Google Translate
    const targetLang = language === 'en' ? 'en' : 'kn';
    console.log('TranslationContext: translate() called');
    console.log('TranslationContext: Current language:', language);
    console.log('TranslationContext: Target language:', targetLang);
    console.log('TranslationContext: Target language code for Google:', targetLang);
    
    // Use URL-based translation for reliable switching
    const currentUrl = window.location.href;
    const baseUrl = currentUrl.split('#')[0];
    const newUrl = `${baseUrl}#googtrans(en|${targetLang})`;
    
    console.log('TranslationContext: Current URL:', currentUrl);
    console.log('TranslationContext: New URL:', newUrl);
    
    // Use history.replaceState to avoid page reload
    window.history.replaceState(null, '', newUrl);
    console.log('TranslationContext: URL changed to:', newUrl);
    
    // Try multiple methods to trigger Google Translate
    setTimeout(() => {
      console.log('TranslationContext: Attempting to trigger translation...');
      
      // Method 1: Try to find and click the Google Translate combo
      const combo = document.querySelector('.goog-te-combo') as HTMLSelectElement;
      if (combo) {
        console.log('TranslationContext: Found Google Translate combo');
        
        // Temporarily make combo accessible
        combo.style.position = 'absolute';
        combo.style.top = '0';
        combo.style.left = '0';
        combo.style.opacity = '1';
        combo.style.pointerEvents = 'auto';
        combo.style.zIndex = '9999';
        
        // Set the value and trigger change
        combo.value = targetLang;
        console.log('TranslationContext: Set combo value to:', targetLang);
        
        // Try multiple event types
        combo.dispatchEvent(new Event('change', { bubbles: true }));
        combo.dispatchEvent(new Event('input', { bubbles: true }));
        combo.dispatchEvent(new Event('click', { bubbles: true }));
        
        console.log('TranslationContext: Triggered combo events');
        
        // Hide combo again after a short delay
        setTimeout(() => {
          combo.style.position = 'absolute';
          combo.style.top = '-9999px';
          combo.style.left = '-9999px';
          combo.style.opacity = '0';
          combo.style.pointerEvents = 'none';
          combo.style.zIndex = '-1';
          setIsTranslating(false);
        }, 100);
      } else {
        console.log('TranslationContext: Google Translate combo not found');
        
        // Method 2: Try custom event approach
        console.log('TranslationContext: Trying custom event approach');
        window.dispatchEvent(new CustomEvent('googtrans', { detail: { targetLang } }));
        
        // Method 3: Try to trigger via hashchange
        setTimeout(() => {
          const event = new Event('hashchange');
          window.dispatchEvent(event);
          console.log('TranslationContext: Dispatched hashchange event');
        }, 100);
        
        // Reset translation flag
        setTimeout(() => {
          setIsTranslating(false);
        }, 500);
      }
    }, 200);
  };

  // Auto-translate when language changes
  useEffect(() => {
    console.log('TranslationContext: Language changed to:', language);
    const timer = setTimeout(() => {
      console.log('TranslationContext: Calling translate() after language change');
      translate();
    }, 100);
    return () => clearTimeout(timer);
  }, [language]);

  // Initialize with stored language on page load
  useEffect(() => {
    const timer = setTimeout(() => {
      const storedLang = getStoredLanguage();
      console.log('TranslationContext: Initializing with stored language:', storedLang);
      setLanguage(storedLang);
      translate();
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const value = {
    language,
    setLanguage: setLanguageWithPersistence,
    translate,
  };

  return (
    <TranslationContext.Provider value={value}>
      {children}
    </TranslationContext.Provider>
  );
};
