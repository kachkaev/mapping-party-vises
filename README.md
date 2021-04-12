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

## Tweet todo

\<thread>

A few weeks ago we kicked off an online #OpenStreetMap mapping party in #Penza, Russia. Our main focus was the building coverage and I’m extremely happy to share the results!

A #geovis is worth a thousand tweets, so:

<img width="500" src="https://wiki.openstreetmap.org/w/images/thumb/7/79/Penza_mapping_party_2021-02-20...03-31_map_comparison.en.jpg/4000px-Penza_mapping_party_2021-02-20...03-31_map_comparison.en.jpg" />

---

The key sources for the building outlines where Bing and Maxar imageries. To fill in most of the missing addresses, we looked into the governmental land registry. It became a permitted data source for OSM quite recently:

\[ru] <https://wiki.openstreetmap.org/wiki/RU:Россия/Публичная_кадастровая_>карта

---

Some folks also checked Yandex Panoramas to read address plates or to derive 3D building shapes. This source was also allowed because the OSM community got an explicit permission back in 2011:

\[ru] <https://wiki.openstreetmap.org/wiki/RU:Россия/>Яндекс.Панорамы

---

To help us coordinate the efforts, the area was turned into a ‘mapping cake’ on #MapCraft: <https://mapcraft.nanodesu.ru/pie/947>

People grabbed ‘cake slices’ and mapped within them, thus reducing the chances of conflicts in data.

<img width="500" src="https://wiki.openstreetmap.org/w/images/d/d2/Penza_mapping_party_cake_2021-02.png" />

---

Here is our joined progress over time. Can you guess when I started sharing this chart with the folks every evening? Hint: mid March 😁

<img width="500" src="https://wiki.openstreetmap.org/w/images/thumb/7/77/Penza_mapping_party_2021-02-20...03-31_timeline.en.png/4000px-Penza_mapping_party_2021-02-20...03-31_timeline.en.png" />

---

Another interesting view is a geo diff. Black fill represents changes of building shapes or the addition of address tags. The more dark sports you see in a neighbourhood, the greater it has been affected by our mapping efforts.

<img width="500" src="https://wiki.openstreetmap.org/w/images/thumb/5/50/Penza_mapping_party_2021-02-20...03-31_map_diff.en.jpg/4000px-Penza_mapping_party_2021-02-20...03-31_map_diff.en.jpg" />

---

Static vises are good, but an animation is better. This one spans over 42 dates and renders over 1.5M building outlines in total.

Not sure if twitter can reliably play such a long gif, so here is the original file on OSM wiki: <https://wiki.openstreetmap.org/wiki/File:Penza_mapping_party_2021-02-20...03-31_map_animation.en.gif>

<!-- <img width="500" src="https://wiki.openstreetmap.org/w/images/6/68/Penza_mapping_party_2021-02-20...03-31_map_animation.en.gif" /> -->
<img width="500" src="https://wiki.openstreetmap.org/w/images/archive/6/68/20210411112014!Penza_mapping_party_2021-02-20...03-31_map_animation.en.gif" />

---

The mapping party was officially over on Wednesday, 31 March and I expected the activity to drop shortly afterwards. Glad to admit that I was very wrong! 😅

<img width="500" src="https://wiki.openstreetmap.org/w/images/thumb/c/c4/Penza_mapping_party_2021-02-20...03-31_timeline-extension.png/4000px-Penza_mapping_party_2021-02-20...03-31_timeline-extension.png" />

---

In just over 10 days since the mapping party end date, Penza and its suburbs look as green as never before 💚

By the way, have you noticed that the place I am from is shaped like a heart symbol? 😁

<img width="500" src="https://wiki.openstreetmap.org/w/images/thumb/c/c4/Penza_building_coverage.en.jpg/4000px-Penza_building_coverage.en.jpg" />

---

A couple of links to wrap up:

🗓 Our event in the OSM calendar  
<https://osmcal.org/event/583>

💻 Source code for the vises  
<https://github.com/kachkaev/mapping-party-vises>

I presented the data with #nextjs, #reactjs, #typescript and #visx and then exported screenshots with #nodejs and #puppeteer.

\</thread>
