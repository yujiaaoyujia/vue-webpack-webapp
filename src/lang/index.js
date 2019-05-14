import Vue from 'vue'
import VueI18n from 'vue-i18n'
import axios from 'axios'
import zh from './lib/zh-CN'
import jdy from '../assets/js/jdy'

Vue.use(VueI18n)

export const i18n = new VueI18n({
  locale: 'zh-CN',
  fallbackLocale: 'zh-CN',
  messages: { 'zh-CN': zh }
})

jdy.$t = i18n.t.bind(i18n)
const loadedLanguages = ['zh-CN']

function setI18nLanguage(lang) {
  i18n.locale = lang
  axios.defaults.headers.common['Accept-Language'] = lang

  // 使用多语言设置title,meta信息
  document.querySelector('html').setAttribute('lang', lang)
  document.querySelector("[name='author']").content = i18n.t('html.author')
  document.querySelector("[name='description']").content = i18n.t('html.description')
  document.querySelector("[name='keywords']").content = i18n.t('html.keywords')
}

function loadLanguageAsync(lang) {
  if (i18n.locale !== lang) {
    if (!loadedLanguages.includes(lang)) {
      return import(/* webpackChunkName: "lang-[request]" */ `./lib/${lang}`).then((msgs) => {
        i18n.setLocaleMessage(lang, msgs.default)
        loadedLanguages.push(lang)
        setI18nLanguage(lang)
      })
    }
    return Promise.resolve(setI18nLanguage(lang))
  }
  return Promise.resolve()
}

export function loadLanguage() {
  const UA = window.navigator.userAgent
  if (UA) {
    const uaInfo = UA.split(';')
    const uaLang = uaInfo.find(item => item.indexOf('lang') >= 0)
    const lang = uaLang && uaLang.split(':')[1]
    if (lang) {
      if (lang.indexOf('zh') >= 0) {
        return loadLanguageAsync('zh-CN')
      }
      if (lang.indexOf('en') >= 0) {
        return loadLanguageAsync('en')
      }
    }
  }
  return loadLanguageAsync('zh-CN')
}
