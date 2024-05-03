import { InjectionToken } from "@angular/core"

/**
 * The configuration options that can be passed to the FontAwesomeTestingModule.
 */
// This interface is user-facing and will be converted to the 
// _FontAwesomeTestingModuleInternalConfig for internal use by the module.
export interface FontAwesomeTestingModuleConfig extends Partial<_FontAwesomeTestingModuleInternalConfig> { }

/**
 * The internal configuration for the FontAwesomeTestingModule.
 * This interface is private. Conforming objects should be constructed by the
 * _getFontAwesomeTestingModuleInternalConfig() function.
 */
export interface _FontAwesomeTestingModuleInternalConfig {
    /**
     * What to do when `addIcons()` is invoked on an IconLibrary provided by the FontAwesomeTestingModule.
     * 
     * Possible values are:
     * - `'logWarning'`: Writes a warning to the console.
     * - `'throwError'`: Throws an error
     * - `'noop'`: Does nothing
     * 
     * Note that in any case the icon will not be added to the library.
     */
    whenAddingIcons: 'logWarning' | 'throwError' | 'noop'
}

export const FontAwesomeTestingModuleConfigInjectionToken = new InjectionToken<_FontAwesomeTestingModuleInternalConfig>('FontAwesomeTestingModuleInternalConfig')

/**
 * The default values used for configuration if the user passes no configuration,
 * or an incomplete one.
 */
const DEFAULT_CONFIG = Object.freeze({
    // The default value maintains compatibility with versions <= 0.14.1
    whenAddingIcons: 'throwError'
})

export function _getFontAwesomeTestingModuleInternalConfig(publicConfig: FontAwesomeTestingModuleConfig = {}): _FontAwesomeTestingModuleInternalConfig {
    return {
        whenAddingIcons: publicConfig.whenAddingIcons ?? DEFAULT_CONFIG.whenAddingIcons
    }
}