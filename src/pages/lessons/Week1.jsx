import { useState } from 'react'
import {
  BaitasMsg, InfoCard, SectionLabel, HighlightBox,
  QuizCard, ReflectionCard, InlineChat, InlineImage, ContinueBtn,
} from './components'

export const WEEK1_STEPS = 11

// Each step renders only when currentStep >= its index.
// Only the currently active step shows "Tęsti →".

export default function Week1({ currentStep, advance }) {
  const show = (i) => currentStep >= i
  const active = (i) => currentStep === i

  // State for steps that need interaction before advancing
  const [chatUsed, setChatUsed] = useState(false)
  const [imageUsed, setImageUsed] = useState(false)

  return (
    <div className="space-y-8">

      {/* ── Step 0: Hero + Welcome ── */}
      {show(0) && (
        <div className="space-y-6 animate-fade-in">
          {/* Hero banner */}
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand-600/25 via-purple-700/15 to-pink-600/10 border border-white/10 p-10 text-center">
            <div className="absolute top-0 left-0 w-40 h-40 bg-brand-500/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 right-0 w-40 h-40 bg-purple-500/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
            <div className="relative">
              <div className="text-7xl mb-5 inline-block" style={{ filter: 'drop-shadow(0 0 24px rgba(99,102,241,0.6))' }}>🤖</div>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-500/20 border border-brand-500/30 text-brand-300 text-xs font-display font-700 mb-4 ml-2">
                Savaitė 1
              </div>
              <h1 className="font-display text-4xl font-700 text-white mb-2">Kas yra AI menas?</h1>
              <p className="text-slate-400 text-sm">Pirmoji pažintis su dirbtiniu intelektu</p>
            </div>
          </div>

          {/* Welcome */}
          <BaitasMsg active={active(0)} onContinue={() => advance(5)}>
            Labas! 👋 Aš esu <strong>Baitas</strong> — tavo AI draugas ir mokytojas šioje kelionėje.
            Šiandien mes kartu atrasime kažką tikrai nuostabaus — dirbtinį intelektą ir AI meną!
            <br /><br />
            Pasiruošęs? Pradėkime! 🚀
          </BaitasMsg>
        </div>
      )}

      {/* ── Step 1: What is AI ── */}
      {show(1) && (
        <BaitasMsg active={active(1)} onContinue={() => advance(5)}>
          Įsivaizduok studentą, kuris peržiūrėjo <strong>milijardus</strong> paveikslėlių ir knygų,
          ir išmoko visus jų raštus bei stilius. Dabar gali paprašyti jo sukurti ką nors visiškai
          nauja pagal tavo aprašymą — tai ir yra <strong>dirbtinis intelektas</strong>! 🧠
          <br /><br />
          AI nemiega, nepavarsta ir visada pasiruošęs padėti.
        </BaitasMsg>
      )}

      {/* ── Step 2: Vocabulary cards ── */}
      {show(2) && (
        <div className="space-y-4 animate-fade-in">
          <SectionLabel>Svarbūs žodžiai</SectionLabel>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <InfoCard emoji="🤖" title="Dirbtinis intelektas (AI)" description="Kompiuterinė sistema, kuri mokosi iš pavyzdžių ir gali kurti naujus dalykus." color="brand" />
            <InfoCard emoji="✍️" title="Promtas" description="Instrukcija ar aprašymas, kurį duodi AI. Kuo tiksliau, tuo geresnis rezultatas!" color="purple" />
            <InfoCard emoji="🎨" title="Generuoti" description="Kai AI sukuria kažką visiškai nauja pagal tavo promtą — paveikslėlį, tekstą ar garso klipą." color="pink" />
          </div>
          {active(2) && <ContinueBtn onClick={() => advance(5)} />}
        </div>
      )}

      {/* ── Step 3: Quiz ── */}
      {show(3) && (
        <QuizCard
          question="Kaip vadinamos instrukcijos, kurias duodi AI, kad jis sukurtų paveikslėlį?"
          options={['Komanda', 'Promtas', 'Kodas', 'Patarimas']}
          correct={1}
          explanation="Teisingai! Promtas yra instrukcija arba aprašymas. Kuo tiksliau jį parašysi, tuo geresnis bus AI kūrinys."
          active={active(3)}
          onContinue={() => advance(10)}
        />
      )}

      {/* ── Step 4: Chat intro ── */}
      {show(4) && (
        <BaitasMsg active={active(4)} onContinue={() => advance(5)}>
          Puiku! 🎉 Pirmiausia pakalbėkime su AI. Parašyk Gemini klausimą apie dirbtinį
          intelektą — galite naudoti žemiau pateiktą klausimą arba sugalvoti savą. 👇
        </BaitasMsg>
      )}

      {/* ── Step 5: Chat tool ── */}
      {show(5) && (
        <div className="space-y-3 animate-fade-in">
          <InlineChat
            starter="Kas yra dirbtinis intelektas? Paaiškink kaip 10 metų vaikui, naudok paprastus žodžius."
            label="Paklausk AI apie dirbtinį intelektą"
            onFirstUse={() => setChatUsed(true)}
          />
          {chatUsed && active(5) && <ContinueBtn onClick={() => advance(15)} />}
        </div>
      )}

      {/* ── Step 6: After chat + image intro ── */}
      {show(6) && (
        <div className="space-y-4 animate-fade-in">
          <BaitasMsg>
            Matai, kaip AI geba paaiškinti sudėtingus dalykus paprastais žodžiais? 🌟
          </BaitasMsg>
          <HighlightBox color="purple" icon="🎨">
            <strong>Dabar sukursime savo pirmą AI paveikslėlį!</strong> Norėdamas sukurti paveikslėlį,
            turi aprašyti ką nori pamatyti — tai vadinamas promtu. Paveikslėlio aprašymą reikia
            rašyti <strong>angliškai</strong>, nes Imagen 3 geriausiai supranta šią kalbą.
          </HighlightBox>
          {active(6) && <ContinueBtn onClick={() => advance(5)} />}
        </div>
      )}

      {/* ── Step 7: Image tool ── */}
      {show(7) && (
        <div className="space-y-3 animate-fade-in">
          <InlineImage
            starter="A friendly dragon reading a book in a cozy library, watercolor style, warm colors"
            label="Sukurk savo pirmą AI paveikslėlį"
            onFirstUse={() => setImageUsed(true)}
          />
          {imageUsed && active(7) && <ContinueBtn onClick={() => advance(15)} />}
        </div>
      )}

      {/* ── Step 8: After image ── */}
      {show(8) && (
        <BaitasMsg active={active(8)} onContinue={() => advance(5)}>
          Oho! 🌟 Tu ką tik sukūrei savo <strong>pirmą AI paveikslėlį</strong>!
          <br /><br />
          Pabandyk pakeisti kai kuriuos žodžius promte ir pamatyk, kaip keičiasi rezultatas —
          pavyzdžiui, pakeisk <em>watercolor</em> į <em>digital art</em> arba pridėk <em>at night</em>.
        </BaitasMsg>
      )}

      {/* ── Step 9: Quiz 2 ── */}
      {show(9) && (
        <QuizCard
          question="Ką reikia padaryti, norint gauti geresnį AI paveikslėlį?"
          options={[
            'Spausti mygtuką kelis kartus',
            'Rašyti ilgesnį ir tikslesnį aprašymą (promtą)',
            'Palaukti ilgiau',
            'Keisti kalbą',
          ]}
          correct={1}
          explanation="Tiksliai! Kuo daugiau detalių aprašai promte — objektą, spalvas, stilių, nuotaiką — tuo geresnis rezultatas."
          active={active(9)}
          onContinue={() => advance(10)}
        />
      )}

      {/* ── Step 10: Reflection ── */}
      {show(10) && (
        <ReflectionCard
          question="Aprašyk savo pirmąjį AI paveikslėlį. Kas tave nustebino? Ką norėtum pakeisti?"
          placeholder="Rašyk čia savo mintis..."
          active={active(10)}
          onSave={() => advance(20)}
        />
      )}

      {/* ── Step 11: Closing ── */}
      {show(11) && (
        <BaitasMsg active={false}>
          Fantastiška! 🎊 Šiandien tu:
          <br /><br />
          ✅ Sužinojai, kas yra dirbtinis intelektas<br />
          ✅ Pasikalbėjai su AI<br />
          ✅ Sukūrei savo pirmą AI paveikslėlį<br />
          ✅ Atsakei į viktorinos klausimus<br />
          ✅ Pradėjai savo AI žurnalą<br />
          <br />
          Kitą savaitę sužinosime, kaip rašyti geresnius promtus ir kurti dar nuostabesnius paveikslėlius. Iki pasimatymo! 👋
        </BaitasMsg>
      )}

    </div>
  )
}
