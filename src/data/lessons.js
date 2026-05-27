export const lessons = {
  1: {
    week: 1,
    title: "Kas yra AI menas?",
    subtitle: "Pirmoji pažintis su dirbtiniu intelektu",
    steps: [
      {
        id: "welcome",
        type: "baitas",
        text: "Labas! 👋 Aš esu **Baitas** — tavo AI draugas ir mokytojas šioje kelionėje. Šiandien mes kartu atrasime kažką tikrai nuostabaus — dirbtinį intelektą ir AI meną!\n\nPasiruošęs? Pradėkime! 🚀",
      },
      {
        id: "what-is-ai",
        type: "baitas",
        text: "Įsivaizduok studentą, kuris peržiūrėjo **milijardus** paveikslėlių ir knygų, ir išmoko visus jų raštus bei stilius. Dabar gali paprašyti jo sukurti ką nors visiškai nauja — tai ir yra dirbtinis intelektas! 🧠\n\nAI nemiega, nepavarsta ir visada pasiruošęs padėti.",
      },
      {
        id: "vocabulary",
        type: "baitas",
        text: "Prieš pradedant, susipažinkime su trimis svarbiais žodžiais:\n\n🤖 **Dirbtinis intelektas (AI)** — kompiuterinė sistema, kuri mokosi iš pavyzdžių\n✍️ **Promtas** — instrukcija ar aprašymas, kurį duodi AI\n🎨 **Generuoti** — kai AI sukuria kažką nauja pagal tavo promtą",
      },
      {
        id: "quiz-vocab",
        type: "quiz",
        question: "Kaip vadinamos instrukcijos, kurias duodi AI, kad jis sukurtų paveikslėlį ar atsakytų į klausimą?",
        options: ["Komanda", "Promtas", "Kodas", "Patarimas"],
        correct: 1,
        explanation: "Teisingai! Promtas yra instrukcija ar aprašymas, kurį duodi AI. Kuo tiksliau aprašysi, tuo geresnis rezultatas!",
      },
      {
        id: "first-chat-intro",
        type: "baitas",
        text: "Puiku! 🎉 Dabar pakalbėkime su AI! Parašyk Gemini klausimą apie dirbtinį intelektą — galite naudoti žemiau pateiktą klausimą arba sugalvoti savą 👇",
      },
      {
        id: "chat-tool",
        type: "tool",
        tool: "chat",
        starter: "Kas yra dirbtinis intelektas? Paaiškink kaip 10 metų vaikui, naudok paprastus žodžius.",
        label: "Paklausk AI apie dirbtinį intelektą",
      },
      {
        id: "after-chat",
        type: "baitas",
        text: "Matai, kaip AI geba paaiškinti sudėtingus dalykus paprastais žodžiais? 🌟 Dabar pabandykime kažką dar įdomesnio — sukursime savo **pirmą AI paveikslėlį**!\n\nSvarbu žinoti: paveikslėlio aprašymą reikia rašyti **angliškai**, nes Imagen 3 geriausiai supranta šią kalbą.",
      },
      {
        id: "image-intro",
        type: "baitas",
        text: "Norėdamas sukurti paveikslėlį, turi aprašyti ką nori pamatyti — tai vadinamas **promtu**. Kuo tiksliau aprašysi, tuo geresnis bus rezultatas! Pabandyk šį promtą arba sugalvok savą 👇",
      },
      {
        id: "image-tool",
        type: "tool",
        tool: "image",
        starter: "A friendly dragon reading a book in a cozy library, watercolor style, warm colors",
        label: "Sukurk savo pirmą AI paveikslėlį",
      },
      {
        id: "after-image",
        type: "baitas",
        text: "Oho! 🌟 Tu ką tik sukūrei savo **pirmą AI paveikslėlį**! Kaip tau atrodo? Pabandyk pakeisti kai kuriuos žodžius promte ir pamatyk, kaip keičiasi rezultatas — pavyzdžiui, pakeisk 'watercolor' į 'digital art' arba pridėk 'at night'.",
      },
      {
        id: "quiz-result",
        type: "quiz",
        question: "Ką reikia daryti, norint gauti geresnį AI paveikslėlį?",
        options: [
          "Spausti mygtuką kelis kartus",
          "Rašyti ilgesnį ir tikslesnį aprašymą (promtą)",
          "Palaukti ilgiau",
          "Keisti kalbą",
        ],
        correct: 1,
        explanation: "Tiksliai! Kuo daugiau detalių aprašai promte — objektą, spalvas, stilių, nuotaiką — tuo geresnis paveikslėlis.",
      },
      {
        id: "reflection",
        type: "reflection",
        question: "📝 Aprašyk savo pirmąjį AI paveikslėlį. Kas tave nustebino? Ką norėtum pakeisti?",
        placeholder: "Rašyk čia savo mintis...",
      },
      {
        id: "closing",
        type: "baitas",
        text: "Fantastiška! 🎊 Šiandien tu:\n\n✅ Sužinojai, kas yra dirbtinis intelektas\n✅ Pasikalbėjai su AI\n✅ Sukūrei savo pirmą AI paveikslėlį\n✅ Atsakei į viktorinos klausimus\n✅ Pradėjai savo AI žurnalą\n\nKitą savaitę sužinosime, kaip rašyti geresnius promtus. Iki pasimatymo, kūrybiškas AI menininke! 👋",
      },
    ],
  },

  2: {
    week: 2,
    title: "Promtų menas",
    subtitle: "Išmok kalbėtis su AI kaip profesionalas",
    steps: [
      {
        id: "welcome",
        type: "baitas",
        text: "Sveiki sugrįžę! 🎨 Aš vėl čia — Baitas. Šią savaitę sužinosime, kad kuo geriau aprašome, ką norime, tuo geresnius rezultatus gauname iš AI.\n\nTai vadinama **promtų inžinerija** — ir tai tikras menas! 🖌️",
      },
      {
        id: "bad-vs-good",
        type: "baitas",
        text: "Įsivaizduok: jei paprašytum draugo nupieš 'katę' — gali gauti bet ką! Bet jei paprašytum:\n\n**'Oranžinė dryžuota katė su burtininko skrybėle, sėdinti ant knygų krūvos, žvakių šviesa, akvarelės stilius'**\n\n— tai jau visai kitas rezultatas! 🐱✨",
      },
      {
        id: "recipe-intro",
        type: "baitas",
        text: "Promtas yra kaip **receptas** — jame yra keli svarbūs ingredientai:\n\n🐱 **Objektas** — kas arba kas yra paveikslėlyje\n🌍 **Aplinka** — kur vyksta scena\n🎭 **Nuotaika** — kokį jausmą turėtų perteikti\n🖼️ **Stilius** — kaip turėtų atrodyti (watercolor, digital art, oil painting...)\n💡 **Apšvietimas** — kaip atrodo šviesa (golden hour, neon lights, moonlight...)",
      },
      {
        id: "quiz-recipe",
        type: "quiz",
        question: "Kuris iš šių promtų duos geriausią ir tiksliausią paveikslėlį?",
        options: [
          "Katė",
          "Oranžinė katė sėdi",
          "Oranžinė dryžuota katė su burtininko skrybėle ant knygų, žvakių šviesa, akvarelės stilius",
          "Gyvūnas su skrybėle",
        ],
        correct: 2,
        explanation: "Trečias variantas laimi! Jis turi objektą (oranžinė katė), detalę (dryžuota, skrybėlė), aplinką (knygos), apšvietimą (žvakių šviesa) ir stilių (akvarelė). Tai tikras recepto promtas!",
      },
      {
        id: "practice-intro",
        type: "baitas",
        text: "Dabar pabandyk patys! Sukurk paveikslėlį naudodamas visus ingredientus. Čia yra pradinis promtas — pabandyk jį patobulinti pridėdamas daugiau detalių 👇",
      },
      {
        id: "image-tool",
        type: "tool",
        tool: "image",
        starter: "A young inventor in her workshop surrounded by amazing gadgets, at night, sense of wonder, digital art style",
        label: "Promtų pratybos — tobulink ir bandyk!",
      },
      {
        id: "chatgpt-helper",
        type: "baitas",
        text: "Žinai ką? AI gali padėti rašyti geresnius promtus! 🤖 Paklausk Gemini pagalbos kuriant promtą savo idėjai — jis išplės tavo idėją į išsamų, kūrybišką aprašymą 👇",
      },
      {
        id: "chat-tool",
        type: "tool",
        tool: "chat",
        starter: "Padėk man parašyti Imagen 3 promtą paveikslėliui: lapė detektyvė, sprendžianti paslaptį 1920-ųjų Paryžiuje. Sukurk išsamų, kūrybišką promtą anglų kalba su objektu, aplinka, nuotaika ir stiliumi.",
        label: "Paklausk AI pagalbos kuriant promtą",
      },
      {
        id: "after-chat",
        type: "baitas",
        text: "Matai, kaip AI gali padėti tobulinti kitas idėjas? 💡 Tai vadinama **AI bendradarbiavimu** — tu duodi idėją, AI padeda ją išplėsti!\n\nPabandyk panaudoti AI sugeneruotą promtą paveikslėlio kūrimui — grįžk prie paveikslėlio įrankio ir įklijuok naują promtą.",
      },
      {
        id: "quiz-style",
        type: "quiz",
        question: "Ką reiškia žodis 'watercolor' promte?",
        options: [
          "Paveikslėlis su vandeniu",
          "Akvarelės tapybos stilius",
          "Mėlynos spalvos paveikslėlis",
          "Fotografija",
        ],
        correct: 1,
        explanation: "Teisingai! 'Watercolor' reiškia akvarelės stilių — paveikslėlis atrodys tarsi tapytas vandeniniais dažais. Kiti populiarūs stiliai: 'oil painting', 'digital art', 'pencil sketch', 'cartoon'.",
      },
      {
        id: "reflection",
        type: "reflection",
        question: "📝 Koks promtas davė geriausią rezultatą? Kokie žodžiai labiausiai pakeitė paveikslėlį?",
        placeholder: "Aprašyk savo patirtį...",
      },
      {
        id: "closing",
        type: "baitas",
        text: "Nuostabu! 🏆 Tu dabar moki rašyti geresnius promtus!\n\n✅ Sužinojai promto receptą\n✅ Sukūrei paveikslėlį su detaliais aprašymais\n✅ Panaudojai AI kaip pagalbininką\n\nKitą savaitę panaudosime šias žinias ir sukursime savo **iliustruotą istoriją su AI**. Pasiruošk būti kūrybišku pasakotoju! 📖",
      },
    ],
  },

  3: {
    week: 3,
    title: "Istorija susitinka su AI",
    subtitle: "Sukurk savo iliustruotą AI istoriją",
    steps: [
      {
        id: "welcome",
        type: "baitas",
        text: "Sveiki! 📖 Šiandien ateina didžioji savaitė — mes sukursime savo **AI iliustruotą istoriją**!\n\nTu būsi ir autorius, ir meno direktorius. Pasiruošęs nuotykiui? 🎬",
      },
      {
        id: "story-elements",
        type: "baitas",
        text: "Kiekviena gera istorija turi 4 pagrindines dalis:\n\n👤 **Personažą** — kas yra herojus? Kokie jo bruožai?\n🌍 **Aplinką** — kur ir kada vyksta istorija?\n⚡ **Problemą** — kas nutinka? Su kuo herojus susiduria?\n🎯 **Sprendimą** — kaip viskas baigiasi? Ko herojus išmoko?",
      },
      {
        id: "quiz-story",
        type: "quiz",
        question: "Iš kokių dalių susideda gera istorija?",
        options: [
          "Tik personažas ir veiksmas",
          "Personažas, aplinka, problema ir sprendimas",
          "Pradžia ir pabaiga",
          "Kuo daugiau veikėjų, tuo geriau",
        ],
        correct: 1,
        explanation: "Puiku! Personažas + aplinka + problema + sprendimas — tai klasikinė istorijos struktūra. Visi geriausi filmai ir knygos remiasi šia schema!",
      },
      {
        id: "brainstorm-intro",
        type: "baitas",
        text: "Pirmiausia pakalbėkime su AI ir sugalvokime istoriją! Paklausk Gemini pagalbos — bet atmink: **tu esi pasakotojas, AI tik padėjėjas!** 👇",
      },
      {
        id: "chat-tool",
        type: "tool",
        tool: "chat",
        starter: "Padėk man sugalvoti trumpą istoriją. Noriu istorijos apie jauną išradėją, kuri atranda žemėlapį, vedantį į slaptą povandeninį miestą. Sugalvok: 1) herojės vardą ir charakterį, 2) problemą, su kuria ji susiduria, 3) netikėtą posūkį.",
        label: "Sugalvokime istoriją kartu su AI",
      },
      {
        id: "scene-intro",
        type: "baitas",
        text: "Puiku! Dabar iliustruokime 3 svarbiausias scenas.\n\n**Pirmoji scena:** kaip tavo herojus susiduria su nuotykio pradžia? Pakeisk promtą, kad atitiktų tavo istoriją 👇",
      },
      {
        id: "image-scene1",
        type: "tool",
        tool: "image",
        starter: "A curious young girl with braided hair holding a glowing ancient map, surrounded by tall dusty bookshelves, warm golden light, watercolor storybook illustration style",
        label: "1 scena — Istorijos pradžia",
      },
      {
        id: "scene2",
        type: "baitas",
        text: "Fantastiška pirmoji scena! 🎨 Dabar sukurkime **antrą sceną** — problemos kulminacija.\n\nKas nutinka herojui sunkiausią akimirką? Pakeisk promtą pagal savo istoriją 👇",
      },
      {
        id: "image-scene2",
        type: "tool",
        tool: "image",
        starter: "A brave young girl swimming through an underwater city with glowing buildings, surrounded by friendly sea creatures, dramatic lighting, digital art, adventure illustration style",
        label: "2 scena — Didžioji kliūtis",
      },
      {
        id: "scene3",
        type: "baitas",
        text: "Tobula! Paskutinė — **trečia scena**: kaip istorija baigiasi? Sukurk finalinę sceną 👇",
      },
      {
        id: "image-scene3",
        type: "tool",
        tool: "image",
        starter: "A triumphant young girl standing at the entrance of a magical underwater city, celebrating with sea creatures, sunlight filtering through water, warm and joyful, watercolor illustration",
        label: "3 scena — Laiminga pabaiga",
      },
      {
        id: "after-scenes",
        type: "baitas",
        text: "Tu sukūrei visas tris scenas — tai tikra AI iliustruota knyga! 📚✨\n\nPastebėjai, kaip svarbu išlaikyti tą patį stilių visose scenose? Tai vadinama **vizualiniu nuoseklumu** — tikri meno direktoriai apie tai galvoja kiekviename filme ir knygoje.",
      },
      {
        id: "quiz-consistency",
        type: "quiz",
        question: "Kaip geriausiai išlaikyti tą patį stilių visose istorijos scenose?",
        options: [
          "Generuoti kiekvieną kartą skirtingai",
          "Naudoti tą patį stiliaus žodį kiekviename promte (pvz., 'watercolor illustration')",
          "Spaudinėti mygtuką daug kartų",
          "Naudoti skirtingus AI įrankius",
        ],
        correct: 1,
        explanation: "Tiksliai! Jei kiekviename promte naudosi tuos pačius stiliaus žodžius (pvz., 'watercolor storybook illustration'), visos scenos atrodys kaip vienos knygos dalis.",
      },
      {
        id: "reflection",
        type: "reflection",
        question: "📝 Aprašyk savo istoriją 3–5 sakiniais. Koks promtas davė geriausią rezultatą? Ką norėtum pakeisti?",
        placeholder: "Parašyk savo istorijos aprašymą...",
      },
      {
        id: "closing",
        type: "baitas",
        text: "Bravo! 👏 Tu sukūrei savo pirmą AI iliustruotą istoriją!\n\n✅ Sugalvojai įdomią istoriją\n✅ Sukūrei 3 iliustracijas\n✅ Išmokai vizualinio nuoseklumo\n\nKitą savaitę pakalbėsime apie svarbius klausimus — **ar AI menas yra tikras menas?** 🤔",
      },
    ],
  },

  4: {
    week: 4,
    title: "Etika ir didieji klausimai",
    subtitle: "Ar AI menas yra tikras menas?",
    steps: [
      {
        id: "welcome",
        type: "baitas",
        text: "Sveiki paskutinį kartą šį mėnesį! 🎓 Šiandien nepiesime — šiandien **mąstysime**.\n\nPakalbėkime apie keletą svarbių klausimų apie AI, kūrybiškumą ir etiką. Nėra teisingų ar neteisingų atsakymų — svarbu galvoti!",
      },
      {
        id: "scenario1",
        type: "baitas",
        text: "**Situacija 1:** AI buvo apmokyta naudojant tūkstančius tikrų menininkų paveikslėlių be jų leidimo. Dabar kompanija parduoda AI meną ir uždirba pinigus.\n\n🤔 Ar tai teisinga menininkams, kurių darbai buvo naudojami mokymui?",
      },
      {
        id: "quiz-ethics1",
        type: "quiz",
        question: "Ką manai — ar teisinga naudoti menininkų darbus AI mokymui be jų leidimo?",
        options: [
          "Taip, internete esantys darbai yra vieši",
          "Ne, visada reikia leidimo",
          "Tai sudėtinga — priklauso nuo aplinkybių",
          "AI niekada neturėtų mokytis iš žmonių kūrybos",
        ],
        correct: 2,
        explanation: "Teisingai! Tai tikrai sudėtingas klausimas — teisininkai, menininkai ir technologijų kompanijos šiuo metu ginčijasi dėl šios temos visame pasaulyje. Nėra paprastos atsakymo.",
      },
      {
        id: "chat-debate1",
        type: "tool",
        tool: "chat",
        starter: "Padėk man pagalvoti: ar teisinga naudoti menininkų darbus AI mokymui be jų leidimo? Pateik argumentus UŽ ir PRIEŠ. Kalbėk kaip draugas, kuris padeda mąstyti, ne kaip enciklopedija.",
        label: "Paklausk AI apie autorių teises",
      },
      {
        id: "scenario2",
        type: "baitas",
        text: "**Situacija 2:** Mokinys pateikia AI sukurtą paveikslėlį kaip savo piešinį meno konkurse ir laimi pirmą vietą.\n\n🏆 Ar tai apgaulė? Ką reiškia 'savos' kūrybos koncepcija?",
      },
      {
        id: "quiz-ethics2",
        type: "quiz",
        question: "Mokinys naudojo AI sukurti paveikslėlį konkursui. Ką jis turėtų daryti?",
        options: [
          "Nieko nesakyti, nes visi taip daro",
          "Aiškiai pasakyti, kad paveikslėlį sukūrė AI",
          "Šiek tiek pakeisti paveikslėlį ir sakyti, kad jo",
          "Atsisakyti dalyvauti konkurse",
        ],
        correct: 1,
        explanation: "Teisingai! Sąžiningumas visada svarbiausias. Daugelis konkursų jau turi taisykles dėl AI — svarbu jų laikytis ir būti atviriems apie tai, kaip sukūrėte savo kūrinį.",
      },
      {
        id: "voice-intro",
        type: "baitas",
        text: "Dabar išbandykime dar vieną AI galimybę — **balso sintezę**! AI gali paversti bet kokį tekstą kalba.\n\nParašyk savo nuomonę apie AI etiką, o AI ją perskaitys balsu 👇",
      },
      {
        id: "voice-tool",
        type: "tool",
        tool: "voice",
        starter: "Dirbtinis intelektas yra nuostabus įrankis, kuris gali padėti žmonėms būti kūrybiškesniems. Svarbu naudoti jį atsakingai ir gerbti kitų kūrybą.",
        label: "AI balso sintezė — išgirsk savo tekstą",
      },
      {
        id: "future",
        type: "baitas",
        text: "Pagalvok apie ateitį: jau dabar AI gali:\n\n🎨 Kurti paveikslėlius\n🎵 Rašyti muziką\n📝 Rašyti tekstus\n🎬 Kurti video\n🔊 Kalbėti bet kuria balsu\n\nKaip manai — koks bus pasaulis po 10 metų? Ar AI pakeis menininkus, ar jiems padės?",
      },
      {
        id: "reflection",
        type: "reflection",
        question: "📝 Galutinis žurnalas: Ar tavo nuomonė apie AI meną pasikeitė nuo pirmos savaitės? Kokią vieną taisyklę sukurtum dėl AI naudojimo kūryboje? Koks klausimas apie AI tau dar neaiškus?",
        placeholder: "Parašyk savo galutines mintis...",
      },
      {
        id: "closing",
        type: "baitas",
        text: "🌟 Sveikinu! Tu baigei pirmą AI kurso mėnesį!\n\n✅ Sukūrei pirmą AI paveikslėlį\n✅ Išmokai rašyti gerus promtus\n✅ Sukūrei AI iliustruotą istoriją\n✅ Pamąstei apie AI etiką\n\nKitą mėnesį — AI muzika, kodavimas ir interaktyvūs projektai! Esi tikras **AI menininkas**! 🚀",
      },
    ],
  },
}

export function getLesson(week) {
  return lessons[week] || lessons[1]
}
