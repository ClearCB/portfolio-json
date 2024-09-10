import { localesConfig, type Locale } from "@/config/locales";
import type { CvData } from '../types/cv';
import type { Content } from '../types/content';

// Define el tipo para la respuesta de la función
type LocalizedData = {
  cvData: CvData;
  content: Content;
  activeLocale: string;
  localesAvailable: string[];
};

export async function getLocalizedData(url: string): Promise<LocalizedData> {
  const parsedUrl = new URL(url);
  const pathParts = parsedUrl.pathname.split('/');
  const locale: Locale = (pathParts[1] as Locale) || 'es';

  const localeConfig = localesConfig[locale];

  if (!localeConfig) {
    throw new Error(`No configuration found for locale: ${locale}`);
  }

  try {
    // Cargar los módulos usando la configuración de locales
    const cvModule = await localeConfig.cv();
    const contentModule = await localeConfig.content();

    return {
      cvData: cvModule.default,
      content: contentModule.default,
      activeLocale: locale,
      localesAvailable: ["es", "en"]
    };
  } catch (error) {
    console.error(`Error loading data for locale: ${locale}`, error);
    throw new Error(`Content not available for locale: ${locale}`);
  }

}

export function replaceVariables(template: string, variables: Record<string, string>): string {
  return template.replace(/\$\{(.*?)\}/g, (_, key) => {
    return variables[key.trim()] || '';
  });
}