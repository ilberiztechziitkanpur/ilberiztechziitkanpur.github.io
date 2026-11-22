# Workflow notes, prompt templates and pitfalls

## User preferences (from the sessions that built History Ch 3–6)
- The user studies while you work: minimal prompting, but asking questions is welcome. Batch questions into one AskUserQuestion call.
- Quality over speed, but be token-efficient: ≤ 2–3 parallel agents; Sonnet medium for search/writing, Sonnet high for extraction/compiling; give agents narrow scopes and local files to reuse. Many parallel Opus agents hit the 5-hour limit in minutes, and Opus research agents were twice stopped by safety filters on normal web research — Sonnet worked.
- Never read the PW class-notes PDFs (image-only slides; expensive). Answers follow the board's official answers exactly when they exist.
- Official sources only. Improvement/Supplementary papers were excluded (only unofficial KnowledgeBoat copies exist). No invented "expected" questions.
- Variations must be strict — a student who solved the main question must be able to solve the variation with the same answer core. When in doubt, separate + `related`.
- Show per question: years & papers, probability with its basis, marks, time, difficulty, skill, confidence, official examiner note, common mistakes, tips, word target.

## Facts already established (don't re-research)
- Board-paper MCQ keys: take them from that year's APP (official). Only if the APP is unavailable are they agent-determined (flag it). Specimen 2025–2027 and CFPQ (July 2024) keys are official.
- CISCE Analysis of Pupil Performance (APP: the board's official marking scheme + examiners' common errors for EVERY question of the paper) exists for 2016–2020 and 2023–2026 (none for 2021–22). cisce.org HTML pages sit behind Cloudflare (403 to bots), but direct PDF links work with a browser User-Agent; Byjus/Educart mirror 2016–2020. Search "analysis-of-pupil-performance-icse-<year>" on cisce.org. Always use the APP for official answers AND official MCQ keys of board papers.
- No History & Civics specimen was released for 2020/2021. The 2022 Sem 2 History part was Contemporary World only.
- Specimen 2027 was released 9 Oct 2026 with answer keys.
- PyMuPDF is installed for Python 3.14 (`C:\Users\ASUS\AppData\Local\Programs\Python\Python314\python.exe`), not 3.13. `pdftoppm` is not installed, so the Read tool cannot render PDF pages; extract text with fitz.

## Probability (engine computes it — don't hand-assign)
ICSE rarely repeats History wording, but topics recur. Score = 10 + 6·min(F,4) + 6·min(TF,8) + recency(topic last ≥2025 +10, 2023–24 +6, else +2) + min(16, 8·official) + min(8, 4·topicOfficial), cap 97. F = board years of this question (+variations), TF = board years of any question on the same `topic`. So topic ids must be meaningful and consistent within a chapter (not one topic per question).

## Extraction prompt template (one agent per year-range)
> CONTEXT: interactive practice DPPs for ICSE Class 10 <Subject>, chapter "<Chapter>" (tag <TAG>): <topic list>. Exclude other chapters (<list>); include straddlers with a note.
> SCOPE: <papers / years>. Reuse local files first: <paths>. Python 3.14 + fitz for PDFs.
> RULES: never invent; exact wording and layout as printed (passages/extracts in full); for every figure give pdf file + page + bounding box and crop it to img/<chapter>/<src-id>-<ref>.png; describe pictures in `picture` (alt text); MCQ options exact + key ("official" only if CISCE-provided, else "agent-determined: reason"); copy official answers verbatim into official_answer[]; official_errors[] from APP; verbatim_confidence HIGH/MEDIUM/LOW; source_inventory for every paper with chapter marks (zeros too).
> OUTPUT: JSON to <path>; reply ≤150 words.

## Compile prompt template
> Compile `data-<chapter>.js` for code <code>, chapterNo <n>. READ: references/data-schema.md (schema + variation rule), raw JSON files, and an existing finished data file as a style example. SOURCE FILTER: <included ids> / <excluded>. SECTION MAPPING: <from subject file>. ANSWERS: official answer verbatim in answer.official + points built from it; else concise board-style points; <mark> keywords; MCQ `why`. OUTPUT: data file + <code>-clusters.md; validate ids, seen.src, related, MCQ index, marks totals; reply ≤120 words.

## Pitfalls seen
- Don't strip "(A)", "(B)", "(R)" from assertion–reason options — they are statement labels, not option letters.
- Promoted variations keep wording like "same as the main question" in their tip — rewrite it.
- `node --check` the engine's inline script after any edit (extract between `<script>` tags).
- data.json is edited with Node and data.js regenerated from it; keep the 4-space indent and trailing newline.
- The site has a frontend passcode; for local testing set `sessionStorage.ilberiz_auth = 'granted'` and reload.
- Image questions (maps, diagrams, photos, graphs, circuits): crop the figure from the official PDF into `img/<chapter>/` and set `img` (+ `optionImgs` for image options); `picture` stays as alt text. Never hot-link from other sites. History Ch 3–9 were retrofitted to this rule (15 cropped figures). Bump the data scripts' ?v= after changing data so browsers don't show cached copies.
