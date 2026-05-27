import { useState } from 'react'
import {
  BaitasMsg, InfoCard, SectionLabel, HighlightBox,
  QuizCard, ReflectionCard, InlineChat, InlineVoice, ContinueBtn,
} from './components'

export const WEEK4_STEPS = 9

export default function Week4({ currentStep, advance }) {
  const show = (i) => currentStep >= i
  const active = (i) => currentStep === i

  const [chatUsed, setChatUsed] = useState(false)
  const [voiceUsed, setVoiceUsed] = useState(false)

  return (
    <div className="space-y-8">

      {/* ── Step 0: Hero + Welcome ── */}
      {show(0) && (
        <div className="space-y-6 animate-fade-in">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-amber-600/25 via-orange-700/15 to-red-600/10 border border-white/10 p-10 text-center">
            <div className="absolute bottom-0 right-0 w-48 h-48 bg-amber-500/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
            <div className="relative">
              <div className="text-7xl mb-5 inline-block" style={{ filter: 'drop-shadow(0 0 24px rgba(245,158,11,0.6))' }}>⚖️</div>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/20 border border-amber-500/30 text-amber-300 text-xs font-display font-700 mb-4 ml-2">
                Savaitė 4
              </div>
              <h1 className="font-display text-4xl font-700 text-white mb-2">Etika ir didieji klausimai</h1>
              <p className="text-slate-400 text-sm">Ar AI menas yra tikras menas?</p>
            </div>
          </div>

          <BaitasMsg accent="amber" active={active(0)} onContinue={() => advance(5)}>
            Sveiki paskutinį kartą šį mėnesį! 🎓 Šiandien nepiesime — šiandien{' '}
            <strong>mąstysime</strong>.
            <br /><br />
            Pakalbėkime apie keletą svarbių klausimų apie AI, kūrybiškumą ir etiką.
            Nėra teisingų ar neteisingų atsakymų — svarbu galvoti kritiškai! 🤔
          </BaitasMsg>
        </div>
      )}

      {/* ── Step 1: Scenario 1 ── */}
      {show(1) && (
        <div className="space-y-4 animate-fade-in">
          <SectionLabel>Situacija 1</SectionLabel>
          <HighlightBox color="amber" icon="🖼️">
            <strong>AI buvo apmokyta naudojant tūkstančius tikrų menininkų paveikslėlių be jų leidimo.</strong>
            {' '}Dabar kompanija parduoda AI meną ir uždirba pinigus.
            <br /><br />
            🤔 Ar tai teisinga menininkams, kurių darbai buvo naudojami mokymui?
          </HighlightBox>
          {active(1) && <ContinueBtn onClick={() => advance(5)} />}
        </div>
      )}

      {/* ── Step 2: Quiz 1 ── */}
      {show(2) && (
        <QuizCard
          question="Ką manai — ar teisinga naudoti menininkų darbus AI mokymui be jų leidimo?"
          options={[
            'Taip, internete esantys darbai yra vieši',
            'Ne, visada reikia leidimo',
            'Tai sudėtinga — priklauso nuo aplinkybių',
            'AI niekada neturėtų mokytis iš žmonių kūrybos',
          ]}
          correct={2}
          explanation="Teisingai! Tai tikrai sudėtingas klausimas — teisininkai, menininkai ir technologijų kompanijos šiuo metu ginčijasi visame pasaulyje. Nėra paprastos atsakymo."
          active={active(2)}
          onContinue={() => advance(10)}
        />
      )}

      {/* ── Step 3: Chat debate ── */}
      {show(3) && (
        <div className="space-y-3 animate-fade-in">
          <BaitasMsg accent="amber">
            Paklausk AI apie šią temą — jis pateiks argumentus iš abiejų pusių! 👇
          </BaitasMsg>
          <InlineChat
            starter="Padėk man pagalvoti: ar teisinga naudoti menininkų darbus AI mokymui be jų leidimo? Pateik argumentus UŽ ir PRIEŠ. Kalbėk kaip draugas, kuris padeda mąstyti."
            label="Diskutuokime apie autorių teises"
            onFirstUse={() => setChatUsed(true)}
          />
          {chatUsed && active(3) && <ContinueBtn onClick={() => advance(15)} />}
        </div>
      )}

      {/* ── Step 4: Scenario 2 ── */}
      {show(4) && (
        <div className="space-y-4 animate-fade-in">
          <SectionLabel>Situacija 2</SectionLabel>
          <HighlightBox color="purple" icon="🏆">
            <strong>Mokinys pateikia AI sukurtą paveikslėlį kaip savo piešinį meno konkurse ir laimi pirmą vietą.</strong>
            <br /><br />
            🤔 Ar tai apgaulė? Ką reiškia &quot;savos&quot; kūrybos koncepcija?
          </HighlightBox>
          {active(4) && <ContinueBtn onClick={() => advance(5)} />}
        </div>
      )}

      {/* ── Step 5: Quiz 2 ── */}
      {show(5) && (
        <QuizCard
          question="Mokinys naudojo AI sukurti paveikslėlį konkursui. Ką jis turėtų daryti?"
          options={[
            'Nieko nesakyti, nes visi taip daro',
            'Aiškiai pasakyti, kad paveikslėlį sukūrė AI',
            'Šiek tiek pakeisti paveikslėlį ir sakyti, kad jo',
            'Atsisakyti dalyvauti konkurse',
          ]}
          correct={1}
          explanation="Teisingai! Sąžiningumas visada svarbiausias. Daugelis konkursų jau turi taisykles dėl AI — svarbu jų laikytis ir būti atviriems apie tai, kaip sukūrėte savo kūrinį."
          active={active(5)}
          onContinue={() => advance(10)}
        />
      )}

      {/* ── Step 6: Voice tool ── */}
      {show(6) && (
        <div className="space-y-3 animate-fade-in">
          <BaitasMsg accent="amber">
            Dabar išbandykime dar vieną AI galimybę — <strong>balso sintezę</strong>!
            AI gali paversti bet kokį tekstą kalba. Parašyk savo nuomonę apie AI etiką,
            o AI ją perskaitys balsu 👇
          </BaitasMsg>
          <InlineVoice
            starter="Dirbtinis intelektas yra nuostabus įrankis, kuris gali padėti žmonėms būti kūrybiškesniems. Svarbu naudoti jį atsakingai ir gerbti kitų kūrybą."
            label="Balso sintezė — išgirsk savo tekstą"
            onFirstUse={() => setVoiceUsed(true)}
          />
          {voiceUsed && active(6) && <ContinueBtn onClick={() => advance(15)} />}
        </div>
      )}

      {/* ── Step 7: Future thinking ── */}
      {show(7) && (
        <div className="space-y-4 animate-fade-in">
          <SectionLabel>Pagalvojimas apie ateitį</SectionLabel>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            <InfoCard emoji="🎨" title="Paveikslėliai" description="AI jau kuria nuostabius vaizdinius kūrinius" color="purple" />
            <InfoCard emoji="🎵" title="Muzika" description="AI komponuoja melodijas ir dainas" color="brand" />
            <InfoCard emoji="📝" title="Tekstai" description="AI rašo istorijas, eilėraščius, straipsnius" color="cyan" />
            <InfoCard emoji="🎬" title="Video" description="AI generuoja trumpus filmukus iš teksto" color="green" />
            <InfoCard emoji="🔊" title="Balsas" description="AI kalba bet kuria kalba ir balsu" color="amber" />
            <InfoCard emoji="❓" title="Kas toliau?" description="Kokias naujas galimybes atras tavo karta?" color="pink" />
          </div>
          {active(7) && <ContinueBtn onClick={() => advance(5)} />}
        </div>
      )}

      {/* ── Step 8: Final reflection ── */}
      {show(8) && (
        <ReflectionCard
          question="Ar tavo nuomonė apie AI meną pasikeitė nuo pirmos savaitės? Kokią vieną taisyklę sukurtum dėl AI naudojimo kūryboje? Koks klausimas apie AI tau dar neaiškus?"
          placeholder="Parašyk savo galutines mintis..."
          active={active(8)}
          onSave={() => advance(20)}
        />
      )}

      {/* ── Step 9: Closing ── */}
      {show(9) && (
        <BaitasMsg accent="amber" active={false}>
          🌟 Sveikinu! Tu baigei pirmą AI kurso mėnesį!
          <br /><br />
          ✅ Sukūrei pirmą AI paveikslėlį<br />
          ✅ Išmokai rašyti gerus promtus<br />
          ✅ Sukūrei AI iliustruotą istoriją<br />
          ✅ Pamąstei apie AI etiką<br />
          <br />
          Kitą mėnesį — AI muzika, kodavimas ir interaktyvūs projektai!
          Esi tikras <strong>AI menininkas</strong>! 🚀
        </BaitasMsg>
      )}

    </div>
  )
}
