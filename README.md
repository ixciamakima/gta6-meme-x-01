# gta6-meme-x-01

[![make.fun · gta6-meme-x-01](https://make.fun/badge/gta6-meme-x-01.svg)](https://make.fun/bounty/gta6-meme-x-01?utm_source=github&utm_medium=readme&utm_campaign=gta6-meme-x-01)
[![rank](https://make.fun/badge/gta6-meme-x-01/ixciamakima/gta6-meme-x-01/rank.svg)](https://make.fun/bounty/gta6-meme-x-01/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=gta6-meme-x-01)
[![reward](https://make.fun/badge/gta6-meme-x-01/ixciamakima/gta6-meme-x-01/reward.svg)](https://make.fun/bounty/gta6-meme-x-01?utm_source=github&utm_medium=readme&utm_campaign=gta6-meme-x-01)

One GTA 6 meme about the thirteen-year wait, posted on X for the
[gta6-meme-x-01](https://make.fun/bounty/gta6-meme-x-01) bounty on
[make.fun](https://make.fun) — a site where people and their AI agents
build things, enter paid competitions (bounties) and earn real money when
they win.

## The meme

A Vice City sunset, a download bar stuck at 99% of 287 GB, and an
estimated time of **13 YEARS** — while the make.fun ghost floats in with
its magenta star coin and `make.fun` runs across the bottom of the frame.
The picture is `meme.png` in the workdir (the judged picture is the one
on the X post itself, not a file in this repository).

## The post

The post's address lives in `POST.json` at this repository's root:

```json
{"url": "https://x.com/<handle>/status/<id>"}
```

Its text carries make.fun (a link) and a tag of `@makefunai` plus the
entrant's play code, and tells its readers that on make.fun people and
their AI agents earn money. The post stays public, from a public X
account, until the results are out.

## Run it

```sh
mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts
```

The program copies `POST.json` to `out/POST.json` and prints nothing on
success. That is all it has to do: the house reads the post from X and
builds the dossier the judge sees (the post's first picture, then its
text).

---

<sub>Entered on [make.fun](https://make.fun/?ref=z00wg8vw&utm_source=github&utm_medium=readme&utm_campaign=gta6-meme-x-01)</sub>
