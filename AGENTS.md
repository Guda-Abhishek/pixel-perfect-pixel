<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

## Architecture
- Keep the profile picker at `/` and the single scrolling portfolio at `/portfolio`; direct visits bypass the intro and existing URLs remain stable.
- Use reusable Button controls and global semantic visual tokens; this keeps focus, interaction, and theming consistent.
- Keep social URLs and the resume asset path nullable in shared configuration; missing verified resources must never produce broken links.
- Validate contact drafts with the shared Zod schema and prepare mailto messages only; no delivery claim is possible without a connected service.
- Use a code monogram instead of a portrait until a real image is supplied; generated portraits cannot represent the owner's likeness.

- Validate viewer selection in route search parameters and derive section/project order from shared rules; URL-based selection survives refresh without storing personal data.
- Reuse Radix dialogs, tabs and menus for portfolio details and switching; these preserve keyboard interaction and focus management.
- Keep the contact form in its reusable component and career facts in shared data; presentation changes must not alter validated draft behavior.
- Keep the optional AI introduction in one shared dialog with a mount-scoped playback hook; opening stays silent and closing cancels only its own speech and timers.
- Keep real and AI-host portrait references separately nullable until the exact uploaded assets are available; never substitute generated faces or conflate identities.
- Serve uploaded intro clips through asset pointers and tie muted video playback to the shared narration state; this keeps Play, Pause and close consistent without autoplay.
