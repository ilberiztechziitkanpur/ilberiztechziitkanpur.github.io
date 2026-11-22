# ICSE Class 10 - Computer Applications (Java, code 861)

Verification: pattern VERIFIED from the ICSE 2026 board paper + marking scheme reproduced in CISCE's APP 2026 Computer Applications PDF (text read); syllabus VERIFIED (2027 PDF). A 2027 specimen is NOT listed on cisce.org (checked 22 Nov 2026) -> 2027 board format assumed same as 2026 (UNVERIFIED but no change announced). Specimen 2025 is a scanned (image-only) PDF - not read.
Research date 22 Nov 2026.

## 1. Exam pattern (2026 board paper, assumed 2027)
- Theory paper 2 hours, 100 marks (not 80). Internal Assessment = 100 marks (practical programming assignments, min 20 lab programs). Section A compulsory (40) + Section B attempt any 4 of 6 (60).

| Q | Marks | Content |
|---|---|---|
| Q1 | 20 | 20 MCQ x 1 "write only the correct answers": JVM full form, storage size of data types/literals (2 bytes), accumulator, access specifiers (private/protected/package/public), output of Math methods e.g. Math.pow(36, 6/5), code-output, class/object terms, constructors, wrapper classes, string methods, array length |
| Q2 | 20 | 10 short items x 2 marks: (i) rewrite loop (while -> for), (ii) evaluate Java expression with ++/-- values, (iii) write Java expression (cube root + abs), (iv) ternary operator statement, (v) output of String method segment (substring/endsWith), (vi) output + loop count (do-while), (vii) find/correct errors or fill in program (factorial), (viii) 2-D array output, (ix) swapping/ error in program segment, (x) name the following (data type/ expression result) |
| Q3 | 15 | Class definition with member variables + methods + main (e.g. StepTracker: accept(), calculate(), display() using Scanner) |
| Q4 | 15 | 1-D array program (accept 100 designations, count entered one) |
| Q5 | 15 | 2-D array program (4x5 sparse matrix check) |
| Q6 | 15 | Number-logic program (Mark number: sum of squares of digits) |
| Q7 | 15 | Class with overloaded methods (nested for loop patterns, e.g. format()) |
| Q8 | 15 | String program (Symbolic word: consonant extraction) |

- Internal choice: Section B any 4 of 6. No choice inside Section A. Objective count: 20 MCQ + ~10 two-mark code-snippet items. Program writing: 4 x 15 = 60 marks (compulsory in the sense that all 4 attempted ones are programs). Program mark split (typical marking scheme): class header/variables + input + logic + output/ main - 15 marks as a whole (no sub-part brackets).
- Section B topics rotate: methods/classes with constructors, arrays (1-D, 2-D), strings, number programs (palindrome, special numbers), patterns with nested loops, wrapper class/Character methods. Paper is "class-based" - always define a class and a main method / use Scanner.
- Competency: output prediction, error finding, code writing (Application/Analysis).

## 2. DPP section mapping (suggested ids)
| id | label |
|---|---|
| `mcq` | Section A Q1 - MCQ (theory + output MCQs), 1 mark |
| `q2-output` | Section A Q2 - Predict output / trace loop (2 marks) |
| `q2-expr` | Section A Q2 - Java expressions / evaluate / ternary / rewrite loops |
| `q2-debug` | Section A Q2 - Find errors / complete program / name the following |
| `b-class` | Section B - Define a class (member variables, methods, constructors, main) |
| `b-array` | Section B - Array programs (1-D, 2-D) |
| `b-string` | Section B - String / wrapper class programs |
| `b-logic` | Section B - Number-logic programs + patterns (nested loops) |
Programs are graded by logic; DPP can show a model program + dry run table/output; for interactive grading use "write-the-missing-line" or "choose correct program" formats.

## 3. Marking conventions
- 15-mark program: roughly - class structure/declarations (2-3), input via Scanner (2), logic/loop/conditions (6-7), output statements (2), main/object creation (1-2); alternate correct logic accepted; syntax errors lose marks only if serious; variable-name consistency; comments not needed.
- 2-mark items: 1 mark each for expression/output + 1 mark for explanation/second part (e.g. "how many times the loop runs"). MCQs: option letter only.
- Output questions: exact output including spaces/newlines (println vs print).
- Time: ~1.2 min per mark for Section A (MCQ+Q2) ~45 min; Section B ~15-20 min per program.

## 4. Official resources
- Specimens: 2025 https://cisce.org/wp-content/uploads/2025/11/ICSE_2025_SPECIMEN_QP_MS_861_CTA.pdf (scanned images, 2 hrs) ; 2024 https://cisce.org/wp-content/uploads/2025/11/ICSE-2024-SPECIMEN-861-CTA.pdf ; 2023 https://cisce.org/wp-content/uploads/2025/12/ICSE_2023_SPECIMEN_CTA.pdf ; 2026 and 2027: not listed (UNVERIFIED if released). Listing https://cisce.org/specimen-question-papers-icse-class-x-2027/
- Syllabus 2027: https://cisce.org/wp-content/uploads/2025/03/18.-Computer-Applications.pdf ; 2026 https://cisce.org/wp-content/uploads/2025/03/21.-ICSE-Computer-Applications-26.pdf ; 2028 https://cisce.org/wp-content/uploads/2026/01/18.-Computer-Applications.pdf
- CFPQ: Computer Application Class X (CFQs) https://cisce.org/wp-content/uploads/2025/11/CFQs-ICSE_Computer-Application-Class-X.pdf (listed under https://cisce.org/icse-item-banks-2024/); Class IX item bank/modules (Sept 2026) https://cisce.org/wp-content/uploads/2026/09/Computer-Applications-IX.pdf on https://cisce.org/icse-item-banks-2026/. Other Class X editions not found.
- APP Computer Applications (includes full paper + scheme in 2026): 2026 https://cisce.org/wp-content/uploads/2026/11/12.-ICSE-Computer-Applications.pdf ; 2025 https://cisce.org/wp-content/uploads/2025/11/12.-ICSE-Computer-Applications.pdf ; 2024 https://cisce.org/wp-content/uploads/2025/11/12.-Computer-Applications.pdf ; 2023 https://cisce.org/wp-content/uploads/2025/11/6.-Computer-Applications.pdf ; 2019 https://cisce.org/wp-content/uploads/2025/03/8.-Computer-Applications.pdf ; 2018 https://cisce.org/wp-content/uploads/2025/03/Computer-Applications.pdf . Index https://cisce.org/analysis-of-pupil-performance-icse/
- Board papers 2016-2026: KnowledgeBoat (strong: ML Aggarwal-style Java solutions; slug unverified), Shaalaa (official papers), Educart/StudiesToday/SelfStudys. Reliability: Java answer programs on third-party sites often contain bugs; recompile/dry-run before use. Pre-2024 papers: Section A 40 and Section B 60 with Q2 also 20; older patterns 2016-2019: Q1 20 (short answers, not MCQ), Q2... (unverified).

## 5. Syllabus chapters (Class X, 2027)
1 Revision of Class IX (OOP concepts, objects/classes, values & data types, operators, input in Java, Math library methods, conditional & iterative constructs, nested for loops); 2 Class as the Basis of all Computation (objects, classes, primitive vs composite types); 3 User-defined Methods (forms, overloading, static/non-static, pure/impure, call by value/reference); 4 Constructors (default, parameterised, overloading); 5 Library Classes (wrapper classes, autoboxing/unboxing, parseInt/parseDouble..., Character.isDigit/isLetter/isUpperCase/toUpperCase...); 6 Encapsulation (access specifiers, scope of variables); 7 Arrays (1-D, 2-D, searching & sorting: linear/binary, selection/bubble, matrix operations); 8 String Handling (String class methods list, string arrays).
- Deleted/added vs older syllabi: UNVERIFIED. Known: only methods listed in the syllabus are tested (e.g. String: trim, toLowerCase, toUpperCase, length, charAt, indexOf, lastIndexOf, concat, equals, equalsIgnoreCase, compareTo, compareToIgnoreCase, replace, substring, startsWith, endsWith, valueOf). Old PYQs (pre-2019) included Recursion, Bit-wise ops, Stack/Queue "Data structures", File I/O - check against current list (likely out of syllabus) - UNVERIFIED.

## 6. Gotchas
- Code must be compile-correct Java; verify outputs by actually running or careful dry run. Use class-style programs (import java.util.*; Scanner).
- Output-prediction items need exact spacing; prefer MCQ with 4 plausible outputs; include the "loop executed n times" second part.
- Section B programs: provide algorithm/dry-run, not only code; accept alternate correct logic.
- No negative marking; "write only the correct answer".
- Theory 100 marks - weightage differs from other subjects; treat each 15-mark program as one DPP item.
