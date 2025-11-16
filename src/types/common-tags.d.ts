/**
 * Type definitions for common-tags module
 */
declare module 'common-tags' {
  export function stripIndent(strings: TemplateStringsArray, ...values: any[]): string
  export function stripIndents(strings: TemplateStringsArray, ...values: any[]): string
  export function oneLine(strings: TemplateStringsArray, ...values: any[]): string
  export function oneLineTrim(strings: TemplateStringsArray, ...values: any[]): string
  export function html(strings: TemplateStringsArray, ...values: any[]): string
  export function source(strings: TemplateStringsArray, ...values: any[]): string
}
