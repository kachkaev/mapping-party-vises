# Mapping party vises

Misc vis sketches for [OpenStreetMap mapping parties](https://wiki.openstreetmap.org/wiki/Mapping_parties)

## Results

- [twitter thread](https://twitter.com/kachkaev/status/1381524909818527747)
- [OSM diary entry](https://www.openstreetmap.org/user/Kachkaev/diary/396387)
- [Produced images on OSM wiki](https://wiki.openstreetmap.org/wiki/Penza#Meetups)

## Implementation details

The data gets presented with Next.js, React.js, TypeScript and visx, then the screenshots are exported with Node.js and Puppeteer.

If you want to use this project in your mapping event, let’s have a chat! The code is reusable, I just need to add some ‘getting stated’ docs and explain the requirements to the input data.

## Commands for image generation

```sh
yarn exe src/commands/generateTimelineSummaries.ts

LOCALE=en yarn exe src/commands/makeImageOfMapComparison.ts
LOCALE=ru yarn exe src/commands/makeImageOfMapComparison.ts

LOCALE=en yarn exe src/commands/makeImageOfMapDiff.ts
LOCALE=ru yarn exe src/commands/makeImageOfMapDiff.ts

LOCALE=en yarn exe src/commands/makeImageOfTimeline.ts
LOCALE=ru yarn exe src/commands/makeImageOfTimeline.ts
LOCALE=en yarn exe src/commands/makeImageOfTimelineExtension.ts

LOCALE=en DATE=2021-02-19 yarn exe src/commands/makeImageOfMapSnapshot.ts
LOCALE=ru DATE=2021-02-19 yarn exe src/commands/makeImageOfMapSnapshot.ts
LOCALE=en DATE=2021-04-01 yarn exe src/commands/makeImageOfMapSnapshot.ts
LOCALE=ru DATE=2021-04-01 yarn exe src/commands/makeImageOfMapSnapshot.ts
LOCALE=en yarn exe src/commands/makeImageOfMapSnapshot.ts
LOCALE=ru yarn exe src/commands/makeImageOfMapSnapshot.ts

FRAME_VERSION=1x LOCALE=en yarn exe src/commands/makeAnimation.ts
FRAME_VERSION=1x LOCALE=ru yarn exe src/commands/makeAnimation.ts
```
