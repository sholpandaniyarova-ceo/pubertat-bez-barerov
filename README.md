# Puberty Without Barriers

An offline-first web app (PWA) that helps parents and specialists support girls with disabilities
through puberty and menstruation. Available in Russian, Kazakh and English.

**Status: prototype.** Texts are a first draft and are being reviewed by a clinician. Kazakh text
is pending native-speaker review.

## Why

Girls with intellectual, sensory or physical disabilities often reach puberty with little
preparation, and caregivers report difficulty managing periods, recognising pain and teaching body
safety. Practical guidance in Kazakh and Russian for this group is scarce.

## What it does

Three short modules, written in plain language with one idea per card:

1. Preparing for the first period
2. Managing periods (hygiene, pain, when to see a doctor)
3. Body safety and trusted adults

Each module can be played as audio recorded by a human voice (files go in `audio/<lang>/<module>.mp3`,
for example `audio/kk/m1.mp3`). This helps caregivers and girls with visual impairment.

## Privacy

No accounts, no tracking, no server and no personal data. Everything runs in the browser and works
offline after the first visit.

## Run it

It is a static site. Open `index.html` through any web server, for example:

```
python3 -m http.server 8000
```

or publish the repository with GitHub Pages.

## Adding a language

Copy one language block in `content.js`, translate it and add a button in `index.html`.

## Licenses

- Code: [MIT](LICENSE)
- Educational content and audio: [CC BY 4.0](LICENSE-CONTENT.md)

Built by Neurotech LLP (Shymkent, Kazakhstan) as an open-source project for the UNICEF Venture Fund
FemTech call. Educational information only, not medical advice.
