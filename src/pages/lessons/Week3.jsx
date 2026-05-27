import { useState } from 'react'
import {
  BaitasMsg, InfoCard, SectionLabel, HighlightBox,
  QuizCard, ReflectionCard, InlineChat, InlineImage, ContinueBtn,
} from './components'

export const WEEK3_STEPS = 11

export default function Week3({ currentStep, advance }) {
  const show = (i) => currentStep >= i
  const active = (i) => currentStep === i

  const [chatUsed, setChatUsed] = useState(false)
  const [scene1Used, setScene1Used] = useState(false)
  const [scene2Used, setScene2Used] = useState(false)
  const [scene3Used, setScene3Used] = useState(false)

  return (
    <div className="space-y-8">

      {/* ── Step 0: Hero + Welcome ── */}
      {show(0) && (
        <div className="space-y-6 animate-fade-in">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-cyan-600/25 via-teal-700/15 to-green-600/10 border border-white/10 p-10 text-center">
            <div className="absolute top-0 left-0 w-40 h-40 bg-cyan-500/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
            <div className="relative">
              <div className="text-7xl mb-5 inline-block" style={{ filter: 'drop-shadow(0 0 24px rgba(6,182,212,0.6))' }}>📖</div>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/20 border border-cyan-500/30 text-cyan-300 text-xs font-display font-700 mb-4 ml-2">
                Savaitė 3
              </div>
              <h1 className="font-display text-4xl font-700 text-white mb-2">Istorija susitinka su AI</h1>
              <p className="text-slate-400 text-sm">Sukurk savo iliustruotą AI istoriją</p>
            </div>
          </div>

          <BaitasMsg accent="cyan" active={active(0)} onContinue={() => advance(5)}>
            Sveiki! 📖 Šiandien ateina didžioji savaitė — mes sukursime savo{' '}
            <strong>AI iliustruotą istoriją</strong>!
            <br /><br />
            Tu būsi ir <strong>autorius</strong>, ir <strong>meno direktorius</strong>. Pasiruošęs nuotykiui? 🎬
          </BaitasMsg>
        </div>
      )}

      {/* ── Step 1: Story elements ── */}
      {show(1) && (
        <div className="space-y-4 animate-fade-in">
          <SectionLabel>Istorijos ingredientai</SectionLabel>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <InfoCard emoji="👤" title="Personažas" description="Kas yra herojus? Kokie jo bruožai, svajonės, silpnybės?" color="brand" />
            <InfoCard emoji="🌍" title="Aplinka" description="Kur ir kada vyksta istorija? Kosmosas, praeitis, fantazijos pasaulis?" color="cyan" />
            <InfoCard emoji="⚡" title="Problema" description="Kas nutinka? Su kuo herojus susiduria? Be problemos nėra istorijos!" color="purple" />
            <InfoCard emoji="🎯" title="Sprendimas" description="Kaip viskas baigiasi? Ko herojus išmoko iš šio nuotykio?" color="green" />
          </div>
          {active(1) && <ContinueBtn onClick={() => advance(5)} />}
        </div>
      )}

      {/* ── Step 2: Quiz ── */}
      {show(2) && (
        <QuizCard
          question="Iš kokių dalių susideda gera istorija?"
          options={[
            'Tik personažas ir veiksmas',
            'Personažas, aplinka, problema ir sprendimas',
            'Pradžia ir pabaiga',
            'Kuo daugiau veikėjų, tuo geriau',
          ]}
          correct={1}
          explanation="Puiku! Personažas + aplinka + problema + sprendimas — tai klasikinė istorijos struktūra. Visi geriausi filmai ir knygos remiasi šia schema!"
          active={active(2)}
          onContinue={() => advance(10)}
        />
      )}

      {/* ── Step 3: Brainstorm intro ── */}
      {show(3) && (
        <BaitasMsg accent="cyan" active={active(3)} onContinue={() => advance(5)}>
          Pirmiausia pakalbėkime su AI ir sugalvokime istoriją! Paklausk Gemini pagalbos —
          bet atmink: <strong>tu esi pasakotojas, AI tik padėjėjas!</strong> 👇
        </BaitasMsg>
      )}

      {/* ── Step 4: Chat for brainstorming ── */}
      {show(4) && (
        <div className="space-y-3 animate-fade-in">
          <InlineChat
            starter="Padėk man sugalvoti trumpą istoriją. Noriu istorijos apie jauną išradėją, kuri atranda žemėlapį, vedantį į slaptą povandeninį miestą. Sugalvok: 1) herojės vardą ir charakterį, 2) problemą, su kuria ji susiduria, 3) netikėtą posūkį."
            label="Sugalvokime istoriją kartu su AI"
            onFirstUse={() => setChatUsed(true)}
          />
          {chatUsed && active(4) && <ContinueBtn onClick={() => advance(15)} />}
        </div>
      )}

      {/* ── Step 5: Scene 1 intro ── */}
      {show(5) && (
        <div className="space-y-4 animate-fade-in">
          <BaitasMsg accent="cyan">
            Puiku! Dabar iliustruokime 3 svarbiausias scenas.
          </BaitasMsg>
          <HighlightBox color="brand" icon="🎬">
            <strong>1 scena — Istorijos pradžia:</strong> kaip tavo herojus susiduria su nuotykio pradžia?
            Pakeisk promtą, kad atitiktų tavo istoriją!
          </HighlightBox>
          {active(5) && <ContinueBtn onClick={() => advance(5)} />}
        </div>
      )}

      {/* ── Step 6: Scene 1 image ── */}
      {show(6) && (
        <div className="space-y-3 animate-fade-in">
          <InlineImage
            starter="A curious young girl with braided hair holding a glowing ancient map, surrounded by tall dusty bookshelves, warm golden light, watercolor storybook illustration style"
            label="1 scena — Istorijos pradžia"
            onFirstUse={() => setScene1Used(true)}
          />
          {scene1Used && active(6) && <ContinueBtn onClick={() => advance(15)} label="Scena sukurta! Tęsti →" />}
        </div>
      )}

      {/* ── Step 7: Scene 2 ── */}
      {show(7) && (
        <div className="space-y-3 animate-fade-in">
          <HighlightBox color="purple" icon="⚡">
            <strong>2 scena — Didžioji kliūtis:</strong> kas nutinka herojui sunkiausią akimirką?
            Pakeisk promtą pagal savo istoriją!
          </HighlightBox>
          <InlineImage
            starter="A brave young girl swimming through an underwater city with glowing buildings, surrounded by friendly sea creatures, dramatic lighting, digital art, adventure illustration style"
            label="2 scena — Didžioji kliūtis"
            onFirstUse={() => setScene2Used(true)}
          />
          {scene2Used && active(7) && <ContinueBtn onClick={() => advance(15)} label="Scena sukurta! Tęsti →" />}
        </div>
      )}

      {/* ── Step 8: Scene 3 ── */}
      {show(8) && (
        <div className="space-y-3 animate-fade-in">
          <HighlightBox color="green" icon="🏆">
            <strong>3 scena — Laiminga pabaiga:</strong> kaip istorija baigiasi? Sukurk finalinę sceną!
          </HighlightBox>
          <InlineImage
            starter="A triumphant young girl standing at the entrance of a magical underwater city, celebrating with sea creatures, sunlight filtering through water, warm and joyful, watercolor illustration"
            label="3 scena — Pabaiga"
            onFirstUse={() => setScene3Used(true)}
          />
          {scene3Used && active(8) && <ContinueBtn onClick={() => advance(15)} label="Istorija baigta! Tęsti →" />}
        </div>
      )}

      {/* ── Step 9: Quiz ── */}
      {show(9) && (
        <QuizCard
          question="Kaip geriausiai išlaikyti tą patį stilių visose istorijos scenose?"
          options={[
            'Generuoti kiekvieną kartą skirtingai',
            "Naudoti tuos pačius stiliaus žodžius kiekviename promte (pvz., 'watercolor illustration')",
            'Spaudinėti mygtuką daug kartų',
            'Naudoti skirtingus AI įrankius',
          ]}
          correct={1}
          explanation="Tiksliai! Jei kiekviename promte naudosi tuos pačius stiliaus žodžius, visos scenos atrodys kaip vienos knygos dalis. Tai vadinama vizualiniu nuoseklumu."
          active={active(9)}
          onContinue={() => advance(10)}
        />
      )}

      {/* ── Step 10: Reflection ── */}
      {show(10) && (
        <ReflectionCard
          question="Aprašyk savo istoriją 3–5 sakiniais. Koks promtas davė geriausią rezultatą? Ką norėtum pakeisti?"
          placeholder="Parašyk savo istorijos aprašymą..."
          active={active(10)}
          onSave={() => advance(20)}
        />
      )}

      {/* ── Step 11: Closing ── */}
      {show(11) && (
        <BaitasMsg accent="cyan" active={false}>
          Bravo! 👏 Tu sukūrei savo pirmą AI iliustruotą istoriją!
          <br /><br />
          ✅ Sugalvojai įdomią istoriją<br />
          ✅ Sukūrei 3 unikalias iliustracijas<br />
          ✅ Išmokai vizualinio nuoseklumo<br />
          <br />
          Kitą savaitę pakalbėsime apie svarbius klausimus — <strong>ar AI menas yra tikras menas?</strong> 🤔
        </BaitasMsg>
      )}

    </div>
  )
}
