# Feedback

## Functionality

### Positive

- is shown sticky on the bottom

### Negative

- no content shown in collapsed mode
- no button visible, though one exists and does toggle the mode

## Code Style & Quality

### Positive

- runs with one easy fix
- uses tailwind as was requested

### Negative

- did not include no example component, only copy of html from prompt
- does not build:
    ```
    NG8103: The `*ngIf` directive was used in the template, but neither the `NgIf` directive nor the `CommonModule` was imported. Use Angular's built-in control flow @if or make sure that either the `NgIf` directive or the `CommonModule` is included in the `@Component.imports` array of this component.
    ```
    ```
    NG8002: Can't bind to 'ngTemplateOutlet' since it isn't a known property of 'ng-container'.
    1. If 'ngTemplateOutlet' is an Angular directive, then add 'CommonModule' to the '@Component.imports' of this component.
    2. To allow any property add 'NO_ERRORS_SCHEMA' to the '@Component.schemas' of this component.
    ```
    - manually fixed by importing CommonModule
- does not use modern Angular best practises
    - standalone component
    - control flow syntax
    - signals

## Notes

- manually added `standalone: true` to make it work without a dedicated module

## Summary

- output not really helpful
- does simply not work as intended
- code is okay