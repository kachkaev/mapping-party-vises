# Mapping party vises

Misc vis sketches for [OpenStreetMap mapping parties](https://wiki.openstreetmap.org/wiki/Mapping_parties)

## Results

## Implementation details

## Commands for image generation

```sh
LOCALE=en yarn exe src/commands/makeImageOfMapComparison.ts
LOCALE=ru yarn exe src/commands/makeImageOfMapComparison.ts

LOCALE=en yarn exe src/commands/makeImageOfMapDiff.ts
LOCALE=ru yarn exe src/commands/makeImageOfMapDiff.ts

LOCALE=en yarn exe src/commands/makeImageOfTimeline.ts
LOCALE=ru yarn exe src/commands/makeImageOfTimeline.ts
LOCALE=en yarn exe src/commands/makeImageOfTimelineBreakthrough.ts

LOCALE=en DATE=2021-02-19 yarn exe src/commands/makeImageOfMapSnapshot.ts
LOCALE=ru DATE=2021-02-19 yarn exe src/commands/makeImageOfMapSnapshot.ts
LOCALE=en DATE=2021-04-01 yarn exe src/commands/makeImageOfMapSnapshot.ts
LOCALE=ru DATE=2021-04-01 yarn exe src/commands/makeImageOfMapSnapshot.ts
LOCALE=en yarn exe src/commands/makeImageOfMapSnapshot.ts
LOCALE=ru yarn exe src/commands/makeImageOfMapSnapshot.ts

FRAME_VERSION=1x LOCALE=en yarn exe src/commands/makeAnimation.ts
FRAME_VERSION=1x LOCALE=ru yarn exe src/commands/makeAnimation.ts
```

## OSM diary TODO

> ℹ️ This diary entry is a copy of my [twitter thread](https://twitter.com/kachkaev/status/1381524909818527747)  
> 🔡 [Russian translation by Google](https://translate.google.com/translate?sl=en&tl=ru&u=https://www.openstreetmap.org/user/Kachkaev/diary/396387)

A few weeks ago we kicked off an online OpenStreetMap mapping party in [Penza, Russia](https://www.openstreetmap.org/#map=12/53.2000/45.0000). Our main focus was the building coverage and I’m extremely happy to share the results!

A geovis is worth a thousand words, so:

[![geo map comparison (shows building coverage before/after and some stats)](https://wiki.openstreetmap.org/w/images/thumb/7/79/Penza_mapping_party_2021-02-20...03-31_map_comparison.en.jpg/3000px-Penza_mapping_party_2021-02-20...03-31_map_comparison.en.jpg)](https://wiki.openstreetmap.org/wiki/File:Penza_mapping_party_2021-02-20...03-31_map_comparison.en.jpg)

The key sources for the building outlines where [Bing](https://wiki.openstreetmap.org/wiki/Bing_Maps#Bing_Aerial_Imagery) and [Maxar](https://wiki.openstreetmap.org/wiki/Maxar) imageries. To fill in most of the missing addresses, we looked into the [governmental land registry \[ru\]](https://wiki.openstreetmap.org/wiki/RU:Россия/Публичная_кадастровая_карта). It became a permitted data source for OSM quite recently. Some folks also checked [Yandex Panoramas \[ru\]](https://wiki.openstreetmap.org/wiki/RU:Россия/Яндекс.Панорамы) to read address plates or to derive 3D building shapes. This source was also allowed because the OSM community got an explicit permission back in 2011.

To help us coordinate the efforts, the area was turned into a [‘mapping cake’ on MapCraft](https://mapcraft.nanodesu.ru/pie/947). People grabbed ‘cake slices’ and mapped within them, thus reducing the chances of conflicts in data.

[![screenshot from mapcraft with ouur mapping cake](https://wiki.openstreetmap.org/w/images/d/d2/Penza_mapping_party_cake_2021-02.png)](https://wiki.openstreetmap.org/wiki/File:Penza_mapping_party_cake_2021-02.png)

Here is our joined progress over time. Can you guess when I started sharing this chart with the folks every evening? Hint: mid March 😁

[![line chart with building counts over time](https://wiki.openstreetmap.org/w/images/thumb/7/77/Penza_mapping_party_2021-02-20...03-31_timeline.en.png/3000px-Penza_mapping_party_2021-02-20...03-31_timeline.en.png)](https://wiki.openstreetmap.org/wiki/File:Penza_mapping_party_2021-02-20...03-31_timeline.en.png)

Another interesting view is a geo diff. Black fill represents changes of building shapes or the addition of address tags. The more dark sports you see in a neighbourhood, the greater it has been affected by our mapping efforts.

[![geo map with before/after diff on building coverage](https://wiki.openstreetmap.org/w/images/thumb/5/50/Penza_mapping_party_2021-02-20...03-31_map_diff.en.jpg/3000px-Penza_mapping_party_2021-02-20...03-31_map_diff.en.jpg)](https://wiki.openstreetmap.org/wiki/File:Penza_mapping_party_2021-02-20...03-31_map_diff.en.jpg)

Static vises are good, but an animation is better. This one spans over 42 dates and renders over 1.5M building outlines in total.

[![animated geo map with building address statuses changing over time](https://wiki.openstreetmap.org/w/images/6/68/Penza_mapping_party_2021-02-20...03-31_map_animation.en.gif)](https://wiki.openstreetmap.org/wiki/File:Penza_mapping_party_2021-02-20...03-31_map_animation.en.gif)

The mapping party was officially over on Wednesday, 31 March and I expected the activity to drop shortly afterwards. Glad to admit that I was very wrong! 😅

[![line chart showing building counts for 10 extra days after the mapping party](https://wiki.openstreetmap.org/w/images/thumb/c/c4/Penza_mapping_party_2021-02-20...03-31_timeline-extension.png/3000px-Penza_mapping_party_2021-02-20...03-31_timeline-extension.png)](https://wiki.openstreetmap.org/wiki/File:Penza_mapping_party_2021-02-20...03-31_timeline-extension.png)

In just over 10 days since the mapping party end date, Penza and its suburbs look as green as never before 💚

By the way, have you noticed that the place I am from is shaped like a heart symbol? 😁

[![geo map with buildings in Penza coloured by their address status (most of the building outlines are green)](https://wiki.openstreetmap.org/w/images/thumb/c/c4/Penza_building_coverage.en.jpg/3000px-Penza_building_coverage.en.jpg)](https://wiki.openstreetmap.org/wiki/File:Penza_building_coverage.en.jpg)

A couple of links to wrap up:

- 🗓 Our event in the OSM calendar  
  <https://osmcal.org/event/583>

- Source code for the vises  
  <https://github.com/kachkaev/mapping-party-vises>

I presented the data with Next.js, React.js, TypeScript and visx and then exported screenshots with Node.js and Puppeteer.
