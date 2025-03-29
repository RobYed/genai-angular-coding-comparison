# Feedback

## Functionality

### Positive

- generally works and looks good
- handle more or less like expected
- chevron icon transition
- expanded / collapsed transition
- content scrolling works when overflowing
- working keyboard interaction

### Negative

- full content does only show up after window resize

## Code Style & Quality

### Positive

- works after simple manual fix
- just the right amount of comments

### Negative

- did not include an example at all
- does not build
- seems a bit overengineered
- usage of setTimeout in ngAfterViewInit is bad practice
- no signs of modern angular

## Notes

- no file names for code
- manually added `standalone: true` to make it work without a dedicated module
    ```
    NG8002: Can't bind to 'ngClass' since it isn't a known property of 'div'.
    ```
    - manually fixed by importing CommonModule
