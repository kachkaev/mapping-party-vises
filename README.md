# Mapping party vizes

Misc viz sketches for [OpenStreetMap mapping parties](https://wiki.openstreetmap.org/wiki/Mapping_parties)

## Image generation

```sh
LOCALE=en yarn exe src/commands/makeImageOfMapComparison.ts
LOCALE=ru yarn exe src/commands/makeImageOfMapComparison.ts

LOCALE=en yarn exe src/commands/makeImageOfMapDiff.ts
LOCALE=ru yarn exe src/commands/makeImageOfMapDiff.ts

LOCALE=en yarn exe src/commands/makeImageOfTimeline.ts
LOCALE=ru yarn exe src/commands/makeImageOfTimeline.ts

LOCALE=en DATE=2021-02-19 yarn exe src/commands/makeImageOfMapSnapshot.ts
LOCALE=ru DATE=2021-02-19 yarn exe src/commands/makeImageOfMapSnapshot.ts
LOCALE=en DATE=2021-04-01 yarn exe src/commands/makeImageOfMapSnapshot.ts
LOCALE=ru DATE=2021-04-01 yarn exe src/commands/makeImageOfMapSnapshot.ts
LOCALE=en yarn exe src/commands/makeImageOfMapSnapshot.ts
LOCALE=ru yarn exe src/commands/makeImageOfMapSnapshot.ts

FRAME_VERSION=v1 LOCALE=en yarn exe src/commands/makeAnimation.ts
FRAME_VERSION=v1 LOCALE=ru yarn exe src/commands/makeAnimation.ts
```
