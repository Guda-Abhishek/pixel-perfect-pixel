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
