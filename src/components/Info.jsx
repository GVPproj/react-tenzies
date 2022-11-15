export default function Info() {
  return (
    <section className="info">
      <h1 className="title">About</h1>
      <p>
        This project, my first React app, is based on the Tenzies app from Bob
        Ziroll's React Course. Ziroll's gameplay and design elements are intact
        here.
      </p>
      <p>
        However, I have added <strong>Scoring</strong> functionality by{" "}
        <i>counting dice-rolls</i> as well as monitoring{" "}
        <i>time-to-completion</i> with a proprietary <strong>Timer</strong>. The
        user's "low score" <strong>persists</strong> in their browser's{" "}
        <em>local storage</em> for later sessions.
      </p>
      <p>
        I have introduced <strong>graphical dice</strong> which invert when
        selected, replacing of the more basic text value display of the
        original.
      </p>
      <p>
        I also personalized the <strong>styling</strong>, fonts and colours.
      </p>
      <p>
        Thanks for playing! <em>xo, GVP</em>
      </p>
    </section>
  )
}
