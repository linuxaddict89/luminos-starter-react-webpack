/**
 * Internationalization / Localization Settings
 *
 *
 * If your app will touch people from all over the world, i18n (or internationalization)
 * may be an important part of your international strategy.
 *
 *
 */
const enTranslationMessages = require('./translations/en.json');
const deTranslationMessages = require('./translations/de.json');

const config = {
  /***************************************************************************
   *                                                                          *
   * Which locales are supported?                                             *
   *                                                                          *
   ***************************************************************************/

  locales: ['en', 'de'],

  /****************************************************************************
   *                                                                           *
   * What is the default locale for the site? Note that this setting will be   *
   * overridden for any request that sends an "Accept-Language" header (i.e.   *
   * most browsers), but it's still useful if you need to localize the         *
   * response for requests made by non-browser clients (e.g. cURL).            *
   *                                                                           *
   ****************************************************************************/

  defaultLocale: 'en',
};

export const formatTranslationMessages = (locale, messages) => {
  const defaultFormattedMessages =
    locale !== config.defaultLocale
      ? formatTranslationMessages(config.defaultLocale, enTranslationMessages)
      : {};

  const flattenFormattedMessages = (formattedMessages, key) => {
    const formattedMessage =
      !messages[key] && locale !== config.defaultLocale
        ? defaultFormattedMessages[key]
        : messages[key];
    return Object.assign(formattedMessages, { [key]: formattedMessage });
  };
  return Object.keys(messages).reduce(flattenFormattedMessages, {});
};

export const defaultTranslationMessages = Object.keys(enTranslationMessages).reduce(
  (formattedMessages, key) =>
    Object.assign(formattedMessages, {
      [key]: { id: key, defaultMessage: enTranslationMessages[key] },
    }),
  {}
);

export const translationMessages = {
  en: formatTranslationMessages('en', enTranslationMessages),
  de: formatTranslationMessages('de', deTranslationMessages)
};

export default config;
