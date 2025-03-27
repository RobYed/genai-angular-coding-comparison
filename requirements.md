Generate the following angular component for me:

# Bottom Drawer Component

## Core Functionality

The bottom drawer consists of two main states:

- **Collapsed state**: Shows minimal information with a visible handle/button
- **Expanded state**: Reveals the full content

## Key Components

1. **Container**

   - Fixed position at the bottom of the viewport
   - Needs z-index management to properly layer above other content
   - Displayed as a card with rounded borders at the top corners and slight drop shadow
   - On the top-center of the card a half circle should extend the card to the top
     - This circle has a width of 40px
     - The half circle must be part of the card container and drop the same shadow
   - Height of container matches content height in both states
   - Must not be higher than the viewport height
     - overflowing content must be scrollable in this case
   - No backdrop/overlay

2. **Handle**

   - Positioned at the top-center of the card within the half circle of the container
   - Serves as both a visual indicator and interactive element
   - Styled as a chevron icon which toggles depending on state

3. **Content Areas**

   - Preview content (always visible in collapsed state)
   - Full content (revealed when expanded)
   - When expanded, both preview and full content are visible

## Interaction Patterns

- **Expansion Trigger**: User can tap/click the handle
- **Collapse Trigger**: User can tap/click the handle again

## Animation Considerations

- Smooth height transition between states
- Content opacity/translation animations for elements appearing during expansion

## Accessibility Requirements

- Keyboard navigability (tab order and focus management)
- ARIA attributes for screen readers (e.g., `aria-expanded`, `aria-controls`)
- Clear visual indication of the interactive handle

## Technical Considerations

- Managing content overflow (scrolling within the card when necessary)
- Proper handling of viewport height changes (orientation changes on mobile)
- Responsive design (must work across different screen sizes, with special consideration for mobile interfaces where it's most commonly used)
- Angular component (using current Angular best practises)
- Contents are passed to the component via content projection
- Prefer Tailwind before CSS where possible
- Use `app-bottom-drawer` tag
- Use a `preview-pontent` attribute to mark preview contents
- Include the below example in a working component

## Usage example

```html
<app-bottom-drawer>
    <ng-container preview-pontent>
        <h1>Great heading</h1>
        <p>This is important information which always needs to be present</p>
    </ng-container>

    <p>
        This is not as important and only visible if the user decides to expand
        the bottom drawer
    </p>
    <button>Some CTA</button>
</app-bottom-drawer>
```
