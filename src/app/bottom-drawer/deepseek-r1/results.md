# Feedback

## Functionality

### Positive

- drawer is shown and shows content and the chevron icon
- icon transition
- expand transition
- is responsive
- expands (nearly) to top of the screen but stops there

### Negative

- no functionality: cannot be extended / collapsed
   - works after above manual fixes were applied
- no collapse transition
- does no scroll when content is overflowing

## Code Style & Quality

### Positive

- well implemented
- no useless code or comments

### Negative

- did not include an example at all
- does not build
    - `NG8103: The `*ngIf` directive was used in the template, but neither the `NgIf` directive nor the `CommonModule` was imported. Use Angular's built-in control flow @if or make sure that either the `NgIf` directive or the `CommonModule` is included in the `@Component.imports` array of this component.`
    - manually fixed by importin CommonModule in component
- runs but with console errors
    ```
    ERROR RuntimeError: NG05105: Unexpected synthetic property @expandCollapse found. Please make sure that:
  - Either `BrowserAnimationsModule` or `NoopAnimationsModule` are imported in your application.
  - There is corresponding configuration for the animation named `@expandCollapse` defined in the `animations` field of the `@Component` decorator (see https://angular.io/api/core/Component#animations).
    at checkNoSyntheticProp (platform-browser.mjs:756:11)
    at EmulatedEncapsulationDomRenderer2.setProperty (platform-browser.mjs:713:86)
    at elementPropertyInternal (core.mjs:12210:14)
    at Module.ɵɵproperty (core.mjs:21734:5)
    at BottomDrawerComponent_Template (bottom-drawer.component.html:3:3)
    ```
   - manually fixed by providing animations module via `provideAnimations()` in AppComponent
   - new error occurs
   ```
   main.ts:27 ERROR RuntimeError: NG0100: ExpressionChangedAfterItHasBeenCheckedError: Expression has changed after it was checked. Previous value: '0'. Current value: '124'. Expression location: _BottomDrawerComponent component. Find more at https://angular.dev/errors/NG0100
    at BottomDrawerComponent_Template (bottom-drawer.component.html:3:3)
    ```
   - manually "fixed" by putting `ngAfterViewInit` content into a `setTimeout`
- unneccessary host listeners
- does not use modern Angular best practises
    - standalone component
    - control flow syntax
    - signals
- did not use tailwind at all

## Instruction Following

### Positive

### Negative

## Notes

- manually added `standalone: true` to make it work without a dedicated module

## Summary

- Works somehow after some manual fixes
- Functionality is just partly given
- Code itself looks good, but not great
- Needs more manual changes to make it production ready
