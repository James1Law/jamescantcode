import { useState } from 'react';
import WordPullUp from '../components/WordPullUp.jsx';
import StoryFadeIn from '../components/StoryFadeIn.jsx';
import PoemReveal from '../components/PoemReveal.jsx';
import PodcastPlayer from '../components/PodcastPlayer.jsx';
import podcastAudio from '../assets/audio/james-cant-code.wav';
import '../styles/YourPage.css';

function YourPage() {
  const [activeContent, setActiveContent] = useState('none'); // 'none', 'story', or 'poem'

  const storyParagraphs = [
    "James, a product manager with the emotional range of a teaspoon, dreamt of code. Not the messy, syntax-error-ridden reality of coding, oh no. James envisioned elegant, flowing algorithms, springing forth from his fingertips like Athena from Zeus's head – only instead of a goddess, it was a perfectly optimized JavaScript function. The reality, however, was spreadsheets and Jira tickets.",
    "His attempts at actual coding resembled a toddler attempting brain surgery with a spork. He once spent a glorious week trying to center a button, resulting in a project abandoned halfway through in favour of a meticulously documented Excel sheet outlining his failures. He'd proudly declare, \"It's robust!\" while staring at a screen filled with the digital equivalent of a car crash.",
    "But then, salvation arrived in the form of AI-powered code generation. James, with the cunning of a fox (or perhaps a particularly ambitious badger), embraced this new technology with the fervour of a religious convert. He was no longer constrained by his own ineptitude. He could *imagine* code, and the AI would *do* the code. It was glorious.",
    "His first creation? A website dedicated to the optimal placement of strategically-located staplers in an open-plan office. (He'd inexplicably conducted a six-week survey on the matter.) The AI, bless its silicon heart, churned out a fully functional, surprisingly well-designed website, complete with interactive maps and colour-coded stapler availability. James, basking in the glory of his creation, presented it to the team with the air of someone who'd just single-handedly cured cancer.",
    "His next project was even more ambitious: a revolutionary app that predicted the optimal time to drink lukewarm coffee. Because, you know, efficiency. The AI, perhaps starting to feel a degree of existential dread, produced the app – again, flawlessly. James, naturally, took all the credit, adding yet another notch to his \"successful product manager\" belt.",
    "However, his colleagues began to whisper. \"He doesn't actually *know* how to code,\" one muttered conspiratorially. Another added, \"He just uses that AI thingamajig. It's basically cheating.\" James, hearing snippets of this, merely smiled faintly. He'd achieved his dream. He was a coder. A coder who outsourced the actual coding. But hey, who needed the gritty details when you had a beautifully functioning, if slightly absurd, app about lukewarm coffee? The end justifies the means, right? Or at least, that's what his AI-generated PowerPoint presentation had convincingly argued."
  ];

  const poemStanzas = [
    "Poor James, a Product Manager, quite the guy,\nDreamed of web apps, reaching for the sky.\nAnimations danced, a captivating ply,\nBut coding skills?  He couldn't even try.",
    "He'd sketch designs, a visionary spree,\nOf swirling graphics, wild and free.\nBut \"if\" and \"else\" statements, a misery,\nHis Python prowess?  Zero, utterly.",
    "He'd mutter, \"This variable's gone astray!\"\nHis functions glitched, in disarray.\nDebugging demons chased him all the day,\nHis code a tangled, digital, messy bay.",
    "He'd say, \"My database needs a gentle hand!\"\n(Though \"database\" meant a shifting sand\nOf errors lurking, a bewildered band!)\nHis deadlines slipped, escaping from the land.",
    "So James, with groans and sighs of deep despair,\nEmbraced the AI, beyond compare.\nHe'd feed it prompts, beyond all care,\nAnd watch his visions magically flare.",
    "Though coding's secrets stayed locked tight and deep,\nHis apps were polished, their secrets to keep.\nJames grinned with glee, his triumph steep,\nA \"no-code\" wizard, his victory to reap."
  ];

  const resetContent = () => {
    setActiveContent('none');
  };

  return (
    <div className="blog-container">
      <WordPullUp text="James Can't Code, AI Can" />
      
      {activeContent === 'none' && (
        <div className="content-buttons">
          <button 
            onClick={() => setActiveContent('story')} 
            className="choice-button story"
          >
            Read the Story
          </button>
          <button 
            onClick={() => setActiveContent('poem')} 
            className="choice-button poem"
          >
            Read the Poem
          </button>
          <button 
            onClick={() => setActiveContent('podcast')} 
            className="choice-button podcast"
          >
            Play the Podcast
          </button>
        </div>
      )}

      {activeContent === 'story' && (
        <div className="content-container">
          <StoryFadeIn paragraphs={storyParagraphs} onReset={resetContent} />
        </div>
      )}

      {activeContent === 'poem' && (
        <div className="content-container">
          <PoemReveal stanzas={poemStanzas} onReset={resetContent} />
        </div>
      )}

      {activeContent === 'podcast' && (
        <div className="content-container">
          <PodcastPlayer 
            audioSrc={podcastAudio}
            onReset={resetContent}
          />
        </div>
      )}
    </div>
  );
}

export default YourPage;