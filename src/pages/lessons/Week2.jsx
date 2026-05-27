import { useState } from 'react'
import {
  BaitasMsg, InfoCard, SectionLabel, HighlightBox,
  QuizCard, ReflectionCard, InlineChat, InlineImage, ContinueBtn,
} from './components'

export const WEEK2_STEPS = 9

export default function Week2({ currentStep, advance }) {
  const show = (i) => currentStep >= i
  const active = (i) => currentStep === i

  const [imageUsed, setImageUsed] = useState(false)
  const [chatUsed, setChatUsed] = useState(false)

  return (
    <div className="space-y-8">

      {/* ── Step 0: Hero + Welcome ── */}
      {show(0) && (
        <div className="space-y-6 animate-fade-in">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-purple-600/25 via-violet-700/15 to-pink-600/10 border border-white/10 p-10 text-center">
            <div className="absolute top-0 right-0 w-40 h-40 bg-purple-500/10 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 left-0 w-40 h-40 bg-pink-500/10 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2" />
            <div className="relative">
              <div className="text-7xl mb-5 inline-block" style={{ filter: 'drop-shadow(0 0 24px rgba(168,85,247,0.6))' }}>✍️</div>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-500/20 border border-purple-500/30 text-purple-300 text-xs font-display font-700 mb-4 ml-2">
                Savaitė 2
              </div>
              <h1 className="font-display text-4xl font-700 text-white mb-2">Promtų menas</h1>
              <p className="text-slate-400 text-sm">Išmok kalbėtis su AI kaip profesionalas</p>
            </div>
          </div>

          <BaitasMsg accent="purple" active={active(0)} onContinue={() => advance(5)}>
            Sveiki sugrįžę! 🎨 Šią savaitę sužinosime, kad kuo geriau aprašome, ką norime,
            tuo geresnius rezultatus gauname iš AI. Tai vadinama <strong>promtų inžinerija</strong> — ir tai tikras menas! 🖌️
          </BaitasMsg>
        </div>
      )}

      {/* ── Step 1: Bad vs Good comparison ── */}
      {show(1) && (
        <div className="space-y-4 animate-fade-in">
          <SectionLabel>Skirtumas matomas akimirksniu</SectionLabel>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="rounded-2xl border border-red-500/20 bg-red-500/5 p-4">
              <p className="text-xs text-red-400 font-display font-700 uppercase tracking-wider mb-3">❌ Blogas promtas</p>
              <p className="text-slate-300 text-sm font-mono bg-black/20 rounded-xl px-3 py-2 mb-3">katė</p>
              <p className="text-slate-500 text-xs">Per trumpas, per bendras — AI nežino ką tu nori</p>
            </div>
            <div className="rounded-2xl border border-green-500/20 bg-green-500/5 p-4">
              <p className="text-xs text-green-400 font-display font-700 uppercase tracking-wider mb-3">✅ Geras promtas</p>
              <p className="text-slate-300 text-sm font-mono bg-black/20 rounded-xl px-3 py-2 mb-3">Orange tabby cat wearing a wizard hat, sitting on a stack of books, candlelight, watercolor style</p>
              <p className="text-slate-500 text-xs">Detalus, konkretus — AI tiksliai supranta kas reikalinga</p>
            </div>
          </div>
          {active(1) && <ContinueBtn onClick={() => advance(5)} />}
        </div>
      )}

      {/* ── Step 2: Prompt recipe ── */}
      {show(2) && (
        <div className="space-y-4 animate-fade-in">
          <SectionLabel>Promto receptas</SectionLabel>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <InfoCard emoji="🐱" title="Objektas" description="Kas arba kas yra paveikslėlyje. Kiek tiksliau — tiek geriau." color="brand" />
            <InfoCard emoji="🌍" title="Aplinka" description="Kur vyksta scena? Miškas, miestas, kosmosas, vandenynas..." color="purple" />
            <InfoCard emoji="🎭" title="Nuotaika" description="Koks jausmas — linksmas, paslaptingas, šiltas, dramatiškas?" color="cyan" />
            <InfoCard emoji="🖼️" title="Stilius" description="watercolor, digital art, oil painting, cartoon, pencil sketch..." color="pink" />
          </div>
          {active(2) && <ContinueBtn onClick={() => advance(5)} />}
        </div>
      )}

      {/* ── Step 3: Quiz ── */}
      {show(3) && (
        <QuizCard
          question="Kuris iš šių promtų duos geriausią ir tiksliausią paveikslėlį?"
          options={[
            'Katė',
            'Oranžinė katė sėdi',
            'Orange tabby cat with wizard hat on books, candlelight, watercolor style',
            'Gyvūnas su skrybėle',
          ]}
          correct={2}
          explanation="Trečias variantas laimi! Jis turi objektą, detalę, aplinką, apšvietimą ir stilių. Tai tikras recepto promtas!"
          active={active(3)}
          onContinue={() => advance(10)}
        />
      )}

      {/* ── Step 4: Practice intro ── */}
      {show(4) && (
        <BaitasMsg accent="purple" active={active(4)} onContinue={() => advance(5)}>
          Dabar pabandyk patys! Naudok promto receptą — <strong>objektas + aplinka + nuotaika + stilius</strong>.
          Pakeisk žemiau esantį promtą arba parašyk visiškai savą. 👇
        </BaitasMsg>
      )}

      {/* ── Step 5: Image tool ── */}
      {show(5) && (
        <div className="space-y-3 animate-fade-in">
          <InlineImage
            starter="A young inventor in her workshop surrounded by amazing gadgets, at night, sense of wonder, digital art style"
            label="Promtų pratybos — tobulink ir bandyk!"
            onFirstUse={() => setImageUsed(true)}
          />
          {imageUsed && active(5) && <ContinueBtn onClick={() => advance(15)} />}
        </div>
      )}

      {/* ── Step 6: AI helps with prompts ── */}
      {show(6) && (
        <div className="space-y-4 animate-fade-in">
          <BaitasMsg accent="purple">
            Žinai ką? 💡 AI gali padėti rašyti geresnius promtus! Paklausk Gemini pagalbos
            kuriant promtą savo idėjai — jis išplės tavo idėją į išsamų, kūrybišką aprašymą. 👇
          </BaitasMsg>
          <InlineChat
            starter="Padėk man parašyti Imagen 3 promtą paveikslėliui: lapė detektyvė, sprendžianti paslaptį 1920-ųjų Paryžiuje. Sukurk išsamų, kūrybišką promtą anglų kalba su objektu, aplinka, nuotaika ir stiliumi."
            label="Paklausk AI pagalbos kuriant promtą"
            onFirstUse={() => setChatUsed(true)}
          />
          {chatUsed && active(6) && <ContinueBtn onClick={() => advance(15)} />}
        </div>
      )}

      {/* ── Step 7: Quiz 2 ── */}
      {show(7) && (
        <QuizCard
          question="Ką reiškia žodis 'watercolor' promte?"
          options={[
            'Paveikslėlis su vandeniu',
            'Akvarelės tapybos stilius',
            'Mėlynos spalvos paveikslėlis',
            'Fotografija',
          ]}
          correct={1}
          explanation="Teisingai! 'Watercolor' reiškia akvarelės stilių. Kiti populiarūs stiliai: 'oil painting', 'digital art', 'pencil sketch', 'cartoon style'."
          active={active(7)}
          onContinue={() => advance(10)}
        />
      )}

      {/* ── Step 8: Reflection ── */}
      {show(8) && (
        <ReflectionCard
          question="Koks promtas davė geriausią rezultatą? Kokie žodžiai labiausiai pakeitė paveikslėlį?"
          placeholder="Aprašyk savo patirtį..."
          active={active(8)}
          onSave={() => advance(20)}
        />
      )}

      {/* ── Step 9: Closing ── */}
      {show(9) && (
        <BaitasMsg accent="purple" active={false}>
          Nuostabu! 🏆 Tu dabar moki rašyti geresnius promtus!
          <br /><br />
          ✅ Sužinojai promto receptą<br />
          ✅ Sukūrei paveikslėlį su detaliais aprašymais<br />
          ✅ Panaudojai AI kaip kūrybinį pagalbininką<br />
          <br />
          Kitą savaitę sukursime savo <strong>iliustruotą istoriją su AI</strong>. Pasiruošk būti kūrybišku pasakotoju! 📖
        </BaitasMsg>
      )}

    </div>
  )
}
